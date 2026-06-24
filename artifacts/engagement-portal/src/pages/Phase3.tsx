import React from "react";
import { Lock } from "lucide-react";

export default function Phase3() {
  return (
    <div className="max-w-4xl mx-auto p-8 md:p-12 h-full flex flex-col items-center justify-center text-center fade-in min-h-[60vh]">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-8">
        <Lock className="w-8 h-8 text-muted-foreground opacity-50" />
      </div>
      <h1 className="text-4xl font-serif text-foreground mb-4">Execution & Handover</h1>
      <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-8">
        This phase is currently locked. Detailed execution plans and handover documentation will be finalized during Phase 2.
      </p>
      <div className="h-px w-24 bg-border" />
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-8">
        Status: Upcoming
      </span>
    </div>
  );
}
