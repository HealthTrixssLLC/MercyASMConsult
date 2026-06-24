import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Files, Database, SearchCheck, AlertTriangle, CheckCircle2, Minus } from "lucide-react";

const QUICK_FACTS = [
  { label: "Session", value: "Current-State Logic & Reconciliation" },
  { label: "Review Leads", value: "Samir Rawat · Linda Reed" },
  { label: "Focus", value: "UHC SQL Logic & MAO Reconciliation" },
  { label: "Duration", value: "1h 39m" },
];

const MAIN_THEMES = [
  "Mercy does not receive MAO-002 / MAO-004 consistently across all payers.",
  "UHC current-state logic includes payer-specific filtering, formatting, and manual correction steps.",
  "Technical specifications / payer layouts are not consistently governed or refreshed.",
  "MAO-002 analysis for Blue Cross of Oklahoma surfaced a potential reconciliation gap.",
  "Volume completeness and payer-response reconciliation need to become formalized controls.",
];

const PAYER_FILES = [
  { payer: "Aetna", mao004: true, mao002: false },
  { payer: "Blue Cross of Oklahoma", mao004: true, mao002: true },
  { payer: "Humana", mao004: true, mao002: false },
  { payer: "UHC", mao004: true, mao002: false },
  { payer: "Anthem", mao004: false, mao002: false },
  { payer: "Arkansas", mao004: false, mao002: false },
  { payer: "Essence", mao004: false, mao002: false },
  { payer: "Global Health", mao004: false, mao002: false },
];

const COMPLETENESS_DIMENSIONS = [
  "Health plan",
  "Date-of-service month",
  "File-received month",
  "Submission period",
  "Record / member / diagnosis counts",
];

const COMPLETENESS_FRAMING = [
  "Which files were received",
  "Which files were loaded",
  "What months / DOS periods are represented",
  "Whether the volume distribution looks reasonable",
  "Whether missing volumes reflect payer filtering or missing files",
];

const UHC_ITEMS = [
  "Separate institutional and ambulatory extracts — different source tables and different file layouts.",
  "Payer-specific layout requirements (institutional picks up bill types 131 and 111).",
  "UHC 40-diagnosis-code-per-line limit — the extract splits codes into DX 1–40 and DX 41–80 when needed.",
  "CMS-allowable CPT list filtering, loaded into a table directly from the CMS list.",
  "Bill type values such as 111 and 131.",
  "Service-line handling to avoid duplicate-looking rows.",
  "Payer-driven expectations that may not align cleanly with CMS-native processing logic.",
];

const THEMES = [
  {
    title: "CPT filtering — advisory concern vs current payer requirement",
    speaker: "Samir Rawat · Linda Reed · Sandra Weiler",
    points: [
      "Samir questioned whether Mercy should filter CPT codes on the medical-group / provider side, since conceptually this filtering is typically done by the health plan or CMS downstream.",
      "Linda explained that payers have asked Mercy to filter to CMS-allowable CPT codes (the list comes directly from CMS and is loaded into a table), and non-matching CPTs have historically generated rejections.",
      "Rejection behavior is payer by payer: Linda has seen some payers reject the whole file and others reject the individual claim line. For UHC specifically, the rejection occurs at the claim-line level.",
      "Sandra asked the practical question: if CMS and the payer would reject the records anyway, what is the value of sending them? Samir, whose experience was from a health-plan context where broader data can help suspecting, acknowledged that based on Linda's payer instructions Mercy is currently expected to filter those records out.",
      "Consultant view: this is not necessarily a 'wrong' practice — Mercy is performing payer-requested filtering — but the exact payer requirement should be documented, versioned, and periodically revalidated, because provider-side filtering creates risk if the wrong CPT value set, effective date, or interpretation is used.",
    ],
  },
  {
    title: "Technical specs & data dictionaries — a governance gap",
    speaker: "Linda Reed · Kate McClure · Jay Baker",
    points: [
      "The team distinguished between a payer template, a technical specification, a data dictionary, field-level required/optional logic, and current payer instructions.",
      "Linda stated Mercy has payer templates showing the fields payers want, but not necessarily full data dictionaries.",
      "Kate and Jay pushed for the current payer technical specifications to be requested so Mercy can confirm whether long-standing assumptions are still valid.",
      "Linda had recently asked payers whether any changes were needed and they responded that none were required; Kate clarified that the ask should be for the current technical specs themselves, not just confirmation that nothing changed.",
      "Consultant view: Mercy has strong operational knowledge and payer templates, but the process would benefit from a governed payer-spec repository with current versions, effective dates, source emails, owner, and sign-off.",
    ],
  },
  {
    title: "UHC service line & duplicate handling",
    speaker: "Samir Rawat · Linda Reed · Kate McClure",
    points: [
      "Samir questioned why the UHC logic focuses on service line one, and whether excluding other service lines could unintentionally exclude a valid face-to-face encounter.",
      "Linda explained that if multiple allowable CPTs come through with the same diagnosis codes, the file can look duplicative to UHC; the payer wants one CPT / revenue-code / diagnosis combination rather than multiple rows repeating the same diagnosis set.",
      "Kate raised the related concern that if CPT1 and CPT3 are both CMS-valid, the selection logic matters.",
      "Items to validate with UHC: Is Mercy expected to send only one CPT per diagnosis line? If multiple CPTs are valid, which one should be selected? How should diagnosis differences across service lines be handled? Is this UHC-only or applicable across other payers?",
    ],
  },
  {
    title: "Bill type mapping & loss of fidelity",
    speaker: "Jay Baker · Linda Reed",
    points: [
      "Jay questioned the bill type mapping — specifically whether all institutional records should be mapped into 111 or 131.",
      "Linda explained that for UHC, 111 is used when the base class is 1, and everything else is sent as 131 because that is what UHC requested.",
      "Jay's concern was that defaulting or collapsing bill types can lose fidelity around facility type, frequency, interim vs final billing, and other information that CMS filtering logic may use.",
      "The team discussed that UHC may be linking the supplemental file back to the original claim and retrieving more precise bill type information from the original claim rather than using the ASM field as a pass-through.",
      "Consultant view: if UHC links ASM records back to original claims, simplified bill type mapping may be acceptable; if UHC submits unlinked records using Mercy's mapped values, fidelity loss could matter — a payer-validation item rather than an immediate defect.",
    ],
  },
  {
    title: "Manual correction & error handling",
    speaker: "Samir Rawat · Linda Reed",
    points: [
      "UHC sends an error file containing only the rejected records.",
      "For correctable errors, Linda manually reviews the file, makes corrections, and sends the corrected file back. Common examples: last-name mismatch, MBI issues, and member not found in plan.",
      "For some issues, UHC may instruct Mercy to blank out a field and let UHC populate it. For member-not-found issues, Linda checks Epic / e-verification and may escalate to Mercy / UHC relationship owners if Mercy shows the member as valid.",
      "Consultant view (future-state controls): capture error-file intake systematically, store rejected records, categorize fixable vs non-fixable errors, track correction status, preserve original and corrected values, and link corrected resubmissions back to the original Run ID / submission file.",
    ],
  },
  {
    title: "Current-state review vs future-state review",
    speaker: "Jay Baker · Sandra Weiler",
    points: [
      "Jay paused to confirm whether the team should continue reviewing current-state Oracle code while Linda is already migrating and improving the process in IDP / Databricks.",
      "Sandra confirmed it still makes sense to review current state, because if Linda has already addressed an issue in the new process it can simply be marked as resolved.",
      "Consultant view: separate findings into current-state observations, already addressed in IDP, still open in future state, requires payer confirmation, and requires governance / control enhancement — avoiding overstating issues that are already being remediated.",
    ],
  },
];

const BCBS_ANALYSIS = [
  "Jennifer ingested the Blue Cross of Oklahoma MAO-002 files and reviewed fields such as accepted indicators, error codes, and initiative type.",
  "Initiative type included values such as chart review, claims, Part B, IHA, and SBS — but there was no ASM category. Jay clarified that initiative type is not a standard MAO-002 field; it is likely added by the health plan.",
  "Jennifer then joined the sweep files to MAO-002 and found a concerning scenario: for the 2026 mid-year submission, there were records that were attributed and had HCCs indicated but were not found in MAO-002 — roughly 4,800 diagnosis-code-level records missing.",
  "Jay framed this as a gap, but not yet proof of root cause: the plan may not have submitted them to CMS, Mercy may not have received the relevant MAO-002 file, or the files may not have been fully loaded.",
];

const BCBS_RECON_STEPS = [
  "Start with submitted sweep records.",
  "Identify records expected to appear in MAO-002.",
  "Isolate missing records.",
  "Confirm all MAO-002 files were received and loaded.",
  "If Mercy data is complete, send sample member / DOS / diagnosis details to the plan for explanation.",
];

const FINDINGS = [
  {
    title: "Response file receipt is inconsistent by payer",
    tag: "High",
    detail:
      "Mercy receives MAO-004 for some payers and MAO-002 only for Blue Cross of Oklahoma. Several payers (Anthem, Arkansas, Essence, Global Health) provide no files, creating a material blind spot in reconciliation.",
  },
  {
    title: "Payer requirements drive current-state logic, but supporting specs are not fully governed",
    tag: "Governance",
    detail:
      "Linda's logic is based on long-standing payer instructions, but the team identified a need to request and retain current payer specs to confirm interpretations rather than relying on a 'nothing changed' confirmation.",
  },
  {
    title: "UHC logic contains payer-specific assumptions requiring validation",
    tag: "Validation",
    detail:
      "Examples include CPT filtering, single CPT / service-line handling, bill type mapping, and legacy fields such as risk assessment code or specialty mapping.",
  },
  {
    title: "Manual correction exists for UHC error files",
    tag: "Opportunity",
    detail:
      "Linda manually reviews UHC error files and corrects fixable issues. This works operationally today but should be controlled and tracked in the future-state process.",
  },
  {
    title: "Blue Cross MAO-002 analysis surfaced a real reconciliation gap",
    tag: "High",
    detail:
      "Jennifer identified submitted records with attribution / HCC indicators that were not found in MAO-002, creating a strong test case for payer-response reconciliation and completeness controls.",
  },
];

const NEXT_STEPS = [
  "Perform an MAO file completeness analysis by payer, file month, DOS month, and record / member / diagnosis counts.",
  "Request current technical specs from all payers — not just confirmation that 'nothing changed.'",
];

function tagClass(tag: string) {
  if (tag === "High") return "bg-destructive/10 text-destructive border-destructive/20";
  if (tag === "Opportunity") return "bg-primary/10 text-primary border-primary/20";
  if (tag === "Affirmed") return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
  if (tag === "Governance") return "bg-amber-500/10 text-amber-700 border-amber-500/20";
  if (tag === "Validation") return "bg-sky-500/10 text-sky-700 border-sky-500/20";
  return "bg-muted text-muted-foreground border-border";
}

function FileCell({ received }: { received: boolean }) {
  return received ? (
    <span className="inline-flex items-center gap-1.5 text-emerald-700">
      <CheckCircle2 className="w-4 h-4" />
      Received
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground/70">
      <Minus className="w-4 h-4" />
      Not received
    </span>
  );
}

export default function DiscussionJun12() {
  return (
    <div className="w-full px-6 md:px-10 py-8 md:py-10 fade-in">
      <header className="mb-12">
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
          <span className="text-primary">Discovery · Discussion</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span>06 / 12 / 2026</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
          ASM Process Review — Current-State Logic & Reconciliation
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          June 12 moved from future-state architecture into a detailed working review of the actual current-state UHC
          SQL / query logic, payer file availability, MAO-002 / MAO-004 reconciliation, and known operational gaps. The
          team reviewed which response files Mercy actually receives, walked through Linda's UHC extract logic, and
          examined a preliminary Blue Cross of Oklahoma MAO-002 analysis that surfaced a real reconciliation gap.
        </p>
      </header>

      <Tabs defaultValue="summary" className="w-full">
        <div className="border-b border-border mb-8 overflow-x-auto no-scrollbar">
          <TabsList className="h-auto p-0 bg-transparent flex justify-start gap-6">
            {[
              { id: "summary", label: "Summary", icon: FileText },
              { id: "response", label: "Response Files", icon: Files },
              { id: "uhc", label: "UHC SQL Logic", icon: Database },
              { id: "bcbs", label: "BCBS MAO-002", icon: SearchCheck },
              { id: "findings", label: "Findings", icon: AlertTriangle },
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
              <CardTitle className="font-serif text-2xl">Executive Takeaway</CardTitle>
              <CardDescription>Current-state UHC logic and MAO reconciliation review</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                The June 12 discussion moved from future-state architecture into a detailed working review of the actual
                current-state UHC SQL / query logic, payer file availability, MAO-002 / MAO-004 reconciliation, and known
                operational gaps.
              </p>
              <ul className="space-y-3">
                {MAIN_THEMES.map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_FACTS.map((fact) => (
              <Card key={fact.label} className="border-border shadow-sm">
                <CardContent className="pt-6">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{fact.label}</div>
                  <div className="text-foreground font-medium leading-snug">{fact.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="response" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Response File Availability by Payer</CardTitle>
              <CardDescription>
                The only MAO-002 file Mercy receives is from Blue Cross of Oklahoma; several payers provide no files at all
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <caption className="sr-only">
                    MAO-004 and MAO-002 response file availability by payer
                  </caption>
                  <thead>
                    <tr className="border-b border-border">
                      <th scope="col" className="text-left font-semibold text-foreground py-3 pr-4">Payer</th>
                      <th scope="col" className="text-left font-semibold text-foreground py-3 px-4">MAO-004</th>
                      <th scope="col" className="text-left font-semibold text-foreground py-3 px-4">MAO-002</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PAYER_FILES.map((row) => (
                      <tr key={row.payer} className="border-b border-border/60">
                        <th scope="row" className="text-left py-3 pr-4 text-foreground font-medium">{row.payer}</th>
                        <td className="py-3 px-4"><FileCell received={row.mao004} /></td>
                        <td className="py-3 px-4"><FileCell received={row.mao002} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-5">
                For Anthem, Arkansas, Essence, and Global Health, Mercy is not receiving any files — described by Jennifer
                as one of the current pain points. The 2026 mid-year sweep files discussed were confirmed as
                Mercy-submitted sweep files. This is a significant reconciliation limitation: Mercy cannot fully validate
                downstream CMS submission or acceptance across all plans unless the plans provide usable response files,
                ideally including both MAO-002 and MAO-004.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif text-xl">MAO File Completeness Analysis</CardTitle>
              <CardDescription>
                Samir's recommendation: run a volume completeness analysis before relying on MAO files for reconciliation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Samir recommended testing whether the response files appear complete by comparing record / member /
                diagnosis volumes. From prior experience, MAO files appeared usable, but a monthly distribution revealed
                missing months (e.g., October and November). If Mercy builds reconciliation logic on incomplete MAO data,
                the process could produce false gaps.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Compare volumes by</div>
                  <ul className="space-y-2">
                    {COMPLETENESS_DIMENSIONS.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Before drawing operational conclusions, establish
                  </div>
                  <ul className="space-y-2">
                    {COMPLETENESS_FRAMING.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uhc" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif text-xl">UHC SQL Logic — Key Items</CardTitle>
              <CardDescription>
                Samir reviewed the UHC queries Linda sent; UHC requires separate institutional and ambulatory submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {UHC_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

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

        <TabsContent value="bcbs" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Blue Cross of Oklahoma MAO-002 Use Case</CardTitle>
              <CardDescription>Jennifer's preliminary analysis surfaced a concrete reconciliation gap</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {BCBS_ANALYSIS.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Reconciliation Approach</CardTitle>
              <CardDescription>The strongest concrete template from the session for building future reconciliation</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-1">
                {BCBS_RECON_STEPS.map((step, i) => (
                  <li key={i} className="flex items-start gap-4 py-2">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-foreground leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-sm bg-primary/5">
            <CardHeader>
              <CardTitle className="font-serif text-lg">MAO-002 vs MOR clarification</CardTitle>
              <CardDescription>Samir Rawat · Jay Baker · Jennifer Oldfather</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Jennifer initially thought that members without 12 months of CMS data might not appear in MAO-002. Samir
                clarified that the 12-month logic is relevant to MOR / payment modeling, not MAO-002 encounter
                reconciliation. Jay summarized the issue as a submission / reconciliation gap: either the plan did not
                submit the data to CMS, or Mercy does not have the MAO-002 file containing it.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                  MAO-002 / MAO-004 = encounter submission and acceptance reconciliation.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                  MOR = payment / model reconciliation.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                  New-enrollee logic affects payment / MOR interpretation, not whether a submitted encounter should
                  appear in MAO-002.
                </li>
              </ul>
            </CardContent>
          </Card>
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

          <Card className="border-primary/20 shadow-sm bg-primary/5">
            <CardHeader>
              <CardTitle className="font-serif text-lg">Recommended Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {NEXT_STEPS.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    {step}
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
