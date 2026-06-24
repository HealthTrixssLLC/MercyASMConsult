import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  FileText,
  ListChecks,
  Network,
  Database,
  Inbox,
  BarChart3,
  GitFork,
  Route as RouteIcon,
  Gauge,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { StrategyTable, priorityBadgeClass } from "@/components/StrategyTable";
import {
  REC_EXEC,
  REC_REGISTER,
  REC_BLUEPRINT,
  REC_DATA_MODEL,
  REC_RESPONSE_INVENTORY,
  REC_MATCHING_GRAIN,
  REC_MAO_COMPLETENESS,
  REC_MAO002,
  REC_MAO004,
  REC_ROOT_CAUSE,
  REC_ROADMAP,
  REC_CONTROLS,
  REC_SOURCES,
} from "@/data/reconciliationStrategy";

const TABS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Executive Overview", icon: FileText },
  { id: "register", label: "Recommendation Register", icon: ListChecks },
  { id: "blueprint", label: "Reconciliation Blueprint", icon: Network },
  { id: "data-model", label: "Data Model", icon: Database },
  { id: "intake", label: "Response Intake", icon: Inbox },
  { id: "mao", label: "MAO Analytics", icon: BarChart3 },
  { id: "root-cause", label: "Root Cause & Ownership", icon: GitFork },
  { id: "roadmap", label: "Roadmap", icon: RouteIcon },
  { id: "controls", label: "Controls & KPIs", icon: Gauge },
  { id: "sources", label: "Sources & Notes", icon: BookOpen },
];

export default function ReconciliationStrategy() {
  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-8 md:py-10 fade-in">
      <header className="mb-12">
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
          <span className="text-primary">Recommendation Packet</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span>Reconciliation Path</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
          Reconciliation Strategy
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          {REC_EXEC.narrative[0]?.summary}
        </p>
        <p className="mt-4 text-sm font-medium text-foreground/80 max-w-3xl leading-relaxed border-l-2 border-primary pl-4">
          Submission creates the truth set; reconciliation enriches it with HP/CMS outcome and
          operational ownership.
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
            {REC_EXEC.narrative.map((item) => (
              <Card key={item.section} className="border-none shadow-sm bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif text-lg">{item.section}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REC_EXEC.metrics.map((m) => (
              <Card key={m.metric} className="border-none shadow-sm bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-foreground">{m.metric}</div>
                    {m.priority && (
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                          priorityBadgeClass(m.priority),
                        )}
                      >
                        {m.priority}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{m.answer}</p>
                  {m.definition && (
                    <p className="mt-2 text-xs text-muted-foreground/70 italic leading-relaxed">
                      {m.definition}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="register"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <StrategyTable sheet={REC_REGISTER} />
        </TabsContent>

        <TabsContent
          value="blueprint"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <StrategyTable sheet={REC_BLUEPRINT} />
        </TabsContent>

        <TabsContent
          value="data-model"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <StrategyTable sheet={REC_DATA_MODEL} />
        </TabsContent>

        <TabsContent
          value="intake"
          className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <StrategyTable sheet={REC_RESPONSE_INVENTORY} />
          <StrategyTable sheet={REC_MATCHING_GRAIN} />
        </TabsContent>

        <TabsContent
          value="mao"
          className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <p className="text-sm font-medium text-foreground/80 max-w-3xl leading-relaxed border-l-2 border-amber-400 pl-4">
            MAO-004 outcome alone does not prove root cause; confirm completeness and match grain
            before escalating.
          </p>
          <StrategyTable sheet={REC_MAO_COMPLETENESS} />
          <StrategyTable sheet={REC_MAO002} />
          <StrategyTable sheet={REC_MAO004} />
        </TabsContent>

        <TabsContent
          value="root-cause"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <StrategyTable sheet={REC_ROOT_CAUSE} />
        </TabsContent>

        <TabsContent
          value="roadmap"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <StrategyTable sheet={REC_ROADMAP} />
        </TabsContent>

        <TabsContent
          value="controls"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <StrategyTable sheet={REC_CONTROLS} />
        </TabsContent>

        <TabsContent
          value="sources"
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <StrategyTable sheet={REC_SOURCES} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
