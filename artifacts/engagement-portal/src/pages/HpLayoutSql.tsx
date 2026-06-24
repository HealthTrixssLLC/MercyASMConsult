import { Fragment, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Database,
  FileSpreadsheet,
  FileText,
  Download,
  Copy,
  Check,
  Minus,
  Triangle,
  HelpCircle,
  ChevronDown,
  Building2,
  Layers,
  FolderOpen,
  GitCompare,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  HP_COLUMNS,
  CROSSWALK_TITLE,
  CONCEPT_MATRIX,
  FIELD_MAPPING,
  LEGEND,
  REVISION_PRINCIPLE,
  SOURCE_NOTE,
  type ConceptStatus,
  type MatrixRow,
} from "@/data/conceptMatrix";

const SYMBOL_STATUS: Record<string, ConceptStatus> = {
  "☑": "present",
  "△": "situational",
  "☒": "absent",
  "?": "confirm",
};

const BASE = import.meta.env.BASE_URL;
const LAYOUT_DIR = `${BASE}files/hp/layout/`;
const SQL_DIR = `${BASE}files/hp/sql/`;

/* ----------------------------------------------------------------------------
 * Artifacts tab — source SQL + layout files per health plan
 * ------------------------------------------------------------------------- */

type LayoutKind = "xlsx" | "csv" | "docx";
type LayoutFile = { label: string; file: string; kind: LayoutKind };
type SqlFile = { label: string; file: string };
type HealthPlan = {
  id: string;
  name: string;
  icon: LucideIcon;
  note?: string;
  layouts: LayoutFile[];
  sql: SqlFile[];
};

const HEALTH_PLANS: HealthPlan[] = [
  {
    id: "uhc",
    name: "UnitedHealthcare (UHC)",
    icon: Building2,
    layouts: [
      { label: "UHC Template", file: "uhc-template.xlsx", kind: "xlsx" },
      { label: "UHC Template (CSV)", file: "uhc-template.csv", kind: "csv" },
    ],
    sql: [
      { label: "Institutional", file: "uhc-institutional.sql" },
      { label: "Ambulatory", file: "uhc-ambulatory.sql" },
    ],
  },
  {
    id: "humana",
    name: "Humana",
    icon: Building2,
    layouts: [
      { label: "ASM Template (New 2026)", file: "humana-asm-template-2026.xlsx", kind: "xlsx" },
    ],
    sql: [{ label: "Inpatient — OKC", file: "humana-inpatient-okc.sql" }],
  },
  {
    id: "aetna",
    name: "Aetna",
    icon: Building2,
    layouts: [
      {
        label: "Verscend Import Supplemental Data Spec",
        file: "aetna-verscend-import-spec.xlsx",
        kind: "xlsx",
      },
    ],
    sql: [
      { label: "Institutional", file: "aetna-institutional.sql" },
      { label: "Ambulatory", file: "aetna-ambulatory.sql" },
    ],
  },
  {
    id: "anthem",
    name: "Anthem",
    icon: Building2,
    note: "MARA SDF job aids provided per Mercy entity.",
    layouts: [
      { label: "MARA SDF Job Aid — Mercy MO", file: "anthem-job-aid-mrcymo.docx", kind: "docx" },
      { label: "MARA SDF Job Aid — MHSC", file: "anthem-job-aid-mhsc.docx", kind: "docx" },
    ],
    sql: [
      { label: "Institutional", file: "anthem-institutional.sql" },
      { label: "Ambulatory", file: "anthem-ambulatory.sql" },
    ],
  },
  {
    id: "global-health",
    name: "Global Health",
    icon: Building2,
    layouts: [
      {
        label: "File Layout Requirements for IPA",
        file: "global-health-file-layout.xlsx",
        kind: "xlsx",
      },
    ],
    sql: [
      { label: "Institutional", file: "global-health-institutional.sql" },
      { label: "Ambulatory", file: "global-health-ambulatory.sql" },
    ],
  },
  {
    id: "essence",
    name: "Essence",
    icon: Building2,
    layouts: [
      {
        label: "Additional Dx Spec v4 (ICD-10)",
        file: "essence-addtl-dx-spec.xlsx",
        kind: "xlsx",
      },
    ],
    sql: [{ label: "Ambulatory", file: "essence-ambulatory.sql" }],
  },
  {
    id: "bcbsok",
    name: "Blue Cross Blue Shield of Oklahoma (BCBSOK)",
    icon: Building2,
    layouts: [],
    sql: [
      { label: "Institutional", file: "bcbsok-institutional.sql" },
      { label: "Ambulatory", file: "bcbsok-ambulatory.sql" },
    ],
  },
  {
    id: "cms-edps",
    name: "CMS / EDPS (Shared)",
    icon: Layers,
    note: "Cross-plan CMS encounter specification.",
    layouts: [
      {
        label: "EDPS Institutional Spec v05 (Unlinked Chart Review)",
        file: "edps-institutional-spec.xlsx",
        kind: "xlsx",
      },
    ],
    sql: [],
  },
];

const KIND_META: Record<LayoutKind, { icon: LucideIcon; tag: string }> = {
  xlsx: { icon: FileSpreadsheet, tag: "XLSX" },
  csv: { icon: FileSpreadsheet, tag: "CSV" },
  docx: { icon: FileText, tag: "DOCX" },
};

const sqlCache = new Map<string, string>();
async function loadSql(url: string): Promise<string | null> {
  const cached = sqlCache.get(url);
  if (cached !== undefined) return cached;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(String(res.status));
    const text = await res.text();
    sqlCache.set(url, text);
    return text;
  } catch {
    return null;
  }
}

function LayoutChip({ layout }: { layout: LayoutFile }) {
  const meta = KIND_META[layout.kind];
  const Icon = meta.icon;
  return (
    <a
      href={`${LAYOUT_DIR}${layout.file}`}
      download
      className="group flex items-center gap-2.5 rounded-md border border-border bg-background/40 px-3 py-2 transition-colors hover:border-primary/40 hover:bg-primary/5"
    >
      <Icon className="w-4 h-4 text-primary shrink-0" />
      <span className="flex-1 min-w-0 text-sm font-medium text-foreground truncate">{layout.label}</span>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground shrink-0">{meta.tag}</span>
      <Download className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary shrink-0" />
    </a>
  );
}

function SqlRowItem({
  sql,
  open,
  onToggle,
}: {
  sql: SqlFile;
  open: boolean;
  onToggle: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const url = `${SQL_DIR}${sql.file}`;

  async function copy(e: React.MouseEvent) {
    e.stopPropagation();
    const text = await loadSql(url);
    if (text === null) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className={cn(
        "flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer transition-colors",
        open
          ? "border-primary/50 bg-primary/5"
          : "border-border bg-background/40 hover:border-primary/40 hover:bg-primary/5"
      )}
    >
      <Database className="w-4 h-4 text-primary shrink-0" />
      <span className="flex-1 text-sm font-medium text-foreground">{sql.label}</span>
      <button
        onClick={copy}
        onKeyDown={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1 rounded px-1.5 py-1 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
      </button>
      <a
        href={url}
        download
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1 rounded px-1.5 py-1 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
      >
        <Download className="w-3.5 h-3.5" />
      </a>
      <ChevronDown className={cn("w-4 h-4 text-muted-foreground/60 transition-transform shrink-0", open && "rotate-180")} />
    </div>
  );
}

function SqlCode({ file }: { file: string }) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setContent(null);
    setError(false);
    loadSql(`${SQL_DIR}${file}`).then((text) => {
      if (!active) return;
      if (text === null) setError(true);
      else setContent(text);
    });
    return () => {
      active = false;
    };
  }, [file]);

  if (error) {
    return (
      <div className="px-5 py-5 text-sm text-destructive">
        Unable to load this file. Use the download link in the row above.
      </div>
    );
  }
  if (content === null) {
    return <div className="px-5 py-5 text-sm text-slate-400">Loading…</div>;
  }
  return (
    <pre className="max-h-[30rem] overflow-auto px-5 py-4 text-[12.5px] leading-relaxed text-slate-200 font-mono whitespace-pre">
      {content}
    </pre>
  );
}

function PlanRow({ plan }: { plan: HealthPlan }) {
  const [openFile, setOpenFile] = useState<string | null>(null);

  return (
    <>
      <tr className="border-t border-border align-top">
        <td className="py-4 pr-4 align-top">
          <div className="flex items-start gap-2">
            <plan.icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-foreground leading-snug">{plan.name}</div>
              {plan.note && <p className="text-xs text-muted-foreground mt-1">{plan.note}</p>}
            </div>
          </div>
        </td>
        <td className="py-4 px-4 align-top">
          {plan.sql.length === 0 ? (
            <span className="text-sm text-muted-foreground/50">—</span>
          ) : (
            <div className="space-y-2">
              {plan.sql.map((s) => (
                <SqlRowItem
                  key={s.file}
                  sql={s}
                  open={openFile === s.file}
                  onToggle={() => setOpenFile(openFile === s.file ? null : s.file)}
                />
              ))}
            </div>
          )}
        </td>
        <td className="py-4 pl-4 align-top">
          {plan.layouts.length === 0 ? (
            <span className="text-sm text-muted-foreground/50">—</span>
          ) : (
            <div className="space-y-2">
              {plan.layouts.map((l) => (
                <LayoutChip key={l.file} layout={l} />
              ))}
            </div>
          )}
        </td>
      </tr>
      {openFile && (
        <tr>
          <td colSpan={3} className="p-0">
            <div className="rounded-lg border border-border bg-[#0f1117] mb-2 overflow-hidden">
              <SqlCode file={openFile} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function ArtifactsTab() {
  return (
    <Card className="border-none shadow-sm bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <th className="py-3 pl-6 pr-4 w-[24%]">Health Plan</th>
              <th className="py-3 px-4 w-[40%]">Submission SQL</th>
              <th className="py-3 pl-4 pr-6 w-[36%]">File Layout / Spec</th>
            </tr>
          </thead>
          <tbody className="[&>tr>td:first-child]:pl-6 [&>tr>td:last-child]:pr-6">
            {HEALTH_PLANS.map((plan) => (
              <PlanRow key={plan.id} plan={plan} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* ----------------------------------------------------------------------------
 * Artifacts Analysis tab — concept matrix workbook
 * ------------------------------------------------------------------------- */

function groupByCategory<T extends { category: string }>(rows: T[]) {
  const groups: { category: string; rows: T[] }[] = [];
  for (const row of rows) {
    let g = groups.find((x) => x.category === row.category);
    if (!g) {
      g = { category: row.category, rows: [] };
      groups.push(g);
    }
    g.rows.push(row);
  }
  return groups;
}

const STATUS_META: Record<
  ConceptStatus,
  { Icon: LucideIcon; className: string; label: string }
> = {
  present: { Icon: Check, className: "text-primary", label: "Required / present" },
  situational: { Icon: Triangle, className: "text-amber-500", label: "Situational / optional" },
  confirm: { Icon: HelpCircle, className: "text-amber-500", label: "Needs confirmation" },
  absent: { Icon: Minus, className: "text-muted-foreground/30", label: "Not present" },
};

function StatusCell({ status }: { status: ConceptStatus }) {
  const meta = STATUS_META[status];
  return (
    <span className="inline-flex items-center justify-center" title={meta.label}>
      <meta.Icon className={cn("w-4 h-4", meta.className)} />
    </span>
  );
}

function CoverageMatrix() {
  const groups = groupByCategory<MatrixRow>(CONCEPT_MATRIX);
  return (
    <Card className="border-none shadow-sm bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm min-w-[1180px]">
          <thead className="sticky top-0 z-10 bg-card">
            <tr className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <th className="py-3 pl-6 pr-4 w-[22%] bg-card">Concept</th>
              {HP_COLUMNS.map((c) => (
                <th key={c} className="py-3 px-2 text-center align-bottom font-semibold w-[7%]">
                  {c}
                </th>
              ))}
              <th className="py-3 pl-4 pr-6 w-[27%] align-bottom font-semibold">Reviewer Notes</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <Fragment key={group.category}>
                <tr className="bg-background/60">
                  <td
                    colSpan={HP_COLUMNS.length + 2}
                    className="py-2 pl-6 pr-4 text-xs font-semibold uppercase tracking-widest text-primary"
                  >
                    {group.category}
                  </td>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.concept} className="border-t border-border align-top hover:bg-background/40">
                    <td className="py-2.5 pl-6 pr-4">
                      <div className="font-medium text-foreground leading-snug">{row.concept}</div>
                      {row.definition && (
                        <div className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                          {row.definition}
                        </div>
                      )}
                    </td>
                    {row.status.map((s, i) => (
                      <td key={i} className="py-2.5 px-2 text-center">
                        <StatusCell status={s} />
                      </td>
                    ))}
                    <td className="py-2.5 pl-4 pr-6 text-[12px] text-muted-foreground leading-relaxed">
                      {row.notes || <span className="text-muted-foreground/30">—</span>}
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function DestinationFieldMapping() {
  return (
    <Card className="border-none shadow-sm bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm min-w-[1100px]">
          <thead className="sticky top-0 z-10 bg-card">
            <tr className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <th className="py-3 pl-6 pr-4 w-[16%] bg-card">Concept</th>
              {HP_COLUMNS.map((c) => (
                <th key={c} className="py-3 px-3 font-semibold align-bottom">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FIELD_MAPPING.map((row) => (
              <tr key={row.concept} className="border-t border-border align-top hover:bg-background/40">
                <td className="py-2.5 pl-6 pr-4 font-medium text-foreground">{row.concept}</td>
                {row.fields.map((f, i) => (
                  <td key={i} className="py-2.5 px-3 text-muted-foreground">
                    {f ? (
                      <span className="font-mono text-[12px] leading-relaxed">{f}</span>
                    ) : (
                      <span className="text-muted-foreground/30">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function NotesAndLegend() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="border-none shadow-sm bg-card p-6">
        <h3 className="font-serif text-xl text-foreground mb-4 flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-primary" /> Legend
        </h3>
        <div className="space-y-3">
          {LEGEND.map((item) => {
            const status = SYMBOL_STATUS[item.symbol];
            const meta = status ? STATUS_META[status] : null;
            return (
              <div key={item.symbol} className="flex gap-3 rounded-lg border border-border bg-background/40 p-3">
                <div className="shrink-0 w-7 flex justify-center pt-0.5">
                  {meta ? (
                    <meta.Icon className={cn("w-5 h-5", meta.className)} />
                  ) : (
                    <span className="text-lg leading-none">{item.symbol}</span>
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{item.meaning}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.use}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      <Card className="border-none shadow-sm bg-card p-6">
        <h3 className="font-serif text-xl text-foreground mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" /> Notes
        </h3>
        <dl className="space-y-5">
          <div>
            <dt className="text-sm font-semibold text-foreground">Revision principle</dt>
            <dd className="text-sm text-muted-foreground mt-1 leading-relaxed">{REVISION_PRINCIPLE}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-foreground">Source note</dt>
            <dd className="text-sm text-muted-foreground mt-1 leading-relaxed">{SOURCE_NOTE}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}

const ANALYSIS_TABS = [
  { id: "matrix", label: "Coverage Matrix", icon: GitCompare },
  { id: "sources", label: "Destination Field Mapping", icon: Database },
  { id: "notes", label: "Notes & Legend", icon: FileText },
] as const;

function LegendStrip() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {LEGEND.map((item) => {
        const status = SYMBOL_STATUS[item.symbol];
        const meta = status ? STATUS_META[status] : null;
        return (
          <div key={item.symbol} className="flex items-center gap-2 text-xs text-muted-foreground">
            {meta ? (
              <meta.Icon className={cn("w-4 h-4", meta.className)} />
            ) : (
              <span className="text-sm">{item.symbol}</span>
            )}
            <span>{item.meaning}</span>
          </div>
        );
      })}
    </div>
  );
}

function AnalysisTab() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="font-serif text-2xl text-foreground">{CROSSWALK_TITLE}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl">
          Cross-plan concept crosswalk: each normalized concept mapped against the destination layout of every
          health plan, with the field name it lands on per plan and reviewer notes.
        </p>
      </div>
      <LegendStrip />
      <Tabs defaultValue="matrix" className="w-full">
        <div className="border-b border-border mb-6 overflow-x-auto no-scrollbar">
          <TabsList className="h-auto p-0 bg-transparent flex justify-start gap-6">
            {ANALYSIS_TABS.map((t) => (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className="pb-3 pt-2 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary text-muted-foreground hover:text-foreground transition-colors flex gap-2 items-center text-sm font-medium whitespace-nowrap"
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value="matrix" className="animate-in fade-in duration-300">
          <CoverageMatrix />
        </TabsContent>
        <TabsContent value="sources" className="animate-in fade-in duration-300">
          <DestinationFieldMapping />
        </TabsContent>
        <TabsContent value="notes" className="animate-in fade-in duration-300">
          <NotesAndLegend />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ------------------------------------------------------------------------- */

const TABS = [
  { id: "artifacts", label: "Artifacts", icon: FolderOpen },
  { id: "analysis", label: "Artifacts Analysis", icon: GitCompare },
] as const;

export default function HpLayoutSql() {
  return (
    <div className="w-full px-6 md:px-10 py-8 md:py-10 fade-in">
      <header className="mb-10">
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
          <span className="text-primary">Reference · Health Plan Specs</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span>Current State</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">ASM Analysis Current</h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Current-state inventory of each health plan's submission SQL and file layout / spec, alongside a
          cross-plan concept analysis comparing how each payer layout maps to a recommended Mercy-format
          canonical model.
        </p>
      </header>

      <Tabs defaultValue="artifacts" className="w-full">
        <div className="border-b border-border mb-8 overflow-x-auto no-scrollbar">
          <TabsList className="h-auto p-0 bg-transparent flex justify-start gap-6">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="pb-4 pt-2 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary text-muted-foreground hover:text-foreground transition-colors flex gap-2 items-center text-sm md:text-base font-medium whitespace-nowrap"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="artifacts" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ArtifactsTab />
        </TabsContent>
        <TabsContent value="analysis" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <AnalysisTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
