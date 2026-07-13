# AgraAI Engineering Memory

This directory is the persistent engineering memory for AgraAI. It is designed to help future engineers and AI coding agents understand the product intent, current implementation state, historical decisions, rules of engagement, and next build priorities before making changes.

## Memory Files

- [Project Context](./PROJECT_CONTEXT.md): Product purpose, repository intent, scope boundaries, and architecture principles.
- [Current State](./CURRENT_STATE.md): Snapshot of what exists now, what is scaffolded, and known implementation risks.
- [Build History](./BUILD_HISTORY.md): Chronological record of platform foundation work and documentation milestones.
- [Engineering Rules](./ENGINEERING_RULES.md): Non-negotiable engineering constraints and operating rules.
- [AI Strategy](./AI_STRATEGY.md): How AgraAI should approach AI capabilities, provider boundaries, and future agent design.
- [Coding Standards](./CODING_STANDARDS.md): Repository coding conventions, module boundaries, and quality expectations.
- [Next Build](./NEXT_BUILD.md): Recommended next implementation sequence and acceptance criteria.

## How to Use This Memory

1. Read `PROJECT_CONTEXT.md` before proposing product or architecture changes.
2. Read `CURRENT_STATE.md` before editing code so known risks are not rediscovered repeatedly.
3. Read `ENGINEERING_RULES.md` and `CODING_STANDARDS.md` before implementing any feature.
4. Update `BUILD_HISTORY.md` whenever a meaningful foundation, product, or architectural change lands.
5. Keep `NEXT_BUILD.md` current after each build so the next contributor has a clear starting point.

## Scope Rule

This memory system is documentation only. It must describe the application accurately without quietly introducing application-code changes.
