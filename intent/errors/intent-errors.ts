import { IntentType } from "@/intent/types";

export type IntentErrorCode =
  | "UNKNOWN_INTENT"
  | "LOW_CONFIDENCE"
  | "UNSUPPORTED_INTENT"
  | "INVALID_INPUT"
  | "CONTEXT_EXTRACTION_ERROR"
  | "TASK_DETECTION_ERROR";

export class IntentEngineError extends Error {
  constructor(
    message: string,
    public readonly code: IntentErrorCode,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class UnknownIntentError extends IntentEngineError {
  constructor(cause?: unknown) {
    super("Unable to classify the requested intent.", "UNKNOWN_INTENT", cause);
  }
}

export class LowConfidenceError extends IntentEngineError {
  constructor(confidence: number, cause?: unknown) {
    super(
      `Intent confidence is below the configured threshold: ${confidence}`,
      "LOW_CONFIDENCE",
      cause,
    );
  }
}

export class UnsupportedIntentError extends IntentEngineError {
  constructor(intent: IntentType, cause?: unknown) {
    super(
      `Unsupported intent requested: ${intent}`,
      "UNSUPPORTED_INTENT",
      cause,
    );
  }
}

export class InvalidInputError extends IntentEngineError {
  constructor(message: string, cause?: unknown) {
    super(message, "INVALID_INPUT", cause);
  }
}

export class ContextExtractionError extends IntentEngineError {
  constructor(cause?: unknown) {
    super(
      "Failed to extract intent context.",
      "CONTEXT_EXTRACTION_ERROR",
      cause,
    );
  }
}

export class TaskDetectionError extends IntentEngineError {
  constructor(cause?: unknown) {
    super(
      "Failed to detect tasks from intent input.",
      "TASK_DETECTION_ERROR",
      cause,
    );
  }
}
