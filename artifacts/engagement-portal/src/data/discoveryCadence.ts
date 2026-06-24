import {
  Search,
  ShieldCheck,
  Network,
  Target,
  Users,
  MessagesSquare,
  UserSearch,
  ClipboardCheck,
  User,
  CalendarClock,
  FolderOpen,
  CalendarDays,
  Building2,
  type LucideIcon,
} from "lucide-react";

// Source: Mercy ASM Discovery & Assessment — Project Kickoff (06/01/2026),
// pages 5 ("4 weeks Discovery Process") and 6 ("Discovery Cadence").
// Stable ids are intentional anchors for later traceability analysis.

export type TraceItem = { id: string; text: string };

export type DiscoveryWeek = {
  id: string;
  number: number;
  dateRange: string;
  title: string;
  accent: string;
  icon: LucideIcon;
  keyActivities: TraceItem[];
  mercyInputs: TraceItem[];
  keyOutcome: TraceItem;
};

export const DISCOVERY_WEEKS: DiscoveryWeek[] = [
  {
    id: "W1",
    number: 1,
    dateRange: "Jun 8 – Jun 12",
    title: "Current-State Discovery",
    accent: "#15294d",
    icon: Search,
    keyActivities: [
      { id: "W1-A1", text: "Stakeholder interviews" },
      { id: "W1-A2", text: "ASM process walkthroughs (end-to-end)" },
      { id: "W1-A3", text: "ASM workflow, handoffs and roles review" },
      { id: "W1-A4", text: "Artifact and evidence collection" },
    ],
    mercyInputs: [
      { id: "W1-I1", text: "Current ASM workflow & process documentation" },
      { id: "W1-I2", text: "SOPs" },
      { id: "W1-I3", text: "Existing extraction logic" },
      { id: "W1-I4", text: "Health plan inventory" },
      { id: "W1-I5", text: "Sample ASM files" },
      { id: "W1-I6", text: "Current validation approach" },
    ],
    keyOutcome: {
      id: "W1-O1",
      text: "Shared understanding of current and future-state operating model",
    },
  },
  {
    id: "W2",
    number: 2,
    dateRange: "Jun 15 – Jun 19",
    title: "Validation & Reconciliation Assessment",
    accent: "#e2701b",
    icon: ShieldCheck,
    keyActivities: [
      { id: "W2-A1", text: "Review submission controls and validation logic" },
      { id: "W2-A2", text: "Analyze CMS and Health Plan response files" },
      { id: "W2-A3", text: "Reconciliation process review" },
      { id: "W2-A4", text: "Reject and exception management review" },
      { id: "W2-A5", text: "Resubmission process review" },
    ],
    mercyInputs: [
      { id: "W2-I1", text: "Health plan acknowledgement files" },
      { id: "W2-I2", text: "Reject files" },
      { id: "W2-I3", text: "Acceptance files" },
      { id: "W2-I4", text: "MAO-002" },
      { id: "W2-I5", text: "MAO-004" },
      { id: "W2-I6", text: "EDR files" },
      { id: "W2-I7", text: "Existing reconciliation processes" },
      { id: "W2-I8", text: "ICN linkage approach" },
      { id: "W2-I9", text: "Resubmission procedures" },
    ],
    keyOutcome: {
      id: "W2-O1",
      text: "Validation and reconciliation control assessment",
    },
  },
  {
    id: "W3",
    number: 3,
    dateRange: "Jun 22 – Jun 26",
    title: "Traceability & Future-State Evaluation",
    accent: "#2d6ca4",
    icon: Network,
    keyActivities: [
      { id: "W3-A1", text: "End-to-end data lineage and traceability review" },
      { id: "W3-A2", text: "Submission tracking and visibility assessment" },
      { id: "W3-A3", text: "Operational controls and auditability assessment" },
      { id: "W3-A4", text: "Health Plan-specific requirement alignment" },
      { id: "W3-A5", text: "Automation and optimization opportunities" },
    ],
    mercyInputs: [
      { id: "W3-I1", text: "Existing reporting and tracking outputs" },
      { id: "W3-I2", text: "Data lineage or process flow documentation" },
      { id: "W3-I3", text: "Business rules and control documentation" },
      { id: "W3-I4", text: "Health Plan communication and escalation processes" },
      { id: "W3-I5", text: "Pain points and improvement opportunities" },
    ],
    keyOutcome: {
      id: "W3-O1",
      text: "Gap analysis and future-state observations",
    },
  },
  {
    id: "W4",
    number: 4,
    dateRange: "Jun 29 – Jul 3",
    title: "Recommendations & Executive Readout",
    accent: "#4f6b3a",
    icon: Target,
    keyActivities: [
      { id: "W4-A1", text: "Consolidate assessment findings" },
      { id: "W4-A2", text: "Identify and prioritize opportunities" },
      { id: "W4-A3", text: "Develop recommendations and roadmap" },
      { id: "W4-A4", text: "Prepare executive presentation and final report" },
      { id: "W4-A5", text: "Validate findings with stakeholders" },
    ],
    mercyInputs: [
      { id: "W4-I1", text: "Review of findings" },
      { id: "W4-I2", text: "Prioritization guidance" },
      { id: "W4-I3", text: "Business objectives" },
      { id: "W4-I4", text: "Future-state constraints" },
      { id: "W4-I5", text: "Feedback on recommendations" },
    ],
    keyOutcome: {
      id: "W4-O1",
      text: "Executive-aligned roadmap and recommendations",
    },
  },
];

export const ASSESSMENT_SCOPE =
  "Review includes all participating Medicare Advantage Health Plans to evaluate validation, reconciliation, traceability, and operational consistency across payer-specific requirements. All participating Health Plans are covered.";

export const PARTICIPATING_HEALTH_PLANS: TraceItem[] = [
  { id: "HP1", text: "United Healthcare (UHC)" },
  { id: "HP2", text: "Aetna" },
  { id: "HP3", text: "Humana" },
  { id: "HP4", text: "Anthem" },
  { id: "HP5", text: "Blue Cross Blue Shield Arkansas" },
  { id: "HP6", text: "Blue Cross Blue Shield Oklahoma" },
  { id: "HP7", text: "Essence Health" },
];

export type CadenceItem = {
  id: string;
  icon: LucideIcon;
  label: string;
  detail?: string;
  highlight?: boolean;
};

export const WORKING_MODEL: CadenceItem[] = [
  { id: "WM1", icon: Users, label: "Weekly Project Status Meeting", detail: "30 min" },
  { id: "WM2", icon: MessagesSquare, label: "3 Discovery Working Sessions per Week", detail: "90 – 120 min each" },
  { id: "WM3", icon: UserSearch, label: "Ad Hoc SME Interviews", detail: "As needed" },
  { id: "WM4", icon: ClipboardCheck, label: "Weekly Findings Review and Action Tracking" },
];

export const WORKING_ASSUMPTIONS: CadenceItem[] = [
  { id: "WA1", icon: User, label: "Primary Mercy Contact", detail: "Sandra Weiler", highlight: true },
  { id: "WA2", icon: CalendarClock, label: "Meeting Cadence", detail: "3 working sessions per week", highlight: true },
  { id: "WA3", icon: FolderOpen, label: "Artifact Sharing Process", detail: "Teams channel managed by Sandra" },
  { id: "WA4", icon: Users, label: "Primary Discovery SMEs", detail: "Fred Chen, Jennifer Oldfather, Linda Reed, Ronald Goode" },
  { id: "WA5", icon: CalendarDays, label: "First Working Session", detail: "June 8, 2026", highlight: true },
  {
    id: "WA6",
    icon: Building2,
    label: "Health Plan Prioritization",
    detail: "Confirm whether all plans are reviewed equally or if UHC is used as initial baseline",
  },
];
