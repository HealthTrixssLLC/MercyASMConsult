// Consolidated, de-duplicated index of the findings raised across the whole
// engagement — Pre Kickoff and Kickoff planning, the discovery discussion
// sessions (Jun 8 / 10 / 12, 2026), and the ASM SQL / Layout analysis. Each
// finding is given a stable id and flagged by the source(s) it surfaced in,
// then traced to the Gap & Risk register lane that carries its resolution.

export type FindingTag = "High" | "Medium" | "Opportunity" | "Affirmed" | "Governance" | "Validation";

export type RegisterLane = "Submission Lane" | "Reconciliation Lane";

export type FindingSourceKey = "preKickoff" | "kickoff" | "jun08" | "jun10" | "jun12" | "asmAnalysis";

export type Finding = {
  id: string;
  title: string;
  detail: string;
  tag: FindingTag;
  sources: Record<FindingSourceKey, boolean>;
  resolution: string;
  lane: RegisterLane;
  lanePath: string;
};

export const SOURCE_COLUMNS: { key: FindingSourceKey; label: string; path: string }[] = [
  { key: "preKickoff", label: "Pre Kickoff", path: "/kickoff-planning" },
  { key: "kickoff", label: "Kickoff", path: "/kickoff" },
  { key: "jun08", label: "Jun 8", path: "/discussions/2026-06-08" },
  { key: "jun10", label: "Jun 10", path: "/discussions/2026-06-10" },
  { key: "jun12", label: "Jun 12", path: "/discussions/2026-06-12" },
  { key: "asmAnalysis", label: "ASM Analysis", path: "/asm-analysis-current" },
];

const REC = "/reconciliation-strategy";
const SUB = "/submission-strategy";

function src(partial: Partial<Record<FindingSourceKey, boolean>>): Record<FindingSourceKey, boolean> {
  return {
    preKickoff: false,
    kickoff: false,
    jun08: false,
    jun10: false,
    jun12: false,
    asmAnalysis: false,
    ...partial,
  };
}

export const FINDINGS: Finding[] = [
  {
    id: "F-01",
    title: "Knowledge concentration / key-person risk",
    detail:
      "The sweeps process rests largely with Linda; adds/deletes knowledge has eroded since the prior owner left, and Aaron Peterson is on leave (~7 weeks) during the engagement.",
    tag: "High",
    sources: src({ preKickoff: true, jun08: true }),
    resolution:
      "Document roles and handoffs, cross-train back-ups, and codify the sweeps/adds-deletes logic so the process is not person-dependent.",
    lane: "Submission Lane",
    lanePath: SUB,
  },
  {
    id: "F-02",
    title: "Epic-origin error remediation gap",
    detail:
      "No compliant pathway to correct errors that originate in Epic, and no known ticketing route for Linda to flag them — flagged as potential value / revenue leakage.",
    tag: "High",
    sources: src({ jun08: true }),
    resolution:
      "Establish a controlled, auditable error-correction pathway with a ticketing route back to the source system and tracked resolution.",
    lane: "Submission Lane",
    lanePath: SUB,
  },
  {
    id: "F-03",
    title: "Reconciliation framework & completeness gap",
    detail:
      "CMS / payer acceptance tracking is immature; response-file reconciliation is still being built (lag/coverage unknown, no confirmation deletes were applied). A formal submission inventory & closed-loop reconciliation framework is needed for open-period, retroactive coding, duplicate prevention, and MAO-002/MAO-004 tracking. Reinforced by payer-level evidence on Jun 12.",
    tag: "High",
    sources: src({ preKickoff: true, jun08: true, jun10: true, jun12: true }),
    resolution:
      "Stand up the formal reconciliation framework — submission inventory, MAO-002/004 matching, and closed-loop acceptance tracking.",
    lane: "Reconciliation Lane",
    lanePath: REC,
  },
  {
    id: "F-04",
    title: "Oracle → Databricks migration validation",
    detail:
      "Oracle → Azure/Databricks transition is underway with the target still in flux; 20+ source tables consolidate into a curated layer that may introduce logic changes. Parity relies on a July side-by-side comparison, and Linda's director wants Oracle matching until Aaron returns.",
    tag: "Medium",
    sources: src({ preKickoff: true, jun08: true }),
    resolution:
      "Run a documented parity/validation comparison with sign-off criteria before retiring the Oracle path.",
    lane: "Submission Lane",
    lanePath: SUB,
  },
  {
    id: "F-05",
    title: "Monthly submission cadence opportunity",
    detail:
      "Larger payers (Humana, UHC) are open to monthly submission, easing monitoring and giving more time to react to rejections; smaller payers are uncertain.",
    tag: "Opportunity",
    sources: src({ preKickoff: true, jun08: true }),
    resolution:
      "Evaluate and pilot a monthly submission cadence for willing payers as part of the submission operating model.",
    lane: "Submission Lane",
    lanePath: SUB,
  },
  {
    id: "F-06",
    title: "Traceability & net-impact analytics",
    detail:
      "CMS / payer acceptance tracking is immature and SOP-to-design documentation is not fully aligned. Stronger tracking fields and net-impact analytics could reduce member-matching errors and strengthen reconciliation; submission traceability emerges as a future-state concept.",
    tag: "Opportunity",
    sources: src({ preKickoff: true, kickoff: true, jun08: true, jun10: true }),
    resolution:
      "Introduce submission tracking fields and net-impact analytics so each record can be traced end-to-end through reconciliation.",
    lane: "Reconciliation Lane",
    lanePath: REC,
  },
  {
    id: "F-07",
    title: "Future-state architecture is directionally correct",
    detail:
      "A canonical Mercy-format staging layer with payer-specific export generation (a generalized ASM engine that keeps payer logic out of the core) is the right long-term model — proposed in planning and affirmed in discovery.",
    tag: "Affirmed",
    sources: src({ preKickoff: true, kickoff: true, jun10: true }),
    resolution:
      "Carry the centralized-curation target operating model forward as the basis for the submission blueprint.",
    lane: "Submission Lane",
    lanePath: SUB,
  },
  {
    id: "F-08",
    title: "Curation becomes the highest-risk component",
    detail:
      "Consolidating 20+ source tables into a single curated layer makes it the new single point of failure — a defect could affect every payer at once and introduce silent compliance errors. Detailed auditing of curation is essential.",
    tag: "High",
    sources: src({ preKickoff: true, jun10: true }),
    resolution:
      "Add detailed controls and audit checks over the curated layer to catch silent, all-payer compliance defects.",
    lane: "Submission Lane",
    lanePath: SUB,
  },
  {
    id: "F-09",
    title: "Response file receipt is inconsistent by payer",
    detail:
      "Mercy receives MAO-004 for some payers and MAO-002 only for Blue Cross of Oklahoma. Several payers (Anthem, Arkansas, Essence, Global Health) provide no files, creating a material blind spot in reconciliation.",
    tag: "High",
    sources: src({ jun12: true }),
    resolution:
      "Build a payer response-file inventory and pursue missing MAO-002/004 feeds to close the reconciliation blind spot.",
    lane: "Reconciliation Lane",
    lanePath: REC,
  },
  {
    id: "F-10",
    title: "Payer specs are not fully governed",
    detail:
      "Current-state logic is based on long-standing payer instructions; the team identified a need to request and retain current payer specs to confirm interpretations rather than relying on a 'nothing changed' confirmation. The layout concept matrix shows many payer-specific spec ambiguities.",
    tag: "Governance",
    sources: src({ jun12: true, asmAnalysis: true }),
    resolution:
      "Request, version, and retain current payer technical specs; govern interpretation changes through a controlled process.",
    lane: "Submission Lane",
    lanePath: SUB,
  },
  {
    id: "F-11",
    title: "Payer-specific logic contains assumptions requiring validation",
    detail:
      "UHC logic includes CPT filtering, single CPT / service-line handling, bill type mapping, and legacy fields (risk assessment code, specialty mapping). The layout analysis confirms payer-specific differences — e.g. ICD indicator naming (ICD_Level / IDC_Level / ICD_INDIC) and POS carried in Type_of_Bill for Anthem professional records.",
    tag: "Validation",
    sources: src({ jun12: true, asmAnalysis: true }),
    resolution:
      "Validate each payer-specific assumption against current specs and document the confirmed rules in the submission logic.",
    lane: "Submission Lane",
    lanePath: SUB,
  },
  {
    id: "F-12",
    title: "Manual correction exists for UHC error files",
    detail:
      "Linda manually reviews UHC error files and corrects fixable issues. This works operationally today but should be controlled and tracked in the future-state process.",
    tag: "Opportunity",
    sources: src({ jun12: true }),
    resolution:
      "Formalize and track the error-correction step with controls so manual fixes are auditable and repeatable.",
    lane: "Submission Lane",
    lanePath: SUB,
  },
  {
    id: "F-13",
    title: "Blue Cross MAO-002 analysis surfaced a real reconciliation gap",
    detail:
      "Submitted records with attribution / HCC indicators were not found in MAO-002, creating a strong test case for payer-response reconciliation and completeness controls.",
    tag: "High",
    sources: src({ jun12: true }),
    resolution:
      "Use this as the reference test case for payer-response reconciliation and completeness controls in the framework.",
    lane: "Reconciliation Lane",
    lanePath: REC,
  },
  {
    id: "F-14",
    title: "Schedule / approval risk to the engagement timeline",
    detail:
      "Quarterly planning approval is pending and kickoff may slip to the next quarter (July start), compressing the discovery and validation window.",
    tag: "Medium",
    sources: src({ preKickoff: true }),
    resolution:
      "Confirm quarterly approval and sequence discovery so unblocked work proceeds on time while approval is finalized.",
    lane: "Submission Lane",
    lanePath: SUB,
  },
  {
    id: "F-15",
    title: "Payer layout concept mapping has unresolved ambiguities",
    detail:
      "The concept crosswalk leaves several mappings situational or to-confirm — e.g. submitter identifier / file-naming metadata, member CMS ID populated from plan ID, billing vs rendering/attending NPI separation, and facility-name field reuse — requiring payer confirmation before the destination mapping is locked.",
    tag: "Validation",
    sources: src({ asmAnalysis: true }),
    resolution:
      "Resolve each situational / to-confirm mapping with the payer and lock the destination field mapping in a controlled reference.",
    lane: "Submission Lane",
    lanePath: SUB,
  },
];
