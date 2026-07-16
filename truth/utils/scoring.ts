import { truthConfig } from "@/truth/config";
import { ReliabilityGrade, TruthLevel, TruthRiskLevel } from "@/truth/types";

export function clampScore(score: number): number {
  if (Number.isNaN(score)) return truthConfig.defaultScore;
  return Math.min(1, Math.max(0, Number(score.toFixed(4))));
}

export function averageScores(scores: readonly number[]): number {
  if (scores.length === 0) return truthConfig.defaultScore;
  return clampScore(scores.reduce((total, score) => total + score, 0) / scores.length);
}

export function resolveReliabilityGrade(score: number): ReliabilityGrade {
  return truthConfig.reliabilityThresholds.find((threshold) => score >= threshold.minimum)?.grade ?? ReliabilityGrade.Insufficient;
}

export function resolveRiskLevel(riskIndex: number): TruthRiskLevel {
  if (riskIndex <= truthConfig.riskThresholds.low) return TruthRiskLevel.Low;
  if (riskIndex <= truthConfig.riskThresholds.medium) return TruthRiskLevel.Medium;
  return TruthRiskLevel.High;
}

export function resolveTruthLevel(score: number): TruthLevel {
  if (score >= 0.85) return TruthLevel.VeryHigh;
  if (score >= 0.7) return TruthLevel.High;
  if (score >= 0.45) return TruthLevel.Medium;
  if (score >= 0.01) return TruthLevel.Low;
  return TruthLevel.Unknown;
}
