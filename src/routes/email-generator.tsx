import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Send } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useAiTool } from "@/hooks/use-ai-tool";

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Workplace AI" },
      {
        name: "description",
        content: "Generate professional emails with the right tone and audience in seconds.",
      },
      { property: "og:title", content: "Smart Email Generator — Workplace AI" },
      {
        property: "og:description",
        content: "Turn a few key points into a polished, ready-to-send email.",
      },
    ],
  }),
  component: EmailGenerator,
});

const TONES = ["Professional", "Friendly", "Formal", "Persuasive", "Concise"];
const AUDIENCES = ["Client", "Team", "Executive", "Vendor", "General"];

function EmailGenerator() {
  const [subject, setSubject] = useState("");
  const [points, setPoints] = useState("");
  const [tone, setTone] = useState("Professional");
  const [audience, setAudience] = useState("Client");
  const { output, isLoading, error, run } = useAiTool(
    "You are an expert business communication writer. Always return clean markdown.",
  );

  const canSubmit = subject.trim().length > 0 && points.trim().length > 0 && !isLoading;

  return (
    <PageShell
      title="Smart Email Generator"
      description="Describe what you need to say — get a complete, well-structured email."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Email brief</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (!canSubmit) return;
                run(
                  `Generate a professional email with subject line and body. Subject topic: ${subject}. Tone: ${tone}. Audience: ${audience}. Key points to cover: ${points}. Format with clear paragraphs and appropriate greeting/sign-off. Start the output with a "Subject:" line.`,
                );
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Q3 project status update"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="points">Key points</Label>
                <Textarea
                  id="points"
                  rows={7}
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  placeholder={"Delivery slipped by one week\nNew scope added by client\nRequest approval for extra budget"}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TONES.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Audience</Label>
                  <Select value={audience} onValueChange={setAudience}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {AUDIENCES.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" disabled={!canSubmit} className="w-full">
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
                {isLoading ? "Generating…" : "Generate email"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <AiOutputCard
          title="Generated email"
          output={output}
          isLoading={isLoading}
          error={error}
          empty="Your generated email will appear here."
        />
      </div>
    </PageShell>
  );
}
