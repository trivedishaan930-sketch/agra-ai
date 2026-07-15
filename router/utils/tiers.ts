import { RoutingTier } from "@/router/types";

const tierRank: Record<RoutingTier, number> = {
  [RoutingTier.Low]: 1,
  [RoutingTier.Medium]: 2,
  [RoutingTier.High]: 3,
};

export function tierToScore(tier: RoutingTier, lowerIsBetter = false) {
  const rank = tierRank[tier];
  return lowerIsBetter ? (4 - rank) / 3 : rank / 3;
}

export function bestTier(
  values: readonly RoutingTier[],
  lowerIsBetter = false,
) {
  return values.reduce((best, value) => {
    const currentScore = tierToScore(value, lowerIsBetter);
    const bestScore = tierToScore(best, lowerIsBetter);
    return currentScore > bestScore ? value : best;
  }, values[0] ?? RoutingTier.Medium);
}
