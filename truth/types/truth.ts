import type { IntentAnalysis } from "@/intent";
import type { PromptPackage } from "@/prompt";
import type { RoutingDecision } from "@/router";

export type TruthMetadataValue = string | number | boolean | string[];

export enum ReliabilityGrade {
  Excellent = "excellent",
  Strong = "strong",
  Moderate = "moderate",
  Limited = "limited",
  Insufficient = "insufficient",
}

export enum TruthRiskLevel {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export type TruthContext = {
  summary?: string;
  signals: string[];
};

export type ConversationContext = {
  conversationId?: string;
  messageCount?: number;
  summary?: string;
  signals?: string[];
};

export type TruthInput = {
  userRequest: string;
  intentAnalysis?: IntentAnalysis;
  promptPackage?: PromptPackage;
  routingDecision?: RoutingDecision;
  context?: TruthContext;
  goal?: string;
  tasks?: string[];
  metadata?: Record<string, TruthMetadataValue>;
  conversationContext?: ConversationContext;
  futureExtensions?: Record<string, unknown>;
};

export type NormalizedTruthInput = TruthInput & {
  normalizedUserRequest: string;
  resolvedGoal: string;
  resolvedTasks: string[];
  contextSignals: string[];
};

export type TruthStageResult = {
  score: number;
  signals: string[];
  warnings: string[];
  metadata: Record<string, TruthMetadataValue>;
};

export type EvidenceAnalysis = TruthStageResult & {
  evidenceIndex: number;
};

export type ConfidenceAnalysis = TruthStageResult & {
  confidenceIndex: number;
};

export type RiskAnalysis = TruthStageResult & {
  riskIndex: number;
  riskLevel: TruthRiskLevel;
};

export type ReliabilityAnalysis = TruthStageResult & {
  reliabilityGrade: ReliabilityGrade;
};

export type WeaknessAnalysis = TruthStageResult & {
  weaknessSummary: string[];
};

export type ImprovementAnalysis = TruthStageResult & {
  improvementSuggestions: string[];
};

export type TruthAnalysisState = {
  input: NormalizedTruthInput;
  truth: TruthStageResult;
  evidence: EvidenceAnalysis;
  confidence: ConfidenceAnalysis;
  risk: RiskAnalysis;
  reliability: ReliabilityAnalysis;
  weakness: WeaknessAnalysis;
  improvement: ImprovementAnalysis;
};

export type TruthIntelligencePackage = {
  truthScore: number;
  trustIndex: number;
  evidenceIndex: number;
  confidenceIndex: number;
  riskIndex: number;
  reliabilityGrade: ReliabilityGrade;
  weaknessSummary: string[];
  strengthSummary: string[];
  explanationSummary: string;
  improvementSuggestions: string[];
  warnings: string[];
  metadata: Record<string, TruthMetadataValue>;
  futureAnalysis: Record<string, unknown>;
};
