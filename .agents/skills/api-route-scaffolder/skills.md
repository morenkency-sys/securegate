# API Route Scaffolder Skill

## Purpose

Creates secure API route structures.

---

# Requirements

Every route must:
- Validate input using Zod
- Handle errors safely (no stack traces, no database internals)
- Use TypeScript with proper response types
- Support rate limiting
- Avoid leaking auth internals

---

# Recommended Structure

/app/api
  /auth
    /[...nextauth]
  /forgot-password
  /reset-password
  /verify-email
  /resend-verification

---

# Validation

Use:
- Zod schemas (shared between client and server)
- Typed API responses

---

# Security Checklist

- [ ] Input validated with Zod before processing
- [ ] Rate limiting applied
- [ ] Generic error messages (no "account exists" leaks)
- [ ] Token expiry checked
- [ ] No sensitive data in response body
- [ ] HTTP-only cookies for sessions

---

# Response Format

All API routes should return consistent JSON:
{
  success: boolean;
  message?: string;
  data?: unknown;
  error?: string;
}