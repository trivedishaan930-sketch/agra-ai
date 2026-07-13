# Next Build

## Recommended Priority

Before adding product features, stabilize the platform foundation so the application can be installed, checked, built, and protected reliably.

## Build 1: Repository Health And Manifest Validity

### Goal

Ensure dependency and script tooling works reliably.

### Tasks

- Validate `package.json` structure.
- Remove duplicated or malformed dependency declarations if confirmed.
- Verify package manager install behavior.
- Run lint, typecheck, and build commands.

### Acceptance Criteria

- Package manifest parses correctly.
- Dependencies and devDependencies are deterministic.
- Node and npm engine declarations are valid.
- `npm run lint`, `npm run typecheck`, and `npm run build` can run or have documented environment blockers.

## Build 2: Middleware And Route Protection Stabilization

### Goal

Make request handling, security headers, request IDs, Supabase session refresh, and protected-route redirects reliable.

### Tasks

- Reconcile overlapping middleware implementations.
- Preserve request ID propagation.
- Apply security headers to all relevant responses.
- Preserve Supabase auth session refresh behavior.
- Redirect unauthenticated protected-route users to `/login?next=...`.
- Add focused tests or verification notes for public and protected route behavior.

### Acceptance Criteria

- Middleware compiles.
- Public routes remain accessible.
- Protected routes redirect unauthenticated users.
- Security headers are applied consistently.
- Request IDs are present on responses.

## Build 3: Auth Completion Pass

### Goal

Move authentication from scaffold to reliable foundation behavior.

### Tasks

- Verify Supabase login and signup flows.
- Confirm Google OAuth callback behavior.
- Confirm passwordless email OTP behavior.
- Add clear auth error handling and user feedback.
- Confirm server-side guard behavior in protected layouts.

### Acceptance Criteria

- Users can start and complete supported auth flows in configured environments.
- Protected layouts fail closed.
- Auth state is available through server and client helpers.

## Build 4: AI Foundation Design Document

### Goal

Define the first implementable AI boundary before writing provider code.

### Tasks

- Define provider-neutral AI service interfaces.
- Define initial evaluation requirements.
- Define logging and cost metadata requirements.
- Define first candidate AI use case only after product discovery.

### Acceptance Criteria

- AI architecture is documented before implementation.
- Product features remain provider-neutral.
- Safety, evaluation, and cost controls are included in the design.

## Do Not Start Yet

- Agriculture workflow implementation.
- Marketplace or agent builder implementation.
- Multi-tenant data model expansion without requirements.
- Production AI recommendations without evaluation and review workflows.
