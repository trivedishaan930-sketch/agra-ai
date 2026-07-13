# Current State

## Snapshot

The repository contains a Next.js 15 App Router platform foundation with React 19, TypeScript, Tailwind CSS, Supabase authentication scaffolding, Prisma/PostgreSQL baseline configuration, shared UI primitives, security utilities, and documentation for product requirements, architecture, and roadmap.

## Implemented Foundation Areas

- Next.js App Router application structure.
- Public marketing page and auth pages.
- Dashboard route family with protected-layout intent.
- Shared layout components for site and dashboard shells.
- Theme provider and theme toggle primitives.
- Supabase client/server authentication helper modules.
- Auth UI components for login, signup, loading, placeholders, and protected layouts.
- Runtime environment validation with Zod.
- Prisma schema with a baseline `UserProfile` model.
- Structured logging utility.
- API response helpers.
- Validation and typed error utilities.
- Security header helpers and middleware intent.
- Rate-limit abstraction scaffold.
- AI provider configuration flags for OpenAI, Anthropic, and Google keys.

## Important Known Risks

These items should be verified before feature work expands:

1. `package.json` appears to contain duplicated dependency sections and malformed `engines` content. This may prevent package manager commands from parsing the manifest correctly.
2. `middleware.ts` appears to contain overlapping middleware implementations and an incomplete branch. This should be corrected before relying on route protection or security headers in production.
3. AI support is currently configuration-only. No provider client, prompt contract, workflow engine, tool registry, evaluation harness, or usage metering exists yet.
4. RBAC is architectural only. Product-specific authorization and permission checks remain deferred.
5. Prisma currently contains only baseline user profile scaffolding. No agriculture domain models or multi-tenant organization model exists yet.
6. Rate limiting is scaffolded but should be backed by durable infrastructure before production use.
7. Observability is local structured logging only; no external telemetry backend is integrated.

## Current Application Boundaries

- Application code should consume auth functionality through `services/auth/*` rather than talking directly to Supabase throughout feature code.
- Product code should use shared `lib` primitives for validation, errors, API responses, logging, security, and environment access.
- AI code should remain behind provider-neutral configuration and service boundaries until concrete use cases are specified.

## Documentation Status

Existing high-level documentation lives in:

- `docs/PRD.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/memory/*`

The memory system should now be treated as the operational source of continuity for future engineering sessions.
