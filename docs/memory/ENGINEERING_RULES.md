# Engineering Rules

## Absolute Rules

1. Do not implement agriculture business workflows until requirements are explicitly defined.
2. Do not add application code without first checking the current architecture and memory documentation.
3. Do not bypass centralized environment validation.
4. Do not read secrets directly across the application when a shared config or service boundary exists.
5. Do not scatter provider-specific auth, AI, database, or logging logic through feature code.
6. Do not create untyped API contracts.
7. Do not add domain data models without documenting tenancy, ownership, lifecycle, and access-control implications.
8. Do not treat role names as sufficient authorization; permissions must be explicit when product authorization begins.
9. Do not introduce AI features without evaluation, safety, observability, and cost-control plans.
10. Do not modify application code when the task is documentation-only.

## Change Management Rules

- Keep changes small, reviewable, and aligned with the current phase.
- Prefer improving shared infrastructure before duplicating logic in feature modules.
- Update documentation when architecture, rules, or implementation state changes.
- Record meaningful changes in `BUILD_HISTORY.md`.
- Update `NEXT_BUILD.md` after completing a build if priorities change.

## Security Rules

- Validate runtime environment values at startup.
- Preserve secure defaults for headers, cookies, redirects, and auth callbacks.
- Keep service-role credentials server-only.
- Do not log secrets, tokens, cookies, authorization headers, or personally sensitive values.
- Require defense-in-depth for protected routes: middleware plus server-side guards where appropriate.

## Data Rules

- Prisma schema changes must be intentional and migration-backed.
- Multi-tenant data must include clear ownership and isolation strategy before implementation.
- Avoid adding optional columns or generic JSON blobs as substitutes for modeled requirements.
- Document data retention, audit, and access requirements for enterprise-facing features.

## AI Rules

- AI providers must be isolated behind provider-neutral interfaces.
- Prompt templates and tool definitions must be versioned once introduced.
- AI outputs that affect business decisions must be traceable and reviewable.
- Cost, latency, safety, and evaluation metrics must be defined before production rollout.
