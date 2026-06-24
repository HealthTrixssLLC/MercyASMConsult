import { cn } from "@/lib/utils";
import type { StrategySheet } from "@/data/submissionStrategy";

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

export function StrategyTable({
  sheet,
  showTitle = true,
}: {
  sheet: StrategySheet;
  showTitle?: boolean;
}) {
  const priorityCols = new Set(
    sheet.headers
      .map((h, i) => (h.trim().toLowerCase() === "priority" ? i : -1))
      .filter((i) => i >= 0),
  );

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
              {sheet.headers.map((h, i) => (
                <th
                  key={i}
                  className="sticky top-0 z-10 bg-secondary/60 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap align-bottom"
                >
                  {h}
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
                {sheet.headers.map((_, ci) => {
                  const cell = row[ci] ?? "";
                  return (
                    <td
                      key={ci}
                      className={cn(
                        "px-4 py-3 leading-relaxed align-top",
                        ci === 0 && "font-medium text-foreground",
                        ci !== 0 && "text-muted-foreground",
                      )}
                    >
                      {priorityCols.has(ci) ? <PriorityChip value={cell} /> : cell || ""}
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
