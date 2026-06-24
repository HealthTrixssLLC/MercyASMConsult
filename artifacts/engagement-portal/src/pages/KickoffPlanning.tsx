import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Target,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

const QUICK_FACTS = [
  { label: "Health Plans in Scope", value: "All 6 payers" },
  { label: "Highest Population", value: "United Healthcare" },
  { label: "Process", value: "Full sweeps + validation" },
  { label: "Oracle Platform", value: "Out of scope" },
];

const CURRENT_STATE = [
  "Existing sweeps / ASM submission process",
  "Existing payer file layouts",
  "Existing payer submissions",
  "Output files generated from the Oracle platform",
];

const TARGET_STATE = [
  "Databricks implementation (migrated SQL logic)",
  "Curated / semantic data layer",
  "New validation framework",
  "Future operational model & design docs",
];

const IN_SCOPE = [
  "All 6 Medicare Advantage health plans",
  "Full sweeps + supplemental encounter submission",
  "Extract logic on the new Databricks platform",
  "Current output file formats & layouts",
  "Validation process design",
  "Health plan acknowledgements, rejections & CMS acceptance tracking",
];

const OUT_OF_SCOPE = [
  "Historical Oracle implementation & stored procedures",
  "Source-to-target migration validation (conversion handled by Mercy)",
];

const RISKS = [
  {
    title: "Migration Risk",
    severity: "High",
    detail: "Oracle → Azure/Databricks transition is underway; the target environment is still in flux.",
  },
  {
    title: "Knowledge Risk",
    severity: "High",
    detail: "Aaron Peterson, a key contributor, is on paternity leave (~7 weeks) during the engagement.",
  },
  {
    title: "Schedule Risk",
    severity: "Medium",
    detail: "Quarterly planning approval is pending; kickoff may slip to next quarter (July start).",
  },
  {
    title: "Data Conversion Risk",
    severity: "Medium",
    detail: "20+ source tables consolidated into a curated layer; migration may introduce logic changes not in scope to validate.",
  },
  {
    title: "Traceability Risk",
    severity: "Medium",
    detail: "CMS / payer acceptance tracking process appears immature.",
  },
];

const HYPOTHESES = [
  {
    title: "Generalized ASM Engine",
    detail: "A single extraction engine that keeps payer-specific logic out of the core process.",
  },
  {
    title: "Validation Framework",
    detail: "Validate before submission, on payer acceptance, and on CMS acceptance to reduce member-matching issues.",
  },
  {
    title: "Closed-Loop Reconciliation",
    detail: "Reconcile MAO, reject and CMS return files to manage a submission inventory end to end.",
  },
  {
    title: "Canonical Internal Model",
    detail: "A single Mercy-format staging layer with payer-specific export transformations layered on top.",
  },
  {
    title: "Monthly Submission Cadence",
    detail: "Evaluate monthly submissions vs. periodic sweeps for faster error detection and easier monitoring.",
  },
  {
    title: "Governance & Traceability",
    detail: "Improve documentation alignment between SOPs and future-state design artifacts.",
  },
];

function severityClass(severity: string) {
  if (severity === "High") return "bg-destructive/10 text-destructive border-destructive/20";
  return "bg-primary/10 text-primary border-primary/20";
}

export default function KickoffPlanning() {
  return (
    <div className="w-full px-6 md:px-10 py-8 md:py-10 fade-in">
      <header className="mb-12">
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
          <span className="text-primary">Pre-Kickoff</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span>04 / 27 / 2026</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Kickoff Planning</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Gist of the pre-kickoff planning discussion between Mercy and the consulting team. The key alignment: this is
          not a traditional current-state assessment — Mercy is mid-migration from Oracle to Azure / Databricks while
          standing up a new validation framework, so the work spans both current and transitional future state.
        </p>
      </header>

      <Tabs defaultValue="summary" className="w-full">
        <div className="border-b border-border mb-8 overflow-x-auto no-scrollbar">
          <TabsList className="h-auto p-0 bg-transparent flex justify-start gap-6">
            {[
              { id: "summary", label: "Summary", icon: FileText },
              { id: "scope", label: "Scope Clarifications", icon: Target },
              { id: "risks", label: "Risks & Dependencies", icon: AlertTriangle },
              { id: "themes", label: "Discovery Themes", icon: Lightbulb },
            ].map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="pb-4 pt-2 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary text-muted-foreground hover:text-foreground transition-colors flex gap-2 items-center text-sm md:text-base font-medium"
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
              <CardTitle className="font-serif text-2xl">Executive Summary</CardTitle>
              <CardDescription>What the planning discussion aligned on</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                The engagement is positioned as a <span className="text-foreground font-medium">Current State +
                Transitional Future State</span> assessment. Mercy is actively migrating its ASM / Sweeps process from
                Oracle to Azure / Databricks and simultaneously implementing a new validation framework, so discovery
                must evaluate both how the model performs today and the intended future-state architecture.
              </p>
              <p>
                The review encompasses <span className="text-foreground font-medium">all participating Medicare
                Advantage health plans</span> — not just a single payer — to ensure payer-specific compliance and
                alignment across the entire sweeps process.
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

        <TabsContent value="scope" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Current State</CardTitle>
                <CardDescription>How the process operates today</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {CURRENT_STATE.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm bg-accent/5">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Target State</CardTitle>
                <CardDescription>The architecture being migrated toward</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {TARGET_STATE.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-xl flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  In Scope
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {IN_SCOPE.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-xl flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-muted-foreground" />
                  Out of Scope
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {OUT_OF_SCOPE.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <XCircle className="w-4 h-4 text-muted-foreground/60 mt-1 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {RISKS.map((risk, i) => (
            <Card key={i} className="border-border shadow-sm">
              <CardContent className="pt-6 flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="shrink-0">
                  <Badge variant="outline" className={severityClass(risk.severity)}>
                    {risk.severity}
                  </Badge>
                </div>
                <div>
                  <div className="font-serif text-lg text-foreground mb-1">{risk.title}</div>
                  <p className="text-muted-foreground leading-relaxed">{risk.detail}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="themes" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid md:grid-cols-2 gap-6">
            {HYPOTHESES.map((item, i) => (
              <Card key={i} className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="font-serif text-lg flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary shrink-0" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed">{item.detail}</CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
