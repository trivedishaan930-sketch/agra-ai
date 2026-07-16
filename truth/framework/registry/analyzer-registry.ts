import { FoundationTruthAnalyzer } from "@/truth/framework/analyzers";
import type {
  AnalyzerMetadata,
  TruthAnalyzerPublicInterface,
} from "@/truth/framework/analyzers";

export type AnalyzerRegistration = Readonly<{
  analyzer: TruthAnalyzerPublicInterface;
  metadata: AnalyzerMetadata;
}>;

export interface AnalyzerRegistry {
  register(analyzer: TruthAnalyzerPublicInterface): AnalyzerRegistry;
  discover(): readonly AnalyzerMetadata[];
  get(analyzerId: string): TruthAnalyzerPublicInterface | undefined;
  ordered(): readonly TruthAnalyzerPublicInterface[];
  enable(analyzerId: string): AnalyzerRegistry;
  disable(analyzerId: string): AnalyzerRegistry;
  metadata(analyzerId: string): AnalyzerMetadata | undefined;
  futurePluginRegistration(pluginId: string): Readonly<{
    pluginId: string;
    supported: true;
    dynamicLoading: false;
  }>;
}

export class InMemoryAnalyzerRegistry implements AnalyzerRegistry {
  private readonly analyzers = new Map<string, AnalyzerRegistration>();
  private readonly disabled = new Set<string>();

  constructor(initialAnalyzers: readonly TruthAnalyzerPublicInterface[] = []) {
    initialAnalyzers.forEach((analyzer) => this.register(analyzer));
  }

  register(analyzer: TruthAnalyzerPublicInterface): AnalyzerRegistry {
    this.analyzers.set(
      analyzer.metadata.id,
      Object.freeze({ analyzer, metadata: analyzer.metadata }),
    );
    if (!analyzer.metadata.enabled) this.disabled.add(analyzer.metadata.id);
    return this;
  }

  discover(): readonly AnalyzerMetadata[] {
    return Object.freeze(
      this.ordered().map((analyzer) => this.resolveMetadata(analyzer)),
    );
  }

  get(analyzerId: string): TruthAnalyzerPublicInterface | undefined {
    const registration = this.analyzers.get(analyzerId);
    if (!registration || this.disabled.has(analyzerId)) return undefined;
    return registration.analyzer;
  }

  ordered(): readonly TruthAnalyzerPublicInterface[] {
    return Object.freeze(
      [...this.analyzers.values()]
        .filter((registration) => !this.disabled.has(registration.metadata.id))
        .sort((left, right) => left.metadata.order - right.metadata.order)
        .map((registration) => registration.analyzer),
    );
  }

  enable(analyzerId: string): AnalyzerRegistry {
    this.disabled.delete(analyzerId);
    return this;
  }

  disable(analyzerId: string): AnalyzerRegistry {
    this.disabled.add(analyzerId);
    return this;
  }

  metadata(analyzerId: string): AnalyzerMetadata | undefined {
    const registration = this.analyzers.get(analyzerId);
    if (!registration) return undefined;
    return this.resolveMetadata(registration.analyzer);
  }

  futurePluginRegistration(pluginId: string) {
    return Object.freeze({ pluginId, supported: true, dynamicLoading: false });
  }

  private resolveMetadata(
    analyzer: TruthAnalyzerPublicInterface,
  ): AnalyzerMetadata {
    return Object.freeze({
      ...analyzer.metadata,
      enabled: !this.disabled.has(analyzer.metadata.id),
    });
  }
}

export const analyzerRegistry = new InMemoryAnalyzerRegistry([
  new FoundationTruthAnalyzer(),
]);
