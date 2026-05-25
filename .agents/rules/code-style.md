---
trigger: always_on
---

# Code Style Rules

## Language
Use:
- TypeScript only

Avoid:
- Any
- Untyped functions
- Weak typing

---

# Naming Conventions

Use:
- camelCase for variables/functions
- PascalCase for components/types
- kebab-case for folders
- UPPER_CASE for constants

Examples:
- loginUser()
- AuthCard.tsx
- forgot-password/
- MAX_LOGIN_ATTEMPTS

---

# Component Rules

Components must:
- Be small
- Be reusable
- Have single responsibility
- Avoid large files

Prefer:
- Composition over complexity

---

# Function Rules

Functions should:
- Be pure when possible
- Have descriptive names
- Avoid nested logic
- Return typed values

---

# Styling Rules

Use:
- CSS Modules (.module.css files)
- CSS variables from tokens/variables.css
- Design tokens only

Never:
- Hardcode colors
- Hardcode spacing
- Create random visual styles

---

# Validation Rules

Use:
- Zod everywhere

Validate:
- Forms
- API routes
- Server actions
- Environment variables

---

# Error Handling

Errors must:
- Be handled gracefully
- Avoid leaking internals
- Use safe messaging

Never expose:
- Stack traces
- Database errors
- Sensitive details

---

# Comments

Avoid unnecessary comments.

Write self-explanatory code.

Only comment:
- Complex logic
- Security-sensitive behavior
- Important engineering decisions