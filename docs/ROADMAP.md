# AgraAI Roadmap

## Phase 0: Platform Foundation

- Next.js App Router setup
- UI system and theme foundation
- Supabase authentication wiring scaffold
- Prisma and PostgreSQL baseline
- Runtime environment validation
- Structured logging
- Standard API responses
- Health endpoint
- Security middleware
- Rate limiting abstraction
- Supabase authentication wiring
- Prisma and PostgreSQL baseline

## Phase 1: Product Discovery

- Define domain personas
- Validate data ingestion needs
- Specify AI workflow boundaries

## Phase 2: Enterprise Readiness

- External observability integration
- RBAC
- Audit logging
- Multi-tenant isolation
- Redis-backed rate limiting
- Managed secret rotation

## Authentication Foundation

- Passwordless email OTP scaffold
- Google OAuth scaffold
- Server and client session helpers
- Protected route middleware
- Reusable auth cards and layouts
- RBAC role architecture without permissions

## Future Authentication Work

- Permission matrix
- Organization membership persistence
- Account recovery UX
- Additional OAuth providers
- Audit logging for authentication events
- Observability
- RBAC
- Audit logging
- Multi-tenant isolation

## Build 04 — Enterprise Database Architecture

Build 04 establishes the production Prisma database architecture. The database scope includes users, organizations, memberships, projects, conversations, messages, AI provider registry records, encrypted user AI keys, workflows, agents, usage tracking, billing account foundation, audit logs, and system settings. This build intentionally does not add business logic, APIs, UI, AI routing, workflow execution, or agent execution.

### Build 04 Data Foundation

- Multi-tenant organization and project model.
- Supabase-compatible user profile model.
- Provider-agnostic AI provider registry prepared for Groq, Mistral, Gemini, OpenAI, Anthropic, DeepSeek, Cohere, and future providers.
- Encrypted API key storage model with masked display values and lifecycle status.
- Usage ledger for request counts, tokens, estimated cost, latency, provider, project, conversation, and user dimensions.
- Billing account foundation for future SaaS subscription work.
- Audit log foundation for authentication, API key, project, organization, settings, and future AI execution events.
