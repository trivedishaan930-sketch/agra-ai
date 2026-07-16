import { ReliabilityGrade, TruthCategory, TruthLevel, TruthRiskLevel } from "@/truth/types";

export const TRUTH_PACKAGE_VERSION = "tie-foundation-v1";
export const TRUTH_CALCULATION_VERSION = "truth-score-foundation-v1";

export const truthConfig = {
  packageVersion: TRUTH_PACKAGE_VERSION,
  calculationVersion: TRUTH_CALCULATION_VERSION,
import { ReliabilityGrade, TruthRiskLevel } from "@/truth/types";

export const truthConfig = {
  minimumUserRequestLength: 2,
  defaultScore: 0.5,
  completenessWeights: {
    userRequest: 0.2,
    intentAnalysis: 0.2,
    promptPackage: 0.2,
    routingDecision: 0.15,
    context: 0.1,
    goal: 0.075,
    tasks: 0.075,
  },
  truthLevels: TruthLevel,
  truthCategories: TruthCategory,
  reliabilityThresholds: [
    { minimum: 0.85, grade: ReliabilityGrade.Excellent },
    { minimum: 0.7, grade: ReliabilityGrade.Strong },
    { minimum: 0.55, grade: ReliabilityGrade.Moderate },
    { minimum: 0.4, grade: ReliabilityGrade.Limited },
    { minimum: 0, grade: ReliabilityGrade.Insufficient },
  ],
  riskThresholds: {
    low: 0.33,
    medium: 0.66,
  },
  riskLevels: TruthRiskLevel,
} as const;
