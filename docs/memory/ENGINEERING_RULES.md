# AgraAI Session ENGINEERING_RULES
Version: 1.0
Status: Official
Document Type: AI Engineering Bootstrap
Priority: Critical

---

# Purpose

This document is the mandatory startup instruction for every new AI coding assistant, Codex session, or engineering contributor working on AgraAI.

Before writing, modifying, reviewing, or generating any code, this document must be read completely.

This file defines how the project should be understood, how engineering decisions must be made, and how development should continue without relying on previous conversations.

---

# Project Identity

Project Name

AgraAI

Official Vision

Every AI, made 10x smarter, better, real, useful for you.

Mission

Build the world's most useful AI platform that helps people and businesses achieve better outcomes from Artificial Intelligence through intelligent orchestration, prompt optimization, AI routing, workflow automation, and AI agents.

Engineering Goal

Build AgraAI as an enterprise-grade AI SaaS platform that is modular, scalable, maintainable, secure, AI-provider agnostic, and production-ready.

---

# Repository First Policy

This repository is the official engineering memory.

Do NOT rely on previous chat history.

Do NOT rely on assumptions.

Do NOT rely on AI memory.

Everything must be verified from repository documentation.

The repository is the only source of truth.

---

# Mandatory Reading Order

Before implementing any code, read the following files in order:

docs/memory/README.md

↓

docs/memory/01_PROJECT_CONTEXT.md

↓

docs/memory/02_CURRENT_STATE.md

↓

docs/memory/03_BUILD_HISTORY.md

↓

docs/memory/04_NEXT_BUILD.md

↓

docs/memory/05_CTO_DECISIONS.md

↓

docs/memory/06_PROJECT_STATUS.md

Only after understanding all documents may implementation begin.

---

# Engineering Rules

Never rebuild completed work.

Never duplicate existing functionality.

Never rename folders without approval.

Never reorganize project architecture without documentation.

Never delete working code unnecessarily.

Never introduce breaking changes intentionally.

Always extend existing architecture.

Always preserve backward compatibility.

Always follow existing coding style.

Always use modular design.

Always think about scalability.

Always prioritize maintainability.

Always document significant architectural changes.

---

# Product Rules

AgraAI is not a chatbot.

AgraAI is an AI operating platform.

Every engineering decision must support that vision.

Do not convert AgraAI into another ChatGPT clone.

Do not introduce random features.

Do not modify product philosophy.

Respect the official PRD.

Respect engineering decisions.

Respect product scope.

---

# AI Strategy

Current Primary AI Provider

Groq

Current Secondary AI Provider

Mistral

Selective Usage

Gemini

Future Providers

OpenAI

Anthropic Claude

DeepSeek

Cohere

Llama

Other enterprise providers

Architecture must remain AI-provider agnostic.

No provider-specific business logic should be tightly coupled.

Every provider must implement a common interface.

---

# Technology Stack

Frontend

Next.js

React

TypeScript

Tailwind CSS

shadcn/ui

Backend

Supabase

Prisma

PostgreSQL

Deployment

Cloudflare

Vercel

Version Control

GitHub

Future Infrastructure

Edge-first

Serverless where appropriate

Horizontal scalability

---

# Coding Standards

Write production-quality code.

Prefer readability.

Prefer maintainability.

Avoid unnecessary complexity.

Avoid duplicated logic.

Avoid magic values.

Prefer configuration over hardcoding.

Use strong typing.

Validate external inputs.

Handle errors gracefully.

Log meaningful events.

Keep functions small.

Build reusable components.

---

# Security Rules

Validate every input.

Never expose secrets.

Never commit credentials.

Encrypt sensitive information.

Follow least privilege principles.

Design with RBAC compatibility.

Prepare for audit logging.

Prepare for enterprise security.

---

# Build Policy

One build.

One objective.

One review.

One merge.

One documentation update.

Never mix multiple large engineering objectives inside one build unless explicitly instructed.

---

# Documentation Policy

Documentation is part of the product.

If architecture changes,

documentation changes.

If database changes,

documentation changes.

If build changes,

CURRENT_STATE.md changes.

If engineering decisions change,

CTO_DECISIONS.md changes.

---

# Build Completion Policy

A build is considered complete only if:

Implementation completed.

Project builds successfully.

Lint passes.

Type checking passes.

Review completed.

Merge completed.

Engineering memory updated.

Only then may the next build begin.

---

# Review Policy

Every completed build must undergo CTO review.

Review must evaluate:

Architecture

Maintainability

Security

Scalability

Performance

Developer Experience

Documentation

Production readiness

Never approve poor engineering quality.

---

# Current Development Philosophy

Develop incrementally.

Build strong foundations first.

Do not rush feature development.

Quality is more important than speed.

A stable architecture saves future engineering time.

---

# Engineering Mindset

Think like a senior software engineer.

Think like a system architect.

Think like an enterprise CTO.

Every implementation should remain understandable years later.

Optimize for long-term maintainability.

---

# Before Starting Any Build

Before making changes:

Understand current project state.

Understand previous builds.

Understand architecture.

Understand engineering constraints.

Explain your implementation plan.

Only then begin coding.

---

# After Completing Any Build

Verify implementation.

Review code.

Update documentation.

Update Current State.

Update Build History.

Prepare Next Build.

Only then consider the task finished.

---

# Success Criteria

Every engineering decision should improve one or more of the following:

Scalability

Maintainability

Developer Experience

Performance

Reliability

Security

Reusability

Extensibility

Documentation

Engineering Quality

---

# Final Instruction

You are not creating an experimental project.

You are engineering the long-term foundation of AgraAI.

Every decision must improve the product.

Every build must preserve architecture.

Every change must be intentional.

Repository documentation is the permanent memory.

Always continue from the latest completed build.

Never restart the project.

Never ignore repository memory.

---

End of 00_SESSION_ENGINEERING_RULES.md