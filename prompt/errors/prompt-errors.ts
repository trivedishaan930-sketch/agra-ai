export class PromptEngineError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = new.target.name;
  }
}

export class PromptValidationError extends PromptEngineError {}
export class PromptOptimizationError extends PromptEngineError {}
export class TemplateNotFoundError extends PromptEngineError {
  constructor(templateKey: string) {
    super(`Prompt template not found: ${templateKey}`);
  }
}
export class ConstraintConflictError extends PromptEngineError {}
export class PromptTooLargeError extends PromptEngineError {
  constructor(limit: number) {
    super(`Prompt package exceeds the configured ${limit} character limit.`);
  }
}
