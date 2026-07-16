import type { EvidenceAnalysis, EvidenceModel, NormalizedTruthInput, TruthStageResult, TruthWarning } from "@/truth/types";
import { EvidenceStatus, TruthLevel, TruthRiskLevel } from "@/truth/types";
import { clampScore, resolveTruthLevel } from "@/truth/utils";

export interface EvidenceAnalyzer {
  analyze(input: NormalizedTruthInput, truth: TruthStageResult): EvidenceAnalysis;
}

export class DefaultEvidenceAnalyzer implements EvidenceAnalyzer {
  analyze(input: NormalizedTruthInput, truth: TruthStageResult): EvidenceAnalysis {
    const structuredSignals = [input.intentAnalysis, input.promptPackage, input.routingDecision, input.context].filter(Boolean).length;
    const evidenceCoverage = clampScore((structuredSignals / 4) * 0.7 + truth.score * 0.3);
    const missingEvidence = [
      !input.intentAnalysis ? "Intent analysis" : "",
      !input.promptPackage ? "Prompt package" : "",
      !input.routingDecision ? "Routing decision" : "",
      !input.context ? "Context signals" : "",
    ].filter(Boolean);
    const evidence: EvidenceModel = {
      evidenceSummary: "Evidence structures are prepared for future verification; no external evidence was fetched or validated.",
      evidenceQuality: structuredSignals > 0 ? resolveTruthLevel(evidenceCoverage) : TruthLevel.Unknown,
      evidenceCoverage,
      evidenceStatus: structuredSignals === 0 ? EvidenceStatus.Missing : EvidenceStatus.Structured,
      missingEvidence,
      futureEvidenceSources: ["citations", "claim_verification", "source_reliability", "knowledge_freshness"],
      evidenceReferences: [],
      evidenceGroups: [],
    };
    const warnings: TruthWarning[] = structuredSignals === 0
      ? [{ code: "MISSING_EVIDENCE_CONTEXT", message: "No supporting engine outputs were provided for future evidence analysis.", severity: TruthRiskLevel.Medium, metadata: {} }]
      : [];

    return {
      evidence,
      score: evidence.evidenceCoverage,
      signals: ["evidence_model_prepared"],
      warnings,
      metadata: { stage: "evidence_analysis", externalEvidenceChecked: false },
    };
  }
}
