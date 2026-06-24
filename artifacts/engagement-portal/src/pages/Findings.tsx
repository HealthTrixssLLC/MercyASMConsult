import { Link } from "wouter";
import { Check, X, ArrowUpRight, ClipboardList, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { FINDINGS, SOURCE_COLUMNS, type FindingTag } from "@/data/findings";
import { RECOMMENDATIONS } from "@/data/recommendations";

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
          <span>Findings &amp; Recommendations</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Findings &amp; Recommendations</h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          A single, de-duplicated register of what we observed across the engagement and what we recommend doing about
          it. Findings span Pre Kickoff and Kickoff planning, the Jun 8 / 10 / 12 discovery sessions, and the ASM SQL /
          Layout analysis; recommendations are drawn from the analysis work (such as the MAO Data Gap Analysis). Each
          item carries a stable ID — findings (<span className="font-mono text-xs">F-##</span>) trace to the register
          lane that resolves them, and recommendations (<span className="font-mono text-xs">R-##</span>) trace back to
          the finding(s) they address and the page they originate from.
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
        <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm shadow-sm">
          <Lightbulb className="w-4 h-4 text-primary" />
          <span className="font-semibold text-foreground">{RECOMMENDATIONS.length}</span>
          <span className="text-muted-foreground">recommendations</span>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-serif text-foreground mb-4">Findings</h2>

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

      <h2 className="text-xl md:text-2xl font-serif text-foreground mt-12 mb-4">Recommendations</h2>

      <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-secondary/60">
              <th className="sticky top-0 z-10 bg-secondary/60 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap align-bottom">
                ID
              </th>
              <th className="sticky top-0 z-10 bg-secondary/60 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground align-bottom min-w-[26rem]">
                Recommendation
              </th>
              <th className="sticky top-0 z-10 bg-secondary/60 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap align-bottom">
                Addresses
              </th>
              <th className="sticky top-0 z-10 bg-secondary/60 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap align-bottom">
                Source
              </th>
              <th className="sticky top-0 z-10 bg-secondary/60 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap align-bottom">
                Lane
              </th>
            </tr>
          </thead>
          <tbody>
            {RECOMMENDATIONS.map((r, ri) => (
              <tr
                key={r.id}
                className={cn("border-t border-border align-top", ri % 2 === 1 && "bg-muted/30")}
              >
                <td className="px-4 py-4 font-mono text-xs font-semibold text-foreground whitespace-nowrap align-top">
                  {r.id}
                </td>
                <td className="px-4 py-4 align-top">
                  <div className="font-medium text-foreground leading-snug mb-1.5">{r.title}</div>
                  <p className="text-muted-foreground leading-relaxed">{r.detail}</p>
                </td>
                <td className="px-4 py-4 align-top">
                  <div className="flex flex-wrap gap-1.5">
                    {r.relatedFindings.length === 0 ? (
                      <span className="text-muted-foreground/50">&mdash;</span>
                    ) : (
                      r.relatedFindings.map((fid) => (
                        <span
                          key={fid}
                          className="inline-flex items-center rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[11px] font-semibold text-foreground"
                        >
                          {fid}
                        </span>
                      ))
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 align-top">
                  <Link
                    href={r.sourcePath}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline whitespace-nowrap"
                  >
                    {r.sourceLabel}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
                <td className="px-4 py-4 align-top">
                  <Link
                    href={r.lanePath}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline whitespace-nowrap"
                  >
                    {r.lane}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-xs text-muted-foreground">
        Recommendations carry a stable <span className="font-mono">R-##</span> ID and trace back to the finding(s) they
        address and the analysis page they originate from. As more analyses produce recommendations, append them to the
        register.
      </div>
    </div>
  );
}
