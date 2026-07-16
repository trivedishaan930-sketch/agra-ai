import type { TruthMetadataValue } from "@/truth/types";

export type AnalyzerLifecycleState =
  | "registered"
  | "initialized"
  | "validated"
  | "analyzing"
  | "finalized"
  | "cancelled";

export type AnalyzerCapability =
  | "truth"
  | "trust"
  | "evidence"
  | "confidence"
  | "risk"
  | "reliability"
  | "knowledge"
  | "reasoning"
  | "citation"
  | "freshness"
  | "consistency"
  | string;

export type AnalyzerMetadata = Readonly<{
  id: string;
  name: string;
  version: string;
  description: string;
  enabled: boolean;
  order: number;
  capabilities: readonly AnalyzerCapability[];
  providerIndependent: true;
  dynamicLoading: false;
  pluginReady: boolean;
  tags: readonly string[];
}>;

export type AnalyzerExecutionContext = Readonly<{
  executionId: string;
  analyzerId: string;
  requestedAt: string;
  lifecycleState: AnalyzerLifecycleState;
  metadata: Readonly<Record<string, TruthMetadataValue>>;
  cancellation?: Readonly<{
    supported: true;
    requested: false;
    reason?: string;
  }>;
  futureExecution: Readonly<{
    asyncReady: true;
    parallelReady: true;
    distributedReady: true;
  }>;
}>;

export type AnalyzerValidationResult = Readonly<{
  valid: boolean;
  warnings: readonly string[];
}>;

export type AnalyzerResult<TValue = unknown> = Readonly<{
  analyzerId: string;
  value: TValue;
  lifecycleState: "finalized";
  immutable: true;
  generatedAt: string;
  metadata: Readonly<Record<string, TruthMetadataValue>>;
}>;
