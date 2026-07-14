# AgraAI Coding Standards

Version: 1.0

Status: Official

Document Type: Permanent Engineering Standards

Owner: AgraAI Engineering

---

# Purpose

This document defines the mandatory coding standards for every engineer and AI coding assistant contributing to AgraAI.

These standards ensure consistency, maintainability, scalability, and production-quality engineering.

---

# General Principles

Write production-quality code.

Prefer simplicity over cleverness.

Prefer maintainability over shortcuts.

Prefer readability over unnecessary abstraction.

Avoid duplicated logic.

Design for long-term scalability.

---

# TypeScript Standards

Use strict TypeScript.

Avoid 'any' unless absolutely necessary.

Prefer explicit types.

Use interfaces and types appropriately.

Enable compile-time safety.

---

# Code Organization

Feature-first architecture.

Small reusable modules.

Single responsibility principle.

Avoid circular dependencies.

Keep shared utilities centralized.

---

# Naming Conventions

Components → PascalCase

Hooks → useCamelCase

Functions → camelCase

Variables → camelCase

Constants → UPPER_SNAKE_CASE

Environment Variables → UPPER_SNAKE_CASE

Database Tables → snake_case

API Routes → kebab-case

---

# React Standards

Prefer Server Components when appropriate.

Use Client Components only when necessary.

Keep components focused.

Avoid deeply nested component trees.

Reuse UI components.

---

# API Standards

REST-first design.

Consistent response format.

Validate every request.

Return meaningful error messages.

Use proper HTTP status codes.

Never expose sensitive information.

---

# Database Standards

Use Prisma ORM.

Use UUID primary keys.

Normalize schema where appropriate.

Add indexes for frequently queried fields.

Support safe migrations.

Design for scalability.

---

# Validation Standards

Validate all external inputs.

Use Zod for runtime validation.

Never trust client input.

Fail fast on invalid data.

---

# Error Handling

Handle all expected errors.

Log unexpected errors.

Provide user-friendly error responses.

Avoid silent failures.

---

# Security Standards

Never commit secrets.

Use environment variables.

Encrypt sensitive data.

Follow least privilege principles.

Design for RBAC compatibility.

Prepare for audit logging.

---

# Performance Standards

Optimize database queries.

Prefer server-side rendering.

Lazy-load when appropriate.

Avoid unnecessary re-renders.

Minimize client-side JavaScript.

---

# Documentation Standards

Document important architectural decisions.

Keep repository documentation updated.

Update memory files after major builds.

Repository documentation is the source of truth.

---

# Testing Standards

Write testable code.

Support unit testing.

Support integration testing.

Support end-to-end testing.

Maintain CI compatibility.

---

# Git Standards

Small focused commits.

Clear commit messages.

One build per pull request.

Pass lint before merge.

Pass type checking before merge.

---

# Final Rule

Every contribution to AgraAI must improve one or more of the following:

Scalability

Maintainability

Security

Performance

Reliability

Developer Experience

Documentation

Code Quality

---

End of CODING_STANDARDS.md