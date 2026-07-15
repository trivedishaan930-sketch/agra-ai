# AgraAI Architecture

## Principles

- Modular feature boundaries
- Server-first rendering by default
- Typed contracts at system edges
- Provider isolation for auth, data, security, logging, and AI services
- Fail-fast configuration and deterministic dependency declarations

## Directory Strategy

- `app`: Next.js routes, layouts, error boundaries, and API route handlers
- `components`: shared UI and layout primitives
- `features`: domain-oriented feature modules
- `lib`: framework adapters and cross-cutting infrastructure utilities
- `services`: application service facades
- `database`: database clients and persistence utilities
- `ai`: AI provider configuration exports only; provider implementations are deferred
- `config`: application, security, feature flag, AI, navigation, and constant configuration
- `docs`: product and architecture documentation

## Engineering Foundation

The foundation centralizes runtime configuration, security headers, structured logging, API responses, validation, typed errors, and rate limiting scaffolds. Business capabilities should consume these shared primitives instead of creating feature-local infrastructure.

## Configuration

Runtime environment validation lives in `lib/env.ts` and is re-exported from `config/env.ts` for backward compatibility. Application constants and provider toggles live in `config/*` modules so product code does not hardcode environment-specific values.

## Security

The middleware applies reusable security headers, a Content Security Policy scaffold, clickjacking protection, request IDs, and content-type protections. Secret utilities provide safe masking and server-only assertions.

## Logging

The logger emits structured JSON entries with levels, timestamps, optional request IDs, and serialized errors. The logger facade is intentionally small so it can be replaced by an external observability provider later.

## Environment

Required runtime values include application URL, Supabase URL and keys, and the PostgreSQL database URL. Future AI provider keys are optional placeholders until provider integrations are implemented.

## Authentication Foundation

Authentication is isolated behind `services/auth/*` with separate client, server, session, helper, guard, and RBAC modules. Supabase currently supports passwordless email OTP and Google OAuth while preserving provider-oriented types for future auth providers. Middleware protects `/dashboard`, `/settings`, and `/projects` route families automatically, and server route guards are available for layouts that need defense-in-depth checks.

- Provider isolation for auth, data, and AI services

## Directory Strategy

- `app`: Next.js routes and layouts
- `components`: shared UI and layout primitives
- `features`: domain-oriented feature modules
- `lib`: framework adapters and shared utilities
- `services`: application service facades
- `database`: database clients and persistence utilities
- `ai`: AI provider abstractions
- `config`: environment and navigation configuration
- `docs`: product and architecture documentation

## Build 04 Enterprise Database Architecture

Build 04 upgrades the Prisma layer into the enterprise database foundation for AgraAI while preserving the Build 01-03 application, authentication, configuration, logging, and security architecture. The schema remains provider-agnostic and models the platform around users, organizations, projects, conversations, messages, provider registry records, encrypted user API keys, workflows, agents, usage records, billing accounts, audit logs, and scoped system settings.

### Database Models

- `User`: application user profile linked optionally to a Supabase auth user ID, with memberships, owned projects, conversations, messages, user AI keys, workflows, agents, usage records, and audit actor relationships.
- `Organization`: tenant boundary for memberships, projects, billing, usage, audit logs, and organization-scoped settings.
- `Membership`: normalized user-to-organization membership with role and lifecycle status.
- `Project`: organization-scoped workspace owned by a user and connected to conversations, workflows, agents, usage, audit events, and project settings.
- `Conversation`: project conversation owned by a user, with messages and usage records.
- `Message`: conversation message with role, content, metadata, and optional user attribution.
- `AIProvider`: provider registry for Groq, Mistral, Gemini, OpenAI, Anthropic, DeepSeek, Cohere, and future custom providers.
- `UserAIKey`: encrypted user/provider API key record with masked display value, status, last-used timestamp, creator, and optional organization scope.
- `Workflow`: database-only workflow definition placeholder for future workflow execution builds.
- `Agent`: database-only agent configuration placeholder for future agent execution builds.
- `UsageRecord`: normalized usage ledger for requests, prompt tokens, completion tokens, total tokens, estimated cost, latency, provider, project, conversation, and user dimensions.
- `BillingAccount`: organization-level billing foundation with status, plan, currency, billing email, and optional external customer identifier.
- `AuditLog`: append-ready audit foundation for authentication, API key events, project events, organization events, settings, and future AI execution.
- `SystemSetting`: organization/project/global setting storage with JSON values and encrypted-value marker.

### Relationships and Scalability

The schema uses UUID primary keys, explicit foreign keys, normalized many-to-one and one-to-many relationships, and soft-delete timestamps where operational records may need retention. Organizations own projects, memberships, billing accounts, usage records, audit logs, and settings. Projects own conversations, workflows, agents, usage records, audit logs, and project settings. Conversations own messages and can be tied to usage records. AI providers are registry records referenced by user API keys and usage records without coupling business logic to provider implementations.

### Index Strategy

Build 04 adds unique constraints for tenant-safe slugs and key names, foreign-key indexes for relation traversal, lifecycle indexes for active/deleted filtering, and composite time-series indexes for high-volume usage and audit queries. Usage records are indexed by organization, project, user, provider, and created time to support future analytics at millions-of-record scale. Audit logs are indexed by organization, project, actor, action, entity, and created time to support enterprise security review and compliance workflows.
