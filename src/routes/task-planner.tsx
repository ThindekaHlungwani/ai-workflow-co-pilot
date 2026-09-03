import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Loader2 } from "lucide-react";
import { useState } from "react";

import { AiOutputCard } from "@/components/ai-output";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
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

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Workplace AI" },
      {
        name: "description",
        content: "Turn a task list into a prioritized, day-by-day schedule with time estimates.",
      },
      { property: "og:title", content: "AI Task Planner — Workplace AI" },
      {
        property: "og:description",
        content: "Plan your week with priority rankings, time estimates and risk flags.",
      },
    ],
  }),
  component: TaskPlanner,
});

const PRIORITIES = ["Urgent", "Important", "Balanced"];

function TaskPlanner() {
  const [tasks, setTasks] = useState("");
  const [hours, setHours] = useState("6");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Balanced");
  const { output, isLoading, error, run } = useAiTool(
    "You are a productivity expert who builds realistic, prioritized schedules in markdown.",
  );

  const canSubmit = tasks.trim().length > 0 && deadline !== "" && !isLoading;

  return (
    <PageShell
      title="AI Task Planner"
      description="Drop in your tasks and constraints — get a realistic schedule back."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Planning inputs</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (!canSubmit) return;
                run(
                  `You are a productivity expert. Given these tasks: ${tasks}. Available: ${hours} hours/day until ${deadline}. Priority focus: ${priority}. Create a prioritized daily schedule with: 1) Priority ranking with reasoning, 2) Day-by-day breakdown, 3) Time estimates per task, 4) Risk flags for tight deadlines. Use markdown headers and label each task with a priority level (High/Medium/Low).`,
                );
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="tasks">Tasks (one per line)</Label>
                <Textarea
                  id="tasks"
                  rows={8}
                  value={tasks}
                  onChange={(e) => setTasks(e.target.value)}
                  placeholder={"Finish Q3 report\nPrep client demo\nReview two pull requests"}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hours">Hours available per day</Label>
                  <Input
                    id="hours"
                    type="number"
                    min={1}
                    max={16}
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Priority focus</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{priority} focus</Badge>
                <Badge variant="outline">{hours}h / day</Badge>
                {deadline ? <Badge variant="outline">Due {deadline}</Badge> : null}
              </div>
              <Button type="submit" disabled={!canSubmit} className="w-full">
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <CalendarDays className="size-4" />
                )}
                {isLoading ? "Planning…" : "Build my schedule"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <AiOutputCard
          title="Your schedule"
          output={output}
          isLoading={isLoading}
          error={error}
          empty="Your prioritized plan will appear here."
        />
      </div>
    </PageShell>
  );
}
