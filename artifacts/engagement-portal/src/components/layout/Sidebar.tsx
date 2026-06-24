import React from "react";
import { Link, useRoute } from "wouter";
import { FileText, Presentation, ClipboardList, MessagesSquare, Table2, Workflow, Database, Send, GitCompareArrows, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

type Phase = {
  id: string;
  path: string;
  title: string;
  icon: typeof FileText;
  status: string;
  children?: { id: string; path: string; title: string; icon: typeof FileText }[];
};

export const PHASES: Phase[] = [
  { id: "1", path: "/phase/1", title: "Statement of Work", icon: FileText, status: "active" },
  { id: "kickoff-planning", path: "/kickoff-planning", title: "Kickoff Planning", icon: ClipboardList, status: "active" },
  { id: "kickoff", path: "/kickoff", title: "Kickoff", icon: Presentation, status: "active" },
  { id: "discussion-2026-06-08", path: "/discussions/2026-06-08", title: "Jun 8, 2026", icon: MessagesSquare, status: "active" },
  {
    id: "discussion-2026-06-10",
    path: "/discussions/2026-06-10",
    title: "Jun 10, 2026",
    icon: MessagesSquare,
    status: "active",
    children: [
      {
        id: "mao-guidance",
        path: "/discussions/2026-06-10/mao-guidance",
        title: "HealthTrixss MAO Guidance",
        icon: Table2,
      },
    ],
  },
  { id: "discussion-2026-06-12", path: "/discussions/2026-06-12", title: "Jun 12, 2026", icon: MessagesSquare, status: "active" },
  { id: "discussion-2026-06-17", path: "/discussions/2026-06-17", title: "June 17, 2026 - Current & Future State Analysis", icon: Workflow, status: "active" },
  { id: "asm-analysis-current", path: "/asm-analysis-current", title: "ASM Analysis Current", icon: Database, status: "active" },
  { id: "submission-strategy", path: "/submission-strategy", title: "Submission Strategy", icon: Send, status: "active" },
  { id: "reconciliation-strategy", path: "/reconciliation-strategy", title: "Reconciliation Strategy", icon: GitCompareArrows, status: "active" },
];

function SubLink({
  child,
  onNavigate,
}: {
  child: NonNullable<Phase["children"]>[number];
  onNavigate?: () => void;
}) {
  const [isActive] = useRoute(child.path);
  const Icon = child.icon;
  return (
    <Link
      href={child.path}
      className="block"
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
    >
      <div
        className={cn(
          "group flex items-center gap-2.5 py-2 pl-3 pr-3 rounded-md transition-all duration-200 border border-transparent",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-border/50"
            : "text-sidebar-foreground/60 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground"
        )}
      >
        <Icon
          className={cn(
            "w-3.5 h-3.5 shrink-0",
            isActive ? "text-sidebar-primary" : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70"
          )}
        />
        <span className="font-medium text-[13px] flex-1">{child.title}</span>
      </div>
    </Link>
  );
}

function PhaseLink({
  phase,
  onNavigate,
}: {
  phase: (typeof PHASES)[number];
  onNavigate?: () => void;
}) {
  const [isActive] = useRoute(phase.path);
  const Icon = phase.icon;
  return (
    <div>
      <Link
        href={phase.path}
        className="block"
        onClick={onNavigate}
        aria-current={isActive ? "page" : undefined}
      >
        <div
          className={cn(
            "group flex items-center gap-3 p-3 rounded-md transition-all duration-200 border border-transparent",
            isActive
              ? "bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-border/50"
              : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          )}
        >
          <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-sidebar-primary" : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70")} />
          <span className="font-medium text-sm flex-1">{phase.title}</span>
          {phase.status === "active" && (
            <span className="w-1.5 h-1.5 rounded-full bg-sidebar-primary shadow-[0_0_8px_rgba(245,158,11,0.8)] shrink-0" />
          )}
        </div>
      </Link>
      {phase.children && phase.children.length > 0 && (
        <div className="mt-1 ml-5 pl-3 border-l border-sidebar-border/50 space-y-1">
          {phase.children.map((child) => (
            <SubLink key={child.id} child={child} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { email, logout } = useAuth();
  return (
    <div className="flex flex-col h-full text-sidebar-foreground">
      <div className="p-6 border-b border-sidebar-border/50">
        <h2 className="font-serif text-xl tracking-tight text-sidebar-primary">HealthTrixss</h2>
        <p className="text-xs text-sidebar-foreground/60 mt-1 uppercase tracking-widest font-medium">Engagement Portal</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8" aria-label="Engagement topics">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-sidebar-foreground/40 uppercase tracking-widest mb-4 px-2">
            Engagement Topics
          </div>
          {PHASES.map((phase) => (
            <PhaseLink key={phase.id} phase={phase} onNavigate={onNavigate} />
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-sidebar-border/50 mt-auto space-y-2">
        <div className="flex items-center gap-3 p-2 rounded-md">
          <div className="w-8 h-8 rounded bg-sidebar-accent flex items-center justify-center text-sidebar-primary font-serif text-sm shrink-0">
            HT
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium truncate">{email ?? "Engagement Team"}</span>
            <span className="text-[10px] text-sidebar-foreground/50">HealthTrixss, Inc.</span>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-2.5 py-2 px-2 rounded-md text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          <span className="text-[13px] font-medium">Sign out</span>
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-full hidden md:flex shrink-0">
      <SidebarContent />
    </aside>
  );
}
