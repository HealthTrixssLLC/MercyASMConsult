import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LayoutGrid,
  Network,
  Workflow,
  Users,
  ListChecks,
  Code2,
  Copy,
  Hash,
  Shuffle,
  HelpCircle,
  Route as RouteIcon,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  PieChart,
  Stethoscope,
  UserCog,
  MapPin,
  Timer,
  ClipboardX,
  ClipboardCheck,
  Gauge,
  type LucideIcon,
} from "lucide-react";
import { CurrentStateFlow, FutureStateFlow } from "@/components/diagrams/ArchitectureFlow";

const QUICK_FACTS = [
  { label: "Session", value: "Current & Future State Analysis" },
  { label: "Presented by", value: "Samir Rawat" },
  { label: "Validated with", value: "Sandra Weiler · Jennifer Oldfather" },
  { label: "Outcome", value: "Validated working baseline" },
];

const CURRENT_CHALLENGES: { title: string; detail: string; icon: LucideIcon }[] = [
  {
    title: "Code-Centric Implementation",
    detail: "Business rules and logic are embedded directly in SQL code for each payer.",
    icon: Code2,
  },
  {
    title: "Duplicated Logic",
    detail: "Similar logic is re-built for each payer — high effort and rework.",
    icon: Copy,
  },
  {
    title: "Hard-coded Values",
    detail: "CPT lists, mappings, plan IDs, filters, and defaults are hard-coded in SQL, not configurable.",
    icon: Hash,
  },
  {
    title: "Inconsistent Logic",
    detail: "Business rules and filters vary across payers, with no standardization.",
    icon: Shuffle,
  },
  {
    title: "Ad-hoc Reconciliation",
    detail: "MAO / response files are reviewed manually and inconsistently, with no systematic matching.",
    icon: HelpCircle,
  },
  {
    title: "Limited Traceability",
    detail: "No end-to-end lineage from source through to the health-plan response.",
    icon: RouteIcon,
  },
  {
    title: "High Maintenance",
    detail: "Every change requires SQL updates across multiple extracts.",
    icon: Wrench,
  },
  {
    title: "Higher Risk",
    detail: "Greater operational risk, errors, and audit exposure.",
    icon: AlertTriangle,
  },
];

const CURRENT_NUANCES = [
  "Development and production cycles are merged — changes are made directly on code and run, with no separate QA / production release. This is the informatics world, not the IT software-development world: it is fast, but it carries its own downside.",
  "There is no visibility into which SQL is actually being run for a specific sweep — Jennifer cannot tell which version of the logic executes for an upcoming sweep.",
  "To reconcile against MAO files, generated sweep files have to be re-ingested back into the environment; that re-ingestion is still manual, ad-hoc, and a work in progress.",
];

const ANALYTICS: { title: string; icon: LucideIcon }[] = [
  { title: "Submission Volumes & Trends", icon: BarChart3 },
  { title: "Acceptance Rates by HP", icon: PieChart },
  { title: "Diagnosis / HCC Analytics", icon: Stethoscope },
  { title: "Provider Performance", icon: UserCog },
  { title: "Facility / Location Analytics", icon: MapPin },
  { title: "Turnaround Time Analytics", icon: Timer },
  { title: "Rejection Analysis & Drilldown", icon: ClipboardX },
  { title: "Audit & Compliance Reporting", icon: ClipboardCheck },
  { title: "Executive Dashboards", icon: Gauge },
];

const KEY_BENEFITS = [
  "Standardized logic & consistent data",
  "Configurable & easy to maintain",
  "End-to-end traceability & auditability",
  "Automated QA & higher data quality",
  "Systematic reconciliation & a true source of truth",
  "Actionable analytics & insights",
];

const SANDRA_POINTS = [
  "Confirmed the current-state summary — “Yeah, that's right” — affirming the code-centric, payer-specific, hard-coded SQL process with limited traceability, manual reconciliation, and a high-maintenance operating model.",
  "Added a missing detail: Jennifer currently has to re-ingest generated sweep files back into the environment to compare them against MAO files, and that re-ingestion is not automated — reinforcing the need for a systematic reconciliation model.",
  "Validated the future-state model as aligned with what Mercy had been envisioning — an end-to-end centralized approach to generation, submission, and validation — and called Samir's depiction clearer than the version they had been using internally.",
  "Asked that the architecture explicitly account for both health-plan responses and CMS responses through the payer (step 8 → 9), and that the assessment call out that Mercy is not consistently receiving payer response files.",
  "Quantified the dependency: Mercy receives MAO-004 from four of seven payers and MAO-002 from only one — response-file completeness is critical to end-to-end validation.",
  "Agreed with building reconciliation incrementally (MAO-004 first, then MAO-002 and payer-specific response files) and liked that the engine can stay flexible and scalable by adding new response sources over time.",
  "Raised a future-state enhancement: integrating payer technical specifications between layout conversion and QA validation to confirm alignment with current specs — acknowledged as more of a “run” step than an immediate “walk” step.",
  "Asked that Jennifer's prototype be reviewed before presenting the broader future-state architecture to Linda.",
];

const JENNIFER_POINTS = [
  "Confirmed the current-state reconciliation problem is real: she re-ingests payer-specific sweep files into a raw/ad-hoc schema, strips out payer-specific fields, maps similar fields into a common structure, and uses that curated interim table to compare against MAO data.",
  "Validated that the future state should avoid this re-ingestion cycle — pulling source logic into non-payer-specific tables, creating curated tables with the information needed to build sweep files, then staged data that can be separated by payer for export, with no manual manipulation.",
  "Confirmed the engine, run control, standardized Mercy-format staged export table, QA validation, and reverse reconciliation loop matched what the team had discussed — staging the data and then checking response files to see what was received “does make sense.”",
  "Validated the curated-vs-staged distinction: the curated table is a denormalized view of source data; the staged table is the result after the engine applies health-plan-specific logic, but before payer layout conversion.",
  "Described her current Databricks prototype as valuable but interim — sweep KPIs and data-quality checks (patient counts, new vs. prior members, diagnosis record counts, attribution, HCC presence, CMS rejection status, bill-type and place-of-service checks, MAO/MOR/MMR concepts) — still dependent on manually receiving files.",
  "Flagged an access issue: operations users do not have Databricks access, so the long-term reporting layer likely needs to move to Power BI, a web application, or another accessible layer.",
  "Accepted that future reconciliation should eventually look back to Clarity to determine whether eligible source records were missed entirely — not only compare sweep files to MAO files (today Linda's process is the source of truth).",
  "Endorsed the engagement direction — viewing the team as subject-matter experts whose analysis aligns with prior Mercy discussions and is helping “shore up” Mercy's approach.",
];

const CONSOLIDATED_THEMES = [
  "Current state is accurately characterized as payer-specific, code-centric, hard-coded, and difficult to reconcile.",
  "Manual re-ingestion of outbound files is a major current-state workaround.",
  "The future state should create a Mercy-format staged source of truth before payer layout conversion.",
  "Run control and run-level auditability are needed to separate executions, reruns, and latest-run logic.",
  "QA should validate staged Mercy-format data against export-ready payer views before submission.",
  "Reverse reconciliation should update staged data with MAO-004, MAO-002, and payer-response status over time.",
  "Jennifer's Databricks prototype is a useful interim learning / KPI layer, but not the final scalable solution.",
  "Future reporting must be accessible to operations — likely Power BI, a web app, or another user-facing layer.",
  "Payer response-file completeness remains a major dependency and should be called out in the assessment.",
];

const RECOMMENDATIONS: { title: string; detail: string }[] = [
  {
    title: "Centralize logic in a parameterized engine",
    detail:
      "Replace per-payer hard-coded SQL with one generalized ASM engine driven by configuration (Health Plan ID, sweep type, DOS range, run type, filters, and effective-dated rules / value sets), separating the developer who builds it from the executor who runs it.",
  },
  {
    title: "Stage a Mercy-format source of truth before layout conversion",
    detail:
      "Produce standardized, submission-grain staged data (Member · DOS · NPI · Diagnoses) once, then apply payer-specific layouts last — eliminating the manual re-ingestion cycle entirely.",
  },
  {
    title: "Add run control & run-level auditability",
    detail:
      "Capture Run ID, executed-by, parameters, record counts, previous-run reference, and a latest-run flag so reruns and historical runs are cleanly separated and traceable.",
  },
  {
    title: "Make QA a systematic gate",
    detail:
      "Reconcile member / DOS / DX / NPI / record counts, required fields, and duplicates between the staged source and the export-ready payer view before submission — PASS / FAIL with investigate-and-fix on failure.",
  },
  {
    title: "Build reconciliation crawl-walk-run",
    detail:
      "Leverage MAO-004 already received first, then expand to MAO-002 and payer response files. A repurposable status flag marks each staged record (found in MAO-004, MAO-002, etc.) so new sources can be added without reworking the pipeline.",
  },
  {
    title: "Move reporting to an accessible layer",
    detail:
      "Because operations cannot access Databricks, surface analytics through Power BI or a purpose-built web app that can also orchestrate runs and capture the operational “bless” / approval before submission.",
  },
  {
    title: "Call out response-file completeness as a dependency",
    detail:
      "Document that Mercy receives MAO-004 from four of seven payers and MAO-002 from one. Leverage what is already received first, and let contracting work with payers to receive files completely and on time — without going down the rabbit hole of tracing every individual rejection file prematurely.",
  },
];

const NEXT_STEPS = [
  "Review Jennifer's interim prototype before presenting the broader future-state architecture to Linda.",
  "Build out Linda and Aaron's new (not lift-and-shift) logic as the basis for the curated and staged tables.",
  "Walk the developers (Hari, Ron Goody) through the future-state architecture so curated / stage tables are built with the target design in mind.",
  "Run the MAO completeness test for one health plan — record counts by grain (Member · DOS · DX · NPI) grouped by date of service — to quantify response-file completeness month over month.",
];

const TABS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "current", label: "Current State", icon: Network },
  { id: "future", label: "Future State", icon: Workflow },
  { id: "validation", label: "Stakeholder Validation", icon: Users },
  { id: "recommendations", label: "Recommendations", icon: ListChecks },
];

export default function DiscussionJun17() {
  return (
    <div className="max-w-6xl mx-auto p-8 md:p-12 fade-in">
      <header className="mb-12">
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
          <span className="text-primary">Discovery · Architecture</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span>06 / 17 / 2026</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
          Samir's Current &amp; Future State Analysis
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          A solution-architect read of Mercy's ASM process — from today's decentralized, payer-specific, hard-coded
          extracts to a centralized, configurable engine with a standardized Mercy-format staging layer, run control,
          systematic QA, and a closed-loop reconciliation and analytics model. Reviewed and validated the same day with
          Sandra Weiler and Jennifer Oldfather.
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

        {/* ---------------- Overview ---------------- */}
        <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Executive Takeaway</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-base text-muted-foreground leading-relaxed">
                Mercy is “cooking the same meal with slightly different recipes in ten different kitchens” — the same
                risk-adjustment submission process is rebuilt as hard-coded, payer-specific SQL for each health plan.
                The proposed future state collapses that into a single parameterized engine that produces one
                standardized, Mercy-format staged source of truth, applies payer layouts last, validates systematically
                before submission, and closes the loop by reconciling health-plan and CMS responses back to the same
                staged grain.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {QUICK_FACTS.map((fact) => (
                  <div key={fact.label} className="rounded-lg border border-border bg-background/40 p-4">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{fact.label}</div>
                    <div className="text-sm font-medium text-foreground">{fact.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm bg-card">
              <CardHeader>
                <CardTitle className="font-serif text-xl flex items-center gap-2">
                  <Network className="w-5 h-5 text-destructive" /> Where Mercy is today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Payer-specific extracts built directly from Clarity with hard-coded SQL and logic.",
                    "Duplicated, inconsistent rules across payers and limited end-to-end traceability.",
                    "Ad-hoc, manual reconciliation of MAO / response files, dependent on re-ingesting outbound files.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-card">
              <CardHeader>
                <CardTitle className="font-serif text-xl flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-primary" /> Where Mercy is going
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "One generalized, configuration-driven ASM engine with run control and full auditability.",
                    "A standardized Mercy-format staged source of truth, with payer layouts applied last.",
                    "Systematic QA before submission and a closed reconciliation loop feeding live analytics.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ---------------- Current State ---------------- */}
        <TabsContent value="current" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h2 className="font-serif text-2xl text-foreground">Current State Architecture</h2>
              <Badge variant="outline" className="border-destructive/30 text-destructive bg-destructive/5">
                Decentralized
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
              Payer-specific extracts built directly from Clarity — hard-coded, duplicated, and reconciled ad-hoc.
            </p>
            <Card className="border-none shadow-sm bg-card">
              <CardContent className="pt-6">
                <CurrentStateFlow />
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-serif text-xl text-foreground mb-4">Key Characteristics &amp; Challenges</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CURRENT_CHALLENGES.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="rounded-xl border border-border bg-card p-5">
                    <Icon className="w-5 h-5 text-destructive mb-3" />
                    <div className="font-medium text-sm text-foreground mb-1.5">{c.title}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{c.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Operational realities surfaced in the review</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {CURRENT_NUANCES.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- Future State ---------------- */}
        <TabsContent value="future" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h2 className="font-serif text-2xl text-foreground">Future State Architecture</h2>
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                Centralized &amp; Closed-Loop
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
              A centralized engine, standardized Mercy-format staging, payer-specific layouts applied last, systematic QA,
              and full reconciliation &amp; analytics.
            </p>
            <Card className="border-none shadow-sm bg-card">
              <CardContent className="pt-6">
                <FutureStateFlow />
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="border-none shadow-sm bg-card lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-serif text-xl flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" /> Analytics &amp; Reporting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Built on the staged source of truth — accessible to operations, not locked in a developer-only tool.
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {ANALYTICS.map((a) => {
                    const Icon = a.icon;
                    return (
                      <div key={a.title} className="rounded-lg border border-border bg-background/40 p-3 flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-xs font-medium text-foreground leading-tight">{a.title}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-card">
              <CardHeader>
                <CardTitle className="font-serif text-xl flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Key Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {KEY_BENEFITS.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ---------------- Stakeholder Validation ---------------- */}
        <TabsContent value="validation" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Stakeholder Validation of Current &amp; Future State</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-muted-foreground leading-relaxed">
                Sandra and Jennifer validated the proposed current- and future-state ASM architecture as a strong working
                baseline. Their feedback confirmed the core findings around payer-specific code, hard-coded logic, manual
                reconciliation, and limited traceability, and the need for a centralized engine, standardized staging
                layer, run control, QA validation, and closed-loop response reconciliation. They added important
                refinements around response-file completeness, operational reporting access, and prototype validation.
              </p>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm bg-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CardTitle className="font-serif text-xl">Sandra Weiler</CardTitle>
                  <Badge variant="outline" className="border-sky-500/30 text-sky-700 bg-sky-500/5">
                    Strategic &amp; Architectural
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {SANDRA_POINTS.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CardTitle className="font-serif text-xl">Jennifer Oldfather</CardTitle>
                  <Badge variant="outline" className="border-amber-500/30 text-amber-700 bg-amber-500/5">
                    Operational &amp; Implementation
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {JENNIFER_POINTS.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Consolidated Confirmed Themes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                {CONSOLIDATED_THEMES.map((t) => (
                  <div key={t} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- Recommendations ---------------- */}
        <TabsContent value="recommendations" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid md:grid-cols-2 gap-5">
            {RECOMMENDATIONS.map((r, i) => (
              <div key={r.title} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div className="font-medium text-sm text-foreground">{r.title}</div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.detail}</p>
              </div>
            ))}
          </div>

          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="font-serif text-xl flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-primary" /> Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {NEXT_STEPS.map((s) => (
                  <li key={s} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
