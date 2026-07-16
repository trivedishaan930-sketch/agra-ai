import type { TruthIntelligenceEngine } from "@/truth/interfaces";
import { TruthPipeline } from "@/truth/pipeline";
import type { TruthAnalysisInput, TruthPackage } from "@/truth/types";
import type { TruthInput, TruthIntelligencePackage } from "@/truth/types";

export class DefaultTruthIntelligenceEngine implements TruthIntelligenceEngine {
  private readonly pipeline: TruthPipeline;

  constructor(pipeline = new TruthPipeline()) {
    this.pipeline = pipeline;
  }

  analyze(input: TruthAnalysisInput): TruthPackage {
  analyze(input: TruthInput): TruthIntelligencePackage {
    return this.pipeline.analyze(input);
  }
}

export const truthIntelligenceEngine = new DefaultTruthIntelligenceEngine();
