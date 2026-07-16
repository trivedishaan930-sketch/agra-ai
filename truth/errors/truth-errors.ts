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
