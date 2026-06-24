import React from "react";
import { Link, useRoute } from "wouter";
import { FileText, Calendar, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export const PHASES = [
  { id: "1", title: "Statement of Work", subtitle: "Topic 1", icon: FileText, status: "active" },
  { id: "2", title: "Strategy & Design", subtitle: "Topic 2", icon: Calendar, status: "upcoming" },
  { id: "3", title: "Execution & Handover", subtitle: "Topic 3", icon: ShieldAlert, status: "upcoming" },
];

function PhaseLink({
  phase,
  onNavigate,
}: {
  phase: (typeof PHASES)[number];
  onNavigate?: () => void;
}) {
  const [isActive] = useRoute(`/phase/${phase.id}`);
  const Icon = phase.icon;
  return (
    <Link
      href={`/phase/${phase.id}`}
      className="block"
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
    >
      <div
        className={cn(
          "group flex flex-col p-3 rounded-md transition-all duration-200 border border-transparent",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-border/50"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        )}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-wider font-semibold opacity-70">
            {phase.subtitle}
          </span>
          {phase.status === "active" ? (
            <div className="w-1.5 h-1.5 rounded-full bg-sidebar-primary shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-sidebar-foreground/20" />
          )}
        </div>
        <div className="flex items-center gap-3">
          <Icon className={cn("w-4 h-4", isActive ? "text-sidebar-primary" : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70")} />
          <span className="font-medium text-sm">{phase.title}</span>
        </div>
      </div>
    </Link>
  );
}

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
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

      <div className="p-4 border-t border-sidebar-border/50 mt-auto">
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent/50 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded bg-sidebar-accent flex items-center justify-center text-sidebar-primary font-serif text-sm">
            HT
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium">Engagement Team</span>
            <span className="text-[10px] text-sidebar-foreground/50">HealthTrixss, Inc.</span>
          </div>
        </div>
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
