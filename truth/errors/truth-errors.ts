export class TruthIntelligenceError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "TruthIntelligenceError";
  }
}

export class TruthValidationError extends TruthIntelligenceError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
    this.name = "TruthValidationError";
  }
}

export class TruthAnalysisError extends TruthIntelligenceError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
    this.name = "TruthAnalysisError";
  }
}

export class TruthScoreError extends TruthIntelligenceError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
    this.name = "TruthScoreError";
  }
}

export class EvidenceError extends TruthIntelligenceError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
    this.name = "EvidenceError";
  }
}

export class ConfidenceError extends TruthIntelligenceError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
    this.name = "ConfidenceError";
  }
}

export class RiskAnalysisError extends TruthIntelligenceError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
    this.name = "RiskAnalysisError";
  }
}

export class ReliabilityError extends TruthIntelligenceError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
    this.name = "ReliabilityError";
  }
}

export class WeaknessAnalysisError extends TruthIntelligenceError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
    this.name = "WeaknessAnalysisError";
  }
}

export class ExplanationError extends TruthIntelligenceError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
    this.name = "ExplanationError";
  }
}

export class RecommendationError extends TruthIntelligenceError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
    this.name = "RecommendationError";
  }
}

export class PackageValidationError extends TruthValidationError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
    this.name = "PackageValidationError";
  }
}
