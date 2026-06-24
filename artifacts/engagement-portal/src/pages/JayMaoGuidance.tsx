import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { SheetTable } from "@/components/SheetTable";
import { MAO_SHEETS } from "@/data/maoGuidance";
import { ChevronLeft, Table2, Info, Download } from "lucide-react";

const WORKBOOK_FILE = `${import.meta.env.BASE_URL}files/HealthTrixss-MAO-Guidance.xlsx`;

const GUIDANCE_SHEETS = [
  "Executive Summary",
  "Provider Action Matrix",
  "Control by Layer",
  "MAO-002 Early Warning",
  "Plan Data Requirements",
  "Sources & Notes",
];

const MODEL_SHEETS = [
  "2025 Annual Waterfall",
  "2025 Monthly Detail",
  "2025 Model Assumptions",
];

const SHEET_NOTES: Record<string, string> = {
  "Executive Summary":
    "The core operating principle — separate the CMS-coded MAO-004 outcome from the evidence required to establish the operational root cause.",
  "Provider Action Matrix":
    "Scenario-by-scenario root-cause logic: status/reason combinations, required data, the decision test, the confirmed control owner, and where the fix occurs.",
  "Control by Layer":
    "Determines whether a problem is provider-, plan/vendor-, or CMS-controlled across each operational layer.",
  "MAO-002 Early Warning":
    "How to read MAO-002 preliminary indicators as early-warning inputs ahead of the final MAO-004 outcome.",
  "Plan Data Requirements":
    "How a provider group should use the matrix, step by step, and the data each step depends on.",
  "Sources & Notes": "Source references, their use in the workbook, and operational notes.",
  "2025 Annual Waterfall":
    "Illustrative full-year reconciliation. Counts are synthetic and for modeling only.",
  "2025 Monthly Detail":
    "Formula-driven monthly reconciliation from provider submission through final outcome.",
  "2025 Model Assumptions":
    "The synthetic assumptions and rates that drive the illustrative waterfall and monthly detail.",
};

function sheetByName(name: string) {
  return MAO_SHEETS.find((s) => s.name === name);
}

function tabId(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function JayMaoGuidance() {
  const allOrdered = [...GUIDANCE_SHEETS, ...MODEL_SHEETS];

  return (
    <div className="w-full px-6 md:px-10 py-8 md:py-10 fade-in">
      <header className="mb-10">
        <Link
          href="/discussions/2026-06-10"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          June 10 · ASM Process Review
        </Link>
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
          <span className="text-primary">Reference Workbook</span>
          <span className="w-1 h-1 rounded-full bg-primary/30" />
          <span>MAO-004 Corrective-Action Playbook</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">HealthTrixss MAO Guidance</h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          The MAO-004 provider corrective-action workbook Jay Baker shared at the close of the June 10 session,
          reproduced in full. Every sheet, row, and value from the original workbook is preserved below — nothing is
          summarized or omitted.
        </p>
      </header>

      <Card className="border-border shadow-sm bg-accent/5 mb-8">
        <CardContent className="pt-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Nine worksheets — six guidance sheets and three illustrative model sheets. The model sheets use synthetic
            counts for illustration only. Tables scroll horizontally where the original workbook is wide.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue={tabId(allOrdered[0])} className="w-full">
        <div className="border-b border-border mb-8 overflow-x-auto no-scrollbar">
          <TabsList className="h-auto p-0 bg-transparent flex justify-start gap-6">
            {allOrdered.map((name) => (
              <TabsTrigger
                key={name}
                value={tabId(name)}
                className="pb-4 pt-2 px-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary text-muted-foreground hover:text-foreground transition-colors flex gap-2 items-center text-sm md:text-base font-medium whitespace-nowrap"
              >
                <Table2 className="w-4 h-4" />
                {name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {allOrdered.map((name) => {
          const sheet = sheetByName(name);
          if (!sheet) return null;
          return (
            <TabsContent
              key={name}
              value={tabId(name)}
              className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              {SHEET_NOTES[name] && (
                <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">{SHEET_NOTES[name]}</p>
              )}
              {name === "Executive Summary" && (
                <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4 mb-2">
                  <div className="flex-1 min-w-[12rem]">
                    <p className="text-sm font-medium text-foreground">Download the full workbook</p>
                    <p className="text-xs text-muted-foreground">
                      HealthTrixss-MAO-Guidance.xlsx — all nine worksheets, original Excel file.
                    </p>
                  </div>
                  <a
                    href={WORKBOOK_FILE}
                    download="HealthTrixss-MAO-Guidance.xlsx"
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download Excel
                  </a>
                </div>
              )}
              <SheetTable sheet={sheet} />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
