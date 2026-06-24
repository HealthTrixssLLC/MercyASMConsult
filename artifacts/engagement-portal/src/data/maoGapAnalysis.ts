// MAO-004 Data Gap Analysis — data extracted verbatim from
// Corrohealth_MAO_Count_counts_20260617.xlsx (Pivot / Analysis / Sheet2 / Logic)
// and the Jun 17, 2026 email thread (Oldfather <-> Rawat).
// Grain: countDistinct(MEMBER_IDENTIFIER, DOS_THRU_DT, DX_CD), grouped by
// PAYER, SRC_FILE_NM, DOS_THRU_YYYYMM. MEMBER_IDENTIFIER = HICN_MBI for
// UnitedHealthcare, else MBR_ID. NPI is excluded (not present in MAO-004).

export type MonthPoint = {
  ym: string; // YYYYMM (DOS_THRU)
  label: string; // short axis label
  Aetna: number;
  UnitedHealthcare: number;
  Humana: number;
  BCBSOK: number;
};

// Normalized "rows per member" = distinct MAO-004 record count / approx. membership.
// This is the cross-payer comparable view Samir built for the email.
export const ROWS_PER_MEMBER: MonthPoint[] = [
  { ym: "202501", label: "Jan '25", Aetna: 133.75, UnitedHealthcare: 91.88, Humana: 12.23, BCBSOK: 119.25 },
  { ym: "202502", label: "Feb '25", Aetna: 117.0, UnitedHealthcare: 85.31, Humana: 10.71, BCBSOK: 106.55 },
  { ym: "202503", label: "Mar '25", Aetna: 125.05, UnitedHealthcare: 96.92, Humana: 11.53, BCBSOK: 109.44 },
  { ym: "202504", label: "Apr '25", Aetna: 109.56, UnitedHealthcare: 99.62, Humana: 12.01, BCBSOK: 92.88 },
  { ym: "202505", label: "May '25", Aetna: 92.41, UnitedHealthcare: 91.96, Humana: 11.2, BCBSOK: 88.49 },
  { ym: "202506", label: "Jun '25", Aetna: 85.46, UnitedHealthcare: 81.16, Humana: 10.51, BCBSOK: 73.57 },
  { ym: "202507", label: "Jul '25", Aetna: 72.51, UnitedHealthcare: 70.02, Humana: 11.27, BCBSOK: 74.2 },
  { ym: "202508", label: "Aug '25", Aetna: 61.35, UnitedHealthcare: 58.34, Humana: 10.94, BCBSOK: 62.68 },
  { ym: "202509", label: "Sep '25", Aetna: 57.28, UnitedHealthcare: 52.5, Humana: 10.58, BCBSOK: 59.07 },
  { ym: "202510", label: "Oct '25", Aetna: 51.61, UnitedHealthcare: 48.11, Humana: 11.77, BCBSOK: 57.74 },
  { ym: "202511", label: "Nov '25", Aetna: 38.95, UnitedHealthcare: 34.18, Humana: 9.71, BCBSOK: 41.72 },
  { ym: "202512", label: "Dec '25", Aetna: 32.37, UnitedHealthcare: 28.85, Humana: 10.05, BCBSOK: 35.96 },
  { ym: "202601", label: "Jan '26", Aetna: 16.16, UnitedHealthcare: 15.67, Humana: 10.17, BCBSOK: 22.84 },
  { ym: "202602", label: "Feb '26", Aetna: 11.19, UnitedHealthcare: 9.92, Humana: 9.99, BCBSOK: 17.66 },
  { ym: "202603", label: "Mar '26", Aetna: 5.52, UnitedHealthcare: 5.1, Humana: 10.03, BCBSOK: 10.26 },
  { ym: "202604", label: "Apr '26", Aetna: 0.72, UnitedHealthcare: 1.61, Humana: 10.03, BCBSOK: 0.35 },
];

// Raw distinct RECORD_CNT by DOS month (Pivot sheet) — the un-normalized view
// where Aetna's cumulative carry-forward inflates older DOS months.
export const RAW_RECORD_CNT: MonthPoint[] = [
  { ym: "202501", label: "Jan '25", Aetna: 7187426, UnitedHealthcare: 4599406, Humana: 472486, BCBSOK: 81928 },
  { ym: "202502", label: "Feb '25", Aetna: 6287471, UnitedHealthcare: 4270826, Humana: 413869, BCBSOK: 73199 },
  { ym: "202503", label: "Mar '25", Aetna: 6719831, UnitedHealthcare: 4851702, Humana: 445694, BCBSOK: 75182 },
  { ym: "202504", label: "Apr '25", Aetna: 5887284, UnitedHealthcare: 4986774, Humana: 463983, BCBSOK: 63806 },
  { ym: "202505", label: "May '25", Aetna: 4965924, UnitedHealthcare: 4603302, Humana: 432587, BCBSOK: 60794 },
  { ym: "202506", label: "Jun '25", Aetna: 4592454, UnitedHealthcare: 4062766, Humana: 406076, BCBSOK: 50546 },
  { ym: "202507", label: "Jul '25", Aetna: 3896400, UnitedHealthcare: 3505377, Humana: 435630, BCBSOK: 50976 },
  { ym: "202508", label: "Aug '25", Aetna: 3296742, UnitedHealthcare: 2920481, Humana: 422607, BCBSOK: 43064 },
  { ym: "202509", label: "Sep '25", Aetna: 3078234, UnitedHealthcare: 2628362, Humana: 408952, BCBSOK: 40581 },
  { ym: "202510", label: "Oct '25", Aetna: 2773340, UnitedHealthcare: 2408388, Humana: 454919, BCBSOK: 39668 },
  { ym: "202511", label: "Nov '25", Aetna: 2093294, UnitedHealthcare: 1711227, Humana: 375165, BCBSOK: 28659 },
  { ym: "202512", label: "Dec '25", Aetna: 1739450, UnitedHealthcare: 1444460, Humana: 388190, BCBSOK: 24707 },
  { ym: "202601", label: "Jan '26", Aetna: 932963, UnitedHealthcare: 784263, Humana: 508591, BCBSOK: 15689 },
  { ym: "202602", label: "Feb '26", Aetna: 646124, UnitedHealthcare: 496423, Humana: 499458, BCBSOK: 12135 },
  { ym: "202603", label: "Mar '26", Aetna: 318968, UnitedHealthcare: 255334, Humana: 501563, BCBSOK: 7050 },
  { ym: "202604", label: "Apr '26", Aetna: 41592, UnitedHealthcare: 804, Humana: 198650, BCBSOK: 243 },
];

export type PayerSeriesMeta = {
  key: keyof Omit<MonthPoint, "ym" | "label">;
  label: string;
  color: string;
  pattern: "Cumulative" | "Delta-like";
};

export const PAYER_SERIES: PayerSeriesMeta[] = [
  { key: "Aetna", label: "Aetna", color: "#f59e0b", pattern: "Cumulative" },
  { key: "UnitedHealthcare", label: "UnitedHealthcare", color: "#0ea5e9", pattern: "Cumulative" },
  { key: "BCBSOK", label: "BCBS Oklahoma", color: "#8b5cf6", pattern: "Cumulative" },
  { key: "Humana", label: "Humana", color: "#10b981", pattern: "Delta-like" },
];

export type MembershipRow = {
  payer: string;
  dec2025: number | null;
  current: number;
};

// Approx. membership used as the normalization denominator (Analysis / Sheet2).
export const MEMBERSHIP: MembershipRow[] = [
  { payer: "Aetna", dec2025: 53737, current: 57741 },
  { payer: "UnitedHealthcare", dec2025: 50060, current: 50060 },
  { payer: "Humana", dec2025: 38640, current: 49987 },
  { payer: "Essence", dec2025: 9641, current: 11707 },
  { payer: "Global Health", dec2025: 2057, current: 2503 },
  { payer: "BCBS Arkansas", dec2025: 2169, current: 2162 },
  { payer: "BCBS Oklahoma", dec2025: 0, current: 687 },
];

export type TotalsRow = { payer: string; total: number };

export const TOTAL_RECORDS: TotalsRow[] = [
  { payer: "Aetna", total: 54457497 },
  { payer: "UnitedHealthcare", total: 43529895 },
  { payer: "Humana", total: 6828420 },
  { payer: "BCBS Oklahoma", total: 668227 },
];

export const GRAND_TOTAL = 105484039;

export type RiskRow = {
  pattern: string;
  payers: string;
  signature: string;
  missingFileImpact: string;
  recoverable: "High" | "Low";
};

export const RISK_ASYMMETRY: RiskRow[] = [
  {
    pattern: "Cumulative / carry-forward",
    payers: "Aetna (confirmed); UHC & BCBSOK show the same signature",
    signature:
      "Per-member volume is highest for the oldest DOS and declines steadily — each monthly file re-carries prior-period records.",
    missingFileImpact:
      "Largely recoverable. A missing one or two files can be reconstructed because later files still contain the prior DOS history.",
    recoverable: "High",
  },
  {
    pattern: "Delta-like / per-period",
    payers: "Humana (suspected — requires payer confirmation)",
    signature:
      "Per-member volume is flat (~10–12 per member) across every DOS month — each file appears to carry mostly its own period.",
    missingFileImpact:
      "Potentially unrecoverable. A missing file may permanently drop that period's DOS tracking inventory, with no later file to backfill it.",
    recoverable: "Low",
  },
];

export const KEY_FINDINGS: string[] = [
  "Normalized by membership, Humana's MAO-004 volume is essentially flat (~10–12 rows per member every month), while Aetna, UHC, and BCBSOK all decline steeply from the oldest DOS to the newest.",
  "Aetna's monthly MAO-004 files are cumulative: each file carries forward historical DOS records, so aggregating all files repeatedly counts older months.",
  "Validation — filtering Aetna to a single file (MHS_MA_MAO4_202601_20260204.txt) still returned January-2025 DOS records, confirming history is carried forward in later submissions.",
  "The original row-per-member analysis overstated older Aetna DOS months because counts were summed across overlapping cumulative files (double counting).",
  "The declining tail and the April-2026 drop reflect normal claim lag for recent periods, not necessarily missing data.",
  "We cannot assume Humana behaves like Aetna. A flat, delta-like profile means missing Humana files would be far harder — possibly impossible — to recover.",
];

export const RECOMMENDATIONS: { title: string; detail: string }[] = [
  {
    title: "Characterize each payer's submission methodology before measuring completeness",
    detail:
      "Document, per payer, whether MAO-004 files are cumulative snapshots or per-period deltas, and how resubmissions/corrections are handled. Completeness, trending, and missing-file impact all depend on this.",
  },
  {
    title: "Always normalize by membership for cross-payer comparison",
    detail:
      "Raw record counts are not comparable across payers of different sizes. Rows-per-member exposes the true submission pattern and isolates the cumulative-vs-delta signature.",
  },
  {
    title: "De-duplicate cumulative payers to a latest-file (snapshot) view",
    detail:
      "For carry-forward payers like Aetna, count from the most recent file per period rather than summing all files, to avoid overstating older DOS months.",
  },
  {
    title: "Prioritize delta-like payers in the missing-file monitor",
    detail:
      "Because a gap in a delta-like feed (suspected Humana) is unrecoverable, file-arrival monitoring and SLA enforcement matter most there.",
  },
  {
    title: "Confirm Humana's behavior with the payer",
    detail:
      "Treat the delta-like classification as a hypothesis until validated through a single-file test (as done for Aetna) and payer confirmation.",
  },
];

export const METHODOLOGY: { label: string; value: string }[] = [
  { label: "Source request", value: "Mercy Data Strategy & Governance — \u201CCounts requested of MAO-004\u201D (Jun 17, 2026)" },
  { label: "Grain", value: "Distinct count of (MEMBER_IDENTIFIER, DOS_THRU_DT, DX_CD)" },
  { label: "Member identifier", value: "HICN_MBI for UnitedHealthcare; MBR_ID for all other payers" },
  { label: "Grouping", value: "PAYER, SRC_FILE_NM, DOS_THRU_YYYYMM" },
  { label: "Why YYYYMM not full date", value: "Day-level grain (DOS_THRU_DT) produced over 10,000 rows; month rollup keeps it readable" },
  { label: "NPI", value: "Excluded — NPI is not present in MAO-004 files" },
  { label: "Normalization", value: "MAO record count \u00F7 approximate payer membership (separate 2025 and 2026 denominators)" },
  { label: "DQS check", value: "DQS_MAO04_FILE_000_B — record count by grain, grouped by payer / file / DOS month" },
];
