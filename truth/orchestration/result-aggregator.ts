import type { TruthIntelligencePackage } from "@/truth/types";

export interface TruthResultAggregator {
  aggregate(output: TruthIntelligencePackage): TruthIntelligencePackage;
}

function deepFreeze<T>(value: T): T {
  if (typeof value !== "object" || value === null) return value;
  Object.freeze(value);
  for (const nestedValue of Object.values(value)) deepFreeze(nestedValue);
  return value;
}

export class ImmutableTruthResultAggregator implements TruthResultAggregator {
  aggregate(output: TruthIntelligencePackage): TruthIntelligencePackage {
    return deepFreeze(output);
  }
}
