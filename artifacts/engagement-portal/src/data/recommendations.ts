// Consolidated register of the recommendations made across the engagement, each
// given a STABLE id and traced back to the page it originates from and the
// finding(s) it addresses. Recommendations are kept as a single source of truth
// on their origin page (e.g. the MAO Data Gap Analysis) and surfaced here by a
// stable `key` — never by array position — so reordering a source list can never
// renumber a register id or silently re-point its related-finding mapping.

import { RECOMMENDATIONS as MAO_RECOMMENDATIONS } from "./maoGapAnalysis";
import type { RegisterLane } from "./findings";

export type Recommendation = {
  id: string;
  title: string;
  detail: string;
  sourceLabel: string;
  sourcePath: string;
  relatedFindings: string[];
  lane: RegisterLane;
  lanePath: string;
};

const REC = "/reconciliation-strategy";

// Explicit, order-independent register entries. `key` references a stable
// identifier on the source recommendation; `id` and `relatedFindings` live here.
type RegisterEntry = {
  id: string;
  key: string;
  sourceLabel: string;
  sourcePath: string;
  relatedFindings: string[];
  lane: RegisterLane;
  lanePath: string;
};

const ENTRIES: RegisterEntry[] = [
  { id: "R-01", key: "characterize-methodology", sourceLabel: "MAO Data Gap Analysis", sourcePath: "/mao-data-gap", relatedFindings: ["F-03", "F-09"], lane: "Reconciliation Lane", lanePath: REC },
  { id: "R-02", key: "normalize-by-membership", sourceLabel: "MAO Data Gap Analysis", sourcePath: "/mao-data-gap", relatedFindings: ["F-03"], lane: "Reconciliation Lane", lanePath: REC },
  { id: "R-03", key: "dedup-cumulative", sourceLabel: "MAO Data Gap Analysis", sourcePath: "/mao-data-gap", relatedFindings: ["F-03"], lane: "Reconciliation Lane", lanePath: REC },
  { id: "R-04", key: "prioritize-delta-monitor", sourceLabel: "MAO Data Gap Analysis", sourcePath: "/mao-data-gap", relatedFindings: ["F-09"], lane: "Reconciliation Lane", lanePath: REC },
  { id: "R-05", key: "confirm-humana", sourceLabel: "MAO Data Gap Analysis", sourcePath: "/mao-data-gap", relatedFindings: ["F-09"], lane: "Reconciliation Lane", lanePath: REC },
];

const MAO_BY_KEY = new Map(MAO_RECOMMENDATIONS.map((r) => [r.key, r]));

export const RECOMMENDATIONS: Recommendation[] = ENTRIES.map((e) => {
  const source = MAO_BY_KEY.get(e.key);
  if (!source) {
    throw new Error(`Recommendation ${e.id} references unknown source key "${e.key}"`);
  }
  return {
    id: e.id,
    title: source.title,
    detail: source.detail,
    sourceLabel: e.sourceLabel,
    sourcePath: e.sourcePath,
    relatedFindings: e.relatedFindings,
    lane: e.lane,
    lanePath: e.lanePath,
  };
});
