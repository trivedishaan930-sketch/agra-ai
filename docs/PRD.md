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
