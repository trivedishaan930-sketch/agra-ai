# Project Status

This document captures the current operating status of AgraAI for engineering planning. It is intended to be read before starting new work so contributors understand what is ready, what is scaffolded, and what should not be started yet.

## Overall Status

AgraAI is in the platform-foundation phase. The repository is not yet a production agriculture workflow product. Current work should focus on making the foundation installable, buildable, secure, observable, and ready for authenticated product development.

## Current Readiness Summary

| Area | Status | Notes |
| --- | --- | --- |
| Product requirements | Drafted | High-level platform intent exists; domain workflows remain undefined. |
| Architecture | Drafted | Modular boundaries and provider-isolation principles are documented. |
| Application shell | Scaffolded | Next.js App Router structure and shared layout primitives exist. |
| Authentication | Scaffolded | Supabase-oriented helpers and UI exist; end-to-end behavior needs verification. |
| Authorization | Architectural only | Roles are conceptual; permission matrix and enforcement remain deferred. |
| Database | Baseline only | Prisma includes identity/profile scaffolding; domain and tenancy models are deferred. |
| API foundation | Scaffolded | Response, validation, error, and health utilities exist. |
| Security foundation | Scaffolded | Security header and middleware intent exist; middleware should be stabilized before production reliance. |
| AI foundation | Configuration only | Provider toggles exist; no production AI runtime or provider adapter exists. |
| Observability | Local scaffold | Structured logging exists; external telemetry is not integrated. |
| Engineering memory | Established | Persistent project memory now exists under `docs/memory`. |

## Active Constraints

- Do not implement agriculture domain workflows until requirements are approved.
- Do not add production AI behavior until provider interfaces, evaluations, guardrails, and cost controls are defined.
- Do not expand database models for tenancy or business entities without ownership and access-control design.
- Do not treat RBAC role names as sufficient authorization.
- Do not modify application code during documentation-only tasks.

## Known Stabilization Needs

1. Validate and correct package manifest health if needed.
2. Stabilize middleware so request IDs, security headers, Supabase session refresh, and protected-route redirects work together.
3. Verify authentication flows in a configured environment.
4. Confirm lint, typecheck, and build commands run successfully or document any environment blockers.
5. Define the first AI architecture design before provider implementation.

## Ready For Engineering Work

The following work is appropriate now:

- Documentation improvements.
- Repository health fixes.
- Middleware correctness fixes.
- Authentication verification and hardening.
- Shared infrastructure cleanup.
- Architecture documents for AI, tenancy, permissions, observability, and data lifecycle.

## Not Ready Yet

The following work should wait:

- Agriculture-specific workflow screens.
- Domain-specific database entities.
- Marketplace or agent-builder features.
- Production AI recommendations.
- Multi-tenant enterprise behavior without a tenancy design.
- Permission-sensitive product features without a permission matrix.

## Status Update Process

Update this file when:

- A foundation area moves from scaffolded to verified.
- A known stabilization need is completed.
- A product scope decision changes the project phase.
- A new blocking risk is discovered.
- A major build changes what contributors should work on next.
