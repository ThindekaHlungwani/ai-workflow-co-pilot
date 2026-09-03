import { useChat } from "@ai-sdk/react";
import { createFileRoute } from "@tanstack/react-router";
import { DefaultChatTransport } from "ai";
import { Bot, RotateCcw, Send, User } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { AiDisclaimer, Markdown } from "@/components/ai-output";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat — Workplace AI" },
      {
        name: "description",
        content: "Chat with a professional workplace productivity assistant about any work task.",
      },
      { property: "og:title", content: "AI Chat — Workplace AI" },
      {
        property: "og:description",
        content: "Concise, actionable answers for drafting, planning and analysis.",
      },
    ],
  }),
  component: ChatPage,
});

const SYSTEM_PROMPT =
  "You are a professional workplace productivity assistant. Help with work tasks, drafting, planning, analysis, and professional communication. Be concise, actionable, and professional.";

function ChatPage() {
  const [sessionId, setSessionId] = useState(() => `chat-${Date.now()}`);

  return <ChatSession key={sessionId} onClear={() => setSessionId(`chat-${Date.now()}`)} />;
}

function ChatSession({ onClear }: { onClear: () => void }) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { system: SYSTEM_PROMPT } }),
    [],
  );

  const { messages, sendMessage, status } = useChat({
    transport,
    onError: (error) => toast.error(error.message || "The assistant could not respond."),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const submit = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    void sendMessage({ text });
  };

  return (
    <PageShell title="AI Chat" description="Your always-on assistant for everyday work questions.">
      <Card className="flex h-[calc(100vh-16rem)] min-h-[28rem] flex-col">
        <CardContent className="flex-1 space-y-4 overflow-y-auto pt-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Bot className="size-5" />
              </span>
              <p className="text-sm font-medium">How can I help with your work today?</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Ask for a draft, a plan, an analysis, or feedback on something you&apos;re writing.
              </p>
            </div>
          ) : null}

          {messages.map((message) => {
            const text = message.parts
              .map((part) => (part.type === "text" ? part.text : ""))
              .join("");
            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
                className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}
              >
                {!isUser ? (
                  <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Bot className="size-4" />
                  </span>
                ) : null}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                    isUser ? "bg-primary text-primary-foreground" : "bg-transparent px-0",
                  )}
                >
                  {isUser ? <p className="whitespace-pre-wrap">{text}</p> : <Markdown>{text}</Markdown>}
                </div>
                {isUser ? (
                  <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <User className="size-4" />
                  </span>
                ) : null}
              </div>
            );
          })}

          {status === "submitted" ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex gap-1">
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
              </span>
              Assistant is thinking…
            </div>
          ) : null}
          <div ref={bottomRef} />
        </CardContent>

        <CardFooter className="flex-col items-stretch gap-3 border-t pt-4">
          <div className="flex items-end gap-2">
            <Textarea
              rows={2}
              value={input}
              placeholder="Ask anything about your work…"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
              className="min-h-[3rem] resize-none"
            />
            <Button size="icon" onClick={submit} disabled={isLoading || !input.trim()}>
              <Send className="size-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onClear} title="Clear chat">
              <RotateCcw className="size-4" />
            </Button>
          </div>
          <AiDisclaimer />
        </CardFooter>
      </Card>
    </PageShell>
  );
}
