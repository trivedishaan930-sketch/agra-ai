import type { TruthExecutionContext, TruthLifecycleState } from "./context";

export interface TruthLifecycleManager {
  initialize(metadata?: TruthExecutionContext["metadata"]): TruthExecutionContext;
  transition(context: TruthExecutionContext, state: TruthLifecycleState): TruthExecutionContext;
}

export class DefaultTruthLifecycleManager implements TruthLifecycleManager {
  initialize(metadata: TruthExecutionContext["metadata"] = {}): TruthExecutionContext {
    return {
      executionId: crypto.randomUUID(),
      requestedAt: new Date().toISOString(),
      lifecycleState: "initialized",
      metadata,
    };
  }

  transition(context: TruthExecutionContext, state: TruthLifecycleState): TruthExecutionContext {
    return { ...context, lifecycleState: state };
  }
}
