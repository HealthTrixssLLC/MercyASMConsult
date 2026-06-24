import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Target, Crosshair, Users, Clock, AlertTriangle, Package } from "lucide-react";

export default function Phase1() {
  return (
    <div className="max-w-6xl mx-auto p-8 md:p-12 fade-in">
      <header className="mb-12">
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
          <span>Phase 1</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span className="text-primary">Active</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Statement of Work</h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          This document defines the scope, objectives, and deliverables for the strategic transformation engagement between Atlas & Partners and the Client.
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
                <CardTitle className="font-serif text-2xl">Strategic Mandate</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate prose-p:leading-relaxed max-w-none text-muted-foreground">
                <p>
                  The primary objective of this engagement is to redesign the client's operational operating model to achieve a 20% reduction in time-to-market for new product launches, while maintaining rigorous quality and compliance standards.
                </p>
                <p>
                  We will evaluate current bottlenecks in the value chain, redesign cross-functional workflows, and implement a governance framework that empowers decentralized decision-making.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {[
                { title: "Operational Velocity", desc: "Reduce cycle times across product development phases." },
                { title: "Organizational Agility", desc: "Design a flatter, more responsive team structure." },
                { title: "Cost Optimization", desc: "Identify 15% in operational cost savings through process elimination." }
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
                    "Assessment of current state product development lifecycle",
                    "Design of target operating model (TOM)",
                    "Governance structure redesign and RACI matrices",
                    "Implementation roadmap and change management strategy",
                    "Executive coaching for top 10 leadership team members"
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
                    "Implementation of new IT systems or enterprise software",
                    "Detailed financial auditing or forensic accounting",
                    "Legal entity restructuring or M&A advisory",
                    "Direct management of client personnel",
                    "Real estate footprint optimization"
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
                { role: "Project Sponsor", name: "Sarah Jenkins", title: "Chief Operating Officer", type: "Client" },
                { role: "Engagement Partner", name: "Eleanor Davis", title: "Senior Partner", type: "Atlas" },
                { role: "Project Lead", name: "Michael Chang", title: "Engagement Manager", type: "Atlas" },
                { role: "Subject Matter Expert", name: "Dr. Robert Vance", title: "VP Product Strategy", type: "Client" },
              ].map((person, i) => (
                <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-serif text-lg text-primary">
                      {person.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-lg">{person.name}</h4>
                      <p className="text-sm text-muted-foreground">{person.title}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{person.role}</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {person.type}
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
              { week: "Weeks 1-3", phase: "Discovery & Assessment", desc: "Conduct 40+ stakeholder interviews, baseline current operational metrics, and map existing value chain." },
              { week: "Weeks 4-6", phase: "Target State Design", desc: "Develop the Target Operating Model (TOM), including new organizational structures and process workflows." },
              { week: "Weeks 7-9", phase: "Validation & Refinement", desc: "Iterate design with steering committee, finalize RACI, and build the implementation roadmap." },
              { week: "Week 10", phase: "Final Readout", desc: "Present final deliverables to the Board of Directors and transition to execution phase." }
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
              <CardTitle className="font-serif text-2xl">Key Engagement Assumptions</CardTitle>
              <CardDescription>Conditions necessary for the successful delivery of this engagement.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  "Timely access to key stakeholders (within 48 hours of request)",
                  "Client team will dedicate up to 20% capacity for working sessions",
                  "Existing data sets are accurate and will be provided in usable formats",
                  "No major organizational restructuring will occur during the 10-week period",
                  "Steering committee decisions will be final and adhere to the project timeline",
                  "Workspace and relevant systems access will be provisioned on Day 1"
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
              { risk: "Stakeholder Availability", sev: "High", mit: "Establish pre-scheduled weekly touchpoints and executive mandate for participation." },
              { risk: "Data Incompleteness", sev: "Medium", mit: "Use industry benchmarks to fill gaps; clearly document data caveats in findings." },
              { risk: "Scope Creep", sev: "Medium", mit: "Strictly adhere to the change request process outlined in the Master Services Agreement." },
              { risk: "Resistance to Change", sev: "High", mit: "Involve key detractors early in the design process to ensure co-creation and buy-in." }
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
                      item.sev === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-amber-500/10 text-amber-700'
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
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Current State Diagnostic", type: "Presentation", desc: "Detailed synthesis of stakeholder interviews, process bottlenecks, and baseline metrics." },
              { title: "Target Operating Model", type: "Framework", desc: "Comprehensive blueprint of the future state organizational structure and governance." },
              { title: "RACI Matrices", type: "Spreadsheet", desc: "Detailed roles and responsibilities mapped to the new operational workflows." },
              { title: "Implementation Roadmap", type: "Plan", desc: "Phased execution plan detailing immediate quick wins and long-term strategic shifts." },
              { title: "Executive Readout", type: "Presentation", desc: "Final summary deck tailored for the Board of Directors and C-suite." }
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
