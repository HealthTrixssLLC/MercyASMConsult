import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  ListChecks,
  Network,
  Database,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Route as RouteIcon,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { StrategyTable } from "@/components/StrategyTable";
import {
  SUB_EXEC,
  SUB_REGISTER,
  SUB_BLUEPRINT,
  SUB_DATA_MODEL,
  SUB_RULE_EXTERNALIZATION,
  SUB_LAYOUT_GOVERNANCE,
  SUB_QA_GATE,
  SUB_CONTROLS,
  SUB_PAYERS,
  SUB_ROADMAP,
  SUB_SOURCES,
} from "@/data/submissionStrategy";

const TABS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Executive Overview", icon: FileText },
  { id: "register", label: "Recommendation Register", icon: ListChecks },
  { id: "blueprint", label: "Submission Blueprint", icon: Network },
  { id: "data-model", label: "Data Model", icon: Database },
  { id: "governance", label: "Governance", icon: ShieldCheck },
  { id: "qa", label: "QA & Controls", icon: CheckCircle2 },
  { id: "payers", label: "Payer Playbook", icon: Building2 },
  { id: "roadmap", label: "Roadmap", icon: RouteIcon },
  { id: "sources", label: "Sources & Notes", icon: BookOpen },
];

export default function SubmissionStrategy() {
  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-8 md:py-10 fade-in">
      <header className="mb-12">
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
          <span className="text-primary">Recommendation Packet</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span>Submission Path</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
          Submission Strategy
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          {SUB_EXEC.narrative[0]?.text}
        </p>
        <p className="mt-4 text-sm font-medium text-foreground/80 max-w-3xl leading-relaxed border-l-2 border-primary pl-4">
          Submission creates the truth set; reconciliation enriches it. Standardize before
          payer-layout conversion — do not force payer layouts to become the canonical source model.
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

        {/* ---------------- Executive Overview ---------------- */}
        <TabsContent
          value="overview"
          className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {SUB_EXEC.narrative.map((item) => (
              <Card key={item.label} className="border-none shadow-sm bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif text-lg">{item.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUB_EXEC.metrics.map((m) => (
              <Card key={m.metric} className="border-none shadow-sm bg-card">
                <CardContent className="pt-6">
                  <div className="text-3xl font-serif text-primary">{m.value}</div>
                  <div className="mt-1 text-sm font-semibold text-foreground">{m.metric}</div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {m.interpretation}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <StrategyTable
            sheet={{
              title: "Core Future-State Layers",
              subtitle: "",
              headers: SUB_EXEC.layers.headers,
              rows: SUB_EXEC.layers.rows,
            }}
          />
        </TabsContent>

        <TabsContent
          value="register"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <StrategyTable sheet={SUB_REGISTER} />
        </TabsContent>

        <TabsContent
          value="blueprint"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <StrategyTable sheet={SUB_BLUEPRINT} />
        </TabsContent>

        <TabsContent
          value="data-model"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <StrategyTable sheet={SUB_DATA_MODEL} />
        </TabsContent>

        <TabsContent
          value="governance"
          className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <StrategyTable sheet={SUB_RULE_EXTERNALIZATION} />
          <StrategyTable sheet={SUB_LAYOUT_GOVERNANCE} />
        </TabsContent>

        <TabsContent
          value="qa"
          className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <StrategyTable sheet={SUB_QA_GATE} />
          <StrategyTable sheet={SUB_CONTROLS} />
        </TabsContent>

        <TabsContent
          value="payers"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <StrategyTable sheet={SUB_PAYERS} />
        </TabsContent>

        <TabsContent
          value="roadmap"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <StrategyTable sheet={SUB_ROADMAP} />
        </TabsContent>

        <TabsContent
          value="sources"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <StrategyTable sheet={SUB_SOURCES} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
