import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Target, Crosshair, Users, Clock, AlertTriangle, Package } from "lucide-react";

export default function Phase1() {
  return (
    <div className="max-w-6xl mx-auto p-8 md:p-12 fade-in">
      <header className="mb-12">
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
          <span>Topic 1</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span className="text-primary">Active</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Statement of Work</h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Discovery and Assessment of the client's encounter submission and Additional Submission Mechanism (ASM)
          processes, performed by HealthTrixss in connection with CMS risk adjustment requirements and the client's
          general RADV preparedness. The engagement is advisory in nature and conducted using commercially reasonable
          efforts.
        </p>
      </header>

      <Tabs defaultValue="objectives" className="w-full">
        <div className="border-b border-border mb-8 overflow-x-auto no-scrollbar">
          <TabsList className="h-auto p-0 bg-transparent flex justify-start gap-6">
            {[
              { id: "objectives", label: "Objectives", icon: Target },
              { id: "scope", label: "Scope", icon: Crosshair },
              { id: "stakeholders", label: "Stakeholders", icon: Users },
              { id: "timeline", label: "Timeline", icon: Clock },
              { id: "assumptions", label: "Assumptions", icon: CheckCircle2 },
              { id: "risks", label: "Risks", icon: AlertTriangle },
              { id: "deliverables", label: "Deliverables", icon: Package },
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

        <TabsContent value="objectives" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-sm bg-card">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Engagement Mandate</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate prose-p:leading-relaxed max-w-none text-muted-foreground">
                <p>
                  HealthTrixss is engaged to evaluate the client's encounter submission and Additional Submission
                  Mechanism (ASM) processes. The review is based on the documentation, data, system access, workflows,
                  logic, policies, procedures, and other information made available during the engagement.
                </p>
                <p>
                  The objective is to identify observations, risks, gaps, and recommendations relating to CMS risk
                  adjustment requirements and the client's general RADV preparedness — delivered in a neutral and
                  objective manner, and detailed enough to support implementation planning.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {[
                { title: "Assess Submission Processes", desc: "Review encounter submission and ASM workflows, logic, policies, and procedures end to end." },
                { title: "Identify Gaps & Risks", desc: "Surface process, workflow, or technology gaps measured against CMS risk adjustment requirements." },
                { title: "Evaluate RADV Preparedness", desc: "Assess general readiness with reference to CMS RADV audit standards." },
                { title: "Recommend Next Steps", desc: "Provide actionable, prioritized recommendations to inform implementation planning." }
              ].map((obj, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-lg border border-border bg-card/50">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif text-lg">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{obj.title}</h4>
                    <p className="text-sm text-muted-foreground">{obj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-border shadow-sm bg-accent/5">
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-xl">RAF Neutrality &amp; Independent Assessment</CardTitle>
              <CardDescription>A guiding principle that frames every objective above.</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <p>
                The assessment is not intended to increase, decrease, or otherwise influence risk adjustment factor (RAF)
                scores. Its purpose is to identify process, workflow, or technology gaps that may affect the accuracy and
                compliance of encounter submissions, evaluated with reference to applicable CMS requirements for Medicare
                Advantage risk adjustment and encounter data submissions.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scope" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/50 border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <CardTitle className="font-serif text-xl">In Scope</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {[
                    "Discovery and assessment of encounter submission and ASM processes",
                    "Review of available documentation, data, system access, workflows, logic, policies, and procedures",
                    "Identification of observations, risks, gaps, and recommendations relating to CMS risk adjustment requirements",
                    "Evaluation of general RADV preparedness with reference to CMS RADV audit standards",
                    "Neutral, objective assessment of process, workflow, and technology gaps affecting submission accuracy and compliance"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/50 border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <CardTitle className="font-serif text-xl">Out of Scope</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {[
                    "Clinical coding review or diagnosis validation",
                    "Implementation of changes to the client's risk adjustment submissions",
                    "Activities intended to increase, decrease, or influence RAF scores",
                    "Independent audit or verification of the accuracy or completeness of information provided",
                    "Any warranty or guarantee of a compliance outcome or CMS RADV audit result"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stakeholders" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border shadow-sm">
            <div className="divide-y divide-border">
              {[
                { abbr: "HT", org: "HealthTrixss, Inc.", role: "Service Provider", resp: "Performs the discovery and assessment Services; delivers observations, findings, and recommendations.", type: "Provider" },
                { abbr: "VH", org: "Virtix Health, LLC", role: "Prime Contractor", resp: "Contracting party under the Subcontractor Services Agreement; HealthTrixss is engaged as subcontractor.", type: "Prime" },
                { abbr: "M", org: "Mercy", role: "Client", resp: "Subject organization; provides access, data, and approvals, and owns all resulting deliverables.", type: "Client" },
                { abbr: "CMS", org: "Centers for Medicare & Medicaid Services", role: "Regulatory Reference", resp: "Risk adjustment and RADV audit standards used as the reference framework for the assessment.", type: "Reference" },
              ].map((party, i) => (
                <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-serif text-base text-primary shrink-0">
                      {party.abbr}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-lg">{party.org}</h4>
                      <p className="text-sm text-muted-foreground max-w-xl">{party.resp}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1 shrink-0">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{party.role}</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {party.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="relative border-l border-border ml-6 md:ml-8 space-y-12 py-6">
            {[
              { week: "Effective Date", phase: "Kickoff & Access Provisioning", desc: "Services begin upon the Effective Date. The client provisions required access, credentials, data feeds, payer details, and approvals needed to perform the assessment." },
              { week: "Discovery", phase: "Discovery & Assessment", desc: "Review of documentation, data, system access, workflows, logic, policies, and procedures to identify observations, risks, and gaps relating to CMS risk adjustment requirements and RADV preparedness." },
              { week: "Draft", phase: "Draft Deliverables & Readout", desc: "HealthTrixss provides the deliverables in draft form and conducts a readout session with the client." },
              { week: "10 Business Days", phase: "Client Review", desc: "The client provides one consolidated round of comments within ten business days of receiving the draft deliverables." },
              { week: "Final", phase: "Final Deliverables", desc: "HealthTrixss addresses mutually agreed comments and issues the final deliverables." },
              { week: "10 Business Days", phase: "Acceptance", desc: "The client provides written acceptance or identifies material deficiencies within ten business days; absent notice, the deliverables are deemed accepted." }
            ].map((milestone, i) => (
              <div key={i} className="relative pl-8">
                <div className="absolute w-4 h-4 bg-background border-2 border-primary rounded-full -left-[9px] top-1" />
                <div className="text-sm font-semibold text-primary uppercase tracking-widest mb-1">{milestone.week}</div>
                <h4 className="font-serif text-2xl text-foreground mb-2">{milestone.phase}</h4>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">{milestone.desc}</p>
              </div>
            ))}
           </div>
        </TabsContent>

        <TabsContent value="assumptions" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Assumptions, Dependencies &amp; Client Responsibilities</CardTitle>
              <CardDescription>Conditions the engagement relies on for successful delivery.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  "Information and documentation provided by the client will be relied upon; neither HealthTrixss nor Virtix Health will independently audit or verify its accuracy or completeness.",
                  "HealthTrixss and Virtix Health are not responsible for errors or omissions resulting from incomplete or inaccurate information provided by the client.",
                  "Timely access to required credentials, data feeds, payer details, and approvals will be provided by the client.",
                  "Services are advisory in nature and performed using commercially reasonable efforts.",
                  "Services are limited to discovery and assessment — no clinical coding review, diagnosis validation, or implementation of submission changes.",
                  "All deliverables are owned exclusively by the client; HealthTrixss retains only general knowledge, skills, methodologies, and know-how, excluding client confidential information."
                ].map((assumption, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-muted/30 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 opacity-70" />
                    <span className="text-sm text-foreground/80 leading-relaxed">{assumption}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-4">
            {[
              { risk: "Delayed Access or Approvals", sev: "High", mit: "Establish an access plan at kickoff. A delay in receiving required access, credentials, data feeds, payer details, or approvals may trigger a thirty-day written notice of intent to terminate the Services." },
              { risk: "Incomplete or Inaccurate Information", sev: "High", mit: "Reliance on client-provided information is documented; caveats are noted in findings, with no independent verification performed." },
              { risk: "Misinterpretation as RAF Influence", sev: "Medium", mit: "RAF neutrality is maintained throughout; the advisory, gap-focused scope is communicated clearly to all parties." },
              { risk: "Scope Expansion", sev: "Medium", mit: "Services remain strictly limited to discovery and assessment; any expansion is handled through a formal amendment." },
              { risk: "Acceptance Delays", sev: "Low", mit: "Defined ten-business-day review windows apply, with deliverables deemed accepted absent timely written notice." }
            ].map((item, i) => (
              <Card key={i} className="border-border shadow-sm">
                <div className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-foreground mb-1">{item.risk}</h4>
                    <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Mitigation:</span> {item.mit}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Severity</span>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      item.sev === 'High' ? 'bg-destructive/10 text-destructive' : item.sev === 'Medium' ? 'bg-amber-500/10 text-amber-700' : 'bg-emerald-500/10 text-emerald-700'
                    }`}>
                      {item.sev}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deliverables" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-6 flex items-start gap-3 p-4 rounded-lg border border-border bg-accent/5 text-sm text-muted-foreground">
            <Package className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <p>
              All deliverables, work product, documentation, analyses, and reports are owned exclusively by the client.
              Deliverables reflect industry-standard consulting practices and are sufficiently detailed to support
              implementation planning. Each is first issued in draft form alongside a readout session, then finalized
              after one consolidated round of client comments.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Current-State Assessment", type: "Report", desc: "Synthesis of encounter submission and ASM processes, capturing workflows, logic, policies, and procedures as observed." },
              { title: "Gap & Risk Analysis", type: "Report", desc: "Observations, risks, and gaps mapped against CMS risk adjustment requirements for encounter data submissions." },
              { title: "RADV Preparedness Assessment", type: "Report", desc: "Evaluation of general RADV readiness with reference to applicable CMS RADV audit standards." },
              { title: "Recommendations", type: "Roadmap", desc: "Prioritized, actionable recommendations detailed enough to support the client's implementation planning." },
              { title: "Readout Session", type: "Presentation", desc: "Facilitated walkthrough of the draft deliverables and key findings with client stakeholders." },
              { title: "Final Deliverables Package", type: "Package", desc: "Consolidated final deliverables incorporating mutually agreed client comments, owned exclusively by the client." }
            ].map((del, i) => (
              <Card key={i} className="border-border shadow-sm flex flex-col h-full hover:border-primary/50 transition-colors cursor-default">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <Package className="w-6 h-6 text-primary" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground bg-muted px-2 py-1 rounded">
                      {del.type}
                    </span>
                  </div>
                  <CardTitle className="font-serif text-xl">{del.title}</CardTitle>
                </CardHeader>
                <CardContent className="mt-auto">
                  <p className="text-sm text-muted-foreground">{del.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
