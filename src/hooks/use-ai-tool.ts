import { useCallback, useRef, useState } from "react";

export type AiToolStatus = "idle" | "streaming" | "done" | "error";

export function useAiTool(system?: string) {
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<AiToolStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setOutput("");
    setError(null);
    setStatus("idle");
  }, []);

  const run = useCallback(
    async (prompt: string) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setOutput("");
      setError(null);
      setStatus("streaming");

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            system,
            messages: [
              {
                id: crypto.randomUUID(),
                role: "user",
                parts: [{ type: "text", text: prompt }],
              },
            ],
          }),
        });

        if (!response.ok || !response.body) {
          const detail = await response.text().catch(() => "");
          throw new Error(
            response.status === 429
              ? "Rate limit reached. Please wait a moment and try again."
              : response.status === 402
                ? "AI credits are exhausted. Add credits to continue."
                : detail || "The AI request failed. Please try again.",
          );
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let text = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;
            try {
              const event = JSON.parse(payload) as { type?: string; delta?: string };
              if (event.type === "text-delta" && typeof event.delta === "string") {
                text += event.delta;
                setOutput(text);
              }
            } catch {
              // ignore malformed chunk
            }
          }
        }

        setStatus("done");
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong.");
        setStatus("error");
      }
    },
    [system],
  );

  return { output, status, error, run, reset, isLoading: status === "streaming" };
}
