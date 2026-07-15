import { FallbackPlanner } from "@/router/policies";
import { ProviderSelector } from "@/router/selectors";
import { RoutingScorer } from "@/router/scoring";
import { RoutingDecisionBuilder } from "@/router/pipeline/decision-builder";
import { RouterInputNormalizer } from "@/router/pipeline/normalizer";
import {
  RoutingStrategy,
  type RouterInput,
  type RoutingDecision,
} from "@/router/types";
import { RouterValidator } from "@/router/validators";

export type RouterPipelineStage<TInput, TOutput> = {
  execute(input: TInput): TOutput | Promise<TOutput>;
};

export type RouterPipelineDependencies = {
  validator: RouterValidator;
  normalizer: RouterInputNormalizer;
  selector: ProviderSelector;
  scorer: RoutingScorer;
  fallbackPlanner: FallbackPlanner;
  decisionBuilder: RoutingDecisionBuilder;
};

const supportedStrategies = Object.values(RoutingStrategy);

export class RouterPipeline {
  private readonly dependencies: RouterPipelineDependencies;

  constructor(dependencies?: Partial<RouterPipelineDependencies>) {
    this.dependencies = {
      validator: dependencies?.validator ?? new RouterValidator(),
      normalizer: dependencies?.normalizer ?? new RouterInputNormalizer(),
      selector: dependencies?.selector ?? new ProviderSelector(),
      scorer: dependencies?.scorer ?? new RoutingScorer(),
      fallbackPlanner: dependencies?.fallbackPlanner ?? new FallbackPlanner(),
      decisionBuilder:
        dependencies?.decisionBuilder ?? new RoutingDecisionBuilder(),
    };
  }

  route(input: RouterInput): RoutingDecision {
    const parsedInput = this.dependencies.validator.validateInput(input);
    const normalizedInput = this.dependencies.normalizer.normalize(parsedInput);
    this.dependencies.validator.validateStrategy(
      normalizedInput.strategy,
      supportedStrategies,
    );
    const candidates =
      this.dependencies.selector.selectCandidates(normalizedInput);
    const scoredCandidates = candidates
      .map((candidate) => ({
        candidate,
        score: this.dependencies.scorer.score(normalizedInput, candidate),
      }))
      .sort((first, second) => second.score.overall - first.score.overall);
    const selected = scoredCandidates[0];
    const fallbackPlan = this.dependencies.fallbackPlanner.plan(
      scoredCandidates.map((entry) => entry.candidate),
    );
    const decision = this.dependencies.decisionBuilder.build(
      normalizedInput,
      selected.candidate,
      scoredCandidates.map((entry) => entry.candidate),
      selected.score,
      fallbackPlan,
    );

    return this.dependencies.validator.validateDecision(decision);
  }
}
