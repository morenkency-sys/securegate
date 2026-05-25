# Test Writer Skill

## Purpose

Creates tests for authentication flows, API routes, and components.

---

# Testing Principles

- Test behavior, not implementation
- Cover happy paths, error paths, and edge cases
- Never expose real credentials or tokens in tests
- Use mocks for external services (Resend, database)
- Tests must be deterministic

---

# Test Types

## 1. Auth Flow Tests

Cover:
- User registration (valid, duplicate email, invalid data)
- User login (valid credentials, wrong password, nonexistent email)
- Email verification (valid token, expired token, invalid token)
- Password reset (valid request, nonexistent email, expired token, reused token)
- Session management (login, logout, session expiry)

## 2. API Route Tests

Each route must test:
- 200 success response
- 400 invalid input
- 401 unauthorized
- 429 rate limited
- 500 error handling (generic message, no internals leaked)

## 3. Component Tests

Each component must test:
- Renders with default props
- Renders with custom props
- Handles empty/error states
- Keyboard navigation works
- Form validation messages appear

---

# Test Structure

```
describe('Feature / Route', () => {
  describe('happy path', () => {
    it('returns expected result', async () => { ... });
  });

  describe('error handling', () => {
    it('rejects invalid input', async () => { ... });
    it('handles expired tokens', async () => { ... });
  });

  describe('security', () => {
    it('does not leak internal errors', async () => { ... });
  });
});
```

---

# Edge Cases to Always Cover

- Expired tokens
- Invalid/malformed tokens
- Missing required fields
- Injection attempts (XSS, SQL)
- Rate limit thresholds
- Concurrent requests
- Empty request bodies
- Extremely long inputs

---

# Tools

- Vitest or Jest for unit/integration tests
- Playwright or Testing Library for component tests
- MSW or similar for API mocking
