---
trigger: always_on
---

# Architecture Rules

## Core Principle
SecureGate must use production-grade architecture focused on security, scalability, and maintainability.

---

# Architecture Style

Use:
- Modular architecture
- Separation of concerns
- Feature-based organization
- Reusable services
- Thin UI components
- Centralized auth logic

Avoid:
- Monolithic files
- Business logic inside UI
- Duplicate validation
- Deep component nesting
- Tight coupling

---

# Frontend Architecture

Framework:
- Next.js App Router

Rules:
- Use Server Components by default
- Use Client Components only when necessary
- Keep forms isolated
- Use reusable UI primitives
- Separate layouts from business logic

---

# Backend Architecture

Backend responsibilities:
- Authentication
- Session management
- Email workflows
- Validation
- Database communication

Use:
- API routes or server actions
- Prisma ORM
- Zod validation
- Middleware protection

---

# Database Architecture

Database:
- PostgreSQL

ORM:
- Prisma

Rules:
- Keep schema normalized
- Use relations properly
- Avoid duplicated data
- Use migrations consistently

---

# Authentication Architecture

Authentication must:
- Be centralized
- Use secure session handling
- Support email verification
- Support password reset
- Protect private routes

Never:
- Expose auth internals
- Leak tokens
- Store sensitive data insecurely

---

# Folder Structure

/app
/components
/lib
/prisma
/styles
/types
/utils
/hooks
/middleware.ts

---

# Scalability Expectations

Architecture should support:
- Future OAuth integration
- Multi-factor authentication
- Role-based access
- Audit logging
- Session revocation

Even if not implemented initially.