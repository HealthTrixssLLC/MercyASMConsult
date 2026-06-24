import { Link } from "wouter";
import { Check, X, ArrowUpRight, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { FINDINGS, SOURCE_COLUMNS, type FindingTag } from "@/data/findings";

function tagClass(tag: FindingTag): string {
  switch (tag) {
    case "High":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "Medium":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Opportunity":
      return "bg-primary/10 text-primary border-primary/20";
    case "Affirmed":
      return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
    case "Governance":
      return "bg-indigo-100 text-indigo-700 border-indigo-200";
    case "Validation":
      return "bg-sky-100 text-sky-700 border-sky-200";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

function PresenceMark({ present }: { present: boolean }) {
  return present ? (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600">
      <Check className="w-3.5 h-3.5" strokeWidth={3} />
    </span>
  ) : (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground/40">
      <X className="w-3.5 h-3.5" strokeWidth={3} />
    </span>
  );
}

export default function Findings() {
  const total = FINDINGS.length;
  const recurring = FINDINGS.filter(
    (f) => SOURCE_COLUMNS.reduce((n, c) => n + Number(f.sources[c.key]), 0) > 1,
  ).length;

  return (
    <div className="w-full px-6 md:px-10 py-8 md:py-10 fade-in">
      <header className="mb-10">
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
          <span className="text-primary">Gap &amp; Risk Register</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span>Findings</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Findings</h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          A single, de-duplicated index of every finding raised across the engagement — from Pre Kickoff and Kickoff
          planning, through the Jun 8 / 10 / 12 discovery sessions, to the ASM SQL / Layout analysis. A check means the
          finding (or the risk or scope theme it stems from) surfaced in that source. Each finding carries a stable ID,
          the sources it appeared in, and a traceability link to the Gap &amp; Risk register lane where it is being
          resolved.
        </p>
      </header>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm shadow-sm">
          <ClipboardList className="w-4 h-4 text-primary" />
          <span className="font-semibold text-foreground">{total}</span>
          <span className="text-muted-foreground">unique findings</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm shadow-sm">
          <span className="font-semibold text-foreground">{recurring}</span>
          <span className="text-muted-foreground">raised in more than one source</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-secondary/60">
              <th className="sticky top-0 z-10 bg-secondary/60 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap align-bottom">
                ID
              </th>
              <th className="sticky top-0 z-10 bg-secondary/60 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground align-bottom min-w-[20rem]">
                Finding Detail
              </th>
              {SOURCE_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="sticky top-0 z-10 bg-secondary/60 px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap align-bottom text-center"
                >
                  <Link href={col.path} className="hover:text-primary hover:underline">
                    {col.label}
                  </Link>
                </th>
              ))}
              <th className="sticky top-0 z-10 bg-secondary/60 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground align-bottom min-w-[22rem]">
                Traceability &mdash; How We Resolve It
              </th>
            </tr>
          </thead>
          <tbody>
            {FINDINGS.map((f, ri) => (
              <tr
                key={f.id}
                className={cn("border-t border-border align-top", ri % 2 === 1 && "bg-muted/30")}
              >
                <td className="px-4 py-4 font-mono text-xs font-semibold text-foreground whitespace-nowrap align-top">
                  {f.id}
                </td>
                <td className="px-4 py-4 align-top">
                  <div className="flex items-start gap-2 mb-1.5">
                    <span className="font-medium text-foreground leading-snug">{f.title}</span>
                    <span
                      className={cn(
                        "shrink-0 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                        tagClass(f.tag),
                      )}
                    >
                      {f.tag}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{f.detail}</p>
                </td>
                {SOURCE_COLUMNS.map((col) => (
                  <td key={col.key} className="px-3 py-4 text-center align-top">
                    <PresenceMark present={f.sources[col.key]} />
                  </td>
                ))}
                <td className="px-4 py-4 align-top">
                  <p className="text-muted-foreground leading-relaxed mb-2">{f.resolution}</p>
                  <Link
                    href={f.lanePath}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    {f.lane}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={3} /> Raised in that source
        </span>
        <span className="flex items-center gap-1.5">
          <X className="w-3.5 h-3.5 text-muted-foreground/40" strokeWidth={3} /> Not raised in that source
        </span>
        <span>
          Sources: Pre Kickoff &amp; Kickoff planning, the Jun 8 / 10 / 12, 2026 discovery sessions, and the ASM SQL /
          Layout analysis. Column headers link to each source.
        </span>
      </div>
    </div>
  );
}
