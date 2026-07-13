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
