# AgraAI Product Requirements Document

## Purpose

AgraAI is an AI-native SaaS platform foundation for agriculture teams. This repository intentionally contains platform scaffolding only; business workflows will be specified before implementation.

## Goals

- Establish a secure, modular Next.js application foundation.
- Support future authenticated dashboard experiences without implementing business logic in this phase.
- Provide a scalable structure for AI, data, and product feature modules.
- Standardize engineering foundations for configuration, logging, validation, security, and API contracts.
- Support authenticated dashboard experiences.
- Provide a scalable structure for AI, data, and product feature modules.

## Non-Goals

- No domain-specific business logic in the foundation phase.
- No production data models beyond baseline identity profile scaffolding.
- No AI provider routing, prompt engine, workflow engine, marketplace, or agent builder.

## Engineering Requirements

- Environment configuration must be validated at runtime and fail fast when required values are missing.
- API routes must use consistent success, error, validation, and pagination response shapes.
- Security headers and request IDs must be applied centrally through middleware.
- Logging must be structured and compatible with future external observability systems.

## Authentication Foundation

The authentication foundation must support secure passwordless email OTP and Google OAuth through Supabase. Public routes remain `/`, `/login`, and `/signup`; protected product route families include `/dashboard`, `/settings`, and `/projects`. RBAC is limited to role architecture for Owner, Admin, Member, and Viewer; permissions and product-specific authorization are intentionally deferred.

## Build 04 Database Requirements

The Build 04 database layer provides the enterprise data foundation required for AgraAI's AI operating platform vision. It supports multi-user, multi-organization, and multi-project usage while keeping AI provider data modular and provider-agnostic.

### Core Entities

AgraAI stores users, organizations, memberships, projects, conversations, messages, AI providers, user AI keys, workflows, agents, usage records, billing accounts, audit logs, and system settings. These entities are normalized through UUID primary keys, explicit foreign keys, unique constraints, timestamps, and soft-delete fields where retention is appropriate.

### Provider and API Key Requirements

The provider registry prepares AgraAI for Groq, Mistral, Gemini, OpenAI, Anthropic, DeepSeek, Cohere, and future providers without implementing provider runtime logic. User AI keys store encrypted key material, masked display values, provider references, lifecycle status, last-used timestamps, and creator attribution.

### Usage and Audit Requirements

Usage records track requests, prompt tokens, completion tokens, total tokens, estimated cost, latency, provider, project, conversation, and user dimensions. Audit logs support authentication events, API key events, project events, organization events, settings changes, and future AI execution events for enterprise accountability.
