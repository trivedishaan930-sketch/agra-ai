import type { IntentAnalysis } from "@/intent";
import type { PromptPackage } from "@/prompt";
import type { RoutingDecision } from "@/router";
import type { NormalizedTruthInput, TruthInput, TruthIntelligencePackage, TruthMetadataValue } from "@/truth/types";

export type TruthLifecycleState =
  | "initialized"
  | "validating"
  | "running"
  | "completed"
  | "failed"
  | "cancelled"
  | "retry_pending";

export type TruthExecutionContext = Readonly<{
  executionId: string;
  requestedAt: string;
  lifecycleState: TruthLifecycleState;
  metadata: Readonly<Record<string, TruthMetadataValue>>;
}>;

export type TruthAnalysisContext = Readonly<{
  input: TruthInput;
  intentAnalysis?: IntentAnalysis;
  promptPackage?: PromptPackage;
  routingDecision?: RoutingDecision;
}>;

export type TruthPipelineContext = Readonly<{
  execution: TruthExecutionContext;
  analysis: TruthAnalysisContext;
  normalizedInput?: NormalizedTruthInput;
}>;

export type TruthCompletedContext = TruthPipelineContext & Readonly<{
  normalizedInput: NormalizedTruthInput;
  package: TruthIntelligencePackage;
}>;
