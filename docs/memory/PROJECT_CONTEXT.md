# Project Context

## Product Identity

AgraAI is an AI-native SaaS platform foundation for agriculture teams. The repository currently represents the platform layer, not a completed agriculture workflow product.

## Current Product Phase

AgraAI is in the platform foundation phase. The current goal is to establish a secure, typed, modular Next.js application base that can support future authenticated dashboards, agriculture-specific workflows, AI-assisted experiences, and enterprise readiness.

## Foundation Goals

- Provide a secure Next.js App Router foundation.
- Support public marketing and authentication entry points.
- Support protected product route families such as dashboards, settings, and projects.
- Centralize runtime configuration, logging, validation, API response patterns, security headers, and rate limiting scaffolds.
- Keep provider-specific integrations isolated behind service and configuration boundaries.
- Prepare for future AI, data, and product feature modules without implementing premature business logic.

## Explicit Non-Goals For The Foundation Phase

- Do not add agriculture domain business logic until workflows are specified.
- Do not add production data models beyond baseline identity/profile scaffolding.
- Do not implement full AI provider routing, prompt orchestration, workflow automation, marketplace features, or agent builders yet.
- Do not bypass shared infrastructure utilities with feature-local one-off implementations.

## Primary Architecture Principles

- Server-first rendering by default.
- Modular feature boundaries.
- Typed contracts at all system edges.
- Provider isolation for auth, database access, security, logging, and AI services.
- Fail-fast runtime configuration.
- Deterministic dependency declarations.
- Documentation-backed implementation decisions.

## Repository Shape

- `app`: Next.js routes, layouts, error boundaries, and API handlers.
- `components`: Shared UI and layout primitives.
- `features`: Domain-oriented feature modules.
- `lib`: Cross-cutting infrastructure and framework adapters.
- `services`: Application-level service facades.
- `database`: Database clients and persistence utilities.
- `ai`: AI provider configuration exports only; implementation is deferred.
- `config`: Application constants, provider toggles, navigation, security, and environment access.
- `docs`: Product, architecture, roadmap, and engineering memory documentation.

## Authentication Context

Authentication is intended to support Supabase-backed passwordless email OTP and Google OAuth. Public routes are `/`, `/login`, and `/signup`. Protected product route families include `/dashboard`, `/settings`, and `/projects`. Role architecture recognizes Owner, Admin, Member, and Viewer, while product-specific permissions are deferred.
