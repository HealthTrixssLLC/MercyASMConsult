import { FINDINGS, type Finding } from "./findings";
import { REC_REGISTER } from "./reconciliationStrategy";
import { SUB_REGISTER } from "./submissionStrategy";

// Fast lookup of a finding by its stable id (for tooltips + link targets).
export const FINDINGS_BY_ID: Map<string, Finding> = new Map(FINDINGS.map((f) => [f.id, f]));

// The "golden thread": each lane recommendation (REC-## reconciliation, SUB-##
// submission) maps to the finding(s) that justify it. A recommendation with no
// entry — or an empty array — is an ORPHAN: it is surfaced (rendered as a dash),
// never hidden, so we can see which recommendations still owe a finding and why.
//
// Single source of truth: finding text lives only in findings.ts and is shown
// here by id. Keep ids stable; do not renumber.
export const RECOMMENDATION_FINDINGS: Record<string, string[]> = {
  // ---- Reconciliation lane (REC_REGISTER) ----
  "REC-01": ["F-09", "F-03"], // governed response-file inventory
  "REC-02": ["F-09", "F-03"], // standardize response intake tables
  "REC-03": ["F-03"], // response-type-specific matching grain
  "REC-04": ["F-03", "F-06"], // reverse reconciliation status on staged records
  "REC-05": ["F-16", "F-17", "F-18"], // MAO-004 completeness before outcome analytics
  "REC-06": ["F-16", "F-19"], // classify payer file methodology (cumulative/delta)
  "REC-07": ["F-09", "F-13"], // BCBSOK MAO-002 pilot
  "REC-08": [], // actionability framework — no backing finding yet (orphan)
  "REC-09": ["F-02"], // operational queue for corrections / escalations
  "REC-10": [], // analytics to accessible reporting layer (orphan)

  // ---- Submission lane (SUB_REGISTER) ----
  "SUB-01": ["F-07"], // separate curation / ASM / layout / submission layers
  "SUB-02": ["F-10", "F-11"], // externalize rules into governed config
  "SUB-03": ["F-03", "F-07"], // Mercy-format staged source of truth
  "SUB-04": ["F-06"], // run id / run control & audit
  "SUB-05": ["F-08"], // mandatory pre-submission QA gate
  "SUB-06": ["F-10", "F-15"], // layout metadata registry
  "SUB-07": ["F-10"], // payer spec repository
  "SUB-08": ["F-11"], // normalized diagnosis modeling
  "SUB-09": ["F-03"], // duplicate prevention rules
  "SUB-10": ["F-05"], // submission cadence
  "SUB-11": [], // operational approval checkpoint (orphan)
  "SUB-12": ["F-03"], // source-to-submission completeness
  "SUB-13": ["F-11"], // UHC DX overflow automation
  "SUB-14": ["F-11"], // UHC service-line rule
  "SUB-15": ["F-11"], // UHC CPT/HCPCS filters
  "SUB-16": ["F-11"], // UHC bill type mapping
  "SUB-17": ["F-11", "F-15"], // Anthem layout metadata pilot
  "SUB-18": ["F-11", "F-15"], // Anthem claim-type rules
  "SUB-19": ["F-07"], // Aetna wide layout at conversion
  "SUB-20": ["F-10", "F-11"], // Aetna rule configuration
  "SUB-21": ["F-11"], // BCBSOK prefix/contract mapping
  "SUB-22": ["F-11"], // Essence one-DX layout
  "SUB-23": ["F-11"], // Global Health one-DX layout
  "SUB-24": ["F-10", "F-11"], // Humana regional rules
  "SUB-25": ["F-15"], // file naming and transmission
  "SUB-26": ["F-15"], // required field population checks
  "SUB-27": ["F-15"], // provider concept separation
  "SUB-28": ["F-15"], // member identifier strategy
  "SUB-29": ["F-06"], // source identifier preservation
  "SUB-30": [], // developer/operator separation (orphan)
};

// Reverse index: finding id -> recommendation ids it drives (for the Findings page).
export const FINDING_RECOMMENDATIONS: Record<string, string[]> = (() => {
  const out: Record<string, string[]> = {};
  for (const [rec, ids] of Object.entries(RECOMMENDATION_FINDINGS)) {
    for (const id of ids) {
      (out[id] ??= []).push(rec);
    }
  }
  return out;
})();

// Dev-time integrity guard (Rule 1): every referenced finding id must exist.
// Orphan recommendations (empty arrays) are allowed by design and skipped here.
if (import.meta.env.DEV) {
  const missing: string[] = [];
  for (const [rec, ids] of Object.entries(RECOMMENDATION_FINDINGS)) {
    for (const id of ids) {
      if (!FINDINGS_BY_ID.has(id)) missing.push(`${rec} → ${id}`);
    }
  }
  if (missing.length) {
    throw new Error(
      `traceability.ts references unknown finding ids: ${missing.join(", ")}. ` +
        `Every recommendation must trace to an existing finding (or be left an explicit orphan).`,
    );
  }

  // Completeness: every register recommendation id must have an explicit entry
  // (mapped findings OR an intentional empty-array orphan), so accidental
  // unmapped ids don't silently render as "— none".
  const registerIds = [...REC_REGISTER.rows, ...SUB_REGISTER.rows]
    .map((row) => (row[0] ?? "").trim())
    .filter(Boolean);
  const unaccounted = registerIds.filter((id) => !(id in RECOMMENDATION_FINDINGS));
  if (unaccounted.length) {
    throw new Error(
      `traceability.ts is missing entries for register recommendations: ${unaccounted.join(", ")}. ` +
        `Add a finding mapping or an explicit [] orphan entry.`,
    );
  }
}
