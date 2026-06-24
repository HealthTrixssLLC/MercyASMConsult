import { Link } from "wouter";
import { cn } from "@/lib/utils";
import type { StrategySheet } from "@/data/submissionStrategy";
import { FINDINGS_BY_ID } from "@/data/traceability";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function priorityBadgeClass(value: string): string | null {
  const v = value.trim().toLowerCase();
  if (!v) return null;
  if (v.startsWith("critical")) return "bg-red-100 text-red-700 border-red-200";
  if (v.startsWith("high")) return "bg-primary/15 text-primary border-primary/30";
  if (v.startsWith("medium") || v.startsWith("med"))
    return "bg-amber-100 text-amber-700 border-amber-200";
  if (v.startsWith("low")) return "bg-slate-100 text-slate-500 border-slate-200";
  return "bg-secondary text-secondary-foreground border-border";
}

export function PriorityChip({ value }: { value: string }) {
  const className = priorityBadgeClass(value);
  if (!className) return <span className="text-muted-foreground/40">—</span>;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        className,
      )}
    >
      {value}
    </span>
  );
}

export function FindingLinks({ ids }: { ids: string[] }) {
  if (!ids.length) {
    return (
      <span
        className="text-xs italic text-muted-foreground/50"
        title="Orphan — no finding linked yet"
      >
        — none
      </span>
    );
  }
  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex flex-wrap gap-1">
        {ids.map((id) => {
          const f = FINDINGS_BY_ID.get(id);
          return (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <Link
                  href={`/findings#${id}`}
                  aria-label={f ? `${id}: ${f.title} — open finding` : `${id} — open finding`}
                  className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                >
                  {id}
                </Link>
              </TooltipTrigger>
              {f && (
                <TooltipContent className="max-w-xs border border-border bg-popover text-popover-foreground shadow-md">
                  <p className="mb-1 font-semibold text-foreground">
                    {f.id} · {f.title}
                  </p>
                  <p className="leading-snug text-muted-foreground">{f.detail}</p>
                  <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wide text-primary">
                    Click to open finding
                  </p>
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

type FindingLinkConfig = {
  /** Insert the findings column immediately after the header with this exact label. */
  insertAfter: string;
  /** Column header for the injected findings column. */
  header?: string;
  /** Index of the column holding the recommendation id used as the map key (default 0). */
  idColumnIndex?: number;
  /** recommendation id -> finding ids. */
  map: Record<string, string[]>;
};

type Col =
  | { kind: "data"; dataIndex: number; label: string }
  | { kind: "findings"; label: string };

export function StrategyTable({
  sheet,
  showTitle = true,
  findingLinks,
}: {
  sheet: StrategySheet;
  showTitle?: boolean;
  findingLinks?: FindingLinkConfig;
}) {
  const priorityCols = new Set(
    sheet.headers
      .map((h, i) => (h.trim().toLowerCase() === "priority" ? i : -1))
      .filter((i) => i >= 0),
  );

  if (import.meta.env.DEV && findingLinks && !sheet.headers.includes(findingLinks.insertAfter)) {
    throw new Error(
      `StrategyTable: findingLinks.insertAfter "${findingLinks.insertAfter}" not found in headers ` +
        `[${sheet.headers.join(", ")}]. The findings column would silently land at index 0.`,
    );
  }
  const insertIndex = findingLinks ? sheet.headers.indexOf(findingLinks.insertAfter) + 1 : -1;
  const idColumnIndex = findingLinks?.idColumnIndex ?? 0;
  const findingsHeader = findingLinks?.header ?? "Driven by (Findings)";

  const cols: Col[] = [];
  sheet.headers.forEach((h, i) => {
    if (findingLinks && i === insertIndex) cols.push({ kind: "findings", label: findingsHeader });
    cols.push({ kind: "data", dataIndex: i, label: h });
  });
  if (findingLinks && insertIndex === sheet.headers.length) {
    cols.push({ kind: "findings", label: findingsHeader });
  }

  return (
    <div className="space-y-3">
      {showTitle && (
        <div>
          <h3 className="font-serif text-xl text-foreground">{sheet.title}</h3>
          {sheet.subtitle && (
            <p className="text-sm text-muted-foreground mt-1 max-w-3xl leading-relaxed">
              {sheet.subtitle}
            </p>
          )}
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-secondary/60">
              {cols.map((col, i) => (
                <th
                  key={i}
                  className="sticky top-0 z-10 bg-secondary/60 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap align-bottom"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sheet.rows.map((row, ri) => (
              <tr
                key={ri}
                className={cn(
                  "border-t border-border align-top",
                  ri % 2 === 1 && "bg-muted/30",
                )}
              >
                {cols.map((col, ci) => {
                  if (col.kind === "findings") {
                    const recId = (row[idColumnIndex] ?? "").trim();
                    const ids = findingLinks?.map[recId] ?? [];
                    return (
                      <td key={ci} className="px-4 py-3 align-top">
                        <FindingLinks ids={ids} />
                      </td>
                    );
                  }
                  const cell = row[col.dataIndex] ?? "";
                  return (
                    <td
                      key={ci}
                      className={cn(
                        "px-4 py-3 leading-relaxed align-top",
                        col.dataIndex === 0 && "font-medium text-foreground",
                        col.dataIndex !== 0 && "text-muted-foreground",
                      )}
                    >
                      {priorityCols.has(col.dataIndex) ? <PriorityChip value={cell} /> : cell || ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
