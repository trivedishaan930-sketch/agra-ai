import type { TruthInput, TruthIntelligencePackage } from "@/truth/types";
export interface TruthIntelligenceEngine { analyze(input: TruthInput): TruthIntelligencePackage }
