import { useEffect, useState } from "react";
import {
  Pause,
  Play,
  Database,
  Boxes,
  Cog,
  ClipboardList,
  Layers,
  FileCog,
  ShieldCheck,
  Send,
  Inbox,
  RefreshCw,
  Code2,
  FileText,
  Building2,
  UserCheck,
  SearchCheck,
  CircleCheck,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Shared motion helpers                                             */
/* ------------------------------------------------------------------ */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function MotionToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={playing}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground rounded-md border border-border px-2.5 py-1 transition-colors"
    >
      {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
      {playing ? "Pause animation" : "Play animation"}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Future-state pipeline (mirrors page 2 of Samir's PDF)              */
/* ------------------------------------------------------------------ */

type Stage = {
  n: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  points: string[];
};

const FUTURE_STAGES: Stage[] = [
  {
    n: 1,
    title: "Source System",
    subtitle: "Clarity Normalized Tables",
    icon: Database,
    points: ["~25 Clarity tables", "3NF / normalized", "Single source of truth"],
  },
  {
    n: 2,
    title: "Derived Source",
    subtitle: "Clarity Curated Data",
    icon: Boxes,
    points: ["Denormalized / curated", "Business rules applied", "Quality & completeness"],
  },
  {
    n: 3,
    title: "Generalized ASM Engine",
    subtitle: "One Parameterized Engine",
    icon: Cog,
    points: ["Health Plan ID · Sweep Type", "DOS From / To · Run Type", "Effective-dated rules & value sets"],
  },
  {
    n: 4,
    title: "Run Control & Audit",
    subtitle: "Run-level Auditability",
    icon: ClipboardList,
    points: ["Run ID · Executed By · Date/Time", "Parameters · Record counts", "Previous run ref · Latest-run flag"],
  },
  {
    n: 5,
    title: "Staged Export-Ready Source",
    subtitle: "Mercy Format · Submission Grain",
    icon: Layers,
    points: ["Member · Encounter (DOS)", "Provider (NPI) · Diagnoses", "Submission metadata · Run ID"],
  },
  {
    n: 6,
    title: "Layout Conversion",
    subtitle: "Payer-Specific",
    icon: FileCog,
    points: ["UHC · Humana · BCBS · Aetna", "Exported file + staged source", "Layout applied last"],
  },
  {
    n: 7,
    title: "QA / Validation",
    subtitle: "Reconcile & Validate",
    icon: ShieldCheck,
    points: ["Member · DOS · DX · NPI counts", "Record count · Required fields", "Duplicates → PASS / FAIL"],
  },
  {
    n: 8,
    title: "Submission",
    subtitle: "To Health Plan",
    icon: Send,
    points: ["UHC · Humana · BCBS", "Aetna · others", "On QA pass only"],
  },
  {
    n: 9,
    title: "HP Response (MAO)",
    subtitle: "Acceptance & Rejection",
    icon: Inbox,
    points: ["MAO-002 · MAO-004", "Response files", "Rejection files"],
  },
  {
    n: 10,
    title: "Status & Analytics Update",
    subtitle: "Staged Source Updated",
    icon: RefreshCw,
    points: ["Grain: Member + DOS + DX + Provider", "Accepted by HP / CMS", "Rejected · Pending"],
  },
];

function StageCard({ stage, active }: { stage: Stage; active: boolean }) {
  const Icon = stage.icon;
  return (
    <div
      className={cn(
        "stage-node w-52 shrink-0 rounded-xl border border-border bg-card p-4 flex flex-col",
        active && "stage-node-active"
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">
          {stage.n}
        </span>
        <Icon className={cn("w-5 h-5 transition-colors", active ? "text-primary" : "text-muted-foreground")} />
      </div>
      <div className="font-serif text-sm text-foreground leading-snug mb-0.5">{stage.title}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">{stage.subtitle}</div>
      <ul className="space-y-1 mt-auto">
        {stage.points.map((p, i) => (
          <li key={i} className="text-[11px] text-muted-foreground flex gap-1.5 leading-snug">
            <span className="w-1 h-1 rounded-full bg-primary/50 mt-1.5 shrink-0" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Connector({ reverse, muted }: { reverse?: boolean; muted?: boolean }) {
  return (
    <div className="flex items-center px-1.5 self-center shrink-0" aria-hidden="true">
      <div
        className={cn(
          "flow-track h-1 w-8 sm:w-10",
          reverse && "flow-track-reverse",
          muted && "flow-track-muted"
        )}
      />
    </div>
  );
}

const LOOP_NODES: { title: string; detail: string; icon: LucideIcon }[] = [
  {
    title: "HP / MAO Response Files",
    detail: "Files received from the health plan — MAO-002, MAO-004, responses, rejections.",
    icon: Inbox,
  },
  {
    title: "Reverse Reconciliation Engine",
    detail: "Systematically matches response records back to staged data at the grain of Member + DOS + DX + Provider (+ Claim / Encounter when available).",
    icon: SearchCheck,
  },
  {
    title: "Apply Status to Staged Data",
    detail: "Update each record with acceptance status, reason codes, and response metadata.",
    icon: CircleCheck,
  },
  {
    title: "Staged Source Updated",
    detail: "Staged data becomes the system of record for submission and reconciliation status.",
    icon: Layers,
  },
  {
    title: "Analytics & Reporting",
    detail: "Real-time visibility into submission outcomes, acceptance rates, rejections, and trends.",
    icon: BarChart3,
  },
];

export function FutureStateFlow() {
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(true);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setPlaying(!reduced);
  }, [reduced]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setActive((a) => (a + 1) % FUTURE_STAGES.length), 1100);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div className={cn("space-y-8", !playing && "motion-paused")}>
      <div>
        <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground flex-wrap">
          <span className="inline-flex items-center gap-2">
            <span className="w-6 h-1 rounded-full bg-primary" /> Data flow (forward)
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-6 h-1 rounded-full" style={{ background: "#7c3aed" }} /> Reconciliation feedback loop
          </span>
          <span className="ml-auto">
            <MotionToggle playing={playing} onToggle={() => setPlaying((p) => !p)} />
          </span>
        </div>

        <div
          className="flex items-stretch overflow-x-auto pb-4 no-scrollbar"
          role="img"
          aria-label="Future-state ASM pipeline: ten sequential stages from Clarity source through a centralized engine, staging, layout conversion, QA, submission, and response, with a reconciliation feedback loop. Full stage details follow in text."
        >
          {FUTURE_STAGES.map((s, i) => (
            <div key={s.n} className="flex items-stretch shrink-0">
              <StageCard stage={s} active={i === active} />
              {i < FUTURE_STAGES.length - 1 && <Connector />}
            </div>
          ))}
        </div>

        <ol className="sr-only">
          {FUTURE_STAGES.map((s) => (
            <li key={s.n}>
              Stage {s.n}: {s.title} ({s.subtitle}) — {s.points.join("; ")}.
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-xl border border-[#7c3aed]/25 bg-[#7c3aed]/5 p-5">
        <div className="flex items-center gap-2 mb-4">
          <RefreshCw className="w-4 h-4 pulse-soft" style={{ color: "#7c3aed" }} />
          <span className="font-serif text-base text-foreground">Reconciliation Feedback Loop</span>
          <span className="ml-auto text-[11px] font-medium px-2 py-1 rounded-full bg-[#7c3aed]/10" style={{ color: "#7c3aed" }}>
            ↻ Updates Staged Source (Stage 5)
          </span>
        </div>
        <div className="flex items-stretch overflow-x-auto pb-2 no-scrollbar">
          {LOOP_NODES.map((node, i) => {
            const Icon = node.icon;
            return (
              <div key={i} className="flex items-stretch shrink-0">
                <div className="w-52 shrink-0 rounded-lg border border-[#7c3aed]/20 bg-card p-4 flex flex-col">
                  <Icon className="w-5 h-5 mb-2" style={{ color: "#7c3aed" }} />
                  <div className="font-medium text-sm text-foreground leading-snug mb-1">{node.title}</div>
                  <p className="text-[11px] text-muted-foreground leading-snug">{node.detail}</p>
                </div>
                {i < LOOP_NODES.length - 1 && <Connector reverse />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Current-state fan-out (mirrors page 1 of Samir's PDF)             */
/* ------------------------------------------------------------------ */

const PAYERS = ["UHC", "Humana", "BCBS", "Aetna", "Others (Essence, Global…)"];

const CURRENT_COLUMNS: { title: string; subtitle: string; icon: LucideIcon }[] = [
  { title: "Payer Extract", subtitle: "Hard-coded SQL & logic", icon: Code2 },
  { title: "Layout File", subtitle: "Payer-specific", icon: FileText },
  { title: "Submission", subtitle: "To health plan", icon: Building2 },
  { title: "Response", subtitle: "Ad-hoc manual review", icon: UserCheck },
];

export function CurrentStateFlow() {
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    setPlaying(!reduced);
  }, [reduced]);

  return (
    <div className={cn(!playing && "motion-paused")}>
      <div className="flex justify-end mb-3">
        <MotionToggle playing={playing} onToggle={() => setPlaying((p) => !p)} />
      </div>
      <div
        className="overflow-x-auto no-scrollbar"
        role="img"
        aria-label="Current-state architecture: Clarity database source feeding separate hard-coded extracts for UHC, Humana, BCBS, Aetna, and other payers, each with its own layout conversion, submission, and ad-hoc manual reconciliation of MAO and response files."
      >
        <div className="min-w-[760px] flex items-stretch gap-3">
        <div className="w-44 shrink-0 self-center rounded-xl border border-border bg-card p-4">
          <Database className="w-6 h-6 text-primary mb-3" />
          <div className="font-serif text-sm text-foreground leading-snug mb-1">Clarity Database</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Source System</div>
          <ul className="space-y-1">
            {["~25 Clarity tables", "Multiple joins", "Raw operational data"].map((p) => (
              <li key={p} className="text-[11px] text-muted-foreground flex gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary/50 mt-1.5 shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center self-center shrink-0" aria-hidden="true">
          <div className="flow-track flow-track-muted h-1 w-8" />
        </div>

        <div className="flex-1 space-y-2.5">
          <div className="grid grid-cols-4 gap-3 px-1">
            {CURRENT_COLUMNS.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="text-center">
                  <Icon className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                  <div className="text-[11px] font-semibold text-foreground leading-tight">{c.title}</div>
                  <div className="text-[10px] text-muted-foreground">{c.subtitle}</div>
                </div>
              );
            })}
          </div>

          {PAYERS.map((payer) => (
            <div key={payer} className="grid grid-cols-4 gap-3 items-center">
              <div className="rounded-lg border border-destructive/25 bg-destructive/5 px-3 py-2.5">
                <div className="text-xs font-semibold text-foreground">{payer}</div>
                <div className="text-[10px] text-destructive/80">Hard-coded extract</div>
              </div>
              <div className="rounded-lg border border-border bg-card px-3 py-2.5 relative">
                <div className="text-xs text-foreground">{payer} layout</div>
                <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 hidden sm:block">
                  <span className="block flow-track flow-track-muted h-0.5 w-2" />
                </span>
              </div>
              <div className="rounded-lg border border-border bg-card px-3 py-2.5">
                <div className="text-xs text-foreground">Submit → HP</div>
              </div>
              <div className="rounded-lg border border-border bg-muted/40 px-3 py-2.5">
                <div className="text-xs text-foreground">MAO / response</div>
                <div className="text-[10px] text-muted-foreground">manual, non-standard</div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
