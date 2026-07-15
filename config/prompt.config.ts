export const promptConfig = {
  optimization: {
    normalizeWhitespace: true,
    removeDuplicateInstructions: true,
    injectContext: true,
    injectConstraints: true,
    enrichGoal: true,
    enrichTasks: true,
    orderInstructions: true,
    optimizeLength: true,
  },
  limits: {
    maxPromptCharacters: 12_000,
    maxContextSections: 8,
    maxConstraints: 12,
    maxExamples: 3,
  },
  quality: {
    minimumOverallScore: 0.55,
    strongScore: 0.8,
  },
  templates: {
    defaultKey: "chat",
    allowFallback: true,
  },
  futureStrategies: {
    fewShotPrompting: false,
    chainOfThoughtAbstraction: false,
    selfReflection: false,
    promptCompression: false,
    multiStepPrompting: false,
    dynamicTemplateSelection: false,
    automaticExampleGeneration: false,
    multiLanguageOptimization: false,
  },
  futureProviderOverrides: {
    enabled: false,
  },
} as const;

export type PromptConfig = typeof promptConfig;
