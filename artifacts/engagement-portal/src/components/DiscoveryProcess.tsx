import { CheckCircle2 } from "lucide-react";
import {
  DISCOVERY_WEEKS,
  ASSESSMENT_SCOPE,
  PARTICIPATING_HEALTH_PLANS,
  type DiscoveryWeek,
  type TraceItem,
} from "@/data/discoveryCadence";

function TraceList({
  label,
  accent,
  items,
}: {
  label: string;
  accent: string;
  items: TraceItem[];
}) {
  return (
    <div>
      <div
        className="text-[11px] font-semibold uppercase tracking-widest mb-2"
        style={{ color: accent }}
      >
        {label}
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item.id}
            data-trace-id={item.id}
            className="flex gap-2 text-sm text-muted-foreground leading-snug"
          >
            <span
              className="w-1 h-1 rounded-full mt-2 shrink-0"
              style={{ backgroundColor: accent }}
            />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WeekCard({ week }: { week: DiscoveryWeek }) {
  const Icon = week.icon;
  return (
    <div
      data-trace-id={week.id}
      className="rounded-lg border border-border bg-card shadow-sm flex flex-col overflow-hidden"
    >
      <div
        className="flex items-center gap-3 px-4 py-3 text-white"
        style={{ backgroundColor: week.accent }}
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-serif text-base shrink-0">
          {week.number}
        </div>
        <div className="leading-tight">
          <div className="text-xs font-semibold uppercase tracking-widest">Week {week.number}</div>
          <div className="text-xs text-white/80">{week.dateRange}</div>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-5 flex-1">
        <div className="flex items-start gap-2.5">
          <Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: week.accent }} />
          <h3 className="font-serif text-lg text-foreground leading-snug">{week.title}</h3>
        </div>

        <TraceList label="Key Activities" accent={week.accent} items={week.keyActivities} />
        <TraceList
          label="Mercy Inputs / What We Need from Mercy"
          accent={week.accent}
          items={week.mercyInputs}
        />

        <div className="mt-auto pt-4 border-t border-border">
          <div
            className="text-[11px] font-semibold uppercase tracking-widest mb-1.5 flex items-center gap-1.5"
            style={{ color: week.accent }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Key Mercy Outcome
          </div>
          <p
            data-trace-id={week.keyOutcome.id}
            className="text-sm text-muted-foreground leading-relaxed"
          >
            {week.keyOutcome.text}
          </p>
        </div>
      </div>
    </div>
  );
}

export function DiscoveryProcess() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-lg p-5 md:p-6 text-white"
        style={{ backgroundColor: "#15294d" }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">
              Assessment Scope
            </div>
            <p className="text-sm leading-relaxed text-white/90">{ASSESSMENT_SCOPE}</p>
          </div>
          <div className="md:border-l md:border-white/15 md:pl-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-3">
              Participating Health Plans <span className="text-white/40">(All Covered)</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {PARTICIPATING_HEALTH_PLANS.map((plan) => (
                <li
                  key={plan.id}
                  data-trace-id={plan.id}
                  className="flex items-center gap-2 text-sm text-white/90"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-white/60" />
                  <span>{plan.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {DISCOVERY_WEEKS.map((week) => (
          <WeekCard key={week.id} week={week} />
        ))}
      </div>
    </div>
  );
}
