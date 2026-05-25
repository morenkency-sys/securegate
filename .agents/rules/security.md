---
trigger: always_on
---

# Security Rules

## Security Priority

Security is the highest priority in SecureGate.

Never sacrifice security for speed.

---

# Password Rules

Passwords must:
- Be hashed using bcrypt
- Never be stored in plain text
- Never be logged

---

# Authentication Rules

Authentication must:
- Use secure sessions
- Protect routes
- Require email verification
- Expire tokens properly

---

# Token Rules

Verification tokens:
- Expire after 15 minutes

Password reset tokens:
- Expire after 1 hour

Never:
- Reuse tokens
- Expose tokens publicly

---

# API Security

All API routes must:
- Validate inputs
- Handle errors safely
- Prevent abuse
- Use rate limiting

---

# Environment Variables

Never hardcode:
- Secrets
- Keys
- Database URLs

Use:
- process.env
- Environment validation

---

# Error Security

Never expose:
- Internal errors
- Database details
- Authentication internals
- Stack traces

Use generic auth errors.

---

# Session Security

Use:
- Secure cookies
- HTTP-only cookies
- HTTPS in production

Prevent:
- Session hijacking
- Session leakage

---

# Validation Security

Validate:
- All user input
- Query params
- API body data
- Tokens

Use Zod everywhere.