import { AbstractTruthAnalyzer } from "./abstract-analyzer";
import type { AnalyzerMetadata } from "./types";

export type FoundationAnalyzerInput = Readonly<{
  frameworkVersion: string;
}>;

export type FoundationAnalyzerOutput = Readonly<{
  architectureOnly: true;
  providerIndependent: true;
  algorithmsImplemented: false;
  externalAccess: false;
}>;

export class FoundationTruthAnalyzer extends AbstractTruthAnalyzer<
  FoundationAnalyzerInput,
  FoundationAnalyzerOutput
> {
  readonly metadata: AnalyzerMetadata = {
    id: "truth.foundation",
    name: "Truth Foundation Analyzer",
    version: "1.0.0",
    description:
      "Architecture-only analyzer used to validate the shared analyzer lifecycle contract.",
    enabled: true,
    order: 0,
    capabilities: ["truth", "consistency"],
    providerIndependent: true,
    dynamicLoading: false,
    pluginReady: true,
    tags: ["architecture", "foundation", "no-execution"],
  };

  protected execute(): FoundationAnalyzerOutput {
    return Object.freeze({
      architectureOnly: true,
      providerIndependent: true,
      algorithmsImplemented: false,
      externalAccess: false,
    });
  }
}
