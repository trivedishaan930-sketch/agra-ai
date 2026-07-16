export {
  TRUTH_ALGORITHM_VERSION,
  TRUTH_ANALYSIS_VERSION,
  TRUTH_ENGINE_VERSION,
  TRUTH_OUTPUT_VERSION,
  TRUTH_PIPELINE_VERSION,
  TRUTH_SCORE_VERSION,
  truthConfig,
} from "@/truth/config";
export { DefaultTruthIntelligenceEngine, truthIntelligenceEngine } from "@/truth/core";
export type { TruthIntelligenceEngine } from "@/truth/interfaces";
export { TruthIntelligenceError, TruthValidationError } from "@/truth/errors";
export { EvidenceStatus, RecommendationPriority, ReliabilityGrade, TruthCategory, TruthLevel, TruthRiskLevel } from "@/truth/types";
export type { ConfidenceAnalysis, ConfidenceModel, ConversationContext, EvidenceAnalysis, EvidenceGroup, EvidenceModel, EvidenceReference, ExplanationAnalysis, ExplanationModel, ImprovementAnalysis, NormalizedTruthInput, ReliabilityAnalysis, ReliabilityModel, RiskAnalysis, RiskAssessment, StrengthAnalysis, StrengthItem, StrengthModel, TrustIndex, TruthAnalysisInput, TruthAnalysisState, TruthContext, TruthInput, TruthIntelligencePackage, TruthMetadata, TruthMetadataValue, TruthMetrics, TruthPackage, TruthRecommendation, TruthResearchHook, TruthScore, TruthStageResult, TruthSummary, TruthValidationScope, TruthWarning, WeaknessAnalysis, WeaknessItem, WeaknessModel } from "@/truth/types";
export { truthInputSchema, truthPackageSchema, TruthValidator } from "@/truth/validators";

export { DefaultTruthEngineOrchestrator, DefaultTruthLifecycleManager, ImmutableTruthResultAggregator, defaultAnalyzerCoordinator, futureParallelCoordinator, lifecycleAwareTruthEngine, truthEngineOrchestrator } from "@/truth/orchestration";
export type { AnalyzerCoordinator, FutureParallelCoordinator, PipelineCoordinator, TruthAnalysisContext, TruthEngineOrchestrator, TruthEngineOrchestratorDependencies, TruthExecutionContext, TruthLifecycleManager, TruthLifecycleState, TruthPipelineContext, TruthResultAggregator, ValidationCoordinator } from "@/truth/orchestration";
