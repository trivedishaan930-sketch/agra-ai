# AgraAI Architecture

## Principles
- Modular feature boundaries
- Server-first rendering by default
- Typed contracts at system edges
- Provider isolation for auth, data, and AI services

## Directory Strategy
- `app`: Next.js routes and layouts
- `components`: shared UI and layout primitives
- `features`: domain-oriented feature modules
- `lib`: framework adapters and shared utilities
- `services`: application service facades
- `database`: database clients and persistence utilities
- `ai`: AI provider abstractions
- `config`: environment and navigation configuration
- `docs`: product and architecture documentation
