import type { TruthAnalysisInput, TruthPackage } from "@/truth/types";

export interface TruthIntelligenceEngine {
  analyze(input: TruthAnalysisInput): TruthPackage;
}
