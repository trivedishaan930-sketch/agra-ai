import { DefaultConfidenceAnalyzer } from "@/truth/analyzers/confidence-analyzer";
import { DefaultEvidenceAnalyzer } from "@/truth/analyzers/evidence-analyzer";
import { DefaultExplanationAnalyzer } from "@/truth/analyzers/explanation-analyzer";
import { DefaultImprovementAnalyzer } from "@/truth/analyzers/improvement-analyzer";
import { DefaultReliabilityAnalyzer } from "@/truth/analyzers/reliability-analyzer";
import { DefaultRiskAnalyzer } from "@/truth/analyzers/risk-analyzer";
import { DefaultStrengthAnalyzer } from "@/truth/analyzers/strength-analyzer";
import { DefaultTruthAnalyzer } from "@/truth/analyzers/truth-analyzer";
import { DefaultWeaknessAnalyzer } from "@/truth/analyzers/weakness-analyzer";
import type {
  ConfidenceAnalyzer,
  EvidenceAnalyzer,
  ExplanationAnalyzer,
  ImprovementAnalyzer,
  ReliabilityAnalyzer,
  RiskAnalyzer,
  StrengthAnalyzer,
  TruthAnalyzer,
  WeaknessAnalyzer,
} from "@/truth/analyzers";
import type { TruthAnalysisInput, TruthPackage } from "@/truth/types";
import {
  ConfidenceAnalyzer,
  EvidenceAnalyzer,
  ImprovementAnalyzer,
  ReliabilityAnalyzer,
  RiskAnalyzer,
  TruthAnalyzer,
  WeaknessAnalyzer,
} from "@/truth/analyzers";
import type { TruthInput, TruthIntelligencePackage } from "@/truth/types";
import { TruthValidator } from "@/truth/validators";
import { TruthInputNormalizer } from "./normalizer";
import { TruthPackageBuilder } from "./package-builder";

export type TruthPipelineStage<TInput, TOutput> = {
  execute(input: TInput): TOutput | Promise<TOutput>;
};

export type TruthPipelineDependencies = {
  validator: TruthValidator;
  normalizer: TruthInputNormalizer;
  truthAnalyzer: TruthAnalyzer;
  evidenceAnalyzer: EvidenceAnalyzer;
  confidenceAnalyzer: ConfidenceAnalyzer;
  riskAnalyzer: RiskAnalyzer;
  reliabilityAnalyzer: ReliabilityAnalyzer;
  weaknessAnalyzer: WeaknessAnalyzer;
  strengthAnalyzer: StrengthAnalyzer;
  explanationAnalyzer: ExplanationAnalyzer;
  improvementAnalyzer: ImprovementAnalyzer;
  packageBuilder: TruthPackageBuilder;
};

export class TruthPipeline {
  private readonly dependencies: TruthPipelineDependencies;

  constructor(dependencies?: Partial<TruthPipelineDependencies>) {
    this.dependencies = {
      validator: dependencies?.validator ?? new TruthValidator(),
      normalizer: dependencies?.normalizer ?? new TruthInputNormalizer(),
      truthAnalyzer: dependencies?.truthAnalyzer ?? new DefaultTruthAnalyzer(),
      evidenceAnalyzer: dependencies?.evidenceAnalyzer ?? new DefaultEvidenceAnalyzer(),
      confidenceAnalyzer: dependencies?.confidenceAnalyzer ?? new DefaultConfidenceAnalyzer(),
      riskAnalyzer: dependencies?.riskAnalyzer ?? new DefaultRiskAnalyzer(),
      reliabilityAnalyzer: dependencies?.reliabilityAnalyzer ?? new DefaultReliabilityAnalyzer(),
      weaknessAnalyzer: dependencies?.weaknessAnalyzer ?? new DefaultWeaknessAnalyzer(),
      strengthAnalyzer: dependencies?.strengthAnalyzer ?? new DefaultStrengthAnalyzer(),
      explanationAnalyzer: dependencies?.explanationAnalyzer ?? new DefaultExplanationAnalyzer(),
      improvementAnalyzer: dependencies?.improvementAnalyzer ?? new DefaultImprovementAnalyzer(),
      truthAnalyzer: dependencies?.truthAnalyzer ?? new TruthAnalyzer(),
      evidenceAnalyzer: dependencies?.evidenceAnalyzer ?? new EvidenceAnalyzer(),
      confidenceAnalyzer: dependencies?.confidenceAnalyzer ?? new ConfidenceAnalyzer(),
      riskAnalyzer: dependencies?.riskAnalyzer ?? new RiskAnalyzer(),
      reliabilityAnalyzer: dependencies?.reliabilityAnalyzer ?? new ReliabilityAnalyzer(),
      weaknessAnalyzer: dependencies?.weaknessAnalyzer ?? new WeaknessAnalyzer(),
      improvementAnalyzer: dependencies?.improvementAnalyzer ?? new ImprovementAnalyzer(),
      packageBuilder: dependencies?.packageBuilder ?? new TruthPackageBuilder(),
    };
  }

  analyze(input: TruthAnalysisInput): TruthPackage {
  analyze(input: TruthInput): TruthIntelligencePackage {
    const parsedInput = this.dependencies.validator.validateInput(input);
    const normalizedInput = this.dependencies.normalizer.normalize(parsedInput);
    const truth = this.dependencies.truthAnalyzer.analyze(normalizedInput);
    const evidence = this.dependencies.evidenceAnalyzer.analyze(normalizedInput, truth);
    const confidence = this.dependencies.confidenceAnalyzer.analyze(truth, evidence);
    const risk = this.dependencies.riskAnalyzer.analyze(confidence);
    const reliability = this.dependencies.reliabilityAnalyzer.analyze(truth, evidence, confidence, risk);
    const weakness = this.dependencies.weaknessAnalyzer.analyze(normalizedInput, risk);
    const strength = this.dependencies.strengthAnalyzer.analyze(normalizedInput, truth, evidence);
    const improvement = this.dependencies.improvementAnalyzer.analyze(weakness);
    const explanation = this.dependencies.explanationAnalyzer.analyze(evidence, confidence, risk, weakness, improvement);
    const truthPackage = this.dependencies.packageBuilder.build({ input: normalizedInput, truth, evidence, confidence, risk, reliability, weakness, strength, explanation, improvement });
    const improvement = this.dependencies.improvementAnalyzer.analyze(weakness);
    const truthPackage = this.dependencies.packageBuilder.build({ input: normalizedInput, truth, evidence, confidence, risk, reliability, weakness, improvement });

    return this.dependencies.validator.validatePackage(truthPackage);
  }
}
