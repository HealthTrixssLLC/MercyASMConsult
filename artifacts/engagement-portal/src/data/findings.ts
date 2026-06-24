// Consolidated, de-duplicated index of the "Meeting Specific Findings" raised
// across the discovery discussion sessions (Jun 8 / 10 / 12, 2026). Each finding
// is given a stable id and flagged by the session(s) it surfaced in, then traced
// to the Gap & Risk register lane that carries its resolution.

export type FindingTag = "High" | "Medium" | "Opportunity" | "Affirmed" | "Governance" | "Validation";

export type RegisterLane = "Submission Lane" | "Reconciliation Lane";

export type Finding = {
  id: string;
  title: string;
  detail: string;
  tag: FindingTag;
  sessions: {
    jun08: boolean;
    jun10: boolean;
    jun12: boolean;
  };
  resolution: string;
  lane: RegisterLane;
  lanePath: string;
};

export const SESSION_COLUMNS: { key: keyof Finding["sessions"]; label: string; date: string }[] = [
  { key: "jun08", label: "Jun 8", date: "2026-06-08" },
  { key: "jun10", label: "Jun 10", date: "2026-06-10" },
  { key: "jun12", label: "Jun 12", date: "2026-06-12" },
];

const REC = "/reconciliation-strategy";
const SUB = "/submission-strategy";

export const FINDINGS: Finding[] = [
  {
    id: "F-01",
    title: "Knowledge concentration / key-person risk",
    detail:
      "The sweeps process rests largely with Linda; adds/deletes knowledge has eroded since the prior owner left, and Aaron Peterson is on leave.",
    tag: "High",
    sessions: { jun08: true, jun10: false, jun12: false },
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
    sessions: { jun08: true, jun10: false, jun12: false },
    resolution:
      "Establish a controlled, auditable error-correction pathway with a ticketing route back to the source system and tracked resolution.",
    lane: "Submission Lane",
    lanePath: SUB,
  },
  {
    id: "F-03",
    title: "Reconciliation framework & completeness gap",
    detail:
      "Response-file reconciliation is still being built (lag/coverage unknown, no confirmation deletes were applied in CMS/MAO responses); a formal submission inventory & reconciliation framework is needed for open-period, retroactive coding, duplicate prevention, MAO-002/MAO-004, and closed-loop acceptance tracking. Reinforced by payer-level evidence on Jun 12.",
    tag: "High",
    sessions: { jun08: true, jun10: true, jun12: true },
    resolution:
      "Stand up the formal reconciliation framework — submission inventory, MAO-002/004 matching, and closed-loop acceptance tracking.",
    lane: "Reconciliation Lane",
    lanePath: REC,
  },
  {
    id: "F-04",
    title: "Oracle → Databricks migration validation",
    detail:
      "Parity relies on a July side-by-side comparison; Linda's director still wants Oracle matching until Aaron returns.",
    tag: "Medium",
    sessions: { jun08: true, jun10: false, jun12: false },
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
    sessions: { jun08: true, jun10: false, jun12: false },
    resolution:
      "Evaluate and pilot a monthly submission cadence for willing payers as part of the submission operating model.",
    lane: "Submission Lane",
    lanePath: SUB,
  },
  {
    id: "F-06",
    title: "Traceability & net-impact analytics",
    detail:
      "Stronger tracking fields and net-impact analytics could reduce member-matching errors and strengthen reconciliation; submission traceability begins to emerge as a future-state concept.",
    tag: "Opportunity",
    sessions: { jun08: true, jun10: true, jun12: false },
    resolution:
      "Introduce submission tracking fields and net-impact analytics so each record can be traced end-to-end through reconciliation.",
    lane: "Reconciliation Lane",
    lanePath: REC,
  },
  {
    id: "F-07",
    title: "Future-state architecture is directionally correct",
    detail:
      "Centralized curation plus payer-specific export generation is the right long-term model for ASM modernization.",
    tag: "Affirmed",
    sessions: { jun08: false, jun10: true, jun12: false },
    resolution:
      "Carry the centralized-curation target operating model forward as the basis for the submission blueprint.",
    lane: "Submission Lane",
    lanePath: SUB,
  },
  {
    id: "F-08",
    title: "Curation becomes the highest-risk component",
    detail:
      "A defect in the curated layer could affect every payer simultaneously — the new single point of failure. Auditing curation in detail is essential because silent compliance errors are introduced there.",
    tag: "High",
    sessions: { jun08: false, jun10: true, jun12: false },
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
    sessions: { jun08: false, jun10: false, jun12: true },
    resolution:
      "Build a payer response-file inventory and pursue missing MAO-002/004 feeds to close the reconciliation blind spot.",
    lane: "Reconciliation Lane",
    lanePath: REC,
  },
  {
    id: "F-10",
    title: "Payer specs are not fully governed",
    detail:
      "Current-state logic is based on long-standing payer instructions; the team identified a need to request and retain current payer specs to confirm interpretations rather than relying on a 'nothing changed' confirmation.",
    tag: "Governance",
    sessions: { jun08: false, jun10: false, jun12: true },
    resolution:
      "Request, version, and retain current payer technical specs; govern interpretation changes through a controlled process.",
    lane: "Submission Lane",
    lanePath: SUB,
  },
  {
    id: "F-11",
    title: "UHC logic contains payer-specific assumptions requiring validation",
    detail:
      "Examples include CPT filtering, single CPT / service-line handling, bill type mapping, and legacy fields such as risk assessment code or specialty mapping.",
    tag: "Validation",
    sessions: { jun08: false, jun10: false, jun12: true },
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
    sessions: { jun08: false, jun10: false, jun12: true },
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
    sessions: { jun08: false, jun10: false, jun12: true },
    resolution:
      "Use this as the reference test case for payer-response reconciliation and completeness controls in the framework.",
    lane: "Reconciliation Lane",
    lanePath: REC,
  },
];
