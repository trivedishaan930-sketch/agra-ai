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

# AgraAI Engineering Memory System

Version: 1.0
Status: Official
Owner: AgraAI Engineering
Document Type: Repository Memory System

---

# Purpose

This directory contains the permanent engineering memory of the AgraAI project.

Its purpose is to ensure that every engineer, AI coding assistant, Codex session, or future team member can understand the project without relying on previous chat history.

This documentation is the single source of truth for engineering decisions, project state, architecture, and development progress.

No implementation should begin before reading these documents.

---

# Why This Exists

AI coding assistants have limited conversation memory.

Chat history can be lost.

Different Codex accounts may be used.

Multiple engineers may work on the repository.

Future contributors should understand the project immediately.

This memory system solves all of those problems.

Every build must update the project memory.

The repository—not the chat—is the official memory of AgraAI.

---

# Repository Memory Structure

docs/

memory/

README.md

00_SESSION_BOOTSTRAP.md

01_STATIC_CONTEXT.md

02_CURRENT_STATE.md

03_BUILD_HISTORY.md

04_NEXT_BUILD.md

05_CTO_DECISIONS.md

06_PROJECT_STATUS.md

---

# Document Responsibilities

README.md

Explains the Engineering Memory System.

Never contains project-specific implementation details.

Updates only when the documentation structure changes.

---

00_SESSION_BOOTSTRAP.md

The first document every new Codex session must read.

Contains startup instructions.

Contains repository reading instructions.

Contains engineering behavior rules.

Used before every build.

---

01_STATIC_CONTEXT.md

Permanent project knowledge.

Contains:

Product Vision

Mission

Engineering Philosophy

Technology Stack

Architecture Overview

Coding Standards

Product Principles

AI Strategy

Folder Philosophy

Naming Conventions

Changes very rarely.

---

02_CURRENT_STATE.md

Current engineering state.

Contains:

Current Build

Completed Builds

Pending Build

Current Architecture Status

Known Issues

Temporary Notes

Updated after every successful build.

---

03_BUILD_HISTORY.md

Historical record of every build.

Contains:

Build Number

Objective

Result

Review Status

Merge Status

Major Changes

Never delete previous entries.

Append only.

---

04_NEXT_BUILD.md

Defines the next engineering objective.

Contains:

Target Build

Objectives

Expected Deliverables

Engineering Constraints

Success Criteria

Updated after every completed build.

---

05_CTO_DECISIONS.md

Official engineering decisions.

Examples:

Why Groq First

Why Cloudflare

Why Prisma

Why Supabase

Why Next.js

Why AI Agnostic

Why Repository Memory

Every important decision should be recorded.

---

06_PROJECT_STATUS.md

High-level project progress.

Contains:

Overall Progress

Architecture Progress

Frontend Progress

Backend Progress

Database Progress

AI Progress

Infrastructure Progress

Deployment Progress

Useful for founders, investors and engineering leads.

---

# Engineering Workflow

Every engineering cycle follows this process.

Repository

↓

Read Engineering Memory

↓

Understand Current State

↓

Implement Current Build

↓

Self Review

↓

CTO Review

↓

Merge

↓

Update Memory

↓

Proceed To Next Build

No shortcuts.

---

# Repository Is The Memory

The GitHub repository is the permanent memory of AgraAI.

Chats are temporary.

AI sessions are temporary.

Repository documentation is permanent.

Every engineering decision must eventually be reflected inside this directory.

---

# Rules For Every Engineer

Before writing code:

Read the Engineering Memory.

Understand the Current State.

Understand the Next Build.

Understand previous CTO decisions.

Only then begin implementation.

Never assume context.

Always verify documentation.

---

# Rules For AI Coding Assistants

Every AI assistant working on AgraAI must:

Read every file inside docs/memory.

Treat documentation as authoritative.

Never rebuild completed work.

Never ignore engineering decisions.

Never rename project structure without approval.

Never change architecture without documentation.

Never introduce breaking changes intentionally.

Always preserve backward compatibility.

Always explain architectural changes before implementation.

Always update project memory after successful completion.

---

# Documentation Update Policy

Static documents change rarely.

Dynamic documents change after builds.

Static Documents

README.md

00_SESSION_BOOTSTRAP.md

01_STATIC_CONTEXT.md

Dynamic Documents

02_CURRENT_STATE.md

03_BUILD_HISTORY.md

04_NEXT_BUILD.md

05_CTO_DECISIONS.md

06_PROJECT_STATUS.md

---

# Build Completion Checklist

Every completed build must satisfy the following:

Code builds successfully.

Lint passes.

Type checking passes.

Tests pass (when available).

Merge conflicts resolved.

Documentation updated.

Current State updated.

Build History updated.

Next Build updated.

Only then is the build considered complete.

---

# Engineering Philosophy

AgraAI is designed as an enterprise-grade AI platform.

Engineering quality is prioritized over development speed.

Every component should be:

Modular

Maintainable

Scalable

Reusable

Secure

Observable

Well documented

Future-proof

The project should remain understandable years from now.

---

# Long-Term Goal

The Engineering Memory System should allow:

Any new engineer to contribute quickly.

Any Codex session to continue development.

Multiple development environments.

Multiple GitHub contributors.

Long-term maintainability.

Enterprise scalability.

No dependency on previous conversations.

---

# Source of Truth

The official engineering source of truth is:

docs/memory/

If documentation and chat conflict,

documentation takes precedence.

If documentation and assumptions conflict,

documentation takes precedence.

If documentation is outdated,

update documentation before implementation.

---

End of README.md
