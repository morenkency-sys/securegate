# Email Templater Skill

## Purpose

Generates secure, minimal email templates for authentication workflows.

---

# Token Source of Truth

Emails are plain HTML and inline styles. Do not use CSS variables (email clients do not support them).
Use inline styles with production-appropriate values:
- Font: Manrope (fallback: system sans-serif)
- Colors: Match the brand — use the HSL values from tokens/color-tokens.json
- Spacing: 4px multiples

---

# Email Types

## 1. Verification Email
Sent after user registration.

Must include:
- Clear subject line: "Verify your email address"
- User's name (if available)
- Verification link (with token)
- Token expiry notice (15 minutes)
- Professional, minimal branding
- No extraneous links or content

## 2. Password Reset Email
Sent when user requests a password reset.

Must include:
- Clear subject line: "Reset your password"
- User's name (if available)
- Reset link (with token)
- Token expiry notice (1 hour)
- Security notice: "If you didn't request this, ignore this email"
- Professional, minimal branding

---

# Security Rules

- Never include passwords in emails
- Never include raw tokens in email body (only in links)
- Links must be HTTPS
- Use Resend for delivery
- Emails must be mobile-friendly
- No tracking pixels or analytics

---

# Shared Template Structure

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="...">
  <!-- Logo / Brand -->
  <!-- Main Content -->
  <!-- Footer with expiry notice -->
</body>
</html>
```
