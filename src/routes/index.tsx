import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  CalendarClock,
  Clock,
  ListChecks,
  Mail,
  Search,
  ShieldCheck,
  Sparkle,
} from "lucide-react";

import { AiDisclaimer } from "@/components/ai-output";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Your AI workspace home: five tools for emails, meeting summaries, task plans, research and chat.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Automate daily work tasks with five focused AI tools built for professionals.",
      },
    ],
  }),
  component: Dashboard,
});

const FEATURES = [
  {
    to: "/email-generator",
    icon: Mail,
    title: "Smart Email Generator",
    description: "Draft polished emails with the right tone for any audience.",
  },
  {
    to: "/meeting-summarizer",
    icon: CalendarClock,
    title: "Meeting Summarizer",
    description: "Turn raw notes into summaries, action items and decisions.",
  },
  {
    to: "/task-planner",
    icon: ListChecks,
    title: "AI Task Planner",
    description: "Prioritized, day-by-day schedules with time estimates.",
  },
  {
    to: "/research-assistant",
    icon: Search,
    title: "Research Assistant",
    description: "Structured briefings on any topic, at your chosen depth.",
  },
  {
    to: "/chat",
    icon: Bot,
    title: "AI Chat",
    description: "A workplace assistant for anything else on your plate.",
  },
] as const;

const STATS = [
  { icon: Sparkle, label: "5 AI Tools Available" },
  { icon: Bot, label: "Powered by AI" },
  { icon: ShieldCheck, label: "Professional Grade" },
];

function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <PageShell
      title="Dashboard"
      description="Everything you need to move work forward, in one workspace."
    >
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background">
        <CardHeader>
          <Badge variant="secondary" className="w-fit">
            Workspace overview
          </Badge>
          <CardTitle className="text-2xl">{greeting} 👋</CardTitle>
          <CardDescription className="max-w-2xl">
            Pick a tool below to draft, summarize, plan or research. Everything runs on Lovable AI
            with prompts tuned for professional output.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm"
            >
              <stat.icon className="size-4 text-primary" />
              {stat.label}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {FEATURES.map((feature) => (
          <Card key={feature.to} className="flex flex-col transition-shadow hover:shadow-md">
            <CardHeader>
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="size-5" />
              </span>
              <CardTitle className="text-base">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild size="sm" className="w-full sm:w-auto">
                <Link to={feature.to}>
                  Open <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent activity</CardTitle>
          <CardDescription>Your latest generations will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-8 text-center">
            <Clock className="size-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No activity yet — generate something to get started.
            </p>
          </div>
        </CardContent>
      </Card>

      <AiDisclaimer />
    </PageShell>
  );
}
