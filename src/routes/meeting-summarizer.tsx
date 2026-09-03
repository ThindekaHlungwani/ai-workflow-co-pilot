import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Wand2 } from "lucide-react";
import { useState } from "react";

import { AiOutputCard } from "@/components/ai-output";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAiTool } from "@/hooks/use-ai-tool";

export const Route = createFileRoute("/meeting-summarizer")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Workplace AI" },
      {
        name: "description",
        content: "Turn raw meeting notes into summaries, action items, deadlines and decisions.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — Workplace AI" },
      {
        property: "og:description",
        content: "Paste a transcript and get a clear, structured meeting summary.",
      },
    ],
  }),
  component: MeetingSummarizer,
});

function MeetingSummarizer() {
  const [notes, setNotes] = useState("");
  const { output, isLoading, error, run } = useAiTool(
    "You are an executive assistant who writes precise, well-structured meeting summaries in markdown.",
  );
  const canSubmit = notes.trim().length > 20 && !isLoading;

  return (
    <PageShell
      title="Meeting Notes Summarizer"
      description="Paste raw notes or a transcript and get a structured recap."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Raw notes</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (!canSubmit) return;
                run(
                  `Analyze these meeting notes and extract: 1) Executive Summary (2-3 sentences), 2) Key Discussion Points (bullet list), 3) Action Items with owners if mentioned, 4) Deadlines and dates mentioned, 5) Decisions Made. Format clearly with markdown headers.\n\nMeeting notes:\n${notes}`,
                );
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="notes">Meeting notes / transcript</Label>
                <Textarea
                  id="notes"
                  rows={16}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Paste your meeting notes here…"
                />
              </div>
              <Button type="submit" disabled={!canSubmit} className="w-full">
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Wand2 className="size-4" />
                )}
                {isLoading ? "Summarizing…" : "Summarize notes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <AiOutputCard
          title="Structured summary"
          output={output}
          isLoading={isLoading}
          error={error}
          empty="Your meeting summary will appear here."
        />
      </div>
    </PageShell>
  );
}
