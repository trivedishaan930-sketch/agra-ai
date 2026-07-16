import type { TruthIntelligenceEngine } from "@/truth/interfaces";
import {
  DefaultTruthEngineOrchestrator,
  type TruthEngineOrchestrator,
} from "@/truth/orchestration";
import type { TruthInput, TruthIntelligencePackage } from "@/truth/types";

export class DefaultTruthIntelligenceEngine implements TruthIntelligenceEngine {
  private readonly orchestrator: TruthEngineOrchestrator;

  constructor(
    orchestrator: TruthEngineOrchestrator = new DefaultTruthEngineOrchestrator(),
  ) {
    this.orchestrator = orchestrator;
  }

  analyze(input: TruthInput): TruthIntelligencePackage {
    return this.orchestrator.analyze(input);
  }
}

export const truthIntelligenceEngine = new DefaultTruthIntelligenceEngine();
