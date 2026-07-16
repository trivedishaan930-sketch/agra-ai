import type { TruthAnalysisInput, TruthPackage } from "@/truth/types";

export interface TruthIntelligenceEngine {
  analyze(input: TruthAnalysisInput): TruthPackage;
import type { TruthInput, TruthIntelligencePackage } from "@/truth/types";

export interface TruthIntelligenceEngine {
  analyze(input: TruthInput): TruthIntelligencePackage;
}
