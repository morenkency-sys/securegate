# DB Migration Runner Skill

## Purpose

Handles Prisma database migrations safely.

---

# Responsibilities

- Create migrations
- Run migrations
- Validate schema changes
- Prevent destructive changes

---

# Rules

Always:
- Backup production databases
- Review migrations
- Use descriptive migration names

Never:
- Modify production data blindly
- Skip migration validation