import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Search } from "lucide-react";
import { useState } from "react";

import { AiOutputCard } from "@/components/ai-output";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAiTool } from "@/hooks/use-ai-tool";

export const Route = createFileRoute("/research-assistant")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Workplace AI" },
      {
        name: "description",
        content: "Get structured research briefings at the depth and format you need.",
      },
      { property: "og:title", content: "AI Research Assistant — Workplace AI" },
      {
        property: "og:description",
        content: "Overview, key findings, data points and practical implications on any topic.",
      },
    ],
  }),
  component: ResearchAssistant,
});

const DEPTHS = ["Quick Overview", "Detailed Analysis", "Comprehensive Report"];
const FORMATS = ["Bullet Points", "Executive Summary", "Report Format"];

function ResearchAssistant() {
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState("Detailed Analysis");
  const [format, setFormat] = useState("Report Format");
  const { output, isLoading, error, run } = useAiTool(
    "You are an expert research analyst producing well-sourced, structured markdown briefings.",
  );

  const canSubmit = topic.trim().length > 2 && !isLoading;

  return (
    <PageShell
      title="AI Research Assistant"
      description="Brief yourself on any topic in the depth and format you need."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Research brief</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (!canSubmit) return;
                run(
                  `Act as an expert research analyst. Research topic: ${topic}. Provide a ${depth} in ${format} format covering: 1) Overview and context, 2) Key findings and insights, 3) Important statistics or data points, 4) Expert perspectives, 5) Practical implications, 6) Further reading suggestions. Use markdown headers.`,
                );
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="topic">Research topic</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="AI adoption in mid-market logistics"
                />
              </div>
              <div className="space-y-2">
                <Label>Research depth</Label>
                <Select value={depth} onValueChange={setDepth}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPTHS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Output format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FORMATS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={!canSubmit} className="w-full">
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Search className="size-4" />
                )}
                {isLoading ? "Researching…" : "Run research"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <AiOutputCard
          title="Research report"
          output={output}
          isLoading={isLoading}
          error={error}
          empty="Your research report will appear here."
        />
      </div>
    </PageShell>
  );
}
