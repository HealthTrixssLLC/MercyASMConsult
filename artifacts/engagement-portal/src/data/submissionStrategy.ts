// AUTO-GENERATED from the consultant recommendation workbook. Transcribed verbatim.
// Do not hand-edit; regenerate from the source .xlsx if content changes.

export type StrategySheet = {
  title: string;
  subtitle: string;
  headers: string[];
  rows: string[][];
};

export type SubExec = {
  title: string;
  subtitle: string;
  narrative: { label: string; text: string }[];
  metrics: { metric: string; value: string; interpretation: string }[];
  layers: { headers: string[]; rows: string[][] };
};

export const SUB_EXEC: SubExec = {
  "title": "Mercy ASM Submission Path Recommendation Packet",
  "subtitle": "Prepared from SQL artifacts, health plan layouts, stakeholder discovery, HealthTrixss future-state architecture, and supporting MAO/root-cause guidance. Focus: Submission Path only.",
  "narrative": [
    {
      "label": "Executive Assessment",
      "text": "Mercy's ASM submission process is operationally functional and contains deep payer-specific knowledge. The current pattern, however, keeps that knowledge embedded in separate SQL scripts, templates, and manual checks. HealthTrixss recommends moving to a governed submission platform that stages Mercy-format records first, applies payer layouts last, and validates systematically before submission."
    },
    {
      "label": "Target Direction",
      "text": "Configuration-driven ASM engine + Mercy-format staged source + payer-specific layout converters + run control + QA gate + operational approval."
    },
    {
      "label": "Critical Design Principle",
      "text": "Standardize before payer layout conversion; do not force payer layouts to become the canonical source model."
    },
    {
      "label": "Primary Risk to Solve",
      "text": "Payer-specific SQL combines extraction, business rules, layout formatting, and submission operations, creating maintainability, lineage, and QA risk."
    },
    {
      "label": "Recommended Pilot",
      "text": "Pilot UHC for engine/rule/DX-overflow complexity and Anthem for formal layout metadata governance."
    }
  ],
  "metrics": [
    {
      "metric": "Recommendation rows",
      "value": "30",
      "interpretation": "Submission-path action items in this packet"
    },
    {
      "metric": "High priority rows",
      "value": "20",
      "interpretation": "Immediate items for architecture, config, staging, QA and critical payer rules"
    },
    {
      "metric": "Payers covered",
      "value": "7",
      "interpretation": "UHC, Aetna, Anthem, BCBSOK, Essence, Global Health, Humana"
    },
    {
      "metric": "Core future-state layers",
      "value": "6",
      "interpretation": "Curated source, engine, run control, staged source, layout converter, QA gate"
    },
    {
      "metric": "Recommended pilots",
      "value": "2",
      "interpretation": "UHC for complexity; Anthem for formal layout governance"
    }
  ],
  "layers": {
    "headers": [
      "Submission Path Layer",
      "Purpose",
      "Recommended Control"
    ],
    "rows": [
      [
        "Curated Mercy Source",
        "Reusable source layer preserving source identifiers and clinical/claim context.",
        "Source completeness and source-to-staged traceability."
      ],
      [
        "Generalized ASM Engine",
        "Parameterized process that selects candidate records using governed rules.",
        "Rule inventory, effective dates, and run parameters."
      ],
      [
        "Mercy-Format Staged Source",
        "Authoritative inventory of intended submission records before payer formatting.",
        "Run ID, normalized diagnosis grain, source identifiers."
      ],
      [
        "Payer Layout Conversion",
        "Converts staged records to payer-specific format and field order.",
        "Layout metadata, required/situational/default checks."
      ],
      [
        "Pre-Submission QA Gate",
        "Validates export-ready data against staged source and payer specs.",
        "Pass/fail with exception and approval workflow."
      ],
      [
        "Submission Operations",
        "Submits QA-passed files and updates file inventory.",
        "File name, sent date, hash/control totals, approver, destination."
      ]
    ]
  }
};

export const SUB_REGISTER: StrategySheet = {
  "title": "Submission Recommendation Register",
  "subtitle": "Comprehensive recommendation register for the Submission Path. Filter by payer, priority, domain, roadmap phase, or future-state component.",
  "headers": [
    "ID",
    "Domain",
    "Health Plan",
    "Recommendation",
    "Current-State Gap / Risk",
    "Future-State Component",
    "Priority",
    "Owner",
    "Roadmap Phase",
    "Expected Benefit",
    "Primary Evidence"
  ],
  "rows": [
    [
      "SUB-01",
      "Architecture",
      "Cross-Plan",
      "Separate source curation, ASM candidate generation, payer layout conversion, and file submission into distinct layers.",
      "Current SQL blends extraction, payer rule application, layout shaping, and output formatting in one code path.",
      "Curated Source, ASM Engine, Layout Conversion",
      "High",
      "Platform / Data Engineering",
      "1 - Immediate",
      "Reduced rework; clearer lineage; easier QA; less payer-by-payer drift.",
      "SQL review across UHC, Aetna, Anthem, BCBSOK, Essence, Global Health, Humana"
    ],
    [
      "SUB-02",
      "Configuration",
      "Cross-Plan",
      "Externalize plan IDs, facility/location filters, CPT/HCPCS lists, bill type/POS rules, specialty mapping, defaults, and exclusions into governed effective-dated configuration tables.",
      "Rules are embedded directly in payer-specific SQL, making changes dependent on code updates and SME memory.",
      "Configuration Repository",
      "High",
      "Data Engineering + ASM SME",
      "1 - Immediate",
      "More transparent change control; lower risk from hard-coded logic; reusable rule inventory.",
      "SQL review; stakeholder validation with Jennifer and Sandra"
    ],
    [
      "SUB-03",
      "Canonical Staging",
      "Cross-Plan",
      "Create a Mercy-format staged source of truth before payer layout conversion, using a normalized diagnosis grain.",
      "Today the outbound file becomes the practical record of what was sent, which forces re-ingestion for comparison and validation.",
      "Staged Export Ready Source",
      "High",
      "Data Architecture",
      "1 - Immediate",
      "Authoritative submission inventory; supports QA and future reconciliation without re-ingesting outbound files.",
      "Future-state architecture; Jennifer feedback on avoiding re-ingestion"
    ],
    [
      "SUB-04",
      "Run Control",
      "Cross-Plan",
      "Create Run ID for every submission candidate run and retain executed-by, execution timestamp, parameters, record counts, prior-run reference, latest-run flag, and run status.",
      "Limited visibility into which SQL/version/parameters ran for a specific sweep; reruns are difficult to audit.",
      "Run Control & Audit",
      "High",
      "Data Engineering",
      "1 - Immediate",
      "Reproducibility, rerun comparison, audit support, and cleaner production operations.",
      "June 17 future-state review"
    ],
    [
      "SUB-05",
      "Pre-Submission QA",
      "Cross-Plan",
      "Make QA a mandatory gate that reconciles staged data to payer export view before file creation/submission.",
      "Manual row counts and spot checks exist, but there is no consistent automated pass/fail gate across payers.",
      "QA / Validation Gate",
      "High",
      "QA + ASM Operations",
      "1 - Immediate",
      "Catches translation/layout defects before health-plan submission; reduces avoidable rejects.",
      "Linda current-state QA discussion; future-state architecture"
    ],
    [
      "SUB-06",
      "Layout Governance",
      "Cross-Plan",
      "Build payer layout metadata that records field name, business concept, required/situational status, default value, format, max length, claim-type applicability, and effective date.",
      "Payer templates and specs vary widely; some artifacts show required fields while others only show Mercy-populated output columns.",
      "Layout Metadata Registry",
      "High",
      "ASM SME + Data Governance",
      "1 - Immediate",
      "Enables repeatable layout conversion, impact analysis, and payer spec updates.",
      "Layout concept matrix; Anthem job aid; UHC/Humana/Aetna/BCBSOK templates"
    ],
    [
      "SUB-07",
      "Payer Spec Management",
      "Cross-Plan",
      "Establish a payer specification repository with current spec, prior spec, source email/contact, owner, effective date, validation date, and change log.",
      "Spec freshness was raised as a dependency; payer requirements can change and are not always proactively communicated.",
      "Governance",
      "High",
      "ASM Operations + Contracting",
      "1 - Immediate",
      "Prevents outdated layout/rule assumptions; supports defensible payer conversations.",
      "Kickoff and June 10/12 discussions"
    ],
    [
      "SUB-08",
      "Diagnosis Modeling",
      "Cross-Plan",
      "Store all diagnoses in normalized row form in the staged source; pivot DX columns only during payer-specific layout conversion.",
      "Payers require different DX capacity and row structures, causing layout-shaped logic to be embedded early in SQL.",
      "Staged Source + Layout Converter",
      "High",
      "Data Architecture",
      "1 - Immediate",
      "Prevents loss of atomic diagnosis grain; simplifies QA, duplicate checks, and payer output generation.",
      "UHC DX1-40/41-80; Global Health one-DX-per-line; Anthem DX1-24"
    ],
    [
      "SUB-09",
      "Duplicate Prevention",
      "Cross-Plan",
      "Create duplicate rules at staged grain and at payer export grain before files are submitted.",
      "Different payer layouts can create apparent duplicates or split records differently; current deduplication is payer-script-specific.",
      "QA / Validation Gate",
      "High",
      "QA + Data Engineering",
      "1 - Immediate",
      "Reduces duplicate submission risk and improves downstream reconciliation quality.",
      "UHC service-line discussion; Anthem unique Encounter_ID requirement"
    ],
    [
      "SUB-10",
      "Submission Cadence",
      "Cross-Plan",
      "Evaluate monthly or more frequent incremental submissions where payer accepts them; use staged submission history to prevent cumulative duplicate resubmission.",
      "Current cadence often follows payer sweep windows; some payer docs encourage monthly submission, but payer adoption varies.",
      "Run Control + Submission Inventory",
      "Medium",
      "ASM Operations + Payer Relations",
      "2 - Near Term",
      "Earlier error discovery, smaller files, lower operational burden, and more timely CMS processing.",
      "June 10 cadence discussion; Anthem job aid monthly recommendation"
    ],
    [
      "SUB-11",
      "Operational Approval",
      "Cross-Plan",
      "Add an operational approval checkpoint before submission with key counts, exceptions, file list, and approver sign-off.",
      "Operations currently relies on manual validation and may not have Databricks access.",
      "Approval Workflow",
      "Medium",
      "ASM Operations",
      "2 - Near Term",
      "Separates technical execution from business approval; creates audit trail and operational confidence.",
      "Jennifer prototype discussion"
    ],
    [
      "SUB-12",
      "Source-to-Submission Completeness",
      "Cross-Plan",
      "After staged model stabilizes, compare Clarity source candidates to staged/submitted records to identify eligible records missed before submission.",
      "Current comparison mainly focuses on generated files and responses, not necessarily source records omitted upstream.",
      "Curated Source + QA",
      "Medium",
      "Data Quality + ASM SME",
      "3 - Later Maturity",
      "Identifies upstream omissions and improves completeness beyond file-to-file QA.",
      "Jennifer discussion on future Clarity lookback"
    ],
    [
      "SUB-13",
      "UHC DX Overflow",
      "UHC",
      "Automate UHC diagnosis overflow handling from normalized staged diagnoses into DX1-DX40 and continuation DX41-DX80 outputs.",
      "Continuation logic includes manual/Excel-dependent handling and separate sections for 1-40 and 41-80 diagnoses.",
      "UHC Layout Converter",
      "High",
      "Data Engineering",
      "1 - Immediate",
      "Eliminates manual overflow risk and preserves diagnosis completeness for large encounters.",
      "UHC SQL review; Linda explanation of 40 DX per line"
    ],
    [
      "SUB-14",
      "UHC Service-Line Rule",
      "UHC",
      "Confirm and document whether UHC requires one CPT/service line per diagnosis line; if not, evaluate all eligible service lines before deduplication.",
      "Current service-line selection is used to avoid duplicate-looking lines, but may exclude eligible CPT lines if multiple valid lines exist.",
      "Payer Rule Configuration",
      "High",
      "ASM SME + UHC Payer Contact",
      "1 - Immediate",
      "Clarifies whether logic is payer-mandated or implementation-specific; reduces under-submission risk.",
      "June 12 UHC service-line discussion"
    ],
    [
      "SUB-15",
      "UHC CPT/HCPCS Filters",
      "UHC",
      "Document UHC/CMS allowable CPT/HCPCS filtering as a controlled payer rule with source, effective dates, and revalidation cadence.",
      "Filtering is payer-instructed but currently lives in SQL and depends on updated CMS allowable lists.",
      "Value Set Configuration",
      "High",
      "ASM SME + Data Governance",
      "1 - Immediate",
      "Improves defensibility of provider-side filtering and avoids stale value-set risk.",
      "June 12 CPT filtering discussion"
    ],
    [
      "SUB-16",
      "UHC Bill Type Mapping",
      "UHC",
      "Validate bill type mapping to 111/131 with UHC specs and retain original bill type in staged data even if payer export collapses values.",
      "Payer-required mapping may reduce facility/frequency detail in the outbound file.",
      "Layout Converter + Staged Source",
      "Medium",
      "ASM SME",
      "2 - Near Term",
      "Preserves source fidelity for audit while satisfying payer layout requirements.",
      "June 12 UHC bill-type discussion"
    ],
    [
      "SUB-17",
      "Anthem Layout Metadata",
      "Anthem",
      "Use Anthem as the first formal layout metadata pilot because its job aid clearly distinguishes required, situational, and not-applicable fields by claim type.",
      "Anthem has strict pipe-delimited format, exact headers, no extra columns/rows, no NULLs, uppercase, date formats, and diagnosis formatting rules.",
      "Layout Metadata Registry",
      "High",
      "Data Governance + Data Engineering",
      "1 - Immediate",
      "Provides the clearest model for metadata-driven layout validation across payers.",
      "Anthem 2024 Supplemental Data Format Job Aid"
    ],
    [
      "SUB-18",
      "Anthem Claim-Type Rules",
      "Anthem",
      "Separate professional, inpatient, and outpatient applicability in layout conversion instead of treating Anthem as one flat file model.",
      "Anthem field requirements vary by P/I/O status; some fields are required for one claim type and not applicable or situational for another.",
      "Anthem Layout Converter",
      "High",
      "Data Engineering",
      "1 - Immediate",
      "Prevents wrong population of claim-type-specific fields and avoidable file rejection.",
      "Anthem data field specification table"
    ],
    [
      "SUB-19",
      "Aetna Wide Layout",
      "Aetna",
      "Keep Aetna source/staged diagnoses normalized and generate Aetna wide DX/RA/POA/delete structures only during final layout conversion.",
      "Aetna output is heavily layout-shaped with many placeholders and wide diagnosis fields.",
      "Aetna Layout Converter",
      "Medium",
      "Data Engineering",
      "2 - Near Term",
      "Protects canonical grain and avoids spreading Aetna-specific layout complexity upstream.",
      "Aetna SQL/layout review"
    ],
    [
      "SUB-20",
      "Aetna Rule Configuration",
      "Aetna",
      "Externalize Aetna plan/location/date/CPT/line rules into Aetna configuration tables.",
      "Aetna scripts contain hard-coded location, date, CPT, and plan logic.",
      "Aetna Configuration",
      "High",
      "Data Engineering + ASM SME",
      "1 - Immediate",
      "Improves maintainability and version control for Aetna submissions.",
      "Aetna SQL review"
    ],
    [
      "SUB-21",
      "BCBSOK Prefix/Contract Mapping",
      "BCBSOK",
      "Move prefix-to-contract/plan mapping and exclusion logic into controlled configuration.",
      "BCBSOK uses payer-specific identifier and contract mapping logic that should be governed and validated.",
      "BCBSOK Configuration",
      "High",
      "Data Governance + ASM SME",
      "1 - Immediate",
      "Improves traceability of payer mappings and supports response matching downstream.",
      "BCBSOK SQL/layout review"
    ],
    [
      "SUB-22",
      "Essence One-DX Layout",
      "Essence",
      "Represent Essence one-diagnosis-per-row layout as a payer layout conversion rule from normalized staged diagnoses.",
      "Current repeated diagnosis-line logic reflects payer structure and should not drive the canonical model.",
      "Essence Layout Converter",
      "Medium",
      "Data Engineering",
      "2 - Near Term",
      "Creates a quick-win layout converter while preserving common staged grain.",
      "Essence SQL/layout review; Linda Global/one-DX discussion"
    ],
    [
      "SUB-23",
      "Global Health One-DX Layout",
      "Global Health",
      "Represent Global Health one-diagnosis-per-row or limited-DX expectations as final layout rules, not source curation rules.",
      "Global Health differs in diagnosis-per-line expectations and has payer-specific defaults/specialty logic.",
      "Global Health Layout Converter",
      "Medium",
      "Data Engineering",
      "2 - Near Term",
      "Prevents payer layout from fragmenting common extraction logic.",
      "Global Health SQL/layout review"
    ],
    [
      "SUB-24",
      "Humana Regional Rules",
      "Humana",
      "Document and externalize Humana-specific regional, location, and layout rules.",
      "Humana uses payer-specific rules and templates; formal required/optional status may need confirmation.",
      "Humana Configuration",
      "Medium",
      "ASM SME + Data Governance",
      "2 - Near Term",
      "Converts operational knowledge into governed configuration and reduces ambiguity.",
      "Humana SQL/layout review"
    ],
    [
      "SUB-25",
      "File Naming and Transmission",
      "Cross-Plan",
      "Configure payer-specific file naming, test/production/delete indicators, date fields, transfer destination, and file-level validation rules.",
      "Payer specs such as Anthem enforce exact naming conventions and transmission rules; other payers also have unique file expectations.",
      "Submission Operations",
      "Medium",
      "ASM Operations + Data Engineering",
      "2 - Near Term",
      "Reduces file-transfer failure, duplicate file-name rejection, and nonconforming production submissions.",
      "Anthem file naming/transmission guidance"
    ],
    [
      "SUB-26",
      "Required Field Population",
      "Cross-Plan",
      "Create automated required/situational/not-applicable field checks before export, based on claim type and payer.",
      "Payer layouts differ by required, situational, not-applicable, default, and blank fields.",
      "QA / Layout Validation",
      "High",
      "QA + Data Engineering",
      "1 - Immediate",
      "Prevents technical rejection caused by missing, extra, or incorrectly populated fields.",
      "Layout concept matrix; Anthem job aid"
    ],
    [
      "SUB-27",
      "Provider Concept Separation",
      "Cross-Plan",
      "Keep Billing Provider NPI, Rendering Provider NPI, Attending Provider NPI, Provider Tax ID, Provider Specialty, and facility identifiers as separate concepts.",
      "Some fields have similar names but different meanings by payer and claim type.",
      "Canonical Data Model",
      "High",
      "Data Architecture",
      "1 - Immediate",
      "Avoids incorrect crosswalk merging and strengthens source-to-layout lineage.",
      "Layout concept matrix; Anthem field definitions"
    ],
    [
      "SUB-28",
      "Member Identifier Strategy",
      "Cross-Plan",
      "Maintain separate concepts for member health plan ID, CMS ID/MBI/HICN, contract/plan ID, internal patient ID, and coverage identifiers.",
      "Member identifiers vary by payer and are often used differently for matching, submission, and rejection handling.",
      "Canonical Data Model",
      "High",
      "Data Architecture + ASM SME",
      "1 - Immediate",
      "Improves member matching, file conformance, and reconciliation readiness.",
      "Layout concept matrix; Anthem member fields; Jennifer member-ID concerns"
    ],
    [
      "SUB-29",
      "Source Identifier Preservation",
      "Cross-Plan",
      "Retain claim/encounter ID, hospital account, patient control number, invoice/reference number, line ID, and source table references in staged data.",
      "Final payer layouts often omit or transform source identifiers, making audit and root-cause analysis difficult.",
      "Staged Source",
      "High",
      "Data Architecture",
      "1 - Immediate",
      "Supports QA, issue investigation, and later response matching without relying only on payer export layout.",
      "SQL/layout review across plans"
    ],
    [
      "SUB-30",
      "Developer/Operator Separation",
      "Cross-Plan",
      "Separate development of the ASM engine from operational execution through controlled prompts, parameters, and approval workflow.",
      "Current informatics-style model can merge code changes and production execution, which is fast but less controlled.",
      "Operating Model",
      "Medium",
      "IT/Data Platform + ASM Operations",
      "2 - Near Term",
      "Strengthens control while preserving operational agility.",
      "Sandra June 17 validation discussion"
    ]
  ]
};

export const SUB_BLUEPRINT: StrategySheet = {
  "title": "Submission Path Target Blueprint",
  "subtitle": "Recommended layered model for Mercy ASM submission generation and pre-submission validation.",
  "headers": [
    "Layer",
    "Description",
    "Key Data / Rule Objects",
    "Primary Controls",
    "Why It Matters"
  ],
  "rows": [
    [
      "1. Clarity / Epic Source",
      "Operational source tables and raw clinical/claim context.",
      "Member, encounter, account, claim, line, diagnosis, provider, payer, DOS, CPT/HCPCS, revenue code, bill type/POS.",
      "Source lineage and extract-count controls.",
      "Keeps source truth visible and auditable before ASM rules are applied."
    ],
    [
      "2. Curated Mercy Source",
      "Denormalized reusable source layer that is not payer-layout-shaped.",
      "Stable source identifiers, clinical fields, claim fields, plan fields, provider fields, diagnosis rows.",
      "Data quality checks and parity testing against legacy/current outputs.",
      "Reduces repeated joins and enables common candidate logic."
    ],
    [
      "3. Configuration Repository",
      "Effective-dated payer rules and value sets used by the engine.",
      "Plan IDs, CPT/HCPCS lists, bill types, POS, facility lists, specialty maps, defaults, claim-type rules.",
      "Owner, source, version, effective dates, active flag, change approval.",
      "Moves business rules out of SQL and into governed artifacts."
    ],
    [
      "4. Generalized ASM Engine",
      "Parameterized engine that creates submission candidates for a health plan and run.",
      "Health Plan ID, sweep type, DOS range, run type, optional filters.",
      "Run controls, parameter validation, rule application counts.",
      "Creates one repeatable process rather than separate payer-specific code paths."
    ],
    [
      "5. Mercy-Format Staged Source",
      "Canonical staged submission inventory before payer formatting.",
      "Run ID + Health Plan + Member + DOS + Diagnosis + Provider/NPI + source identifiers.",
      "Duplicate checks, count reconciliation, source-to-staged lineage.",
      "Becomes authoritative record of what Mercy intended to submit."
    ],
    [
      "6. Payer Layout Converter",
      "Transforms staged records into payer-specific output structures.",
      "Field mapping, required/situational status, defaults, DX pivoting, file naming, delimiter rules.",
      "Layout conformance and staged-to-export reconciliation.",
      "Preserves payer-specific differences without fragmenting core logic."
    ],
    [
      "7. Pre-Submission QA Gate",
      "Automated pass/fail validation before file release.",
      "Member count, DOS count, DX count, NPI count, record count, required fields, duplicates.",
      "Exception report, investigation workflow, approval checkpoint.",
      "Prevents avoidable payer rejections and improves trust in submitted files."
    ],
    [
      "8. Submission Operations",
      "Controlled file creation, transfer, and submission inventory update.",
      "File name, submitter, sent date, destination, row count, file hash/control total, approver.",
      "Transmission confirmation and submission audit record.",
      "Completes the submission path and prepares for downstream reconciliation."
    ]
  ]
};

export const SUB_DATA_MODEL: StrategySheet = {
  "title": "Recommended Submission Data Model",
  "subtitle": "Core tables/objects needed to support a governed submission path and future reconciliation readiness.",
  "headers": [
    "Entity / Table",
    "Recommended Grain",
    "Key Columns",
    "Purpose",
    "Submission Controls"
  ],
  "rows": [
    [
      "Curated_ASM_Source",
      "One row per source service/diagnosis candidate where available",
      "Source system ID, member IDs, encounter/claim/account IDs, line IDs, DOS, provider IDs, CPT/HCPCS, bill type/POS, diagnosis, payer/plan",
      "Reusable source for ASM candidate generation",
      "Source row counts, source completeness, field validity"
    ],
    [
      "ASM_Rule_Config",
      "One row per payer rule/value with effective dates",
      "Health Plan ID, rule type, rule value, effective start/end, active flag, source, owner, version",
      "Externalizes payer and CMS-derived submission rules",
      "Owner/source/effective date required"
    ],
    [
      "ASM_Run_Control",
      "One row per engine execution",
      "Run ID, Health Plan ID, run type, DOS from/to, executed by, timestamp, status, record counts, prior run ID, latest flag",
      "Audit and reproducibility",
      "Parameter validation and latest-run logic"
    ],
    [
      "ASM_Staged_Submission",
      "Run ID + Health Plan + Member + DOS + Diagnosis + Provider/NPI + source identifiers",
      "Run ID, member IDs, DOS, diagnosis, provider IDs, claim/encounter/account, source line, rule outcomes, submission status",
      "Authoritative intended-submission inventory",
      "Duplicate, count, source lineage and grain QA"
    ],
    [
      "Payer_Layout_Metadata",
      "One row per payer field per layout version and claim type",
      "Payer, layout version, field order, field name, concept, required status, format, length, default, claim type",
      "Controls payer-specific export generation",
      "Required/situational/format validation"
    ],
    [
      "ASM_Export_File",
      "One row per physical file",
      "Run ID, payer, file name, layout version, submitter, sent date, row count, hash/control total, destination, approval status",
      "Submission inventory and operational audit",
      "File naming, row count, approval and transmission checks"
    ]
  ]
};

export const SUB_RULE_EXTERNALIZATION: StrategySheet = {
  "title": "Payer Rule Externalization Model",
  "subtitle": "Business rules should be governed as configuration, not embedded only inside payer-specific SQL.",
  "headers": [
    "Rule / Configuration Object",
    "Business Purpose",
    "Examples from Artifacts",
    "Recommended Storage / Use",
    "Priority"
  ],
  "rows": [
    [
      "Health Plan ID / Payer",
      "Identifies payer-specific rule set",
      "UHC, Aetna, Anthem, BCBSOK, Essence, Global Health, Humana",
      "Submission engine parameter",
      "High"
    ],
    [
      "Sweep / Submission Type",
      "Initial, mid-year, final, monthly, correction, delete, retro",
      "Sweep calendar and payer deadline logic",
      "Run control parameter",
      "High"
    ],
    [
      "DOS From / DOS To",
      "Service date eligibility window",
      "Date range by payer/sweep/open period",
      "Run control parameter",
      "High"
    ],
    [
      "Plan / Contract IDs",
      "Eligible payer plan identifiers",
      "Plan IDs, prefixes, contract numbers",
      "Configuration",
      "High"
    ],
    [
      "Facility / Location IDs",
      "Included Mercy facilities, hospitals, groups",
      "Location/hospital filters",
      "Configuration",
      "High"
    ],
    [
      "CPT/HCPCS Value Sets",
      "Allowable/prohibited procedure value sets",
      "CMS allowable list or payer-specified list",
      "Effective-dated value set",
      "High"
    ],
    [
      "Bill Type / POS Rules",
      "Institutional bill type or professional place of service rules",
      "111, 131, POS values",
      "Configuration",
      "High"
    ],
    [
      "Provider Specialty Mapping",
      "Maps source provider specialties to payer/CMS codes",
      "CASE statements in SQL today",
      "Mapping table",
      "Medium"
    ],
    [
      "Diagnosis Capacity",
      "How many diagnoses per row/file and overflow behavior",
      "UHC 40/80, Anthem 24 other, one-DX payers",
      "Layout metadata",
      "High"
    ],
    [
      "Required / Situational Fields",
      "Payer field presence rules",
      "Required, optional, situational, NA",
      "Layout metadata",
      "High"
    ],
    [
      "Default / Static Values",
      "Values populated when not dynamic",
      "Vendor name, claim type defaults, blanks",
      "Layout metadata",
      "Medium"
    ],
    [
      "File Naming Rules",
      "Payer exact file naming conventions",
      "Test/production/delete names, date stamps",
      "Submission operations config",
      "Medium"
    ],
    [
      "Transmission Rules",
      "Payer file transfer location and method",
      "SFTP, folder, confirmation expectations",
      "Submission operations config",
      "Medium"
    ]
  ]
};

export const SUB_LAYOUT_GOVERNANCE: StrategySheet = {
  "title": "Health Plan Layout Governance",
  "subtitle": "Govern payer layouts by business concept, not just by column name. Similar names may have different meanings and similar meanings may have different payer names.",
  "headers": [
    "Concept Area",
    "Why It Must Stay Separate",
    "Examples / Notes",
    "Recommended Governance Action",
    "Priority"
  ],
  "rows": [
    [
      "Member Identifiers",
      "Health plan member ID, CMS ID/MBI/HICN, internal patient ID, plan/contract number, and coverage identifiers serve different purposes.",
      "Anthem separates Member_ID_Health_Plan, Member_ID_CMS_HICN, and Member_Site_Number.",
      "Maintain separate canonical concepts and map each payer field to the correct concept.",
      "High"
    ],
    [
      "Provider Identifiers",
      "Billing provider, rendering provider, attending physician, facility, tax ID, and specialty are not interchangeable.",
      "Anthem Provider_NPI is billing provider; Provider_ID_Internal is rendering/attending NPI by claim type.",
      "Separate concepts in staged source and require explicit layout mapping.",
      "High"
    ],
    [
      "Claim / Encounter Identifiers",
      "Encounter ID, patient control number, invoice/reference number, claim ID, ICN, and chart-review reference support different matching and tracking functions.",
      "Anthem Encounter_ID must be unique except diagnosis overflow; other payers may use claim/reference fields.",
      "Preserve all source identifiers and map payer output identifiers explicitly.",
      "High"
    ],
    [
      "Dates",
      "DOS from, DOS thru, sent date, submission period, and run date are distinct controls.",
      "Anthem Sent_Date must match file name date; DOS fields have different format requirements.",
      "Enforce date roles and formats in layout metadata.",
      "High"
    ],
    [
      "Diagnosis Structure",
      "Primary/principal, admitting, reason-for-visit, E-code, other diagnosis, and POA fields may differ by claim type and payer.",
      "UHC uses DX1-40/41-80; Anthem has primary, admitting, reason-for-visit, E-code, other and POA fields.",
      "Keep normalized diagnosis rows and generate payer-specific DX structures at export.",
      "High"
    ],
    [
      "Procedure / Revenue / Bill Type",
      "CPT/HCPCS, HIPPS, revenue code, bill type, and POS have payer- and claim-type-specific meanings.",
      "Anthem Type_of_Bill is POS for professional and UB type for institutional.",
      "Maintain separate source concepts and translate per payer/claim type.",
      "High"
    ],
    [
      "File-Level Rules",
      "Delimiter, headers, field order, extra columns, blank rows, naming, and transmission can reject entire files.",
      "Anthem requires pipe-delimited text, exact headers/order/spelling, no extra columns/blank rows/trailing pipes.",
      "Represent file-level rules in payer layout metadata and validate before submission.",
      "High"
    ]
  ]
};

export const SUB_QA_GATE: StrategySheet = {
  "title": "Pre-Submission QA Gate",
  "subtitle": "Recommended pass/fail controls before Mercy sends ASM files to health plans.",
  "headers": [
    "Check ID",
    "Control",
    "Description",
    "Timing",
    "Future-State Component",
    "Priority"
  ],
  "rows": [
    [
      "QA-01",
      "Run parameter validation",
      "Confirm Health Plan, DOS range, run type, submission type, and rule set are valid and active.",
      "Before engine run",
      "Run Control",
      "High"
    ],
    [
      "QA-02",
      "Source candidate count",
      "Count source candidates by member, DOS, diagnosis, provider, and source encounter before payer rules.",
      "After curated source extract",
      "Curated Source",
      "High"
    ],
    [
      "QA-03",
      "Rule application count",
      "Track records included/excluded by each major payer rule: plan, DOS, CPT, bill type/POS, facility, duplicate, specialty.",
      "After ASM engine",
      "ASM Engine",
      "High"
    ],
    [
      "QA-04",
      "Required field check",
      "Validate required fields are populated based on payer and claim type.",
      "Before layout export",
      "Layout Validation",
      "High"
    ],
    [
      "QA-05",
      "Situational field check",
      "Validate situational fields only when conditions apply; blank not-applicable fields when payer requires blank.",
      "Before layout export",
      "Layout Validation",
      "High"
    ],
    [
      "QA-06",
      "Format check",
      "Validate dates, uppercase rules, diagnosis decimals, lengths, numeric-only fields, and delimiter restrictions.",
      "Before file creation",
      "Layout Validation",
      "High"
    ],
    [
      "QA-07",
      "Duplicate check",
      "Detect duplicates at Mercy staged grain and payer export grain.",
      "Before file creation",
      "QA Gate",
      "High"
    ],
    [
      "QA-08",
      "Staged-to-export reconciliation",
      "Compare staged vs export view member count, DOS count, diagnosis count, NPI count, record count, and key grain count.",
      "Before physical file",
      "QA Gate",
      "High"
    ],
    [
      "QA-09",
      "DX overflow check",
      "Validate diagnosis overflow rows/columns and confirm no diagnosis is dropped during pivoting.",
      "Before file creation",
      "Layout Converter",
      "High"
    ],
    [
      "QA-10",
      "File control check",
      "Validate file name, sent date, row count, delimiter, headers, blank rows, trailing delimiters, and file hash/control total.",
      "At file creation",
      "Submission Operations",
      "Medium"
    ],
    [
      "QA-11",
      "Approval check",
      "Capture business approval and exception sign-off before sending to payer.",
      "Before submission",
      "Operating Model",
      "Medium"
    ],
    [
      "QA-12",
      "Post-submission inventory update",
      "Store submitted file name, submit timestamp, destination, record counts, and approval reference against Run ID.",
      "After submission",
      "Submission Inventory",
      "High"
    ]
  ]
};

export const SUB_CONTROLS: StrategySheet = {
  "title": "Submission Controls and KPIs",
  "subtitle": "Metrics to manage submission quality, traceability, completeness, and operational control.",
  "headers": [
    "Control Area",
    "Metric",
    "Definition",
    "Target / Trigger",
    "Cadence"
  ],
  "rows": [
    [
      "Submission Readiness",
      "% files passing QA first time",
      "QA-passed files / files generated",
      ">= 95%",
      "Per submission run"
    ],
    [
      "Layout Quality",
      "Technical layout defects",
      "Count of file-format/header/field errors",
      "Downward trend",
      "Per payer/month"
    ],
    [
      "Completeness",
      "Source-to-staged candidate yield",
      "Staged candidate records / curated source candidates",
      "Stable expected range",
      "Per payer/DOS month"
    ],
    [
      "Traceability",
      "% submitted records with Run ID and source identifiers",
      "Records with complete lineage / total submitted records",
      "100%",
      "Per run"
    ],
    [
      "Configuration Governance",
      "% active rules with owner/source/effective dates",
      "Configured rules complete / total active rules",
      "100%",
      "Monthly"
    ],
    [
      "Operational Control",
      "% submissions with documented approval",
      "Approved submissions / total submissions",
      "100%",
      "Per submission"
    ],
    [
      "Duplicate Prevention",
      "Duplicate candidate rate",
      "Duplicate grain records / total candidate records",
      "Investigate > threshold",
      "Per run"
    ],
    [
      "Timeliness",
      "Days from DOS close to submission",
      "Submission date - period close date",
      "Decrease over time",
      "Per payer"
    ]
  ]
};

export const SUB_PAYERS: StrategySheet = {
  "title": "Payer-Specific Submission Considerations",
  "subtitle": "Use payer-specific findings to prioritize configuration, layout conversion, and QA buildout.",
  "headers": [
    "Health Plan",
    "Observed Submission Pattern",
    "Primary Submission Risk",
    "Recommended Submission Focus",
    "Priority"
  ],
  "rows": [
    [
      "UHC",
      "Ambulatory and institutional files; separate source paths; DX1-DX40 plus continuation DX41-DX80; CPT filtering; bill type 111/131; service-line logic",
      "DX overflow, service-line selection, and hard-coded rules",
      "Make UHC the first pilot for generalized engine + DX overflow automation + staged-to-export QA",
      "High"
    ],
    [
      "Anthem",
      "Formal 2024 job aid; required/situational/not-applicable by P/I/O; strict pipe-delimited text format; exact headers; no NULL; file naming rules",
      "Strict layout rejection risk if metadata is not applied exactly",
      "Use Anthem as layout metadata pilot for required/situational/default/format rules",
      "High"
    ],
    [
      "Aetna",
      "AMB/INST scripts; wide supplemental layout; many placeholders/defaults; plan/location/date/CPT logic",
      "Layout-shaped SQL may obscure atomic diagnosis grain",
      "Normalize staged diagnoses; generate Aetna wide format at layout conversion",
      "High"
    ],
    [
      "BCBSOK",
      "AMB/INST logic; prefix-derived plan mapping; MAO-002 availability supports downstream pilot",
      "Prefix/contract mapping and exclusions need governance",
      "Externalize prefix/contract mapping and align with submission inventory",
      "High"
    ],
    [
      "Essence",
      "Professional-like logic and one-diagnosis-per-row patterns",
      "Repeated DX line SQL and hard-coded filters",
      "Convert one-DX-per-line logic into layout converter rule",
      "Medium"
    ],
    [
      "Global Health",
      "AMB/INST logic; one diagnosis per line discussed; specialty/default logic",
      "Payer-specific defaults and diagnosis line behavior",
      "Preserve normalized source and apply one-DX layout only downstream",
      "Medium"
    ],
    [
      "Humana",
      "Payer-specific templates and rules; formal required/optional status may require confirmation",
      "Regional/location rules and spec currency",
      "Confirm latest specification and externalize rules into configuration",
      "Medium"
    ]
  ]
};

export const SUB_ROADMAP: StrategySheet = {
  "title": "Submission Path Roadmap",
  "subtitle": "Recommended implementation sequencing for submission-related modernization.",
  "headers": [
    "Phase",
    "Indicative Timing",
    "Submission-Path Actions",
    "Outputs",
    "Primary Owners"
  ],
  "rows": [
    [
      "Phase 1 - Stabilize Design",
      "0-4 weeks",
      "Define canonical staged grain; finalize payer concept crosswalk; build rule inventory; confirm latest payer specs; design run-control fields",
      "Approved submission data model; rule/config template; layout metadata template",
      "Data Architecture, ASM SME, Data Governance"
    ],
    [
      "Phase 2 - Pilot Engine",
      "4-8 weeks",
      "Pilot UHC or Anthem; externalize high-risk rules; build staged table; automate DX handling; implement required-field and count QA",
      "Pilot payer engine output; pre-submission QA report; run-control capture",
      "Data Engineering, QA, ASM Operations"
    ],
    [
      "Phase 3 - Expand Payers",
      "8-14 weeks",
      "Add Aetna, BCBSOK, Humana, Essence, Global Health; build payer layout converters; standardize approval workflow",
      "Multi-payer staged inventory and export views",
      "Data Engineering, ASM SME"
    ],
    [
      "Phase 4 - Operationalize",
      "14-20 weeks",
      "Move reports to Power BI/web layer; add operational approval; establish spec change process; document SOPs",
      "Operational dashboard, SOP, approval records",
      "ASM Operations, IT/Data Platform"
    ],
    [
      "Phase 5 - Mature Completeness",
      "20+ weeks",
      "Add source-to-submission completeness checks; cadence optimization; enhanced audit; automated payer-spec comparison where feasible",
      "Maturity controls and ongoing monitoring",
      "Data Quality, Governance, Payer Relations"
    ]
  ]
};

export const SUB_SOURCES: StrategySheet = {
  "title": "Sources and Notes",
  "subtitle": "Source artifacts used to prepare this submission-path recommendation packet.",
  "headers": [
    "Source Artifact",
    "Type",
    "Submission-Relevant Evidence Used",
    "How Used in Packet"
  ],
  "rows": [
    [
      "MercyFutureState_06172026.pdf",
      "Current/future-state architecture",
      "Current state shows payer-specific extracts from Clarity, hard-coded SQL/code-based logic, payer layout conversion, ad-hoc reconciliation, limited governance. Future state shows generalized engine, run control, staged export source, layout conversion, QA validation, and submission.",
      "Backbone for target-state submission path"
    ],
    [
      "MercyKickoff_06012026.pdf",
      "Kickoff deck",
      "Scope covers ASM file generation through HP validation, processing, and CMS response reconciliation; objectives include current state, future-state readiness, controls, traceability, improvement opportunities.",
      "Frames the engagement objectives and scope"
    ],
    [
      "20260608_ASM Process Review with HealthTrixss.docx",
      "Discovery transcript",
      "Linda explained payer-specific queries/layouts, UHC AMB/INST files, payer layout dependency, sweep vs add/delete process, manual row counts and spot checks.",
      "Evidence for current submission operations"
    ],
    [
      "20260610_ASM Process Review with HealthTrixss.docx",
      "Discovery transcript",
      "Sandra described future-state curation/staging; Jay identified curation risk; discussion covered monthly submission, CMS edits, payer alignment, staged data and validation.",
      "Evidence for future-state submission design"
    ],
    [
      "20260612_ASM Process Review with HealthTrixss.docx",
      "Discovery transcript",
      "Detailed review of UHC SQL, CPT filtering, service-line logic, bill-type mapping, payer specs, and response-file availability.",
      "Evidence for UHC-specific and cross-plan recommendations"
    ],
    [
      "20260617_ReviewWithJennifer_RE_ASM.docx",
      "Validation transcript",
      "Jennifer validated code-centric hard-coded logic, no visibility into SQL used, re-ingestion workaround, staged future-state direction, run control, QA, and accessible reporting needs.",
      "Stakeholder validation of findings"
    ],
    [
      "20260617_ReviewWithSandra_RE_ASM.docx",
      "Validation transcript",
      "Sandra validated current-state challenges and future-state direction, called out re-ingestion workaround and response file gaps.",
      "Stakeholder validation of architecture"
    ],
    [
      "Mercy_ASM_Health_Plan_Layout_Concept_Matrix_REVISED.xlsx",
      "Analysis grid",
      "Normalized layout concept crosswalk with payer columns and requirement indicators.",
      "Supports layout governance and concept separation"
    ],
    [
      "Mercy_ASM_Overall_Process_Assessment_Submission_Reconciliation.xlsx",
      "Analysis grid",
      "Overall assessment with submission, reconciliation, shared, payer summary, roadmap, controls, cross-plan and payer-specific views.",
      "Source for recommendation register and packet structure"
    ],
    [
      "Jay'sMAOGuidance.xlsx",
      "MAO guidance",
      "Although reconciliation-focused, it reinforces why submission must preserve source identifiers, provider concepts, claim details, and accurate staged grain for root-cause analysis.",
      "Used only to define submission data preservation needs"
    ]
  ]
};
