import type { MaoSheet } from "@/data/maoGuidance";
import { cn } from "@/lib/utils";

function isNumericish(v: string) {
  return /^[$]?-?[\d,]+(\.\d+)?%?$/.test(v.trim());
}

function isHeaderRow(cells: string[]) {
  const nonEmpty = cells.filter((c) => c.trim() !== "");
  if (nonEmpty.length < 3) return false;
  // Header label rows contain short labels without sentence punctuation,
  // and are predominantly non-numeric.
  if (nonEmpty.some((c) => /\.\s/.test(c) || c.length > 70)) return false;
  const numeric = nonEmpty.filter((c) => isNumericish(c)).length;
  return numeric <= nonEmpty.length / 2;
}

export function SheetTable({ sheet }: { sheet: MaoSheet }) {
  const cols = sheet.grid.reduce((m, r) => Math.max(m, r.length), 0);

  // Build covered-cell set and anchor span map from merges.
  const covered = new Set<string>();
  const span = new Map<string, { rs: number; cs: number }>();
  for (const m of sheet.merges) {
    span.set(`${m.r},${m.c}`, { rs: m.rs, cs: m.cs });
    for (let r = m.r; r < m.r + m.rs; r++) {
      for (let c = m.c; c < m.c + m.cs; c++) {
        if (r === m.r && c === m.c) continue;
        covered.add(`${r},${c}`);
      }
    }
  }

  const fullWidth = (r: number, c: number) => {
    const s = span.get(`${r},${c}`);
    return s ? s.cs >= cols : false;
  };

  return (
    <div className="overflow-x-auto no-scrollbar rounded-lg border border-border bg-card">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {sheet.grid.map((row, r) => {
            const headerRow = isHeaderRow(row);
            return (
              <tr key={r} className="align-top">
                {Array.from({ length: cols }).map((_, c) => {
                  if (covered.has(`${r},${c}`)) return null;
                  const value = row[c] ?? "";
                  const s = span.get(`${r},${c}`);
                  const banner = !!s && fullWidth(r, c) && value.trim() !== "";
                  const isTitle = banner && r === 0;
                  const isColHeader = !banner && headerRow;
                  const className = cn(
                    "border border-border/60 px-3 py-2 leading-relaxed align-top text-left",
                    isTitle &&
                      "bg-primary text-primary-foreground font-serif text-base md:text-lg font-medium",
                    banner &&
                      !isTitle &&
                      "bg-primary/5 text-foreground font-serif font-medium",
                    isColHeader && "bg-muted/70 text-foreground font-semibold whitespace-nowrap",
                    !banner &&
                      !headerRow &&
                      "text-muted-foreground min-w-[8rem] whitespace-pre-line"
                  );

                  if (isColHeader) {
                    return (
                      <th key={c} scope="col" rowSpan={s?.rs} colSpan={s?.cs} className={className}>
                        {value}
                      </th>
                    );
                  }

                  return (
                    <td key={c} rowSpan={s?.rs} colSpan={s?.cs} className={className}>
                      {value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
