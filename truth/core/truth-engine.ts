import type { TruthIntelligenceEngine } from "@/truth/interfaces";
import { DefaultTruthEngineOrchestrator, type TruthEngineOrchestrator } from "@/truth/orchestration";
import type { TruthInput, TruthIntelligencePackage } from "@/truth/types";

export class DefaultTruthIntelligenceEngine implements TruthIntelligenceEngine {
  private readonly orchestrator: TruthEngineOrchestrator;

  constructor(orchestrator: TruthEngineOrchestrator = new DefaultTruthEngineOrchestrator()) {
    this.orchestrator = orchestrator;
  }

  analyze(input: TruthInput): TruthIntelligencePackage {
    return this.orchestrator.analyze(input);
  }
import { TruthPipeline } from "@/truth/pipeline";
import type { TruthInput, TruthIntelligencePackage } from "@/truth/types";

export class DefaultTruthIntelligenceEngine implements TruthIntelligenceEngine {
  private readonly pipeline: TruthPipeline;
  constructor(pipeline = new TruthPipeline()) { this.pipeline = pipeline; }
  analyze(input: TruthInput): TruthIntelligencePackage { return this.pipeline.analyze(input); }
}
export const truthIntelligenceEngine = new DefaultTruthIntelligenceEngine();
