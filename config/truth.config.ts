export const TRUTH_ENGINE_VERSION = "tie-engine-v1";
export const TRUTH_ANALYSIS_VERSION = "tie-analysis-v1";
export const TRUTH_SCORE_VERSION = "tie-score-v1";
export const TRUTH_OUTPUT_VERSION = "tie-output-v1";
export const TRUTH_PIPELINE_VERSION = "tie-pipeline-v1";
export const TRUTH_ALGORITHM_VERSION = "tie-algorithm-foundation-v1";

export const truthConfig = {
  engine: {
    name: "Truth Intelligence Engine",
    version: TRUTH_ENGINE_VERSION,
    providerIndependent: true,
    publicInterface: "TruthIntelligenceEngine.analyze",
  },
  analyzers: {
    enabled: ["truth", "evidence", "confidence", "risk", "reliability", "weakness", "strength", "explanation", "improvement"],
    exposeInternalState: false,
  },
  validation: {
    minimumUserRequestLength: 1,
    validateInput: true,
    validatePipeline: true,
    validateAnalyzers: true,
    validatePackage: true,
    validateConfiguration: true,
    validateOutput: true,
    validateMetadata: true,
    validateFutureCompatibility: true,
  },
  scoring: {
    defaultScore: 0.5,
    scoreVersion: TRUTH_SCORE_VERSION,
    metrics: ["truthScore", "trustIndex", "evidenceIndex", "confidenceIndex", "riskIndex", "reliabilityIndex"],
    futureMetrics: ["hallucinationIndex", "citationIndex", "freshnessIndex", "consensusIndex", "dynamicTruthIndex"],
    completenessWeights: {
      userRequest: 0.2,
      intentAnalysis: 0.2,
      promptPackage: 0.2,
      routingDecision: 0.15,
      context: 0.1,
      goal: 0.075,
      tasks: 0.075,
    },
    riskThresholds: { low: 0.33, medium: 0.66 },
    reliabilityThresholds: [
      { minimum: 0.85, grade: "excellent" },
      { minimum: 0.7, grade: "strong" },
      { minimum: 0.55, grade: "moderate" },
      { minimum: 0.4, grade: "limited" },
      { minimum: 0, grade: "insufficient" },
    ],
  },
  research: {
    hooks: [
      "logicalConsistency", "factVerification", "evidenceWeighting", "sourceReliability", "knowledgeFreshness",
      "claimExtraction", "claimVerification", "reasoningVerification", "hallucinationDetection", "citationQuality",
      "crossModelConsensus", "trustRanking", "dynamicTruthIndex", "researchAlgorithms", "patentableTechnologies",
    ],
  },
  features: {
    enableTruthScoring: true,
    enableEvidenceAnalysis: true,
    enableConfidenceAnalysis: true,
    enableRiskAnalysis: true,
    enableReliabilityAnalysis: true,
    enableWeaknessAnalysis: true,
    enableExplanationEngine: true,
    enableImprovementEngine: true,
    enableHallucinationDetection: false,
    enableCitationValidation: false,
    enableCrossModelConsensus: false,
    enableKnowledgeFreshness: false,
    enableDynamicTruthIndex: false,
    enableResearchAlgorithms: false,
  },
  versioning: {
    engineVersion: TRUTH_ENGINE_VERSION,
    analysisVersion: TRUTH_ANALYSIS_VERSION,
    scoreVersion: TRUTH_SCORE_VERSION,
    outputVersion: TRUTH_OUTPUT_VERSION,
    pipelineVersion: TRUTH_PIPELINE_VERSION,
    futureAlgorithmVersion: TRUTH_ALGORITHM_VERSION,
  },
  performance: {
    enableCaching: false,
    enableIncrementalAnalysis: false,
    enableParallelAnalyzerExecution: false,
    enableLazyAnalyzerLoading: false,
    enableBackgroundAnalysis: false,
    enableStreamingCompatibility: false,
  },
  security: {
    storeSecrets: false,
    storeProviderCredentials: false,
    exposeInternalAnalyzers: false,
    exposeInternalPipelineState: false,
    exposeDebugInformation: false,
    exposeResearchAlgorithms: false,
  },
  output: {
    packageName: "TruthPackage",
    packageVersion: TRUTH_OUTPUT_VERSION,
    compatibilityStrategy: "extend-only",
    uiReady: true,
  },
} as const;

export type TruthConfig = typeof truthConfig;
