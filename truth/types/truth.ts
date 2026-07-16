import type { IntentAnalysis } from "@/intent";
import type { PromptPackage } from "@/prompt";
import type { RoutingDecision } from "@/router";

export type TruthMetadataValue = string | number | boolean | readonly string[];

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
  Unknown = "unknown",
}
export enum TruthLevel {
  VeryHigh = "very_high",
  High = "high",
  Medium = "medium",
  Low = "low",
  Unknown = "unknown",
}
export enum TruthCategory {
  FoundationOnly = "foundation_only",
  StructuredInput = "structured_input",
  NeedsEvidence = "needs_evidence",
  FutureVerificationRequired = "future_verification_required",
}
export enum EvidenceStatus {
  NotEvaluated = "not_evaluated",
  Missing = "missing",
  Partial = "partial",
  Structured = "structured",
}
export enum RecommendationPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
  Critical = "critical",
}

export type TruthContext = Readonly<{
  summary?: string;
  signals: readonly string[];
}>;
export type ConversationContext = Readonly<{
  conversationId?: string;
  messageCount?: number;
  summary?: string;
  signals?: readonly string[];
}>;

export type TruthInput = Readonly<{
  userRequest: string;
  intentAnalysis?: IntentAnalysis;
  promptPackage?: PromptPackage;
  routingDecision?: RoutingDecision;
  context?: TruthContext;
  goal?: string;
  tasks?: readonly string[];
  metadata?: Readonly<Record<string, TruthMetadataValue>>;
  conversationContext?: ConversationContext;
  futureExtensions?: Readonly<Record<string, unknown>>;
}>;
export type TruthAnalysisInput = TruthInput;

export type NormalizedTruthInput = TruthInput &
  Readonly<{
    normalizedUserRequest: string;
    resolvedGoal: string;
    resolvedTasks: readonly string[];
    contextSignals: readonly string[];
  }>;

export type TruthWarning = Readonly<{
  code: string;
  message: string;
  severity: TruthRiskLevel;
  metadata: Readonly<Record<string, TruthMetadataValue>>;
}>;
export type TruthMetadata = Readonly<{
  analysisId?: string;
  requestId?: string;
  calculationVersion: string;
  providerIndependent: true;
  generatedAt: string;
  tags: readonly string[];
  properties: Readonly<Record<string, TruthMetadataValue>>;
  futureExtensions: Readonly<Record<string, unknown>>;
}>;
export type TruthStageResult = Readonly<{
  score: number;
  signals: readonly string[];
  warnings: readonly TruthWarning[];
  metadata: Readonly<Record<string, TruthMetadataValue>>;
}>;

export type TruthScore = Readonly<{
  overallScore: number;
  normalizedScore: number;
  confidenceWeightedScore: number;
  explanation: string;
  calculationVersion: string;
  metadata: TruthMetadata;
}>;
export type TrustIndex = Readonly<{
  trustIndex: number;
  trustLevel: TruthLevel;
  trustCategory: TruthCategory;
  trustSummary: string;
}>;
export type ConfidenceModel = Readonly<{
  overallConfidence: number;
  confidenceLevel: TruthLevel;
  confidenceCategory: TruthCategory;
  confidenceBreakdown: Readonly<{
    inputStructure: number;
    engineReadiness: number;
    evidenceReadiness: number;
    routingReadiness: number;
  }>;
  futureConfidenceFactors: readonly string[];
  confidenceExplanation: string;
}>;
export type EvidenceReference = Readonly<{
  referenceId: string;
  label: string;
  status: EvidenceStatus;
  metadata: Readonly<Record<string, TruthMetadataValue>>;
}>;
export type EvidenceGroup = Readonly<{
  groupId: string;
  summary: string;
  status: EvidenceStatus;
  references: readonly EvidenceReference[];
}>;
export type EvidenceModel = Readonly<{
  evidenceSummary: string;
  evidenceQuality: TruthLevel;
  evidenceCoverage: number;
  evidenceStatus: EvidenceStatus;
  missingEvidence: readonly string[];
  futureEvidenceSources: readonly string[];
  evidenceReferences: readonly EvidenceReference[];
  evidenceGroups: readonly EvidenceGroup[];
}>;
export type RiskAssessment = Readonly<{
  riskScore: number;
  riskLevel: TruthRiskLevel;
  riskCategory: TruthCategory;
  riskSummary: string;
  riskFactors: readonly string[];
  futureRiskSignals: readonly string[];
}>;
export type ReliabilityModel = Readonly<{
  reliabilityGrade: ReliabilityGrade;
  reliabilityScore: number;
  reliabilitySummary: string;
  reliabilityFactors: readonly string[];
  futureReliabilitySignals: readonly string[];
}>;
export type WeaknessItem = Readonly<{
  weaknessId: string;
  summary: string;
  category: TruthCategory;
  severity: TruthRiskLevel;
  improvementPriority: RecommendationPriority;
  futureAnalyzerOutput: Readonly<Record<string, unknown>>;
}>;
export type WeaknessModel = Readonly<{
  weaknessSummary: string;
  weaknessList: readonly WeaknessItem[];
  weaknessCategories: readonly TruthCategory[];
  futureAnalyzerOutput: Readonly<Record<string, unknown>>;
}>;
export type StrengthItem = Readonly<{
  strengthId: string;
  summary: string;
  category: TruthCategory;
  positiveSignals: readonly string[];
}>;
export type StrengthModel = Readonly<{
  strengthSummary: string;
  strengthList: readonly StrengthItem[];
  strengthCategories: readonly TruthCategory[];
  positiveSignals: readonly string[];
  futureStrengthAnalysis: Readonly<Record<string, unknown>>;
}>;
export type ExplanationModel = Readonly<{
  explanationSummary: string;
  detailedExplanation: string;
  evidenceExplanation: string;
  confidenceExplanation: string;
  riskExplanation: string;
  weaknessExplanation: string;
  improvementExplanation: string;
}>;
export type TruthRecommendation = Readonly<{
  recommendationId: string;
  improvementSuggestion: string;
  priority: RecommendationPriority;
  expectedImprovement: string;
  affectedMetrics: readonly string[];
  estimatedScoreImprovement?: number;
  futureAutoSuggestions: Readonly<Record<string, unknown>>;
}>;
export type TruthSummary = Readonly<{
  summary: string;
  strengths: readonly string[];
  weaknesses: readonly string[];
  warnings: readonly TruthWarning[];
}>;
export type TruthMetrics = Readonly<{
  truthScore: TruthScore;
  trustIndex: TrustIndex;
  confidence: ConfidenceModel;
  evidence: EvidenceModel;
  risk: RiskAssessment;
  reliability: ReliabilityModel;
}>;
export type TruthPackage = Readonly<{
  packageVersion: string;
  metrics: TruthMetrics;
  summary: TruthSummary;
  weaknesses: WeaknessModel;
  strengths: StrengthModel;
  explanation: ExplanationModel;
  recommendations: readonly TruthRecommendation[];
  metadata: TruthMetadata;
  futureAnalysis: Readonly<Record<string, unknown>>;
  compatibility: Readonly<{
    strategy: "extend-only";
    outputVersion: string;
    previousVersions: readonly string[];
  }>;
}>;
export type TruthIntelligencePackage = TruthPackage;

export type EvidenceAnalysis = TruthStageResult &
  Readonly<{ evidence: EvidenceModel }>;
export type ConfidenceAnalysis = TruthStageResult &
  Readonly<{ confidence: ConfidenceModel }>;
export type RiskAnalysis = TruthStageResult &
  Readonly<{ risk: RiskAssessment }>;
export type ReliabilityAnalysis = TruthStageResult &
  Readonly<{ reliability: ReliabilityModel }>;
export type WeaknessAnalysis = TruthStageResult &
  Readonly<{ weaknesses: WeaknessModel }>;
export type StrengthAnalysis = TruthStageResult &
  Readonly<{ strengths: StrengthModel }>;
export type ExplanationAnalysis = TruthStageResult &
  Readonly<{ explanation: ExplanationModel }>;
export type ImprovementAnalysis = TruthStageResult &
  Readonly<{ recommendations: readonly TruthRecommendation[] }>;

export type TruthAnalysisState = Readonly<{
  input: NormalizedTruthInput;
  truth: TruthStageResult;
  evidence: EvidenceAnalysis;
  confidence: ConfidenceAnalysis;
  risk: RiskAnalysis;
  reliability: ReliabilityAnalysis;
  weakness: WeaknessAnalysis;
  strength: StrengthAnalysis;
  explanation: ExplanationAnalysis;
  improvement: ImprovementAnalysis;
}>;

export type TruthValidationScope =
  | "input"
  | "pipeline"
  | "analyzer"
  | "package"
  | "configuration"
  | "output"
  | "metadata"
  | "futureCompatibility";
export type TruthMetricKey =
  | "truthScore"
  | "trustIndex"
  | "evidenceIndex"
  | "confidenceIndex"
  | "riskIndex"
  | "reliabilityIndex"
  | string;
export type TruthResearchHook = Readonly<{
  name: string;
  enabled: false;
  providerIndependent: true;
  implementation: null;
}>;
