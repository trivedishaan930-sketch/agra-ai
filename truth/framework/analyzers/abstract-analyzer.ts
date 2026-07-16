import type {
  AnalyzerExecutionContext,
  AnalyzerMetadata,
  AnalyzerResult,
  AnalyzerValidationResult,
} from "./types";
import type { TruthAnalyzerContract } from "./contract";

export abstract class AbstractTruthAnalyzer<TInput, TResult>
  implements TruthAnalyzerContract<TInput, TResult>
{
  abstract readonly metadata: AnalyzerMetadata;

  initialize(context: AnalyzerExecutionContext): AnalyzerExecutionContext {
    return Object.freeze({ ...context, lifecycleState: "initialized" });
  }

  validate(): AnalyzerValidationResult {
    return Object.freeze({ valid: true, warnings: [] });
  }

  analyze(
    input: TInput,
    context: AnalyzerExecutionContext,
  ): AnalyzerResult<TResult> {
    const value = this.execute(input, context);
    return this.createImmutableResult(value, context);
  }

  finalize(result: AnalyzerResult<TResult>): AnalyzerResult<TResult> {
    return Object.freeze({
      ...result,
      lifecycleState: "finalized",
      immutable: true,
    });
  }

  protected abstract execute(
    input: TInput,
    context: AnalyzerExecutionContext,
  ): TResult;

  protected createImmutableResult(
    value: TResult,
    context: AnalyzerExecutionContext,
  ): AnalyzerResult<TResult> {
    return Object.freeze({
      analyzerId: this.metadata.id,
      value,
      lifecycleState: "finalized",
      immutable: true,
      generatedAt: new Date().toISOString(),
      metadata: context.metadata,
    });
  }
}
