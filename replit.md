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
- Sidebar / phase navigation: `src/components/layout/Sidebar.tsx` — `Phase` type supports optional `children` for nested sub-menu links (e.g. "Jay's MAO Guidance" under "Jun 10, 2026").
- Discussion pages: `src/pages/Discussion*.tsx` (one per session date; follow the `DiscussionJun08.tsx` pattern — eyebrow + serif h1 + Radix Tabs with primary underline).
- "ASM Analysis Current" page (route `/asm-analysis-current`): `src/pages/HpLayoutSql.tsx` — two top-level tabs. "Artifacts" = a table (Health Plan | Submission SQL | File Layout) driven by the `HEALTH_PLANS` array; source files live in `public/files/hp/layout/` (xlsx/docx/csv, download links) and `public/files/hp/sql/` (`.sql`, fetched inline at runtime via `import.meta.env.BASE_URL`). To add more, drop files in those folders and append an entry to `HEALTH_PLANS`; a grain column (Institutional vs Ambulatory) can be added between Health Plan and SQL if needed. "Artifacts Analysis" renders the concept-crosswalk workbook from `src/data/conceptMatrix.ts` (auto-generated from `Mercy_ASM_Health_Plan_Layout_Concept_Matrix_REVISED.xlsx`) as a title + legend strip + nested sub-tabs: Coverage Matrix (concept + business definition + 4-state status per plan [☑ present / △ situational / ☒ absent / ? confirm] + reviewer notes, grouped by category), Destination Field Mapping (concept → destination field name per plan), and Notes & Legend (legend + revision principle + source note). The payer layouts are destinations Mercy concepts map TO, not sources.
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
