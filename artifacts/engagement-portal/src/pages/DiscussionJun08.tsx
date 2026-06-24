import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Workflow,
  RefreshCw,
  AlertTriangle,
  ListChecks,
  ArrowRight,
} from "lucide-react";

const QUICK_FACTS = [
  { label: "Session", value: "Week 1 of 4 · Discovery" },
  { label: "Walkthrough Lead", value: "Linda Reed (Sweeps)" },
  { label: "First Payer", value: "United Healthcare" },
  { label: "Format", value: "3-hr working sessions" },
];

const CURRENT_PROCESS = [
  {
    title: "Per-payer SQL queries",
    detail:
      "Each payer has its own unique queries. United Healthcare runs separate institutional and ambulatory queries against different tables. Both data selection logic and payer layout conversion are embedded in the query.",
  },
  {
    title: "Platform migration",
    detail:
      "Queries are Oracle-based today and being rebuilt as Databricks notebooks on Clarity tables. The July initial-2027 sweep will be run with an Oracle-vs-Databricks comparison to confirm the results match.",
  },
  {
    title: "Source of truth",
    detail:
      "Epic (Clarity) is Mercy's system of record. Linda cannot alter Epic data — submissions reflect whatever is in Epic.",
  },
  {
    title: "What sweeps capture",
    detail:
      "Diagnoses in slot 13 and beyond — codes not carried on the original 1–12 claim sent through the clearinghouse. A sweep submits everything present for the date-of-service range.",
  },
  {
    title: "Payer constraints",
    detail:
      "UHC allows 100,000 rows per submission. Some payers require row counts, per-hospital/group splits, or specific fields (claim ID, MBI); others require very little.",
  },
  {
    title: "Three file types",
    detail:
      "Sweeps (adds — the bulk of volume), Adds, and Deletes. Adds and deletes stem from retro/chart reviews and provider audits, and are handled separately from sweeps.",
  },
  {
    title: "Adds & deletes today",
    detail:
      "Retro chart reviews have been paused since Jan 2025 (prospective / concurrent coding now), so adds and deletes are infrequent — Amber confirmed none for a while, though a delete file is being prepared now from a provider audit (run a couple times a year). Adds are entered directly in Epic by Amber's team and picked up by the next sweep rather than sent to Linda as a file; only deletes are handed to her. Volume is low — at most about 10 on a file. The person who previously sent these files has left Mercy.",
  },
  {
    title: "Receiving deletes from Amber's team",
    detail:
      "The hand-off is manual — not an automated feed and not a query. Amber's team tracks the data on a spreadsheet and sends Linda a file; she reformats it into the payer's required layout and submits it. If required fields (e.g., member ID or provider information) are missing from Amber's file, Linda pulls them from Epic. The exact transmission method and file layout were not specified in the session — Samir asked for a sample delete conversion to document them.",
  },
  {
    title: "Cadence",
    detail:
      "Sweep-to-sweep, not continuous. CMS sets payer deadlines; payers tell Mercy the dates. Next up: the initial-2027 sweep (DOS 7/1/2025 – 6/30/2026), running in July.",
  },
  {
    title: "QA / sanity check",
    detail:
      "Row counts, member spot-checks against Epic, and a before/after net-impact check on diagnoses-per-member to catch unexpected swings before a file goes out.",
  },
];

const RECONCILIATION = [
  {
    title: "Response handling",
    detail:
      "Payers notify by email. Whole-file rejects are rare (e.g., wrong row count — fix and resubmit). Most issues are member-level: date-of-birth or last-name mismatches.",
  },
  {
    title: "Epic as source of truth",
    detail:
      "If Mercy's submitted data matches Epic, Linda makes no change. UHC works closely — for last-name mismatches they have Linda blank the field and resubmit, then fill it in before sending to CMS. Resubmissions must keep the exact same file and format.",
  },
  {
    title: "Attribution vs. population",
    detail:
      "Mercy submits the full payer population — not just attributed / value-based-care members — as contracting leverage. Attribution files carry a known 'attributed but no service in period' balance scenario.",
  },
  {
    title: "Reconciliation build (Jennifer Oldfather)",
    detail:
      "An in-progress validation framework and dashboard to ingest sweep files and verify members across MAO / MLR / MOR files — acceptance, deletes, and HCC association. Starting with Aetna; demo next week.",
  },
  {
    title: "Response-file coverage",
    detail:
      "Only Aetna, BCBS Oklahoma, Humana, and UHC return MAO / MOR files. BCBS Arkansas, Essence, Global, and Anthem do not.",
  },
  {
    title: "Lag time unknown",
    detail:
      "The lag between submission and the MAO / MOR return is unknown per payer and must be identified to reconcile correctly (e.g., an ~11-month look-ahead parameter).",
  },
];

const FINDINGS = [
  {
    title: "Knowledge concentration",
    tag: "High",
    detail:
      "The sweeps process rests largely with Linda; adds/deletes knowledge has eroded since the prior owner left, and Aaron Peterson is on leave.",
  },
  {
    title: "Error remediation gap",
    tag: "High",
    detail:
      "No compliant pathway to correct errors that originate in Epic, and no known ticketing route for Linda to flag them — flagged by Jay Baker as potential value / revenue leakage to document as a finding.",
  },
  {
    title: "Reconciliation maturity",
    tag: "Medium",
    detail:
      "Response-file reconciliation is still being built, lag times are unknown, and payer file coverage is uneven. No process today confirms deletes were applied in the CMS / MAO response.",
  },
  {
    title: "Migration validation",
    tag: "Medium",
    detail:
      "Oracle → Databricks parity relies on a July side-by-side comparison; Linda's director still wants Oracle matching until Aaron returns.",
  },
  {
    title: "Monthly submission cadence",
    tag: "Opportunity",
    detail:
      "Larger payers (Humana, UHC) are open to monthly submission, which would ease monitoring and give more time to react to rejections; smaller payers are uncertain.",
  },
  {
    title: "Traceability",
    tag: "Opportunity",
    detail:
      "Stronger tracking fields and net-impact analytics could reduce member-matching errors and strengthen reconciliation.",
  },
];

const ACTIONS = [
  "Linda to provide United Healthcare SQL scripts (ambulatory + institutional).",
  "Linda to provide all payer file layouts and her validation scripts.",
  "Linda to provide at least one sample delete-file conversion, end to end.",
  "Confirm the transmission method and file format / layout Amber's team uses to send deletes — today an undocumented spreadsheet hand-off.",
  "Samir to coordinate artifact access with Kate.",
  "Next session: Jennifer to walk through the reconciliation / validation build (starting with Aetna).",
  "Wednesday session repurposed — Linda unavailable; use the time for the reconciliation review.",
];

function tagClass(tag: string) {
  if (tag === "High") return "bg-destructive/10 text-destructive border-destructive/20";
  if (tag === "Opportunity") return "bg-primary/10 text-primary border-primary/20";
  return "bg-muted text-muted-foreground border-border";
}

export default function DiscussionJun08() {
  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-8 md:py-10 fade-in">
      <header className="mb-12">
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
          <span className="text-primary">Discovery · Discussion</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span>06 / 08 / 2026</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">ASM Process Review</h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          First discovery working session of the four-week review. The team walked the end-to-end ASM (alternative
          submission method) process — how sweep files are created, formatted, submitted, and reconciled — starting with
          United Healthcare as the representative first pass, with the goal of covering all health plans.
        </p>
      </header>

      <Tabs defaultValue="summary" className="w-full">
        <div className="border-b border-border mb-8 overflow-x-auto no-scrollbar">
          <TabsList className="h-auto p-0 bg-transparent flex justify-start gap-6">
            {[
              { id: "summary", label: "Summary", icon: FileText },
              { id: "process", label: "Current Process", icon: Workflow },
              { id: "reconciliation", label: "Errors & Reconciliation", icon: RefreshCw },
              { id: "findings", label: "Findings", icon: AlertTriangle },
              { id: "actions", label: "Action Items", icon: ListChecks },
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
              <CardTitle className="font-serif text-2xl">Session Overview</CardTitle>
              <CardDescription>What the first discovery session covered</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Linda Reed walked through the current sweeps process and Jennifer Oldfather covered the in-progress
                reconciliation and validation build. The review targets the{" "}
                <span className="text-foreground font-medium">ASM channel</span> — chart-review / direct-submission,
                adds, deletes, and sweeps — not the standard claims clearinghouse channel.
              </p>
              <p>
                The focus is on the <span className="text-foreground font-medium">process and logic, not the
                technology</span>: the extraction logic is the same across the legacy Oracle platform and the new
                Databricks / IDP environment, so the assessment follows the process Mercy is migrating toward.
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

        <TabsContent value="process" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid md:grid-cols-2 gap-6">
            {CURRENT_PROCESS.map((item, i) => (
              <Card key={i} className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="font-serif text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed">{item.detail}</CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reconciliation" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid md:grid-cols-2 gap-6">
            {RECONCILIATION.map((item, i) => (
              <Card key={i} className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="font-serif text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed">{item.detail}</CardContent>
              </Card>
            ))}
          </div>
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

        <TabsContent value="actions" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Next Steps & Asks</CardTitle>
              <CardDescription>Artifacts to collect and the agenda for the next session</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {ACTIONS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
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
