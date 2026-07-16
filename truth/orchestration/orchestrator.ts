import { TruthPipeline } from "@/truth/pipeline";
import type { TruthInput, TruthIntelligencePackage } from "@/truth/types";
import { DefaultLifecycleAwareTruthEngine } from "./truth-engine-lifecycle";
import type { TruthPipelineContext } from "./context";
import { DefaultPipelineCoordinator, DefaultValidationCoordinator, type PipelineCoordinator, type ValidationCoordinator } from "./coordinators";
import { DefaultTruthLifecycleManager, type TruthLifecycleManager } from "./lifecycle-manager";
import { ImmutableTruthResultAggregator, type TruthResultAggregator } from "./result-aggregator";

export interface TruthEngineOrchestrator {
  analyze(input: TruthInput): TruthIntelligencePackage;
  createExecutionContext(input: TruthInput): TruthPipelineContext;
}

export type TruthEngineOrchestratorDependencies = Readonly<{
  lifecycleManager: TruthLifecycleManager;
  validationCoordinator: ValidationCoordinator;
  pipelineCoordinator: PipelineCoordinator;
  resultAggregator: TruthResultAggregator;
}>;

export class DefaultTruthEngineOrchestrator implements TruthEngineOrchestrator {
  private readonly dependencies: TruthEngineOrchestratorDependencies;

  constructor(dependencies?: Partial<TruthEngineOrchestratorDependencies>) {
    const pipeline = new TruthPipeline();
    this.dependencies = {
      lifecycleManager: dependencies?.lifecycleManager ?? new DefaultTruthLifecycleManager(),
      validationCoordinator: dependencies?.validationCoordinator ?? new DefaultValidationCoordinator(),
      pipelineCoordinator: dependencies?.pipelineCoordinator ?? new DefaultPipelineCoordinator(pipeline),
      resultAggregator: dependencies?.resultAggregator ?? new ImmutableTruthResultAggregator(),
    };
  }

  createExecutionContext(input: TruthInput): TruthPipelineContext {
    const execution = this.dependencies.lifecycleManager.initialize(input.metadata);
    const validatedInput = this.dependencies.validationCoordinator.validateInput(input);
    const validatingExecution = this.dependencies.lifecycleManager.transition(execution, "validating");
    return {
      execution: validatingExecution,
      analysis: {
        input: validatedInput,
        intentAnalysis: validatedInput.intentAnalysis,
        promptPackage: validatedInput.promptPackage,
        routingDecision: validatedInput.routingDecision,
      },
    };
  }

  analyze(input: TruthInput): TruthIntelligencePackage {
    const context = this.createExecutionContext(input);
    const runningContext = {
      ...context,
      execution: this.dependencies.lifecycleManager.transition(context.execution, "running"),
    };
    const output = this.dependencies.pipelineCoordinator.execute(runningContext);
    const validatedOutput = this.dependencies.validationCoordinator.validatePackage(output);
    const completedOutput = this.dependencies.resultAggregator.aggregate(validatedOutput);
    this.dependencies.lifecycleManager.transition(runningContext.execution, "completed");
    return completedOutput;
  }
}

export const truthEngineOrchestrator = new DefaultTruthEngineOrchestrator();
export const lifecycleAwareTruthEngine = new DefaultLifecycleAwareTruthEngine(truthEngineOrchestrator);
