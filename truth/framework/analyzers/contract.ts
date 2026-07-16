import type {
  AnalyzerExecutionContext,
  AnalyzerMetadata,
  AnalyzerResult,
  AnalyzerValidationResult,
} from "./types";

export interface TruthAnalyzerContract<TInput = unknown, TResult = unknown> {
  readonly metadata: AnalyzerMetadata;
  initialize(context: AnalyzerExecutionContext): AnalyzerExecutionContext;
  validate(
    input: TInput,
    context: AnalyzerExecutionContext,
  ): AnalyzerValidationResult;
  analyze(
    input: TInput,
    context: AnalyzerExecutionContext,
  ): AnalyzerResult<TResult>;
  finalize(
    result: AnalyzerResult<TResult>,
    context: AnalyzerExecutionContext,
  ): AnalyzerResult<TResult>;
}

export type TruthAnalyzerPublicInterface<
  TInput = unknown,
  TResult = unknown,
> = Pick<
  TruthAnalyzerContract<TInput, TResult>,
  "metadata" | "initialize" | "validate" | "analyze" | "finalize"
>;
