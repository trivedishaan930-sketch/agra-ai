import { PromptBuilder } from "@/prompt/builders";
import { PromptOptimizer } from "@/prompt/optimizers";
import { PromptInputNormalizer } from "@/prompt/transformers";
import type { PromptInput, PromptPackage } from "@/prompt/types";
import { scorePromptPackage } from "@/prompt/utils";
import { PromptValidator } from "@/prompt/validators";

export type PromptPipelineStage<TInput, TOutput> = {
  execute(input: TInput): TOutput | Promise<TOutput>;
};

export type PromptPipelineDependencies = {
  normalizer: PromptInputNormalizer;
  builder: PromptBuilder;
  optimizer: PromptOptimizer;
  validator: PromptValidator;
};

export class PromptPipeline {
  private readonly dependencies: PromptPipelineDependencies;

  constructor(dependencies?: Partial<PromptPipelineDependencies>) {
    this.dependencies = {
      normalizer: dependencies?.normalizer ?? new PromptInputNormalizer(),
      builder: dependencies?.builder ?? new PromptBuilder(),
      optimizer: dependencies?.optimizer ?? new PromptOptimizer(),
      validator: dependencies?.validator ?? new PromptValidator(),
    };
  }

  optimize(input: PromptInput): PromptPackage {
    const parsedInput = this.dependencies.validator.validateInput(input);
    const normalizedInput = this.dependencies.normalizer.normalize(parsedInput);
    const builtPackage = this.dependencies.builder.build(normalizedInput);
    const optimizedPackage = this.dependencies.optimizer.optimize(builtPackage);
    const promptPackage: PromptPackage = {
      ...optimizedPackage,
      qualityScore: scorePromptPackage(optimizedPackage),
    };

    return this.dependencies.validator.validatePackage(promptPackage);
  }
}
