import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bot,
  CalendarClock,
  LayoutDashboard,
  ListChecks,
  Mail,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email-generator", label: "Email Generator", icon: Mail },
  { to: "/meeting-summarizer", label: "Meeting Summarizer", icon: CalendarClock },
  { to: "/task-planner", label: "Task Planner", icon: ListChecks },
  { to: "/research-assistant", label: "Research Assistant", icon: Search },
  { to: "/chat", label: "AI Chat", icon: Bot },
] as const;

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("wpa-theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-full justify-start gap-2"
      onClick={() => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("wpa-theme", next ? "dark" : "light");
      }}
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      {dark ? "Light mode" : "Dark mode"}
    </Button>
  );
}

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bot className="size-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Workplace AI</span>
            <span className="text-xs text-muted-foreground">Productivity Assistant</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={pathname === item.to}>
                    <Link to={item.to}>
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
