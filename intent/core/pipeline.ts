import { intentConfig } from "@/config/intent.config";
import { RuleBasedIntentClassifier } from "@/intent/classifiers";
import {
  RuleBasedGoalDetector,
  RuleBasedTaskDetector,
} from "@/intent/detectors";
import { InvalidInputError, LowConfidenceError } from "@/intent/errors";
import { intentAnalysisSchema, intentInputSchema } from "@/intent/models";
import {
  IntentPriority,
  IntentType,
  type IntentAnalysis,
  type IntentContext,
  type IntentInput,
  type NormalizedIntentInput,
} from "@/intent/types";
import { normalizeIntentInput } from "@/intent/utils";
import { RuleBasedContextExtractor } from "@/intent/extractors";

export type IntentPipelineStage<TInput, TOutput> = {
  execute(input: TInput): TOutput | Promise<TOutput>;
};

export type IntentPipelineDependencies = {
  classifier: RuleBasedIntentClassifier;
  taskDetector: RuleBasedTaskDetector;
  contextExtractor: RuleBasedContextExtractor;
  goalDetector: RuleBasedGoalDetector;
};

function resolvePriority(confidence: number, context: IntentContext) {
  if (context.tone === "urgent") return IntentPriority.High;
  if (confidence >= intentConfig.confidence.high) return IntentPriority.High;
  if (confidence < intentConfig.confidence.minimum) return IntentPriority.Low;
  return IntentPriority.Normal;
}

function buildRoutingHints(intent: IntentType, context: IntentContext) {
  const requiresCodeContext =
    intent === IntentType.Coding ||
    intent === IntentType.Debugging ||
    context.files.some((file) => /\.(?:ts|tsx|js|jsx|json)$/.test(file));
  const requiresFreshData =
    intent === IntentType.Search ||
    intent === IntentType.Research ||
    context.keywords.includes("latest");
  const requiresLongContext =
    Boolean(context.conversationContext) ||
    context.references.length > 2 ||
    context.files.length > 2;

  return {
    requiresFreshData,
    requiresCodeContext,
    requiresLongContext,
    supportsParallelization:
      intent === IntentType.Research || intent === IntentType.Analysis,
    suggestedCapabilities: [
      ...(requiresFreshData ? ["fresh-data"] : []),
      ...(requiresCodeContext ? ["code-context"] : []),
      ...(requiresLongContext ? ["long-context"] : []),
    ],
  };
}

function buildWarnings(intent: IntentType, confidence: number) {
  const warnings: string[] = [];
  if (intent === IntentType.Unknown)
    warnings.push("Intent could not be confidently classified.");
  if (confidence < intentConfig.confidence.minimum)
    warnings.push("Intent confidence is below the configured threshold.");
  return warnings;
}

export class IntentPipeline {
  private readonly dependencies: IntentPipelineDependencies;

  constructor(dependencies?: Partial<IntentPipelineDependencies>) {
    this.dependencies = {
      classifier: dependencies?.classifier ?? new RuleBasedIntentClassifier(),
      taskDetector: dependencies?.taskDetector ?? new RuleBasedTaskDetector(),
      contextExtractor:
        dependencies?.contextExtractor ?? new RuleBasedContextExtractor(),
      goalDetector: dependencies?.goalDetector ?? new RuleBasedGoalDetector(),
    };
  }

  analyze(input: IntentInput): IntentAnalysis {
    const parsedInput = intentInputSchema.safeParse(input);
    if (!parsedInput.success) {
      throw new InvalidInputError(
        parsedInput.error.issues.map((issue) => issue.message).join("; "),
        parsedInput.error,
      );
    }

    const normalizedInput = normalizeIntentInput(parsedInput.data);
    return this.analyzeNormalized(normalizedInput);
  }

  private analyzeNormalized(input: NormalizedIntentInput): IntentAnalysis {
    const classification = this.dependencies.classifier.classify(input);
    const tasks = this.dependencies.taskDetector.detect(input);
    const context = this.dependencies.contextExtractor.extract(input);
    const goal = this.dependencies.goalDetector.detect(
      input,
      classification.intent,
      tasks,
    );
    const warnings = buildWarnings(
      classification.intent,
      classification.confidence,
    );

    if (
      classification.confidence < intentConfig.confidence.unknown &&
      classification.intent !== IntentType.Unknown
    ) {
      throw new LowConfidenceError(classification.confidence);
    }

    const result: IntentAnalysis = {
      intent: classification.intent,
      confidence: classification.confidence,
      tasks,
      goal,
      context,
      entities: context.entities,
      language: context.language,
      priority: resolvePriority(classification.confidence, context),
      metadata: {
        ...input.metadata,
        normalizedText: input.normalizedText,
        tokenCount: input.tokens.length,
        classifier: "rule-based",
      },
      warnings,
      routingHints: buildRoutingHints(classification.intent, context),
    };

    return intentAnalysisSchema.parse(result);
  }
}

export const intentPipeline = new IntentPipeline();
