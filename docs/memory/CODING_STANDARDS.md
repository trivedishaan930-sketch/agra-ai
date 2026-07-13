# Coding Standards

## TypeScript Standards

- Use TypeScript for application code.
- Prefer explicit exported types at module boundaries.
- Use Zod or equivalent schema validation for external inputs and runtime configuration.
- Avoid `any` unless the boundary is genuinely unknown and the value is immediately narrowed.
- Keep API response shapes consistent through shared response helpers.

## Next.js Standards

- Prefer server components by default.
- Use client components only when interactivity, browser APIs, or hooks require them.
- Keep route handlers thin and delegate business logic to services.
- Keep layouts focused on composition, data loading, and guard boundaries.
- Use middleware for cross-cutting request concerns, but keep authorization enforcement available server-side too.

## Module Boundary Standards

- `features/*` should contain product or domain feature code.
- `services/*` should expose application service facades.
- `lib/*` should contain reusable infrastructure utilities.
- `config/*` should centralize constants, runtime toggles, navigation, and environment access.
- `components/*` should contain reusable UI and layout primitives.
- `database/*` should isolate database client setup and persistence utilities.
- `ai/*` should remain provider-neutral or re-export AI configuration until provider adapters exist.

## React And UI Standards

- Prefer small, composable components.
- Keep shared UI primitives generic and product-agnostic.
- Keep feature-specific UI inside feature modules unless it is truly reusable.
- Preserve accessibility semantics for forms, navigation, buttons, labels, and error states.
- Keep styling consistent with Tailwind and existing utility patterns.

## Auth Standards

- Consume auth through `services/auth/*` and `hooks/auth/*`.
- Keep Supabase implementation details behind auth service modules.
- Protect sensitive route families through middleware and server-side guards.
- Do not assume role names are permissions.
- Keep service-role operations server-only.

## Error, Logging, And API Standards

- Use typed errors for expected failure modes.
- Return consistent API response envelopes.
- Log structured JSON-compatible entries.
- Include request IDs where available.
- Never log secrets, tokens, cookies, or raw sensitive payloads.

## Documentation Standards

- Update memory files when changing architecture, known state, or build priorities.
- Keep documentation precise and current.
- Mark deferred capabilities explicitly rather than implying they exist.
