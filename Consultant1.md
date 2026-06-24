# Consultant1 — Submission & Reconciliation Strategy Build Plan

Implementation plan for adding two new portal menus — **Submission Strategy** and **Reconciliation Strategy** — that render the HealthTrixss ASM consultant recommendation packets in full. Source workbooks:

- `attached_assets/Mercy_ASM_Submission_Path_Recommendation_Packet_*.xlsx` (11 sheets)
- `attached_assets/Mercy_ASM_Reconciliation_Path_Recommendation_Packet_*.xlsx` (13 sheets)

**Mandate:** read both spreadsheets comprehensively, lose no detail, and organize the content creatively under each menu so it reads as a consultant deliverable.

---

## 1. Consultant framing (why this exists)

Mercy submits risk-adjustment diagnoses to CMS through two channels: the **standard encounter (EDPS) submission** and the **Additional Submission Mechanism (ASM)** — a provider-initiated supplemental channel for diagnoses not captured through standard encounters. These two packets are the HealthTrixss consultant's recommendations for modernizing the ASM channel end-to-end:

- **Submission Strategy** = the *forward* path. Build a governed, configuration-driven ASM engine that stages Mercy-format records first and applies payer layouts last, with a QA gate before anything is sent.
- **Reconciliation Strategy** = the *reverse* path. Load HP/CMS responses (MAO-004, MAO-002, ACK/reject) back against the same staged submission inventory and update each record with outcome, reason, and ownership.

**Unifying design principle (must surface in both pages):** *Submission creates the truth set; reconciliation enriches that truth set with HP/CMS outcome and operational ownership.* The staged submission inventory is the shared backbone — it is created in the submission path and status-updated in the reconciliation path. Each page must make this hand-off explicit so the two menus read as one closed loop, not two disconnected reports.

---

## 2. Where this fits in the app

- Artifact: `artifacts/engagement-portal` (React + Vite + wouter, frontend-only).
- Theme: HealthTrixss — navy sidebar, orange/amber primary, cream background, IBM Plex Sans / serif. No emojis. lucide-react icons only.
- Reuse the existing page pattern: **eyebrow + serif `h1` + Radix Tabs with the primary underline** (see `src/pages/DiscussionJun17.tsx` and `src/pages/HpLayoutSql.tsx`). Reuse the table styling already used on the "ASM Analysis Current" page.

### Sidebar placement

In `src/components/layout/Sidebar.tsx`, add two new top-level `PHASES` entries immediately after `asm-analysis-current` and before Phase 2 (they are consultant strategy deliverables that follow the analysis):

| id | path | title | icon (lucide) | status |
|----|------|-------|---------------|--------|
| `submission-strategy` | `/submission-strategy` | `Submission Strategy` | `Upload` (or `Send`) | `active` |
| `reconciliation-strategy` | `/reconciliation-strategy` | `Reconciliation Strategy` | `GitCompareArrows` (or `RefreshCw`) | `active` |

Import the chosen icons in the existing `lucide-react` import line.

### Routes

In `src/App.tsx`, register two routes and import the two new page components:

```
<Route path="/submission-strategy" component={SubmissionStrategy} />
<Route path="/reconciliation-strategy" component={ReconciliationStrategy} />
```

---

## 3. Data layer

Generate two typed data modules from the workbooks (one per packet), mirroring the existing `src/data/conceptMatrix.ts` convention (plain exported typed arrays/objects, auto-generated, no runtime parsing of the xlsx).

- `src/data/submissionStrategy.ts`
- `src/data/reconciliationStrategy.ts`

**Generation method:** xlsx files are zip archives; `unzip` to `/tmp`, parse XML in the `code_execution` sandbox (these packets use **inline strings** — empty `sharedStrings.xml`, cells `t="inlineStr"` with `<x:t>` runs, `x:`-prefixed tags). See `.agents/memory/office-file-parsing.md`. Full text of all sheets has already been extracted to `/tmp/subm_dump.txt` and `/tmp/recon_dump.txt`; transcribe verbatim — **do not paraphrase or drop rows**.

Each sheet becomes a typed export. Each table sheet exports: a `title`, a `subtitle`/intro string, a typed `columns` definition, and a typed `rows` array. Narrative/metric sheets (the two Executive Summaries) export structured objects (assessment lines, metric cards, layer tables). Suggested export names are listed per sheet in §4 and §5.

A shared lightweight table renderer should be used across both pages (a simple responsive `<table>` with sticky header, zebra rows, horizontal scroll, and amber priority chips). The merged-cell `SheetTable.tsx` is not required here because these are flat grids; build/keep a small `StrategyTable` presentational component or reuse the table styling already present in `HpLayoutSql.tsx`.

---

## 4. Submission Strategy menu — content inventory & tab design

Source: Submission packet, 11 sheets. Page component `src/pages/SubmissionStrategy.tsx`.

**Page header:** eyebrow `RECOMMENDATION PACKET`, serif h1 `Submission Strategy`, intro = the Executive Assessment sentence. Surface the closed-loop principle line near the top.

**Tab structure (8 tabs, themed grouping — every sheet is represented):**

### Tab 1 — Executive Overview
Sheet: **Executive Summary**. Render:
- Executive Assessment paragraph.
- Key callouts: Target Direction, Critical Design Principle (*standardize before payer layout conversion; do not force payer layouts to become the canonical source model*), Primary Risk to Solve, Recommended Pilot (UHC for engine/rule/DX-overflow complexity; Anthem for layout metadata governance).
- Metric cards: Recommendation rows = **30**; High priority rows = **20**; Payers covered = **7** (UHC, Aetna, Anthem, BCBSOK, Essence, Global Health, Humana); Core future-state layers = **6**; Recommended pilots = **2**.
- Layer purpose/control table (6 rows): Curated Mercy Source, Generalized ASM Engine, Mercy-Format Staged Source, Payer Layout Conversion, Pre-Submission QA Gate, Submission Operations — each with Purpose + Recommended Control.

Exports: `SUB_EXEC` (object).

### Tab 2 — Recommendation Register
Sheet: **Recommendation Register** — **all 30 rows, SUB-01 … SUB-30**, no omissions. Columns: ID, Domain, Health Plan, Recommendation, Current-State Gap / Risk, Future-State Component, Priority, Owner, Roadmap Phase, Expected Benefit, Primary Evidence.
- Add client-side filters: by Health Plan (Cross-Plan, UHC, Anthem, Aetna, BCBSOK, Essence, Global Health, Humana), Priority (High/Medium), and Roadmap Phase (1-Immediate / 2-Near Term / 3-Later Maturity).
- Priority rendered as colored chips (High = amber/primary, Medium = muted).
- Cross-plan rows: SUB-01…SUB-12, SUB-25…SUB-30. Payer-specific: SUB-13…SUB-16 (UHC), SUB-17/18 (Anthem), SUB-19/20 (Aetna), SUB-21 (BCBSOK), SUB-22 (Essence), SUB-23 (Global Health), SUB-24 (Humana).

Exports: `SUB_REGISTER_COLUMNS`, `SUB_REGISTER` (30 rows).

### Tab 3 — Target Architecture
Combine two sheets under one "how it's built" theme:
- **Submission Blueprint** — 8-layer model (rows: 1. Clarity/Epic Source → 8. Submission Operations), columns: Layer, Description, Key Data/Rule Objects, Primary Controls, Why It Matters. Render as a vertical numbered stack of layer cards (visually conveys the staged pipeline).
- **Data Model (Recommended Submission Data Model)** — 6 entities: `Curated_ASM_Source`, `ASM_Rule_Config`, `ASM_Run_Control`, `ASM_Staged_Submission`, `Payer_Layout_Metadata`, `ASM_Export_File`. Columns: Entity/Table, Recommended Grain, Key Columns, Purpose, Submission Controls. Render as a table.

Exports: `SUB_BLUEPRINT`, `SUB_DATA_MODEL`.

### Tab 4 — Governance
Combine the "move rules out of SQL / govern by concept" sheets:
- **Rule Externalization** — 13 rule/config objects (Health Plan ID/Payer, Sweep/Submission Type, DOS From/To, Plan/Contract IDs, Facility/Location IDs, CPT/HCPCS Value Sets, Bill Type/POS Rules, Provider Specialty Mapping, Diagnosis Capacity, Required/Situational Fields, Default/Static Values, File Naming Rules, Transmission Rules). Columns: Rule/Configuration Object, Business Purpose, Examples from Artifacts, Recommended Storage/Use, Priority.
- **Layout Governance** — 7 concept areas (Member Identifiers, Provider Identifiers, Claim/Encounter Identifiers, Dates, Diagnosis Structure, Procedure/Revenue/Bill Type, File-Level Rules). Columns: Concept Area, Why It Must Stay Separate, Examples/Notes, Recommended Governance Action, Priority. Lead with the principle: *govern payer layouts by business concept, not just by column name.*

Exports: `SUB_RULE_EXTERNALIZATION`, `SUB_LAYOUT_GOVERNANCE`.

### Tab 5 — QA & Controls
- **QA Gate** — 12 checks (QA-01 … QA-12), columns: Check ID, Control, Description, Timing, Future-State Component, Priority. Render in submission-flow order (parameter validation → … → post-submission inventory update).
- **Controls & KPIs** — 8 metrics, columns: Control Area, Metric, Definition, Target/Trigger, Cadence (e.g., % files passing QA first time ≥ 95%; % records with full lineage = 100%).

Exports: `SUB_QA_GATE`, `SUB_CONTROLS`.

### Tab 6 — Payer Playbook
Sheet: **Payer Considerations** — 7 payers, columns: Health Plan, Observed Submission Pattern, Primary Submission Risk, Recommended Submission Focus, Priority. Render as one card per payer (UHC, Anthem, Aetna, BCBSOK, Essence, Global Health, Humana) for scannability.

Exports: `SUB_PAYERS`.

### Tab 7 — Roadmap
Sheet: **Roadmap** — 5 phases (Phase 1 Stabilize Design 0-4 wks → Phase 5 Mature Completeness 20+ wks), columns: Phase, Indicative Timing, Submission-Path Actions, Outputs, Primary Owners. Render as a horizontal/vertical timeline.

Exports: `SUB_ROADMAP`.

### Tab 8 — Sources & Notes
Sheet: **Sources & Notes** — 10 source artifacts, columns: Source Artifact, Type, Submission-Relevant Evidence Used, How Used in Packet (PDFs, discovery transcripts, validation transcripts, analysis grids).

Exports: `SUB_SOURCES`.

---

## 5. Reconciliation Strategy menu — content inventory & tab design

Source: Reconciliation packet, 13 sheets. Page component `src/pages/ReconciliationStrategy.tsx`.

**Page header:** eyebrow `RECOMMENDATION PACKET`, serif h1 `Reconciliation Strategy`, intro = the Consultant Position line (*the reconciliation path should not be a separate reporting workaround; it should be a reverse-status engine that updates the same Mercy-format staged submission inventory created by the submission path*).

**Tab structure (9 tabs, themed grouping — every sheet is represented):**

### Tab 1 — Executive Overview
Sheet: **Executive Summary**. Render Consultant Position, Current-State Pattern, Target-State Recommendation, Design Principle, Immediate Priority (MAO-004 completeness + status analytics for Aetna, BCBSOK, Humana, UHC; BCBSOK as MAO-002 pilot; track response-file gaps for Anthem, Arkansas, Essence, Global Health), and Why It Matters. Executive metric cards (Response Coverage High, Completeness Medium, Match Rate Low, plus Acceptance Rate and Actionability) with definitions.

Exports: `REC_EXEC`.

### Tab 2 — Recommendation Register
Sheet: **Recommendation Register** — **all 10 rows, REC-01 … REC-10**. Columns: ID, Recommendation, Current Gap/Risk, Consultant Action, Priority, Time Horizon, Owner/Stakeholder, Dependency, Future-State Component, Success Measure. Filter by Priority and Time Horizon (0-30 / 0-60 / 30-90 / 60-120 / 90-180 days).

Exports: `REC_REGISTER_COLUMNS`, `REC_REGISTER`.

### Tab 3 — Reverse Reconciliation Blueprint
Combine:
- **Reconciliation Blueprint** — 8 steps (1. Response File Acquisition → 8. Analytics & Reporting), columns: Step, Layer, Purpose, Key Activities, Key Data/Fields, Output, Control Point, Primary Owner, Notes. Render as a numbered flow.
- **Recommended Data Model** — 10 tables (`ASM_Staged_Submission`, `ASM_Run_Control`, `Response_File_Inventory`, `Response_Load_Control`, `MAO004_Response`, `MAO002_Response`, `HP_Response`, `Reconciliation_Match`, `Status_History`, `Exception_Workqueue`), columns: Table/Entity, Purpose, Key Fields, Grain, Feeds, Outputs To, Retention/Audit, Notes, Priority. Emphasize that `ASM_Staged_Submission` + `ASM_Run_Control` are shared with the submission path.

Exports: `REC_BLUEPRINT`, `REC_DATA_MODEL`.

### Tab 4 — Response Intake
Combine:
- **Response Inventory Model** — 15 fields (Health Plan, Response Type, Expected?, Received Date, Source File Name, DOS From/Through, Received Month, Record Count, Distinct Member Count, Distinct Diagnosis Count, File Methodology, Load Status, Load Batch ID, Notes/Issues). Columns: Field, Definition, Required?, Example/Values, Why It Matters, Owner.
- **Matching Grain Strategy** — 5 response sources (MAO-004, MAO-002, Health Plan ACK, Health Plan Reject File, MOR/MMR). Columns: Response Source, Primary Use, Best Available Match Grain, Fields Commonly Needed, Limitations, Recommended Matching Approach, Output Status, Confidence Rule, Notes.

Exports: `REC_RESPONSE_INVENTORY`, `REC_MATCHING_GRAIN`.

### Tab 5 — MAO Analytics
Combine the three MAO analysis sheets as sub-sections (or a small inner tab set):
- **MAO Completeness** — 7 controls (MC-01 … MC-07): DOS month distribution, Received month distribution, Cumulative vs delta classification, Latest-file logic, Row-per-member normalization, Recent DOS lag flag, Staged-to-response missing analysis. Columns: Control ID, Completeness Control, Question It Answers, Recommended Metric, Payer-Specific Note, Risk if Missing, Priority, Implementation Note, Output, Owner.
- **MAO-002 Early Warning** — 5 signals (PA, PD/PH, PD/PT, PN, FR). Columns: MAO-002 Signal, Meaning, Provider/Mercy Action, Plan Action, Provider Control, Evidence Needed, Reconciliation Status, Owner, Notes.
- **MAO-004 Action Matrix** — 6 outcome families (Allowed/Accepted, Disallowed-Procedure/CPT, Disallowed-Type of Bill/POS, Disallowed-Diagnosis/HCC, Not Found/Missing, Rejected/Final Reject). Columns: Outcome Family, What It Indicates, What It Does NOT Prove, Next Evidence Needed, Likely Actionability, Recommended Action, Owner, Status Update, Escalation Trigger, Notes.

Surface the caveat: *MAO-004 outcome alone does not prove root cause; confirm completeness and match grain before escalating.*

Exports: `REC_MAO_COMPLETENESS`, `REC_MAO002`, `REC_MAO004`.

### Tab 6 — Root Cause & Ownership
Sheet: **Root Cause Ownership** — 6 categories (Provider Source-Controlled, Shared/Requires Evidence, Plan/Vendor Controlled, CMS Rule/No Provider Defect, Timing/Deadline, Data Availability Gap). Columns: Root-Cause Category, Description, Typical Evidence, Provider/Mercy Control, Primary Owner, Recommended Action, Closure Criteria, KPI, Notes.

Exports: `REC_ROOT_CAUSE`.

### Tab 7 — Roadmap
Sheet: **Roadmap** — crawl-walk-run, 6 phases (Crawl 1, Crawl 2, Walk 1, Walk 2, Walk 3, Run). Columns: Phase, Timing, Theme, Activities, Primary Deliverables, Dependencies, Risk Reduced, Decision Needed, Exit Criteria. Render as a crawl→walk→run timeline.

Exports: `REC_ROADMAP`.

### Tab 8 — Controls & KPIs
Sheet: **Controls & KPIs** — 10 KPIs (Response File Coverage, Response Load Success, MAO DOS Completeness, File Methodology Confirmed, Staged-to-Response Match Rate, Accepted by CMS Rate, Rejected/Disallowed Rate, Actionability Classification Rate, Correction Turnaround Time, Aged Pending Exceptions). Columns: Control/KPI, Definition, Formula/Measurement, Frequency, Target/Threshold, Owner, Used For, Risk Addressed, Notes.

Exports: `REC_CONTROLS`.

### Tab 9 — Sources & Notes
Sheet: **Sources & Notes** — 8 entries (incl. the closing Assumption row). Columns: Source/Artifact, How It Informed the Packet, Relevant Track, Consultant Note, Status, Citation/File Note.

Exports: `REC_SOURCES`.

---

## 6. Build sequence

1. **Data extraction** — parse both workbooks (already dumped to `/tmp/subm_dump.txt`, `/tmp/recon_dump.txt`); generate `src/data/submissionStrategy.ts` and `src/data/reconciliationStrategy.ts` with typed exports per §4/§5, transcribed verbatim.
2. **Shared table component** — add/confirm a small `StrategyTable` (sticky header, zebra rows, horizontal scroll, priority chips) plus simple card/timeline helpers, or reuse existing `HpLayoutSql` table styles.
3. **Submission page** — `src/pages/SubmissionStrategy.tsx` with the 8 tabs (§4), following the DiscussionJun17 header + Radix Tabs underline pattern.
4. **Reconciliation page** — `src/pages/ReconciliationStrategy.tsx` with the 9 tabs (§5).
5. **Wire navigation** — add the two `PHASES` entries (icons + import) in `Sidebar.tsx` and the two routes + imports in `App.tsx`.
6. **Verify** — `pnpm --filter @workspace/engagement-portal run typecheck`; screenshot both pages (default tabs render; tab switching works; no missing rows vs the dumps).
7. **Docs + review** — update `replit.md` "Where things live" with the two new pages/data files; run the architect code review; fix any blockers.

## 7. Acceptance criteria

- Two new sidebar menus ("Submission Strategy", "Reconciliation Strategy") navigate to their pages.
- Every sheet from both packets is represented; **every register row** (SUB-01…SUB-30, REC-01…REC-10) and every table row is present and faithful to the source — nothing summarized away.
- Content is grouped into themed tabs (not one flat dump), with the closed-loop "submission creates the truth set / reconciliation enriches it" narrative visible on both pages.
- HealthTrixss theme respected; no emojis; lucide-react icons; typecheck passes; both pages verified by screenshot.

## 8. Conventions & gotchas

- Verify with `pnpm --filter @workspace/engagement-portal run typecheck` (NOT `build` — build needs workflow-provided `PORT`/`BASE_PATH`).
- Follow the existing Radix Tabs primary-underline pattern; default each page to its first ("Executive Overview") tab.
- xlsx parsing uses the unzip + inline-string XML approach in `.agents/memory/office-file-parsing.md` (these packets have empty `sharedStrings.xml`; cells are `t="inlineStr"`, tags are `x:`-prefixed).
- Keep data files auto-generated and verbatim; if a workbook is revised, regenerate the data module rather than hand-editing.
