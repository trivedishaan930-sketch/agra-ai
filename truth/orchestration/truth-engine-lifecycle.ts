import type { TruthIntelligenceEngine } from "@/truth/interfaces";
import type { TruthInput, TruthIntelligencePackage } from "@/truth/types";
import type { TruthEngineOrchestrator } from "./orchestrator";

export class DefaultLifecycleAwareTruthEngine
  implements TruthIntelligenceEngine
{
  constructor(private readonly orchestrator: TruthEngineOrchestrator) {}

  analyze(input: TruthInput): TruthIntelligencePackage {
    return this.orchestrator.analyze(input);
  }
}
