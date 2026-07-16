import type { TruthPipeline } from "@/truth/pipeline";
import { TruthValidator } from "@/truth/validators";
import type { TruthInput, TruthIntelligencePackage } from "@/truth/types";
import type { TruthPipelineContext } from "./context";

export interface ValidationCoordinator {
  validateInput(input: TruthInput): TruthInput;
  validatePackage(output: TruthIntelligencePackage): TruthIntelligencePackage;
}

export class DefaultValidationCoordinator implements ValidationCoordinator {
  constructor(private readonly validator = new TruthValidator()) {}

  validateInput(input: TruthInput): TruthInput {
    return this.validator.validateInput(input);
  }

  validatePackage(output: TruthIntelligencePackage): TruthIntelligencePackage {
    return this.validator.validatePackage(output);
  }
}

export interface PipelineCoordinator {
  execute(context: TruthPipelineContext): TruthIntelligencePackage;
}

export class DefaultPipelineCoordinator implements PipelineCoordinator {
  constructor(private readonly pipeline: TruthPipeline) {}

  execute(context: TruthPipelineContext): TruthIntelligencePackage {
    return this.pipeline.analyze(context.analysis.input);
  }
}

export interface AnalyzerCoordinator {
  readonly parallelReady: false;
  readonly analyzerOrder: readonly string[];
}

export const defaultAnalyzerCoordinator: AnalyzerCoordinator = {
  parallelReady: false,
  analyzerOrder: ["truth", "evidence", "confidence", "risk", "reliability", "weakness", "strength", "improvement", "explanation"],
};

export interface FutureParallelCoordinator {
  readonly enabled: false;
  readonly strategy: "not_implemented";
}

export const futureParallelCoordinator: FutureParallelCoordinator = {
  enabled: false,
  strategy: "not_implemented",
};
