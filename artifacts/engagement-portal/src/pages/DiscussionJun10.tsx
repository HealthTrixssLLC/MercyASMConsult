import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import architectureSlide from "@assets/image_1782285016281.png";
import workflowSlide from "@assets/image_1782285022719.png";
import {
  FileText,
  Network,
  Workflow,
  MessagesSquare,
  AlertTriangle,
  Table2,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

const QUICK_FACTS = [
  { label: "Session", value: "Future-State Design Review" },
  { label: "Walkthrough Lead", value: "Sandra Weiler" },
  { label: "Focus", value: "Validation & Reconciliation" },
  { label: "Duration", value: "1h 24m" },
];

const CURRENT_STATE = [
  "Multiple source tables",
  "Separate payer-specific extraction logic",
  "Separate payer-specific code bases (a code set per payer)",
  "Independent file generation processes",
];

const CURRENT_STATE_CHALLENGES = [
  "Duplicated logic",
  "Limited tracking",
  "High maintenance effort",
  "Data quality risks",
];

const FUTURE_STATE = [
  "Centralized data integration",
  "Single curated risk-adjustment data source",
  "Standardized ASM data",
  "End-to-end monitoring",
  "CMS HCC result integration",
  "Member identification and attribution support",
];

const WORKFLOW_STEPS = [
  "Align with payers",
  "Curate data for ASM sweeps",
  "Stage data in payer-specific format",
  "Complete pre-submission validation",
  "Root-cause remediation",
  "Electronic file submission",
  "Ingest submission / response files",
  "MAO-004 ingestion and comparison",
  "MOR ingestion and comparison",
  "Reporting and transparency",
];

const THEMES = [
  {
    title: "1 · Curation becomes the new critical control point",
    speaker: "Jay Baker · reinforced by Samir Rawat",
    points: [
      "Jay split the future-state process into two steps, each a risk and an opportunity: Step 1 — Curation (creating the canonical ASM dataset) and Step 2 — Transformation (converting canonical data into payer-specific layouts).",
      "Curation exists to ensure data completeness and fidelity; transformation exists to deliver data in the format each customer expects. The risk in curation is injecting errors or silent compliance issues as raw data is transformed before submission.",
      "Today, errors are isolated to individual payer processes. Under the future architecture, an error introduced in the curated layer can propagate to every payer at once.",
      "Samir reinforced that current curation happens at a health-plan level, so the point of failure is distributed; centralizing curation creates a single point of failure across all plans.",
      "Sandra confirmed the last sweep submission still followed current state — the codes and files shared with Jay's team source from Linda's codes, not a curated table. The curated model is purely future state.",
    ],
  },
  {
    title: "2 · Validation must prove old and new processes match",
    speaker: "Jennifer Oldfather",
    points: [
      "Migration strategy: build curated tables and staging tables, generate the same outputs as the current Oracle process, and validate equivalency before any optimization.",
      "The initial objective is not transformation improvement — it is to reproduce today's outputs and prove parity, then determine where to make it better once inside the IDP.",
      "Naming conventions and data are not changed in the curated/staging layer; transformation of logic happens in separate tables and is documented specifically.",
      "Consultant view: this is the correct sequence — Phase 1 Replicate, Phase 2 Optimize, Phase 3 Enhance.",
    ],
  },
  {
    title: "3 · CMS validation should become explicit",
    speaker: "Kate McClure · Sandra Weiler · Jennifer Oldfather",
    points: [
      "Kate asked when the current pulls were last validated to confirm they grab everything, since CMS-acceptable CPT codes change every year.",
      "Jennifer indicated some validation exists (largely on Linda and Aaron's side) but is not fully transparent or automated today; she is building an interim data-quality process around sweep submissions.",
      "Sandra confirmed integrating CMS requirements and edits into pre-submission validation — manual or automated — is a future-state objective.",
      "Recommended future validation before export: CPT eligibility, HCPCS eligibility, provider specialty validation, bill-type validation, diagnosis validity, and effective-date validation.",
    ],
  },
  {
    title: "4 · Sweeps — why structure ASM around them?",
    speaker: "Jay Baker · Samir Rawat · Kate McClure",
    points: [
      "Jay challenged the assumption that submissions should be constrained by payer sweep schedules: Mercy is a provider group submitting to plans; the plans are accountable to CMS for their own sweeps.",
      "Kate clarified it is partly terminology — original claims carry diagnosis codes 1–12 through the clearinghouse; the ASM channel captures code 13 and beyond on appropriate visit/encounter types, timed to coincide with payer sweeps.",
      "Samir's point: a visit on June 15 with an original claim on June 18 could begin ASM submission as soon as June 20–25 — there is no need to wait until September.",
      "Jay reframed it as a calendaring problem: Mercy is not filtering by collection date, it is acknowledging that payers ask for a cadence that coincides with their sweep schedule. Some payers will move to monthly; others will not.",
      "Clarification on filtering: Mercy does filter by service type (e.g., radiology, labs, non-face-to-face visits are excluded) and does restrict dates for the initial submission — but it is not artificially restricting valid date-of-service data.",
    ],
  },
  {
    title: "5 · Open-period concept",
    speaker: "Jay Baker · Samir Rawat · Sandra Weiler",
    points: [
      "Sandra was focused on July submission windows and initial sweep windows; Jay and Samir reframed the discussion around CMS open periods.",
      "Example: if 2025 dates of service remain open through January 2027, a newly discovered diagnosis from March 2025 is still valid for submission.",
      "Best practice: send validated data continuously — all valid open-period records, new records, retroactive chart reviews, and newly discovered diagnoses — provided duplicates are avoided, rather than restricting a July submission to DOS 7/1/25–6/30/26 only.",
      "This is a maturity shift from 'submit by sweep' to 'submit all eligible diagnoses during the open period.'",
    ],
  },
  {
    title: "6 · Need for a historical submission inventory",
    speaker: "Jennifer Oldfather",
    points: [
      "A direct consequence of continuous submission: future-state logic must know what has already been submitted, what has not, what is retroactive, and what is net new — to avoid duplicate submissions.",
      "This aligns with the Run Control / Submission Inventory architecture discussed previously.",
    ],
  },
  {
    title: "7 · Reconciliation strategy expanded",
    speaker: "Sandra Weiler · Samir Rawat · Jay Baker",
    points: [
      "Response coverage is uneven: some plans provide acknowledgements and rejects, some provide almost no response information.",
      "Samir recommended using CMS files as the authoritative source.",
      "MAO-002 determines what the plan actually submitted to CMS — transaction-level acceptance/rejection and reject reason codes.",
      "MAO-004 determines what CMS ultimately accepted for risk-adjustment processing. Mercy currently receives MAO-004 files and Jennifer is developing validation around them.",
      "Jay shared an Excel-based MAO-004 playbook; Sandra reacted positively and said it would be extremely useful.",
    ],
  },
];

const ARCH_MESSAGE =
  "Instead of maintaining separate code bases for each payer, curate data once and generate payer-specific extracts (Payer A, B, C, D) from the same canonical dataset.";

const FINDINGS = [
  {
    title: "Future-state architecture is directionally correct",
    tag: "Affirmed",
    detail:
      "Centralized curation plus payer-specific export generation is the right long-term model for ASM modernization.",
  },
  {
    title: "Curation becomes the highest-risk component",
    tag: "High",
    detail:
      "A defect in the curated layer could affect every payer simultaneously — the new single point of failure. Auditing curation in detail is essential because silent compliance errors are introduced there.",
  },
  {
    title: "Need for a formal submission inventory & reconciliation framework",
    tag: "High",
    detail:
      "Required to support open-period submissions, retroactive coding, duplicate prevention, MAO-002 reconciliation, MAO-004 reconciliation, and closed-loop acceptance tracking.",
  },
  {
    title: "Earliest emergence of future-state concepts",
    tag: "Opportunity",
    detail:
      "This session is where canonical ASM staging, run control, reverse reconciliation, and submission traceability begin to emerge clearly.",
  },
];

function tagClass(tag: string) {
  if (tag === "High") return "bg-destructive/10 text-destructive border-destructive/20";
  if (tag === "Opportunity") return "bg-primary/10 text-primary border-primary/20";
  if (tag === "Affirmed") return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
  return "bg-muted text-muted-foreground border-border";
}

export default function DiscussionJun10() {
  return (
    <div className="max-w-6xl mx-auto p-8 md:p-12 fade-in">
      <header className="mb-12">
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
          <span className="text-primary">Discovery · Discussion</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span>06 / 10 / 2026</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">ASM Process Review — Future-State Design</h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Unlike the June 9 kickoff discussion, which focused on scope and objectives, June 10 shifted into a detailed
          review of Mercy's proposed future-state ASM architecture. Sandra Weiler walked the team through a current-vs-future
          design and a future-state end-to-end workflow, and the discussion centered on curation, validation,
          submission timing, sweeps, reconciliation, and the risks of centralized data transformation.
        </p>
      </header>

      <Tabs defaultValue="summary" className="w-full">
        <div className="border-b border-border mb-8 overflow-x-auto no-scrollbar">
          <TabsList className="h-auto p-0 bg-transparent flex justify-start gap-6">
            {[
              { id: "summary", label: "Summary", icon: FileText },
              { id: "architecture", label: "Architecture", icon: Network },
              { id: "workflow", label: "End-to-End Workflow", icon: Workflow },
              { id: "themes", label: "Discussion Themes", icon: MessagesSquare },
              { id: "findings", label: "Findings", icon: AlertTriangle },
              { id: "mao", label: "HealthTrixss MAO Guidance", icon: Table2 },
            ].map((tab) => (
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

        <TabsContent value="summary" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Session Overview</CardTitle>
              <CardDescription>Future-state ASM architecture review</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Sandra presented two future-state design diagrams — a{" "}
                <span className="text-foreground font-medium">Current State vs Future State architecture</span> and a{" "}
                <span className="text-foreground font-medium">future-state end-to-end ASM workflow</span> — and asked for
                the team's feedback. The majority of the discussion centered on data-curation strategy, validation
                design, submission timing, sweep methodology, reconciliation to CMS response files, the risks introduced
                by centralized data transformation, and traceability requirements.
              </p>
              <p>
                Sandra confirmed the scope is to assess both the output from current state and the validation and
                reconciliation process envisioned for future state. Toward the end, Jay shared an Excel-based MAO-004
                corrective-action playbook, reproduced in full under{" "}
                <Link href="/discussions/2026-06-10/mao-guidance" className="text-primary font-medium hover:underline">
                  HealthTrixss MAO Guidance
                </Link>
                .
              </p>
            </CardContent>
          </Card>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_FACTS.map((fact, i) => (
              <Card key={i} className="border-border shadow-sm bg-accent/5">
                <CardContent className="pt-6">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{fact.label}</div>
                  <div className="font-serif text-lg text-foreground">{fact.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="architecture" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border shadow-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Current State vs Future State — Slide Presented by Sandra</CardTitle>
              <CardDescription>
                Sandra's slide contrasting the legacy Oracle system — multiple source tables and a separate code base
                per payer — with the future-state Integrated Data Platform built on a single curated risk-adjustment table
              </CardDescription>
            </CardHeader>
            <CardContent>
              <figure className="rounded-lg border border-border bg-white p-4">
                <img
                  src={architectureSlide}
                  alt="Sandra's slide: Current State (Legacy Oracle System) with multiple source tables and separate extract logic per payer, migrating to Future State (Integrated Data Platform) with a curated risk-adjustment table feeding payer-specific extracts"
                  className="w-full h-auto"
                />
              </figure>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-lg">Current State — Legacy Oracle</CardTitle>
                <CardDescription>Individual extraction path per payer, each with its own logic stack</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {CURRENT_STATE.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Challenges</div>
                  <div className="flex flex-wrap gap-2">
                    {CURRENT_STATE_CHALLENGES.map((c, i) => (
                      <Badge key={i} variant="outline" className="bg-destructive/5 text-destructive border-destructive/20">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm bg-accent/5">
              <CardHeader>
                <CardTitle className="font-serif text-lg">Future State — Integrated Data Platform</CardTitle>
                <CardDescription>One curated source feeds payer-specific extracts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {FUTURE_STATE.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Curated source</Badge>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  {["Payer A", "Payer B", "Payer C", "Payer D"].map((p) => (
                    <Badge key={p} variant="outline" className="bg-muted text-muted-foreground border-border">
                      {p} extract
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/20 shadow-sm bg-primary/5">
            <CardContent className="pt-6">
              <div className="text-xs uppercase tracking-widest text-primary mb-2">Key message from Sandra</div>
              <p className="text-foreground leading-relaxed font-serif text-lg">{ARCH_MESSAGE}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border shadow-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="font-serif text-xl">End-to-End Workflow — Slide Presented by Sandra</CardTitle>
              <CardDescription>
                Sandra's circular end-to-end workflow slide: a recurring sweep cycle (initial, mid-year, and final
                submissions on attributed populations) keeping data inside the IDP for traceability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <figure className="rounded-lg border border-border bg-white p-4">
                <img
                  src={workflowSlide}
                  alt="Sandra's end-to-end workflow slide: a circular cycle of align with payers, curate data for ASM sweeps in IDP, stage data in payer-specific format, pre-submission validation, root cause analysis and remediation, electronic file submission, ingest resubmission/error reports, MAO-004 and MOR ingestion and remediation, MMR ingestion, and report KPIs for transparency, repeating with initial, mid-year, and final submissions on attributed populations"
                  className="w-full h-auto"
                />
              </figure>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Future-State End-to-End ASM Workflow</CardTitle>
              <CardDescription>
                A recurring sweep cycle sits at the center, keeping data inside Mercy's data platform for traceability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-1">
                {WORKFLOW_STEPS.map((step, i) => (
                  <li key={i}>
                    <div className="flex items-start gap-4 py-2">
                      <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-foreground leading-relaxed pt-0.5">{step}</span>
                    </div>
                    {i < WORKFLOW_STEPS.length - 1 && (
                      <ArrowDown className="w-4 h-4 text-muted-foreground/30 ml-3.5" />
                    )}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="themes" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {THEMES.map((theme, i) => (
            <Card key={i} className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-lg">{theme.title}</CardTitle>
                <CardDescription>{theme.speaker}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {theme.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="findings" className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {FINDINGS.map((item, i) => (
            <Card key={i} className="border-border shadow-sm">
              <CardContent className="pt-6 flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="shrink-0">
                  <Badge variant="outline" className={tagClass(item.tag)}>
                    {item.tag}
                  </Badge>
                </div>
                <div>
                  <div className="font-serif text-lg text-foreground mb-1">{item.title}</div>
                  <p className="text-muted-foreground leading-relaxed">{item.detail}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="mao" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif text-xl">HealthTrixss MAO-004 Corrective-Action Playbook</CardTitle>
              <CardDescription>The Excel workbook Jay shared, reproduced in full</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                The workbook classifies MAO-004 outcomes into accepted encounters, provider-controlled issues,
                plan-controlled issues, shared-responsibility issues, and CMS-controlled issues. Its purpose is to move
                beyond simply reading MAO-004 files and instead determine operational actionability for each scenario:
                who owns the issue, can Mercy fix it, does the plan need to act, is CMS action required, and is
                correction worthwhile.
              </p>
              <Link
                href="/discussions/2026-06-10/mao-guidance"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                Open the full workbook — every sheet and value preserved
                <ArrowRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
