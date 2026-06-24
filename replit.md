# Consulting Engagement Portal

A structured, phase-by-phase web portal that presents a consulting engagement — left-side phase navigation with tabbed content per phase. Phase 1 (Statement of Work) is fully built; later phases are added sequentially.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- Web app: `artifacts/engagement-portal` (React + Vite + wouter, frontend-only). Routes in `src/App.tsx`.
- Auth: client-side email/password login gate (no backend). `src/hooks/useAuth.tsx` (`AuthProvider` + `useAuth`, persists to localStorage key `ht-portal-auth`, validates stored value against the expected email on load), login page `src/pages/Login.tsx` (HealthTrixss `H+` logo via `@assets`), gate in `src/App.tsx` `Router()` (renders `<Login/>` until authenticated), Sign out button in the `Sidebar.tsx` footer. Credentials are hardcoded in `useAuth.tsx` — since this is a static frontend, they ship in the bundle (not a true security boundary).
- Page layout convention: every page's outer wrapper is `max-w-[1600px] mx-auto px-6 md:px-10 py-8 md:py-10 fade-in` so content fills the wide main area (no centered/zoomed feel, no wasted side margins). Hero `h1` is `text-3xl md:text-4xl font-serif`; intro paragraphs are `text-base text-muted-foreground max-w-3xl leading-relaxed` (prose stays readable via its own `max-w-3xl` while tables/grids use the full container). Keep new pages on this scale to stay proportionate to the compact sidebar.
- Sidebar / phase navigation: `src/components/layout/Sidebar.tsx` — nav is driven by `PHASE_GROUPS` (array of `{id, title, items}`), rendered as labeled sections: Planning, Discovery Sessions, Analysis and Design, Gap and Risk Register. Each `Phase` item supports optional `children` for nested sub-menu links (e.g. MAO Guidance under "Jun 10, 2026"). Statement of Work item lives at path `/` (with `/phase/1` alias); its active highlight special-cases the alias.
- Kickoff page (route `/kickoff`, `src/pages/Kickoff.tsx`): Radix tabs Overview / Submission Lifecycle Flow / Stakeholders / Timeline / Discovery Cadence. The "Timeline" tab renders `src/components/DiscoveryProcess.tsx` (PDF page 5 — assessment scope banner, participating health plans, 4 week cards) and "Discovery Cadence" renders `src/components/DiscoveryCadence.tsx` (PDF page 6 — Proposed Working Model + Working Assumptions). Both pull from `src/data/discoveryCadence.ts`, which carries stable trace IDs (`W#`, `W#-A#`/`W#-I#`/`W#-O#`, `HP#`, `WM#`, `WA#`) surfaced as `data-trace-id` attributes for later traceability analysis. Per-week accent colors are applied via inline `style` (hex), not Tailwind classes, so JIT purging can't drop them. Source: `attached_assets/MercyKickoff_06012026_Full_*.pdf` pages 5–6. SOW Timeline tab (`Phase1.tsx`) is a separate, unrelated milestone list — do not merge the two.
- Discussion pages: `src/pages/Discussion*.tsx` (one per session date; follow the `DiscussionJun08.tsx` pattern — eyebrow + serif h1 + Radix Tabs with primary underline).
- "ASM Analysis Current" page (route `/asm-analysis-current`): `src/pages/HpLayoutSql.tsx` — two top-level tabs. "Artifacts" = a table (Health Plan | Submission SQL | File Layout) driven by the `HEALTH_PLANS` array; source files live in `public/files/hp/layout/` (xlsx/docx/csv, download links) and `public/files/hp/sql/` (`.sql`, fetched inline at runtime via `import.meta.env.BASE_URL`). To add more, drop files in those folders and append an entry to `HEALTH_PLANS`; a grain column (Institutional vs Ambulatory) can be added between Health Plan and SQL if needed. "Artifacts Analysis" renders the concept-crosswalk workbook from `src/data/conceptMatrix.ts` (auto-generated from `Mercy_ASM_Health_Plan_Layout_Concept_Matrix_REVISED.xlsx`) as a title + legend strip + nested sub-tabs: Coverage Matrix (concept + business definition + 4-state status per plan [☑ present / △ situational / ☒ absent / ? confirm] + reviewer notes, grouped by category), Destination Field Mapping (concept → destination field name per plan), and Notes & Legend (legend + revision principle + source note). The payer layouts are destinations Mercy concepts map TO, not sources.
- "MAO Data Gap Analysis" page (route `/mao-data-gap`, `src/pages/MaoDataGap.tsx`, second item in the "Analysis and Design" sidebar group after "ASM artifacts"): consultant diagnostic of the MAO-004 counts from the Jun 17, 2026 email thread (Oldfather↔Rawat). Radix tabs Executive Summary / Submission Behavior / Aetna Validation / Methodology / Gap Risk & Recommendations. Recharts `LineChart`s render the normalized "rows per member" series (the centerpiece — Humana flat ~10–12/mo = delta-like; Aetna/UHC/BCBSOK slope down = cumulative carry-forward) and the raw record-count series. Data is in `src/data/maoGapAnalysis.ts`, extracted verbatim from `attached_assets/Corrohealth_MAO_Count_counts_*.xlsx` (Pivot/Analysis/Sheet2/Logic sheets) — parsed via the unzip+XML route in `office-file-parsing.md`. Grain = countDistinct(MEMBER_IDENTIFIER[=HICN_MBI for UHC else MBR_ID], DOS_THRU_DT, DX_CD) grouped by PAYER/SRC_FILE_NM/DOS_THRU_YYYYMM; NPI excluded (not in MAO-004). Core message (QA'd against the email): each payer's file accumulation/resubmission method must be understood before judging completeness — Aetna cumulative (missing files recoverable), Humana suspected delta (missing files unrecoverable). Recharts chart colors are passed as hex props (not Tailwind classes).
- "Findings" page (route `/findings`, `src/pages/Findings.tsx`): consolidated, de-duplicated index of findings across the whole engagement. Data lives in `src/data/findings.ts` as typed `Finding[]` (stable ids `F-01`…`F-15`, title, detail, tag, `sources` (a `Record<FindingSourceKey, boolean>` built via the `src()` helper), resolution, lane, lanePath). Source columns are driven by `SOURCE_COLUMNS` (key/label/path), in order: Pre Kickoff (`/kickoff-planning`), Kickoff (`/kickoff`), Jun 8/10/12 (discussion routes), ASM Analysis (`/asm-analysis-current`) — each column header is a wouter `Link` to that source page. The table shows ID, Finding Detail (title + tag chip + detail), one check/cross presence column per source, and a Traceability column (short resolution + `Link` to the Gap & Risk register lane). Dedup is done in the data file: recurring themes merge into one row with multiple source flags (e.g. `F-03` reconciliation framework spans Pre Kickoff→Jun 8/10/12; `F-01` key-person risk spans Pre Kickoff + Jun 8; `F-06`/`F-07` flag Kickoff (themes named in the kickoff objective); `F-10`/`F-11`/`F-15` flag ASM Analysis). A check means the finding or the risk/scope theme it stems from surfaced in that source. Findings are sourced from `DiscussionJun08/10/12.tsx` `FINDINGS` arrays plus `KickoffPlanning.tsx` (Pre Kickoff risks/hypotheses), `Kickoff.tsx` (objective themes), and `HpLayoutSql.tsx` + `conceptMatrix.ts` (SQL/Layout analysis). It is the first item in the "Gap and Risk Register" sidebar group. To add a source, append to `SOURCE_COLUMNS` and add the key to the `FindingSourceKey` union + `src()` defaults; to add a finding, append to `FINDINGS`.
- "Submission Strategy" (route `/submission-strategy`, `src/pages/SubmissionStrategy.tsx`) and "Reconciliation Strategy" (route `/reconciliation-strategy`, `src/pages/ReconciliationStrategy.tsx`): consultant recommendation packets, one Radix tab per source sheet. Data is auto-generated verbatim from the two packet `.xlsx` files into `src/data/submissionStrategy.ts` and `src/data/reconciliationStrategy.ts` as typed `StrategySheet` objects (`{title, subtitle, headers, rows}`) plus a bespoke `SUB_EXEC`/`REC_EXEC` for the executive overview. Tables render through `src/components/StrategyTable.tsx` (sticky header, zebra rows, horizontal scroll, auto priority chips on any "Priority" column). Blueprint and Data Model are each their own tab rendered as the original Excel table. To regenerate, re-parse the source workbook (see `office-file-parsing.md`) and rewrite the data file. Consultant framing: ASM = Additional Submission Mechanism; unifying principle "submission creates the truth set; reconciliation enriches it."
- Reproduced Excel workbooks: rendered via `src/components/SheetTable.tsx` (merged-cell rowSpan/colSpan, banner/header rows, horizontal scroll) from auto-generated data in `src/data/*.ts` (e.g. `maoGuidance.ts`).
- To regenerate an Office-derived data file, see `.agents/memory/office-file-parsing.md` (unzip + parse XML; no python3, npm xlsx blocked).

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
