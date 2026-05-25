# New API Route Workflow

## Step 1
Define route responsibility.

---

## Step 2
Create Zod validation schema.

---

## Step 3
Validate all incoming data.

---

## Step 4
Implement business logic safely.

---

## Step 5
Handle errors securely.

Never expose:
- Stack traces
- Database internals
- Sensitive data

---

## Step 6
Add:
- Rate limiting
- Authentication checks
- Logging if needed

---

## Step 7
Return typed responses.