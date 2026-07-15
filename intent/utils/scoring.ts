export function clampConfidence(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function scoreMatches(matchCount: number, totalSignals: number) {
  if (totalSignals <= 0) return 0;
  return clampConfidence(matchCount / totalSignals);
}

export function weightedConfidence(base: number, evidenceCount: number) {
  return clampConfidence(base + Math.min(evidenceCount * 0.08, 0.32));
}
