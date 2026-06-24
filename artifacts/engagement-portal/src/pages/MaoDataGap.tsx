import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard,
  LineChart as LineChartIcon,
  ShieldCheck,
  FlaskConical,
  ListChecks,
  AlertTriangle,
  CheckCircle2,
  Layers,
  GitBranch,
  Mail,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ROWS_PER_MEMBER,
  RAW_RECORD_CNT,
  PAYER_SERIES,
  MEMBERSHIP,
  TOTAL_RECORDS,
  GRAND_TOTAL,
  RISK_ASYMMETRY,
  KEY_FINDINGS,
  RECOMMENDATIONS,
  METHODOLOGY,
} from "@/data/maoGapAnalysis";

const TABS = [
  { id: "overview", label: "Executive Summary", icon: LayoutDashboard },
  { id: "behavior", label: "Submission Behavior", icon: LineChartIcon },
  { id: "validation", label: "Aetna Validation", icon: FlaskConical },
  { id: "methodology", label: "Methodology", icon: ListChecks },
  { id: "gaprisk", label: "Gap Risk & Recommendations", icon: ShieldCheck },
];

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card/95 backdrop-blur px-3 py-2 shadow-md text-xs">
      <div className="font-semibold text-foreground mb-1">{label}</div>
      <div className="space-y-1">
        {payload.map((p: any) => (
          <div key={p.dataKey} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
              {p.name}
            </span>
            <span className="font-medium text-foreground tabular-nums">
              {typeof p.value === "number" ? p.value.toLocaleString("en-US") : p.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PayerChart({
  data,
  yLabel,
}: {
  data: typeof ROWS_PER_MEMBER;
  yLabel: string;
}) {
  return (
    <div className="h-[360px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
            width={64}
            label={{
              value: yLabel,
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 11, fill: "hsl(var(--muted-foreground))", textAnchor: "middle" },
            }}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12 }} iconType="plainline" />
          {PAYER_SERIES.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color}
              strokeWidth={s.pattern === "Delta-like" ? 3.5 : 2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function MaoDataGap() {
  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-8 md:py-10 fade-in">
      <header className="mb-10">
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
          <span className="text-primary">Analysis &amp; Design</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span>MAO-004 Data Gap Analysis</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">MAO Data Gap Analysis</h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          A diagnostic read of the MAO-004 counts Mercy requested on June 17, 2026. Normalizing distinct
          diagnosis records by payer membership exposes how differently each plan submits its files — and why
          a payer&rsquo;s submission methodology must be understood <span className="italic">before</span> any
          completeness, trending, or missing-file conclusion can be trusted.
        </p>
      </header>

      <Tabs defaultValue="overview" className="w-full">
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

        {/* OVERVIEW */}
        <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">The Analyst&rsquo;s Read</CardTitle>
              <CardDescription>Why the same MAO-004 dataset tells four different stories</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Mercy asked for distinct MAO-004 record counts at the grain of member &times; diagnosis, grouped
                by source file and date-of-service month. Counting the raw rows alone is misleading: payers
                differ enormously in size, and — as this analysis uncovered — in <span className="font-medium text-foreground">how
                they pack history into each monthly file</span>. Once the counts are normalized by membership,
                the submission method becomes visible, and with it the real question of data completeness.
              </p>
              <ul className="space-y-3">
                {KEY_FINDINGS.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Distinct MAO-004 records", value: fmt(GRAND_TOTAL), sub: "across 4 reporting payers" },
              { label: "DOS window", value: "Jan 2025 – Apr 2026", sub: "16 date-of-service months" },
              { label: "Cumulative payers", value: "3 of 4", sub: "Aetna confirmed; UHC & BCBSOK match" },
              { label: "Delta-like payers", value: "Humana", sub: "flat ~10–12 rows / member" },
            ].map((fact) => (
              <div key={fact.label} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="text-2xl font-serif text-foreground">{fact.value}</div>
                <div className="text-sm font-medium text-foreground/80 mt-1">{fact.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{fact.sub}</div>
              </div>
            ))}
          </div>

          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="font-serif text-xl flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                The bottom line
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Understanding how each health plan structures and submits its MAO data is critical to
                interpreting completeness and identifying potential data gaps. For a cumulative payer like
                Aetna, a missing file or two is largely recoverable — later files still carry the history. We
                cannot assume the same for Humana: if its files are deltas, a missing submission could mean a
                permanent loss of that period&rsquo;s diagnosis-tracking inventory.
              </p>
              <p className="text-foreground font-medium">
                Each payer&rsquo;s file-accumulation and resubmission methodology must be confirmed before we
                assess completeness, trend diagnosis volume, or judge the impact of a missing file.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BEHAVIOR */}
        <TabsContent value="behavior" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">MAO-004 Rows per Member by Date of Service</CardTitle>
              <CardDescription>
                Distinct (member &times; diagnosis) records &divide; approximate membership. One flat line, three sloped lines.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PayerChart data={ROWS_PER_MEMBER} yLabel="Rows per member" />
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-medium mb-1">
                    <GitBranch className="w-4 h-4" />
                    Flat = delta-like (Humana)
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Humana holds steady at roughly 10–12 rows per member in every DOS month. Each file appears
                    to carry mostly its own period, with little historical carry-forward.
                  </p>
                </div>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                  <div className="flex items-center gap-2 text-amber-700 font-medium mb-1">
                    <Layers className="w-4 h-4" />
                    Sloped = cumulative (Aetna, UHC, BCBSOK)
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    These payers peak on the oldest DOS and decline toward the present — the fingerprint of
                    files that re-carry prior-period records, so older months accumulate across many files.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="font-serif text-xl">The same data, un-normalized</CardTitle>
              <CardDescription>
                Raw distinct record counts. Aetna and UHC dwarf the others purely on membership size — which is
                exactly why normalization is required before comparison.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PayerChart data={RAW_RECORD_CNT} yLabel="Distinct records" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* VALIDATION */}
        <TabsContent value="validation" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Proving the carry-forward: a single-file test</CardTitle>
              <CardDescription>How we confirmed Aetna files are cumulative rather than per-period</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <ol className="space-y-4">
                {[
                  {
                    h: "Hypothesis",
                    b: "The steeply declining per-member slope for Aetna suggested each monthly file was re-carrying older DOS records, inflating the oldest months when all files are summed.",
                  },
                  {
                    h: "Test",
                    b: "Filter the Aetna data down to a single file — MHS_MA_MAO4_202601_20260204.txt, the latest available at that point — and check which dates of service it contains.",
                  },
                  {
                    h: "Result",
                    b: "Even within that one file, January-2025 DOS records were still present — eleven months of history carried forward inside a single January-2026 submission.",
                  },
                  {
                    h: "Conclusion",
                    b: "Aetna monthly MAO-004 files are cumulative. The original row-per-member analysis overstated older DOS months because the same records were counted across multiple overlapping files.",
                  },
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-semibold text-sm flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <div className="font-medium text-foreground">{step.h}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{step.b}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  With double-counting removed, the member-diagnosis trend made sense — the only remaining
                  recent-period dip is normal <span className="font-medium text-foreground">claim lag</span>, not
                  a data gap.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* METHODOLOGY */}
        <TabsContent value="methodology" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">How the counts were built</CardTitle>
              <CardDescription>Grain, identifiers, and normalization as agreed with Mercy Data Governance</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="divide-y divide-border">
                {METHODOLOGY.map((m) => (
                  <div key={m.label} className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-1 sm:gap-6 py-3">
                    <dt className="text-sm font-medium text-foreground">{m.label}</dt>
                    <dd className="text-sm text-muted-foreground leading-relaxed">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm bg-card">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Membership denominators</CardTitle>
                <CardDescription>Approximate membership used to normalize record counts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-muted-foreground">
                        <th className="py-2 pr-4 font-medium">Payer</th>
                        <th className="py-2 px-4 font-medium text-right">Dec 2025</th>
                        <th className="py-2 pl-4 font-medium text-right">Current</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MEMBERSHIP.map((r, i) => (
                        <tr key={r.payer} className={i % 2 ? "bg-muted/30" : ""}>
                          <td className="py-2 pr-4 text-foreground">{r.payer}</td>
                          <td className="py-2 px-4 text-right tabular-nums text-muted-foreground">
                            {r.dec2025 === null ? "—" : fmt(r.dec2025)}
                          </td>
                          <td className="py-2 pl-4 text-right tabular-nums text-muted-foreground">{fmt(r.current)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-card">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Total distinct records by payer</CardTitle>
                <CardDescription>Across the full Jan 2025 – Apr 2026 window (pre de-duplication)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-muted-foreground">
                        <th className="py-2 pr-4 font-medium">Payer</th>
                        <th className="py-2 pl-4 font-medium text-right">Distinct records</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TOTAL_RECORDS.map((r, i) => (
                        <tr key={r.payer} className={i % 2 ? "bg-muted/30" : ""}>
                          <td className="py-2 pr-4 text-foreground">{r.payer}</td>
                          <td className="py-2 pl-4 text-right tabular-nums text-muted-foreground">{fmt(r.total)}</td>
                        </tr>
                      ))}
                      <tr className="border-t border-border font-medium">
                        <td className="py-2 pr-4 text-foreground">Grand total</td>
                        <td className="py-2 pl-4 text-right tabular-nums text-foreground">{fmt(GRAND_TOTAL)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  Cumulative payers are inflated here by carry-forward; treat these as upper bounds until
                  de-duplicated to a latest-file view.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* GAP RISK */}
        <TabsContent value="gaprisk" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                The gap risk is asymmetric
              </CardTitle>
              <CardDescription>A missing file does not mean the same thing for every payer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {RISK_ASYMMETRY.map((r) => (
                <div
                  key={r.pattern}
                  className={
                    "rounded-xl border p-5 " +
                    (r.recoverable === "Low"
                      ? "border-destructive/30 bg-destructive/5"
                      : "border-emerald-500/30 bg-emerald-500/5")
                  }
                >
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-serif text-lg text-foreground">{r.pattern}</span>
                    <span
                      className={
                        "text-xs font-medium px-2 py-0.5 rounded-full border " +
                        (r.recoverable === "Low"
                          ? "bg-destructive/10 text-destructive border-destructive/20"
                          : "bg-emerald-500/10 text-emerald-700 border-emerald-500/20")
                      }
                    >
                      {r.recoverable === "Low" ? "Recoverability: Low" : "Recoverability: High"}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 mb-2">{r.payers}</p>
                  <dl className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-0.5">Signature in the data</dt>
                      <dd className="text-muted-foreground leading-relaxed">{r.signature}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-0.5">If a file is missing</dt>
                      <dd className="text-muted-foreground leading-relaxed">{r.missingFileImpact}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Recommendations</CardTitle>
              <CardDescription>What to do before trusting any completeness or trend conclusion</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {RECOMMENDATIONS.map((rec, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-semibold text-sm flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <div className="font-medium text-foreground">{rec.title}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{rec.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
