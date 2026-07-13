# AI Strategy

## Current AI State

AgraAI currently has AI provider configuration scaffolding only. Provider keys are optional runtime values, and provider enablement is represented through configuration. There are no production AI clients, prompt engines, agent runtimes, workflow builders, retrieval systems, evaluation suites, or metering systems yet.

## Strategic Direction

AgraAI should become AI-native by making AI a reliable operating layer for agriculture workflows, not by adding disconnected chat features. AI should help users interpret data, automate repeatable workflows, surface risks, generate recommendations, and explain tradeoffs while preserving human review for consequential decisions.

## Near-Term AI Principles

- Start with narrow, auditable use cases.
- Keep provider choice isolated from product features.
- Treat prompts, tools, and model settings as versioned product assets.
- Capture input, output, model, latency, cost, and user feedback metadata where policy allows.
- Prefer deterministic product workflows around AI calls instead of free-form automation.
- Build evaluation fixtures before expanding AI scope.

## Provider Boundary

Future provider integrations should expose a small internal interface such as:

- text generation
- structured extraction
- embeddings
- tool/function calling
- safety classification
- evaluation helpers

Product features should not depend directly on OpenAI, Anthropic, Google, or any other provider SDK. Provider-specific code should live behind an AI service layer.

## Future AI Capability Layers

1. Provider adapter layer.
2. Prompt and policy registry.
3. Evaluation and regression suite.
4. Usage metering and cost controls.
5. Retrieval and agriculture knowledge sources.
6. Workflow orchestration.
7. Human review and approval queues.
8. Agent/tool runtime for bounded tasks.

## Agriculture AI Guardrails

- Do not generate agronomic, financial, regulatory, or operational recommendations without clear context, uncertainty handling, and review workflows.
- Distinguish observed data, inferred insights, and model-generated suggestions.
- Maintain provenance for source documents, sensor data, user inputs, and external references.
- Provide confidence signals and escalation paths where recommendations may materially affect operations.
