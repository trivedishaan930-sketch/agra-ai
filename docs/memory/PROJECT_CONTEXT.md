# AgraAI Project Context
Version: 1.0
Status: Official
Document Type: Permanent Engineering Context
Owner: AgraAI Engineering

---

# Purpose

This document contains the permanent identity of AgraAI.

Unlike CURRENT_STATE.md, this file rarely changes.

It defines what AgraAI is, why it exists, how it should be engineered, and the principles that every contributor must follow.

Every engineer, AI coding assistant, and future team member must treat this document as permanent project knowledge.

---

# Product Identity

Product Name

AgraAI

Official Tagline

Every AI, made 10x smarter, better, real, useful for you.

Product Category

AI Operating Platform

Official Website

(To be added after production deployment.)

Current Stage

Pre-Production Engineering

---

# Vision

Build the world's most useful AI operating platform that enables individuals, professionals, creators, developers, businesses, and enterprises to obtain significantly better results from Artificial Intelligence through intelligent orchestration rather than by creating another standalone AI model.

AgraAI aims to become the trusted intelligence layer between users and AI providers.

---

# Mission

Enable people to use Artificial Intelligence more effectively by providing:

Better prompts

Better routing

Better workflows

Better AI agents

Better automation

Better productivity

Lower cost

Higher quality

Maximum transparency

---

# Core Philosophy

Artificial Intelligence should become:

Simple

Useful

Affordable

Transparent

Reliable

Accessible

Language-friendly

Human-centered

AgraAI exists to maximize the usefulness of AI instead of maximizing AI complexity.

---

# Long-Term Goal

Become the world's leading AI orchestration platform where users no longer worry about:

Which AI to use

How to write prompts

Which workflow is best

How to automate work

AgraAI should intelligently manage these decisions.

---

# Product Principles

Simplicity First

User First

AI Agnostic

Privacy by Design

Transparency

Trust before Intelligence

Cost Efficiency

Quality over Quantity

Scalable by Default

Enterprise Ready

Mobile First

Developer Friendly

Documentation First

Backward Compatibility

Engineering Excellence

These principles must influence every future engineering decision.

---

# Engineering Philosophy

Strong foundations before rapid expansion.

Architecture before features.

Documentation before assumptions.

Maintainability before shortcuts.

Reusable systems before duplication.

Long-term quality before short-term speed.

---

# AI Strategy

Phase 1 (Zero Budget)

Primary Provider

Groq

Secondary Provider

Mistral

Selective Provider

Gemini

Reason

Fast

Reliable

Cost Efficient

Excellent Developer Experience

---

Phase 2

Support Premium Providers

OpenAI

Claude

Gemini

DeepSeek

Llama

Mistral

Groq

Other Enterprise Models

---

Phase 3

Multi-AI Intelligent Router

AgraAI automatically selects the best provider based on:

Task

Quality

Latency

Cost

Context

Availability

User preference

The routing engine must remain modular and provider-independent.

---

# AI Provider Policy

AgraAI never depends on one provider.

Every provider must implement a common interface.

Providers can be added or removed without affecting business logic.

Vendor lock-in must be avoided.

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

Prisma ORM

PostgreSQL

Deployment

Cloudflare

Vercel

Version Control

GitHub

Package Manager

pnpm

Preferred Runtime

Node.js LTS

---

# Architecture Philosophy

Layered Architecture

Presentation Layer

↓

Application Layer

↓

Business Logic

↓

AI Orchestration Layer

↓

Provider Layer

↓

Database

Every layer must remain independent.

Business logic should never directly depend on provider implementations.

---

# Product Scope (Permanent)

AgraAI is an AI platform.

AgraAI is not:

A social network

A messaging application

A generic chatbot clone

A custom LLM company

A traditional SaaS CRM

The platform focuses on intelligent AI orchestration.

---

# Engineering Standards

Enterprise quality.

Modular code.

Strict TypeScript.

Reusable components.

Feature-first architecture.

Configuration-driven development.

Centralized logging.

Strong validation.

Security-first mindset.

Documentation maintained continuously.

---

# Security Principles

Least privilege.

Secure defaults.

Encrypted secrets.

Input validation.

Audit readiness.

Role-based access.

Privacy-first engineering.

---

# Database Principles

Normalized schema.

UUID primary keys.

Soft delete where appropriate.

Indexed search fields.

Scalable relationships.

Migration safety.

Backward compatibility.

---

# API Principles

REST-first.

Versionable.

Consistent response format.

Standard error handling.

Authentication required where applicable.

Validation before execution.

Clear documentation.

---

# User Experience Principles

Fast.

Clean.

Minimal.

Professional.

Accessible.

Responsive.

Mobile-first.

Dark mode ready.

High readability.

Consistent design language.

---

# Performance Goals

Fast initial load.

Efficient server rendering.

Minimal client-side JavaScript.

Edge-ready architecture.

Optimized database queries.

Lazy loading where appropriate.

Scalable caching.

---

# Coding Standards

Readable code.

Small functions.

Reusable utilities.

No duplicated logic.

Strong typing.

Meaningful naming.

Predictable architecture.

Clear comments only when necessary.

---

# Naming Conventions

Components

PascalCase

Hooks

useCamelCase

Functions

camelCase

Variables

camelCase

Constants

UPPER_SNAKE_CASE

Environment Variables

UPPER_SNAKE_CASE

Database Tables

snake_case

API Routes

kebab-case

---

# Folder Philosophy

Organize by feature.

Keep modules independent.

Avoid circular dependencies.

Prefer composition over inheritance.

Keep shared utilities centralized.

---

# Repository Philosophy

GitHub is the permanent engineering memory.

Repository documentation is authoritative.

Chats are temporary.

Every important engineering decision must eventually exist inside the repository.

---

# Success Metrics

The platform should continuously improve:

User Success

Engineering Quality

Reliability

Performance

Scalability

Developer Experience

Maintainability

Security

AI Quality

Cost Efficiency

---

# Non-Negotiable Rules

Never rebuild completed work.

Never break architecture intentionally.

Never ignore documentation.

Never hardcode provider-specific logic.

Never introduce unnecessary complexity.

Never sacrifice maintainability for speed.

Never remove backward compatibility without approval.

Always update documentation after major engineering changes.

---

# Future Vision

AgraAI should evolve into the intelligent operating layer for Artificial Intelligence, enabling users to obtain the best possible outcomes regardless of which underlying AI models are used.

The platform should remain AI-provider agnostic, engineering-driven, and globally scalable.

---

End of 01_PROJECT_CONTEXT.md