// AUTO-GENERATED from the consultant recommendation workbook. Transcribed verbatim.
// Do not hand-edit; regenerate from the source .xlsx if content changes.

export type StrategySheet = {
  title: string;
  subtitle: string;
  headers: string[];
  rows: string[][];
};

export type RecExec = {
  title: string;
  subtitle: string;
  narrative: { section: string; summary: string }[];
  metrics: { metric: string; answer: string; priority: string; definition: string }[];
};

export const REC_EXEC: RecExec = {
  "title": "Mercy ASM Reconciliation Path Recommendation Packet",
  "subtitle": "Consultant analysis packet focused on response intake, MAO completeness, reverse reconciliation, root-cause/actionability, and analytics.",
  "narrative": [
    {
      "section": "Consultant Position",
      "summary": "The reconciliation path should not be a separate reporting workaround. It should be a reverse-status engine that updates the same Mercy-format staged submission inventory created by the submission path."
    },
    {
      "section": "Current-State Pattern",
      "summary": "Mercy has started analyzing MAO/response data, but reconciliation remains limited by inconsistent payer response-file availability, manual or semi-manual loading, payer-specific outbound file structures, and incomplete end-to-end status traceability."
    },
    {
      "section": "Target-State Recommendation",
      "summary": "Load HP acknowledgements/rejects, MAO-002, MAO-004, and payer-specific responses into governed response tables; match them back to the staged submission inventory at the best available grain; update each staged record with response status, reason, actionability, and evidence."
    },
    {
      "section": "Design Principle",
      "summary": "Submission creates the truth set. Reconciliation enriches that truth set with HP/CMS outcome and operational ownership."
    },
    {
      "section": "Immediate Priority",
      "summary": "Start with MAO-004 completeness and status analytics for Aetna, BCBSOK, Humana, and UHC; use BCBSOK as the MAO-002 pilot; track response-file gaps for Anthem, Arkansas, Essence, and Global Health."
    },
    {
      "section": "Why It Matters",
      "summary": "Without a governed response inventory and staged-record status model, Mercy cannot reliably answer what was submitted, what was accepted by the health plan, what was accepted by CMS, what was rejected, what is pending, who owns correction, or which gaps are caused by missing payer files."
    }
  ],
  "metrics": [
    {
      "metric": "Response Coverage",
      "answer": "Which payers provide MAO-004, MAO-002, ACK/reject files, and with what cadence",
      "priority": "High",
      "definition": "Needed to establish reliable reconciliation controls or address material current-state gap."
    },
    {
      "metric": "Completeness",
      "answer": "Whether DOS months are represented consistently and mature enough for analysis",
      "priority": "Medium",
      "definition": "Important for operational scalability after core controls exist."
    },
    {
      "metric": "Match Rate",
      "answer": "% staged records matched to HP/CMS response by response type",
      "priority": "Low",
      "definition": "Useful enhancement once foundational reconciliation capabilities mature."
    },
    {
      "metric": "Acceptance Rate",
      "answer": "% accepted by HP and accepted by CMS by payer, DOS, provider, facility, diagnosis/HCC",
      "priority": "",
      "definition": ""
    },
    {
      "metric": "Actionability",
      "answer": "% rejected/disallowed records classified as provider-actionable, plan-actionable, shared, CMS-rule-based, or no-action",
      "priority": "",
      "definition": ""
    }
  ]
};

export const REC_REGISTER: StrategySheet = {
  "title": "Reconciliation Recommendation Register",
  "subtitle": "Prioritized HealthTrixss recommendations for Mercy's ASM reconciliation track.",
  "headers": [
    "ID",
    "Recommendation",
    "Current Gap / Risk",
    "Consultant Action",
    "Priority",
    "Time Horizon",
    "Owner / Stakeholder",
    "Dependency",
    "Future-State Component",
    "Success Measure"
  ],
  "rows": [
    [
      "REC-01",
      "Create a governed response-file inventory",
      "Mercy does not consistently receive response files across all payers; lack of inventory can make missing data look like rejected or unsubmitted data.",
      "Track expected/received response files by payer, file type, received date, source file name, DOS coverage, record count, member count, load status, and owner.",
      "High",
      "0-30 days",
      "Risk adjustment / payer operations",
      "Payer contacts and file receipt process",
      "Response Intake",
      "100% of received files logged; missing expected files flagged by payer/month."
    ],
    [
      "REC-02",
      "Standardize response intake tables",
      "MAO files, payer rejections, and acknowledgements are handled differently by payer and source.",
      "Create standard response tables for MAO-004, MAO-002, HP acknowledgement/reject files, and payer-specific response files, while preserving raw source file lineage.",
      "High",
      "0-60 days",
      "Data engineering / Jennifer",
      "File inventory and storage standards",
      "Standard Response Layer",
      "Every response record tied to source file, load run, payer, and response type."
    ],
    [
      "REC-03",
      "Define response-type-specific matching grain",
      "A single grain is not realistic because MAO-004 does not support all fields needed for NPI/claim-level matchback.",
      "Match MAO-004 at member + DOS/through DOS + diagnosis where possible; use richer grain for MAO-002 and HP responses when claim/line/provider fields are available.",
      "High",
      "0-60 days",
      "HealthTrixss + data engineering",
      "Staged submission inventory",
      "Matching Strategy",
      "Documented match hierarchy approved; match-rate calculated by response type."
    ],
    [
      "REC-04",
      "Update staged records with reconciliation status",
      "Current comparison requires re-ingesting outbound files or building ad hoc comparison tables.",
      "Use reverse reconciliation to update staged records with status: submitted, accepted by HP, accepted by CMS, rejected, pending, resubmitted, closed, and actionability classification.",
      "High",
      "60-120 days",
      "Data engineering / reconciliation lead",
      "Canonical staged source",
      "Reverse Reconciliation Engine",
      "% of staged records with current status and response-source lineage."
    ],
    [
      "REC-05",
      "Run MAO-004 completeness analysis before outcome analytics",
      "Incomplete or cumulative MAO files can distort acceptance/rejection analytics.",
      "Analyze record/member/diagnosis counts by payer, source file, DOS month, received month, and file methodology before interpreting outcomes.",
      "High",
      "0-30 days",
      "Jennifer / analytics",
      "Loaded MAO-004 files",
      "MAO Completeness",
      "Completeness profile produced for each payer with MAO-004."
    ],
    [
      "REC-06",
      "Classify payer file methodology",
      "Aetna appears cumulative; other payer methodologies may be cumulative, delta, replacement, or unknown.",
      "Classify response files by payer as cumulative, delta, replacement, or unknown and apply appropriate de-duplication/latest-file logic.",
      "High",
      "0-60 days",
      "Analytics / payer ops",
      "File history by payer",
      "File Methodology",
      "Methodology assigned to each payer/file type with documented logic."
    ],
    [
      "REC-07",
      "Use BCBSOK as MAO-002 pilot",
      "MAO-002 appears available for only BCBSOK, but it is valuable for reason-code and early-warning analysis.",
      "Pilot MAO-002 ingestion, edit/reason-code parsing, and linkback to staged records using BCBSOK; generalize after pilot.",
      "High",
      "30-90 days",
      "Jennifer / data engineering",
      "BCBSOK MAO-002 files",
      "MAO-002 Early Warning",
      "MAO-002 match and reason-code dashboard available for BCBSOK."
    ],
    [
      "REC-08",
      "Apply Jay's actionability framework",
      "MAO-004 outcome alone does not prove root cause or provider responsibility.",
      "Classify exceptions as provider-controlled, plan/vendor-controlled, shared, CMS-rule/no-action, timing/deadline, or unknown pending evidence.",
      "High",
      "30-90 days",
      "Risk adjustment ops / Jay / HealthTrixss",
      "MAO-002, source claim, plan submission evidence",
      "Root Cause & Actionability",
      "% exceptions assigned actionability category and owner."
    ],
    [
      "REC-09",
      "Add operational queue for corrections and escalations",
      "Rejected/disallowed records may not consistently move to resolution, resubmission, or payer escalation.",
      "Create a workqueue with owner, due date, evidence needed, action taken, resubmission reference, and closure reason.",
      "Medium",
      "60-120 days",
      "Operations / coding / payer relations",
      "Status model and actionability categories",
      "Exception Workflow",
      "Aged pending exceptions and closure rates tracked."
    ],
    [
      "REC-10",
      "Move reconciliation analytics to accessible reporting layer",
      "Operations users may not have Databricks access; reconciliation visibility cannot remain developer-only.",
      "Publish Power BI or portal dashboards from staged + response status tables for submission volume, acceptance, rejection, pending, root cause, and payer gaps.",
      "Medium",
      "90-180 days",
      "Analytics / operations",
      "Staged repository and status tables",
      "Analytics & Reporting",
      "Operations can view payer-level and record-level status without Databricks access."
    ]
  ]
};

export const REC_BLUEPRINT: StrategySheet = {
  "title": "Recommended Reconciliation Blueprint",
  "subtitle": "Target-state flow from response acquisition through status update and reporting.",
  "headers": [
    "Step",
    "Layer",
    "Purpose",
    "Key Activities",
    "Key Data / Fields",
    "Output",
    "Control Point",
    "Primary Owner",
    "Notes"
  ],
  "rows": [
    [
      "1",
      "Response File Acquisition",
      "Know what Mercy expects and receives from each payer.",
      "Capture file type, received date, file name, payer, DOS coverage, record/member/DX counts, and load status.",
      "Payer, file type, received date, source file name, DOS from/thru, record count",
      "Response-file inventory",
      "Missing-file alert",
      "Payer operations",
      "Must include payers with no files as explicit gaps."
    ],
    [
      "2",
      "Raw Response Archive",
      "Preserve original files for audit and reprocessing.",
      "Store raw MAO/HP files with immutable source metadata.",
      "Raw file, hash/control totals, load batch ID",
      "Raw response archive",
      "File hash and row count",
      "Data engineering",
      "Do not overwrite source files."
    ],
    [
      "3",
      "Standard Response Tables",
      "Normalize response records while preserving raw lineage.",
      "Parse MAO-004, MAO-002, ACK/reject files, payer responses into structured tables.",
      "Member ID, DOB if available, DOS, diagnosis, ICN/claim/ref, status/reason/edit",
      "Standard response data",
      "Parse error / reject queue",
      "Data engineering",
      "Use separate tables by response type if grain differs."
    ],
    [
      "4",
      "Completeness Profiling",
      "Determine whether files are analytically usable.",
      "Trend counts by source file, payer, DOS month, received month, member, DX, row-per-member.",
      "Counts, DOS distribution, payer methodology",
      "Completeness score / flag",
      "Lag and missing-month flags",
      "Analytics",
      "Run before outcome conclusions."
    ],
    [
      "5",
      "Matching Engine",
      "Match response records back to staged submission inventory.",
      "Apply matching hierarchy by response source; assign match confidence and exception reason.",
      "Run ID, member, DOS, DX, NPI/claim/ref when available",
      "Matched/unmatched response records",
      "Match rate and exception reason",
      "Data engineering / HealthTrixss",
      "MAO-004 may need flexible grain."
    ],
    [
      "6",
      "Status Update",
      "Update staged records with HP/CMS outcome.",
      "Apply status, response source, reason code, actionability, evidence, last-updated date.",
      "Accepted/rejected/pending/resubmitted flags",
      "Staged source updated",
      "Status history/audit",
      "Reconciliation lead",
      "Never lose prior statuses; use history table."
    ],
    [
      "7",
      "Root Cause Triage",
      "Determine who can act and what action is appropriate.",
      "Use Jay's framework plus MAO-002, payer reject, source claim, plan-submitted values, timing.",
      "Evidence checklist, owner, corrective action",
      "Operational exception queue",
      "Actionability classification",
      "Risk adjustment ops",
      "MAO-004 alone is not root cause."
    ],
    [
      "8",
      "Analytics & Reporting",
      "Give operations and leaders visibility into status and trends.",
      "Report submission volumes, acceptance, rejection, pending, turnaround, payer gaps, root cause.",
      "Staged + response status tables",
      "Dashboards / operational reports",
      "Reconciled-to-source status",
      "Analytics / operations",
      "Prefer Power BI or web layer for access."
    ]
  ]
};

export const REC_DATA_MODEL: StrategySheet = {
  "title": "Recommended Reconciliation Data Model",
  "subtitle": "Core tables needed to support closed-loop ASM reconciliation.",
  "headers": [
    "Table / Entity",
    "Purpose",
    "Key Fields",
    "Grain",
    "Feeds",
    "Outputs To",
    "Retention / Audit",
    "Notes",
    "Priority"
  ],
  "rows": [
    [
      "ASM_Staged_Submission",
      "Authoritative inventory of records Mercy intended to submit.",
      "Run ID, health plan, member, DOS, diagnosis, provider/NPI, claim/encounter/ref IDs, source lineage",
      "Run + HP + member + DOS + DX + provider/NPI + source IDs",
      "ASM engine",
      "Layout conversion, reconciliation",
      "Keep run history and status history",
      "Created in submission path; reconciliation updates status.",
      "High"
    ],
    [
      "ASM_Run_Control",
      "Execution metadata for each submission run.",
      "Run ID, run type, parameters, executed by, timestamp, record counts, prior run, latest flag",
      "One row per engine run",
      "ASM engine",
      "Audit, QA, reconciliation",
      "Permanent/auditable",
      "Required for rerun and latest-run logic.",
      "High"
    ],
    [
      "Response_File_Inventory",
      "Control table for expected/received response files.",
      "Payer, response type, file name, received date, DOS coverage, counts, load status, methodology",
      "One row per response file",
      "Payer file receipt",
      "Completeness dashboards, ingestion",
      "Permanent/auditable",
      "Foundation for response completeness.",
      "High"
    ],
    [
      "Response_Load_Control",
      "Technical ingestion metadata.",
      "Load batch ID, file ID, parse status, errors, row counts, hash/control totals",
      "One row per load execution",
      "Response ingestion",
      "Data quality/audit",
      "Permanent/auditable",
      "Separates file receipt from successful load.",
      "High"
    ],
    [
      "MAO004_Response",
      "Structured MAO-004 response data.",
      "Payer, member, DOS/through DOS, diagnosis, CMS status/reason, ICN/source fields, source file ID",
      "One row per parsed MAO-004 diagnosis/status record",
      "MAO-004 files",
      "Matching engine, analytics",
      "Keep raw + standardized",
      "Use flexible matching and de-dup logic.",
      "High"
    ],
    [
      "MAO002_Response",
      "Structured MAO-002 early-warning/line-level response data.",
      "Payer, member, encounter/claim/line, DOS, diagnosis, edit/reason, preliminary/final status, source file ID",
      "One row per MAO-002 transaction/line/status record",
      "MAO-002 files",
      "Root cause, workqueue",
      "Keep raw + standardized",
      "Pilot with BCBSOK.",
      "High"
    ],
    [
      "HP_Response",
      "Payer acknowledgement/reject/response detail.",
      "Payer, file name, member/ref IDs, DOS, diagnosis, reject reason, field/value, source file ID",
      "Varies by payer response",
      "HP response files",
      "Operational workqueue",
      "Keep raw + standardized",
      "Build incrementally as payers provide files.",
      "Medium"
    ],
    [
      "Reconciliation_Match",
      "Stores match results between response records and staged records.",
      "Staged record ID, response record ID, match type, match confidence, matched fields, match timestamp",
      "One row per match attempt/result",
      "Matching engine",
      "Status update, audit",
      "Keep match history",
      "Enables explainable reconciliation.",
      "High"
    ],
    [
      "Status_History",
      "Tracks status changes over time.",
      "Staged record ID, status, status source, reason, response file ID, updated by/process, timestamp",
      "One row per status event",
      "Reverse reconciliation",
      "Dashboards, audit",
      "Permanent/auditable",
      "Do not overwrite status without history.",
      "High"
    ],
    [
      "Exception_Workqueue",
      "Operational queue for corrections, escalations, and closure.",
      "Exception ID, staged record ID, response record ID, category, owner, due date, action, closure reason",
      "One row per actionable exception",
      "Status/actionability engine",
      "Operations, payer escalation",
      "Keep closure history",
      "Can later integrate with workflow app.",
      "Medium"
    ]
  ]
};

export const REC_RESPONSE_INVENTORY: StrategySheet = {
  "title": "Response File Inventory Model",
  "subtitle": "Recommended metadata to track payer response completeness, receipt, and load status.",
  "headers": [
    "Field",
    "Definition",
    "Required?",
    "Example / Values",
    "Why It Matters",
    "Owner"
  ],
  "rows": [
    [
      "Health Plan",
      "Payer or health plan name associated with the response file.",
      "Yes",
      "UHC, Humana, Aetna, BCBSOK, Anthem, Essence, Global Health",
      "Enables payer-level completeness, SLA, and acceptance analytics.",
      "Payer ops / data engineering"
    ],
    [
      "Response Type",
      "Type of file or response source.",
      "Yes",
      "MAO-004, MAO-002, ACK, Reject File, HP Response, MOR/MMR",
      "Different response types have different grains and uses.",
      "Data engineering"
    ],
    [
      "Expected?",
      "Whether Mercy expects this response type from the payer.",
      "Yes",
      "Expected / Not Expected / Unknown",
      "Separates missing file from non-applicable file.",
      "Payer ops"
    ],
    [
      "Received Date",
      "Date Mercy received or accessed the file.",
      "Yes",
      "YYYY-MM-DD",
      "Used for timeliness, SLA, and lag analysis.",
      "Payer ops / data engineering"
    ],
    [
      "Source File Name",
      "Original file name as received.",
      "Yes",
      "payer_file_YYYYMMDD.txt",
      "Supports audit, reprocessing, and duplicate detection.",
      "Data engineering"
    ],
    [
      "DOS From / Through",
      "Service date range represented by the file, if determinable.",
      "Yes",
      "2025-01-01 to 2025-12-31",
      "Needed to assess completeness by DOS month.",
      "Analytics"
    ],
    [
      "Received Month",
      "Month file was received/loaded.",
      "Yes",
      "2026-06",
      "Needed to distinguish file load timing from DOS coverage.",
      "Analytics"
    ],
    [
      "Record Count",
      "Raw count of records in the file after parsing.",
      "Yes",
      "123,456",
      "Control total and anomaly detection.",
      "Data engineering"
    ],
    [
      "Distinct Member Count",
      "Distinct member IDs represented.",
      "Recommended",
      "12,345",
      "Normalizes response coverage by payer population.",
      "Analytics"
    ],
    [
      "Distinct Diagnosis Count",
      "Distinct member + DOS + DX count, where available.",
      "Recommended",
      "45,678",
      "Core metric for MAO completeness and match rate.",
      "Analytics"
    ],
    [
      "File Methodology",
      "How the payer sends the file over time.",
      "Yes",
      "Cumulative / Delta / Replacement / Unknown",
      "Prevents double counting or missing-file blind spots.",
      "HealthTrixss / analytics"
    ],
    [
      "Load Status",
      "Whether the file was loaded successfully.",
      "Yes",
      "Received / Loaded / Failed / Partially Loaded / Excluded",
      "Supports operational monitoring and remediation.",
      "Data engineering"
    ],
    [
      "Load Batch ID",
      "Internal ID for ingestion execution.",
      "Yes",
      "RESP_LOAD_20260624_001",
      "Creates lineage between file and parsed response rows.",
      "Data engineering"
    ],
    [
      "Notes / Issues",
      "Free-text notes about missing files, file defects, anomalies, or payer follow-up.",
      "Recommended",
      "Missing MAO-004 for Anthem; file rejected due delimiter issue",
      "Captures context for leadership and payer escalation.",
      "Payer ops"
    ]
  ]
};

export const REC_MATCHING_GRAIN: StrategySheet = {
  "title": "Response Matching & Grain Strategy",
  "subtitle": "Recommended match hierarchy by response source and available data grain.",
  "headers": [
    "Response Source",
    "Primary Use",
    "Best Available Match Grain",
    "Fields Commonly Needed",
    "Limitations",
    "Recommended Matching Approach",
    "Output Status",
    "Confidence Rule",
    "Notes"
  ],
  "rows": [
    [
      "MAO-004",
      "Final CMS risk-adjustment processing visibility",
      "Member + DOS/through DOS + Diagnosis; provider/NPI only if linked from staged/source data",
      "Member ID/MBI/HICN, DOS through, diagnosis, status/reason, ICN when available",
      "Does not reliably support full provider/NPI-level matchback; can be cumulative by payer.",
      "Use flexible grain; classify file methodology; de-duplicate as needed; update staged records at best available grain.",
      "Accepted by CMS / Rejected or Disallowed / Pending / Not Found",
      "High when exact member+DOS+DX match; medium when date/member mappings require normalization.",
      "Use for acceptance trend, not root cause by itself."
    ],
    [
      "MAO-002",
      "Early warning and transaction/reason-code detail",
      "Member + claim/encounter/line + DOS + Diagnosis + reason/edit where available",
      "Encounter/claim/reference, line, diagnosis, edit code, preliminary/final status",
      "Available only for some payers in current materials; interpretation requires source/plan evidence.",
      "Pilot with BCBSOK; parse reason/edit codes; match to staged/source claims; assign early action queue.",
      "Preliminary allowable/disallowable/final reject",
      "High if claim/line identifiers align; medium if member+DOS+DX only.",
      "Best input for root-cause triage."
    ],
    [
      "Health Plan ACK",
      "Confirm file receipt/acceptance at payer intake",
      "File name + Run ID + submission timestamp + record count",
      "File name, received timestamp, accepted/rejected indicator, counts",
      "May not include line-level detail.",
      "Tie to submission run and file control totals; update file-level status.",
      "Received / Accepted by HP Intake / Rejected at Intake",
      "High when file name/control totals match.",
      "Useful before CMS response is available."
    ],
    [
      "Health Plan Reject File",
      "Operational correction and resubmission queue",
      "Member + claim/ref + DOS + Diagnosis + Provider/NPI if present",
      "Reject reason, field name, original value, member identifiers",
      "Payer formats vary; not all payers provide files.",
      "Normalize to standard reject table; match to staged record; route to owner based on reason.",
      "Rejected by HP / Correctable / Escalate / Closed",
      "High with payer reference ID; medium with member+DOS+DX.",
      "Should drive operational workqueue."
    ],
    [
      "MOR/MMR",
      "Payment/model-level reconciliation",
      "Member + HCC/model/payment period",
      "Member, HCC, model year, payment month",
      "Not a direct substitute for encounter/diagnosis acceptance status.",
      "Use after MAO response maturity for payment impact and model validation.",
      "Paid / Not Paid / Model Impact",
      "Separate from submission status.",
      "Later maturity item, not first reconciliation loop."
    ]
  ]
};

export const REC_MAO_COMPLETENESS: StrategySheet = {
  "title": "MAO Completeness & File Methodology Analysis",
  "subtitle": "Controls to determine whether MAO data is complete enough for reliable reconciliation and analytics.",
  "headers": [
    "Control ID",
    "Completeness Control",
    "Question It Answers",
    "Recommended Metric",
    "Payer-Specific Note",
    "Risk if Missing",
    "Priority",
    "Implementation Note",
    "Output",
    "Owner"
  ],
  "rows": [
    [
      "MC-01",
      "DOS month distribution",
      "Are all service months reasonably represented in the MAO data?",
      "Record/member/DX counts by payer + DOS month + source file",
      "Critical for all MAO-004 payers",
      "Missing file months can be mistaken for rejected/unsubmitted records.",
      "High",
      "Group by actual DOS/through-DOS month; compare to expected historical volume.",
      "Completeness heatmap",
      "Analytics"
    ],
    [
      "MC-02",
      "Received month distribution",
      "Are files received/loaded consistently over time?",
      "File count and record count by received month and payer",
      "Important where payer delivery is inconsistent",
      "Late/missing receipt can make reconciliation stale.",
      "High",
      "Compare received dates to expected payer cadence.",
      "Missing/late file alert",
      "Payer ops"
    ],
    [
      "MC-03",
      "Cumulative vs delta classification",
      "Does each file repeat historical records or only include new deltas?",
      "Repeat rate of member+DOS+DX across files",
      "Aetna appears cumulative; Humana methodology should be confirmed",
      "Double-counting or undercounting if methodology is assumed incorrectly.",
      "High",
      "Classify payer/file type as cumulative, delta, replacement, or unknown.",
      "File methodology registry",
      "HealthTrixss / analytics"
    ],
    [
      "MC-04",
      "Latest-file logic",
      "For cumulative files, which file should represent the official view?",
      "Latest available file by payer and DOS period",
      "Apply to Aetna unless disproven",
      "Summing cumulative files overstates older months.",
      "High",
      "Use latest-file snapshot or de-duplicated inventory logic.",
      "Deduplicated MAO view",
      "Data engineering"
    ],
    [
      "MC-05",
      "Row-per-member normalization",
      "Are payer volumes reasonable after adjusting for member size?",
      "Rows per distinct member by payer and DOS month",
      "Useful across Aetna, BCBSOK, Humana, UHC",
      "Large payers dominate raw counts; small payer anomalies are hidden.",
      "Medium",
      "Use approximate membership denominator when available.",
      "Normalized trend dashboard",
      "Analytics"
    ],
    [
      "MC-06",
      "Recent DOS lag flag",
      "Are recent months low due to claim lag rather than missing data?",
      "Maturity window and lag bucket by DOS month",
      "Recent months should be flagged as immature",
      "False gaps or incorrect rejection conclusions.",
      "Medium",
      "Do not fully judge recent DOS until maturity threshold passes.",
      "Maturity flag",
      "Analytics"
    ],
    [
      "MC-07",
      "Staged-to-response missing analysis",
      "Which submitted staged records have no response yet?",
      "% staged records not found by response type and payer",
      "Requires staged source and run control",
      "Cannot distinguish pending response from true missing submission.",
      "High",
      "Calculate after response completeness controls.",
      "Pending/not-found inventory",
      "Reconciliation lead"
    ]
  ]
};

export const REC_MAO002: StrategySheet = {
  "title": "MAO-002 Early-Warning Model",
  "subtitle": "How Mercy should use MAO-002 as an early transaction/reason-code source rather than waiting only for MAO-004.",
  "headers": [
    "MAO-002 Signal",
    "Meaning",
    "Provider / Mercy Action",
    "Plan Action",
    "Provider Control",
    "Evidence Needed",
    "Reconciliation Status",
    "Owner",
    "Notes"
  ],
  "rows": [
    [
      "PA",
      "Preliminary allowable",
      "Monitor for final MAO-004 disposition; correct only if source data is inaccurate.",
      "Complete final MAO-004 processing.",
      "No routine correction",
      "MAO-002 record, staged submission, later MAO-004 result",
      "Prelim Accepted / Await Final",
      "Reconciliation lead",
      "Useful for early visibility but not final acceptance."
    ],
    [
      "PD / PH",
      "Preliminary disallowable because no accepted allowable CPT/HCPCS was found",
      "Validate source CPT/HCPCS, claim line status, and whether qualifying line was omitted or rejected.",
      "Provide line-level rejection detail and reprocess corrected encounter if plan-controlled.",
      "High / Shared",
      "Source claim, CPT/HCPCS, line-level plan data, MAO-002 edit detail",
      "Prelim Rejected - Procedure",
      "Coding / billing / payer ops",
      "Do not assume provider defect until source vs plan submitted values are compared."
    ],
    [
      "PD / PT",
      "Preliminary disallowable due to non-allowable Type of Bill",
      "Validate institutional bill type against source claim and care setting.",
      "Reprocess corrected 837I/encounter if plan mapping issue exists.",
      "High / Shared",
      "Source UB/837I, bill type, plan-submitted encounter",
      "Prelim Rejected - Bill Type",
      "Facility billing",
      "Useful for institutional exception queue."
    ],
    [
      "PN",
      "Preliminary not applicable",
      "Review claim type and service classification; do not automatically treat as error.",
      "Validate plan mapping/EDPS classification.",
      "Variable / Shared",
      "MAO-002, source claim, plan encounter classification",
      "Prelim Not Applicable",
      "Reconciliation lead",
      "Requires interpretation before action."
    ],
    [
      "FR",
      "Final reject",
      "Obtain specific EDPS edit/reason and assign to coding, billing, EDI, payer, or CMS-rule category.",
      "Supply exact edit and accept/resubmit corrected data when appropriate.",
      "Variable",
      "Five-digit edit if available, MAO-002 details, staged source, timestamps",
      "Rejected - Needs Triage",
      "Exception owner",
      "Should create workqueue item."
    ]
  ]
};

export const REC_MAO004: StrategySheet = {
  "title": "MAO-004 Actionability Matrix",
  "subtitle": "How Mercy should use MAO-004 as final CMS outcome visibility without over-assigning root cause.",
  "headers": [
    "Outcome Family",
    "What It Indicates",
    "What It Does NOT Prove",
    "Next Evidence Needed",
    "Likely Actionability",
    "Recommended Action",
    "Owner",
    "Status Update",
    "Escalation Trigger",
    "Notes"
  ],
  "rows": [
    [
      "Allowed / Accepted",
      "Diagnosis/encounter appears accepted for risk-adjustment processing.",
      "Does not by itself prove payment impact or HCC capture in MOR/MMR.",
      "Staged record, MAO-004 match evidence, HCC mapping if needed",
      "No correction",
      "Mark accepted by CMS; include in acceptance trend and HCC analytics.",
      "Analytics / reconciliation",
      "Accepted by CMS",
      "None unless unexpected volume drop",
      "Can later feed MOR/MMR/payment validation."
    ],
    [
      "Disallowed - Procedure / CPT",
      "CMS/plan processing did not identify allowable CPT/HCPCS or service evidence.",
      "Does not prove source claim CPT is wrong; plan line construction may differ.",
      "Source CPT/HCPCS, plan submitted encounter, MAO-002, HP reject detail",
      "Provider / shared / plan",
      "Compare source vs plan encounter; correct source only if source is inaccurate.",
      "Coding / billing / payer ops",
      "Rejected / Needs Procedure Review",
      "High volume by payer/provider/service type",
      "Use Jay's evidence checklist."
    ],
    [
      "Disallowed - Type of Bill / POS",
      "Institutional/professional setting may not meet allowable rules.",
      "Does not prove Mercy source is wrong without source and plan-submitted values.",
      "Type of Bill, POS, claim type, facility billing record, plan-submitted values",
      "Provider / shared / plan",
      "Route to facility billing or payer if mapping issue; document no-action if CMS rule-based.",
      "Facility billing / payer ops",
      "Rejected / Needs Bill Type Review",
      "Recurring by facility or payer",
      "Separate bill type from POS."
    ],
    [
      "Disallowed - Diagnosis / HCC",
      "Diagnosis may not be accepted or may not map/qualify as expected.",
      "Does not prove documentation or coding error.",
      "Diagnosis validity, DOS validity, HCC mapping, plan/CMS reason, source documentation",
      "Provider / CMS-rule / shared",
      "Classify as coding/documentation, CMS rule, or plan mapping before correction.",
      "Coding / risk adjustment",
      "Rejected / Needs DX Review",
      "High HCC impact or provider cluster",
      "Use HCC impact for prioritization, not root cause alone."
    ],
    [
      "Not Found / Missing",
      "Submitted staged record not located in MAO response data.",
      "Does not prove plan failed to submit; could be missing MAO file, lag, wrong grain, or cumulative/delta issue.",
      "Response file completeness, file methodology, submission timestamp, ACK, MAO-002, HP status",
      "Unknown pending evidence",
      "First confirm MAO completeness and match grain; then escalate to payer if file is complete.",
      "Reconciliation lead / payer ops",
      "Pending / Not Found",
      "Mature DOS and complete response file but no match",
      "Avoid premature payer escalation."
    ],
    [
      "Rejected / Final Reject",
      "CMS/plan rejected transaction or line after processing.",
      "Does not identify owner without exact edit/source comparison.",
      "MAO-002 edit, HP reject file, source claim, plan submitted record, timestamps",
      "Variable",
      "Create workqueue item with owner and evidence; correct/resubmit or escalate.",
      "Exception owner",
      "Rejected / Workqueue",
      "Repeated code or payer pattern",
      "Requires closure reason."
    ]
  ]
};

export const REC_ROOT_CAUSE: StrategySheet = {
  "title": "Root Cause & Operational Ownership Model",
  "subtitle": "Exception categories, ownership, evidence and operational actions.",
  "headers": [
    "Root-Cause Category",
    "Description",
    "Typical Evidence",
    "Provider / Mercy Control",
    "Primary Owner",
    "Recommended Action",
    "Closure Criteria",
    "KPI",
    "Notes"
  ],
  "rows": [
    [
      "Provider Source-Controlled",
      "Issue originates in Mercy source claim, coding, charge capture, diagnosis, bill type, POS, or documentation.",
      "Source claim differs from valid supported value; medical record supports correction.",
      "High",
      "Coding / billing / facility billing",
      "Correct source and resubmit through governed submission process.",
      "Corrected record submitted and status updated.",
      "% corrected within SLA",
      "Do not correct without evidence."
    ],
    [
      "Shared / Requires Evidence",
      "Root cause cannot be assigned without comparing Mercy source, plan-submitted encounter, MAO-002, and HP response.",
      "Mismatch between source and response, unclear plan transformation, missing line detail.",
      "Medium / shared",
      "Reconciliation lead",
      "Open evidence request; classify after evidence is received.",
      "Owner assigned or payer escalated.",
      "% unknown aging > X days",
      "Default category when evidence is incomplete."
    ],
    [
      "Plan / Vendor Controlled",
      "Mercy source appears accurate but plan/vendor mapping, encounter construction, omission, or EDPS submission issue caused outcome.",
      "Source claim correct; plan-submitted values differ or line missing; payer confirms issue.",
      "Low",
      "Payer relations / plan ops",
      "Escalate with evidence package and request correction/resubmission by payer.",
      "Payer confirms remediation or documented no-action.",
      "% escalations resolved",
      "Track payer SLA and recurring defects."
    ],
    [
      "CMS Rule / No Provider Defect",
      "Outcome is consistent with CMS processing rule even though Mercy source is accurate.",
      "CMS status/reason, source claim valid, no supported correction available.",
      "None",
      "Risk adjustment ops",
      "Classify as no provider action; retain evidence for audit and trend reporting.",
      "Closed as no-action with rationale.",
      "% no-action outcomes",
      "Important to prevent unnecessary resubmissions."
    ],
    [
      "Timing / Deadline",
      "Submission or correction missed payer/CMS timing window or was too recent to appear.",
      "Submission timestamp, payer receipt, CMS cutoff, file received/load date.",
      "Variable",
      "Operations / payer ops",
      "Classify as provider-delay, payer-delay, or lag; adjust cadence or escalation process.",
      "Timing owner documented; prevention action assigned.",
      "Turnaround and lag days",
      "Supports monthly submission recommendation."
    ],
    [
      "Data Availability Gap",
      "Outcome cannot be determined because response files or detail are missing.",
      "No MAO/ACK/reject file received; incomplete DOS distribution; missing MAO-002.",
      "Shared / payer dependency",
      "Payer ops / contracting",
      "Track as payer response dependency; request file or alternative detail.",
      "File received or gap documented in dependency log.",
      "Response-file coverage %",
      "Do not treat as submission failure."
    ]
  ]
};

export const REC_ROADMAP: StrategySheet = {
  "title": "Reconciliation Roadmap",
  "subtitle": "Practical sequencing for crawl-walk-run implementation.",
  "headers": [
    "Phase",
    "Timing",
    "Theme",
    "Activities",
    "Primary Deliverables",
    "Dependencies",
    "Risk Reduced",
    "Decision Needed",
    "Exit Criteria"
  ],
  "rows": [
    [
      "Crawl 1",
      "0-30 days",
      "Response Inventory & Completeness",
      "Catalog all available response files; confirm MAO-004 by payer; identify missing payers/file types; run DOS/received-month distribution.",
      "Response inventory, MAO completeness profile, missing-file log",
      "Access to MAO/HP files",
      "Prevents false reconciliation conclusions",
      "Agree expected response types by payer",
      "Leadership can see response coverage and gaps."
    ],
    [
      "Crawl 2",
      "0-60 days",
      "File Methodology & De-duplication",
      "Classify payer files as cumulative/delta/replacement/unknown; implement latest-file or deduped views.",
      "File methodology registry, deduped MAO view",
      "Historical file samples",
      "Prevents overcounting/undercounting",
      "Agree methodology assumptions",
      "Aetna and other payers have documented logic."
    ],
    [
      "Walk 1",
      "30-90 days",
      "MAO-004 Status Matching",
      "Match MAO-004 to staged/submitted records at best available grain; flag unmatched/pending/missing.",
      "MAO-004 match table, CMS status dashboard",
      "Canonical staged inventory",
      "Establishes final CMS outcome visibility",
      "Accept flexible grain for MAO-004",
      "Match rate and pending inventory available."
    ],
    [
      "Walk 2",
      "30-90 days",
      "BCBSOK MAO-002 Pilot",
      "Parse BCBSOK MAO-002; create edit/reason-code crosswalk; route early-warning exceptions.",
      "MAO-002 standard table, edit dashboard, pilot workqueue",
      "BCBSOK MAO-002 files",
      "Adds root-cause detail",
      "Pilot scope and fields",
      "MAO-002 insights reusable across payers."
    ],
    [
      "Walk 3",
      "60-120 days",
      "Exception Workqueue",
      "Apply actionability framework; assign owners; track corrections, resubmissions, payer escalations, closure reasons.",
      "Operational queue, SLA metrics, evidence checklist",
      "Status model",
      "Improves closure and ownership",
      "Who owns each exception type",
      "Exceptions have owner/status/action/closure reason."
    ],
    [
      "Run",
      "90-180 days",
      "Closed-Loop Reconciliation",
      "Automate response ingestion, matching, staged-status updates, dashboards, and recurring payer-completeness monitoring.",
      "Automated pipeline, status history, Power BI/portal reporting",
      "Submission path staged source and run control",
      "Creates scalable source of truth",
      "Reporting platform and operating cadence",
      "Operations can manage reconciliation from governed dashboards."
    ]
  ]
};

export const REC_CONTROLS: StrategySheet = {
  "title": "Reconciliation Controls & KPIs",
  "subtitle": "Recommended operational and executive measures for Mercy ASM response reconciliation.",
  "headers": [
    "Control / KPI",
    "Definition",
    "Formula / Measurement",
    "Frequency",
    "Target / Threshold",
    "Owner",
    "Used For",
    "Risk Addressed",
    "Notes"
  ],
  "rows": [
    [
      "Response File Coverage",
      "% expected response files received by payer/file type/month.",
      "Received expected files / total expected files",
      "Monthly",
      ">=95% or documented exception",
      "Payer ops",
      "Payer dependency management",
      "Missing files",
      "Include payers with no current files."
    ],
    [
      "Response Load Success",
      "% received files successfully parsed and loaded.",
      "Loaded files / received files",
      "Per load",
      ">=98%",
      "Data engineering",
      "Ingestion reliability",
      "Failed/incomplete loads",
      "Track parse rejects."
    ],
    [
      "MAO DOS Completeness",
      "Degree to which DOS months are represented as expected.",
      "Count trend by DOS month vs historical/expected band",
      "Monthly",
      "No unexplained month gaps",
      "Analytics",
      "Completeness assurance",
      "False rejection conclusions",
      "Apply maturity windows."
    ],
    [
      "File Methodology Confirmed",
      "% payer/file types classified as cumulative/delta/replacement/unknown.",
      "Classified file types / total file types",
      "Quarterly",
      "100% classified or documented unknown",
      "HealthTrixss / analytics",
      "Accurate counting",
      "Double-counting",
      "Refresh when payer changes format."
    ],
    [
      "Staged-to-Response Match Rate",
      "% staged records matched to response source by type.",
      "Matched staged records / eligible staged records",
      "Per run/month",
      "Baseline then improve",
      "Reconciliation lead",
      "Outcome visibility",
      "Unmatched records",
      "Separate by MAO-004, MAO-002, HP reject."
    ],
    [
      "Accepted by CMS Rate",
      "% staged/submitted records accepted by CMS.",
      "Accepted by CMS / submitted eligible records",
      "Monthly / sweep",
      "Trend by payer",
      "Risk adjustment analytics",
      "Performance tracking",
      "Acceptance variance",
      "Use after completeness check."
    ],
    [
      "Rejected / Disallowed Rate",
      "% records rejected or disallowed by HP/CMS.",
      "Rejected or disallowed / submitted eligible records",
      "Monthly / sweep",
      "Trend and investigate outliers",
      "Operations",
      "Quality improvement",
      "Repeat defects",
      "Segment by reason/actionability."
    ],
    [
      "Actionability Classification Rate",
      "% exceptions assigned ownership category.",
      "Classified exceptions / total exceptions",
      "Weekly during close",
      ">=90% within SLA",
      "Reconciliation lead",
      "Workqueue management",
      "Unowned exceptions",
      "Categories: provider/plan/shared/CMS/no-action."
    ],
    [
      "Correction Turnaround Time",
      "Days from exception identified to correction/resubmission/closure.",
      "Closure date - exception open date",
      "Weekly/monthly",
      "Define by severity",
      "Operations",
      "Operational efficiency",
      "Delayed corrections",
      "Track payer and internal delays separately."
    ],
    [
      "Aged Pending Exceptions",
      "Exceptions open beyond threshold.",
      "Count open > X days",
      "Weekly",
      "Declining trend",
      "Operations / payer ops",
      "Escalation",
      "Stale issues",
      "Include missing-evidence reason."
    ]
  ]
};

export const REC_SOURCES: StrategySheet = {
  "title": "Sources & Notes",
  "subtitle": "Artifacts and assumptions used to build this reconciliation recommendation packet.",
  "headers": [
    "Source / Artifact",
    "How It Informed the Packet",
    "Relevant Track",
    "Consultant Note",
    "Status",
    "Citation / File Note"
  ],
  "rows": [
    [
      "Mercy ASM Overall Process Assessment - Submission/Reconciliation Grid",
      "Provided initial reconciliation findings, data gap analysis, grain assessment, payer summary, roadmap and controls.",
      "Reconciliation + shared",
      "Used as foundation for recommendation register and roadmap.",
      "Reviewed",
      "Uploaded Excel artifact"
    ],
    [
      "Jay's MAO Guidance",
      "Provided actionability logic, MAO-002 early-warning concepts, provider-vs-plan ownership framing, and MAO-004 root-cause caveats.",
      "Reconciliation",
      "Used to build MAO-002, MAO-004 and root-cause sheets.",
      "Reviewed",
      "Uploaded Excel artifact"
    ],
    [
      "Health Plan Layout Concept Matrix",
      "Confirmed payer layouts require different field concepts and that response matching cannot assume all layouts carry the same identifiers.",
      "Shared",
      "Used indirectly for match-grain and data-model design.",
      "Reviewed",
      "Uploaded Excel artifact"
    ],
    [
      "June 12 Discovery Discussion",
      "Confirmed response-file availability gaps and need for MAO completeness analysis before interpreting results.",
      "Reconciliation",
      "Supports response inventory and completeness controls.",
      "Reviewed",
      "Meeting transcript artifact"
    ],
    [
      "June 17 Jennifer Validation Discussion",
      "Confirmed current workaround of re-ingesting outbound files and desired future state to avoid manual manipulation.",
      "Reconciliation + submission",
      "Supports staged-source and reverse reconciliation recommendation.",
      "Reviewed",
      "Meeting transcript artifact"
    ],
    [
      "June 17 Sandra Validation Discussion",
      "Validated centralized approach, response-file dependency, and need to handle HP/CMS responses in the architecture.",
      "Reconciliation",
      "Supports response-path clarification and incremental MAO-004-first approach.",
      "Reviewed",
      "Meeting transcript artifact"
    ],
    [
      "Mercy Future State Architecture PDF",
      "Provided target-state architecture for staged source, HP/MAO intake, reverse reconciliation feedback loop, and analytics built on staged data.",
      "Reconciliation + shared",
      "Used as architectural alignment point.",
      "Reviewed",
      "Uploaded PDF artifact"
    ],
    [
      "Assumption",
      "This packet focuses on recommendations and operating model, not detailed implementation build specifications.",
      "All",
      "Field-level mapping and detailed ETL design should be completed during implementation planning.",
      "Active",
      "Consultant assumption"
    ]
  ]
};
