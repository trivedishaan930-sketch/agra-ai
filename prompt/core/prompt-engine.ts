import { PromptPipeline } from "@/prompt/core/pipeline";
import type { PromptInput, PromptPackage } from "@/prompt/types";

export class PromptEngine {
  private readonly pipeline: PromptPipeline;

  constructor(pipeline = new PromptPipeline()) {
    this.pipeline = pipeline;
  }

  optimize(input: PromptInput): PromptPackage {
    return this.pipeline.optimize(input);
  }
}

export const promptEngine = new PromptEngine();
