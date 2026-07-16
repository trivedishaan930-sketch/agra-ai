import { DefaultConfidenceAnalyzer, DefaultEvidenceAnalyzer, DefaultExplanationAnalyzer, DefaultImprovementAnalyzer, DefaultReliabilityAnalyzer, DefaultRiskAnalyzer, DefaultStrengthAnalyzer, DefaultTruthAnalyzer, DefaultWeaknessAnalyzer, type ConfidenceAnalyzer, type EvidenceAnalyzer, type ExplanationAnalyzer, type ImprovementAnalyzer, type ReliabilityAnalyzer, type RiskAnalyzer, type StrengthAnalyzer, type TruthAnalyzer, type WeaknessAnalyzer } from "@/truth/analyzers";
import type { TruthInput, TruthIntelligencePackage } from "@/truth/types";
import { TruthValidator } from "@/truth/validators";
import { TruthInputNormalizer } from "./normalizer";
import { TruthPackageBuilder } from "./package-builder";

export type TruthPipelineStage<TInput, TOutput> = { execute(input: TInput): TOutput | Promise<TOutput> };
export type TruthPipelineDependencies = { validator: TruthValidator; normalizer: TruthInputNormalizer; truthAnalyzer: TruthAnalyzer; evidenceAnalyzer: EvidenceAnalyzer; confidenceAnalyzer: ConfidenceAnalyzer; riskAnalyzer: RiskAnalyzer; reliabilityAnalyzer: ReliabilityAnalyzer; weaknessAnalyzer: WeaknessAnalyzer; strengthAnalyzer: StrengthAnalyzer; explanationAnalyzer: ExplanationAnalyzer; improvementAnalyzer: ImprovementAnalyzer; packageBuilder: TruthPackageBuilder };

export class TruthPipeline {
  private readonly dependencies: TruthPipelineDependencies;
  constructor(dependencies?: Partial<TruthPipelineDependencies>) {
    this.dependencies = { validator: dependencies?.validator ?? new TruthValidator(), normalizer: dependencies?.normalizer ?? new TruthInputNormalizer(), truthAnalyzer: dependencies?.truthAnalyzer ?? new DefaultTruthAnalyzer(), evidenceAnalyzer: dependencies?.evidenceAnalyzer ?? new DefaultEvidenceAnalyzer(), confidenceAnalyzer: dependencies?.confidenceAnalyzer ?? new DefaultConfidenceAnalyzer(), riskAnalyzer: dependencies?.riskAnalyzer ?? new DefaultRiskAnalyzer(), reliabilityAnalyzer: dependencies?.reliabilityAnalyzer ?? new DefaultReliabilityAnalyzer(), weaknessAnalyzer: dependencies?.weaknessAnalyzer ?? new DefaultWeaknessAnalyzer(), strengthAnalyzer: dependencies?.strengthAnalyzer ?? new DefaultStrengthAnalyzer(), explanationAnalyzer: dependencies?.explanationAnalyzer ?? new DefaultExplanationAnalyzer(), improvementAnalyzer: dependencies?.improvementAnalyzer ?? new DefaultImprovementAnalyzer(), packageBuilder: dependencies?.packageBuilder ?? new TruthPackageBuilder() };
    this.dependencies.validator.validateConfiguration();
  }

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
    return this.dependencies.validator.validatePackage(this.dependencies.packageBuilder.build({ input: normalizedInput, truth, evidence, confidence, risk, reliability, weakness, strength, explanation, improvement }));
  }
}
