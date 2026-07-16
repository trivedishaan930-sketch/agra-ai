export {
  TRUTH_ALGORITHM_VERSION,
  TRUTH_ANALYSIS_VERSION,
  TRUTH_ENGINE_VERSION,
  TRUTH_OUTPUT_VERSION,
  TRUTH_PIPELINE_VERSION,
  TRUTH_SCORE_VERSION,
  truthConfig,
} from "@/truth/config";
export {
  DefaultTruthIntelligenceEngine,
  truthIntelligenceEngine,
} from "@/truth/core";
export type { TruthIntelligenceEngine } from "@/truth/interfaces";
export { TruthIntelligenceError, TruthValidationError } from "@/truth/errors";
export {
  EvidenceStatus,
  RecommendationPriority,
  ReliabilityGrade,
  TruthCategory,
  TruthLevel,
  TruthRiskLevel,
} from "@/truth/types";
export type {
  ConfidenceModel,
  ConversationContext,
  EvidenceGroup,
  EvidenceModel,
  EvidenceReference,
  ExplanationModel,
  ReliabilityModel,
  RiskAssessment,
  StrengthItem,
  StrengthModel,
  TrustIndex,
  TruthAnalysisInput,
  TruthContext,
  TruthInput,
  TruthIntelligencePackage,
  TruthMetadata,
  TruthMetadataValue,
  TruthMetrics,
  TruthPackage,
  TruthRecommendation,
  TruthScore,
  TruthSummary,
  TruthWarning,
  WeaknessItem,
  WeaknessModel,
} from "@/truth/types";
export type {
  TruthPublicContract,
  TruthResearchHookContract,
  TruthScoringMetricContract,
  TruthValidationContract,
} from "@/truth/contracts";
