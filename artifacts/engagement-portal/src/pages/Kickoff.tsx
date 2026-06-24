import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Users, Building2, Workflow } from "lucide-react";
import lifecycleDiagram from "@assets/image_1782278717142.png";

const STAKEHOLDERS = [
  {
    org: "Mercy",
    label: "Client",
    groups: [
      { role: "Executive Sponsors", people: ["Gavin Helton", "Michael Sarli"] },
      { role: "Project Lead", people: ["Sandra Weiler"] },
      { role: "Primary Discovery Resources", people: ["Fred Chen", "Jennifer Oldfather", "Linda Reed", "Ronald Goode"] },
      { role: "Supporting Participants", people: ["Amber Bruno", "Emily Hogan", "Kalli Castille", "Kate Barker", "Marie Collins Hespen", "Melissa Liehr"] },
    ],
  },
  {
    org: "Consulting Resources",
    label: "HealthTrixss / Virtix Health",
    groups: [
      { role: "Project Lead", people: ["Kate McClure", "Kenny Misir", "Lou Steinberg", "Jay Ahlmer"] },
      { role: "Supporting Participants", people: ["Samir Rawat", "Aaron Peterson (PTO)", "Vinod Gnawali", "Jay Baker"] },
    ],
  },
];

export default function Kickoff() {
  return (
    <div className="w-full px-6 md:px-10 py-8 md:py-10 fade-in">
      <header className="mb-12">
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
          <span className="text-primary">Active</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span>06 / 01 / 2026</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Kickoff</h1>
        <p className="text-base text-muted-foreground max-w-5xl leading-relaxed">
          Mercy — ASM Discovery &amp; Assessment. Mercy is evaluating its ASM direct-submission operating model as it
          transitions toward an Azure / Databricks future state. This kickoff aligns scope and stakeholders ahead of the
          discovery work.
        </p>
      </header>

      <Tabs defaultValue="overview" className="w-full">
        <div className="border-b border-border mb-8 overflow-x-auto no-scrollbar">
          <TabsList className="h-auto p-0 bg-transparent flex justify-start gap-6">
            {[
              { id: "overview", label: "Overview", icon: Compass },
              { id: "lifecycle", label: "Submission Lifecycle Flow", icon: Workflow },
              { id: "stakeholders", label: "Stakeholders", icon: Users },
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

        <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-sm bg-card">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Introduction</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Mercy is evaluating its ASM direct-submission operating model as and when it is transitioning toward an
                  Azure / Databricks future state.
                </p>
                <p>
                  This engagement examines how that model performs today and where it can be strengthened as the
                  underlying platform evolves.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm bg-accent/5">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Project Scope</CardTitle>
                <CardDescription>ASM Discovery &amp; Assessment</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p>
                  Evaluate the ASM direct-submission lifecycle — from ASM file generation through Health Plan validation,
                  processing, and CMS response reconciliation — to identify process, control, traceability, operational,
                  and future-state improvement opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lifecycle" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Submission Lifecycle Flow</CardTitle>
              <CardDescription>
                The end-to-end ASM direct-submission lifecycle — from clinical source through Health Plan and CMS, into
                the response reconciliation loop.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border bg-white p-4 md:p-6 overflow-x-auto">
                <img
                  src={lifecycleDiagram}
                  alt="ASM Discovery & Assessment lifecycle diagram: Mercy clinical source flows through provider encounter and ASM generation paths to the Health Plan and CMS, with a response reconciliation loop of compare, investigate, address and resubmit, and outcome."
                  className="w-full min-w-[720px] h-auto"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stakeholders" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {STAKEHOLDERS.map((party, i) => (
            <Card key={i} className="border-border shadow-sm">
              <CardHeader className="bg-muted/50 border-b border-border pb-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    <CardTitle className="font-serif text-xl">{party.org}</CardTitle>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {party.label}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {party.groups.map((group, j) => (
                    <div key={j}>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3">
                        {group.role}
                      </div>
                      <ul className="space-y-2">
                        {group.people.map((person, k) => (
                          <li key={k} className="flex items-center gap-3 text-foreground/80">
                            <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center font-serif text-xs text-primary shrink-0">
                              {person.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                            </span>
                            <span className="text-sm">{person}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
