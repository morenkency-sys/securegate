# SecureGate — Reflection & Engineering Analysis

**Name:** Adeola Adekoya
**Cohort:** Design to MVP Bootcamp
**Live URL:** https://securegate-drab.vercel.app
**GitHub Repo:** https://github.com/morenkency-sys/securegate.git

---

## Part 1 — What I Built
SecureGate is a production-grade, highly secure authentication gateway built with Next.js App Router and Prisma. It features robust token-based email verification, a secure password reset flow, dynamic real-time UI validation, and defensive rate-limiting mechanisms to protect against brute-force and user enumeration attacks.

## Part 2 — What Surprised Me
The first thing that surprised me was integrating the email verification link. In class, we did this using Node.js and Nodemailer, so using the Resend API was completely new to me. I had to troubleshoot and try multiple different approaches until I finally got Resend to work and actually saw the verification link pop up in my email inbox. 

Another big surprise happened during deployment. I realized I couldn't just use my local database server (`localhost`). I knew we had spoken about Neon in class, so I tried that first, but the website seemed to be down or not working for me. I ended up using Supabase instead. Even then, it wasn't a simple copy-paste—I had to figure out how to use their IPv4 transaction pooler string just to get my deployed Vercel app to connect to the database!

## Part 3 — Engineering Laws Quiz

### Q1 — Murphy's Law
**Code reference:** `lib/rate-limit.ts` and `app/api/reset-password/route.ts` line 41
**My Answer:** Murphy's Law basically means anything that can go wrong will go wrong. I applied this by just assuming people will try to mess with the login system. So, I added a rate limiter to block anyone trying to guess passwords too many times. I also made sure the "forgot password" message just says "Token is invalid or has expired" instead of telling the user if the email actually exists in our database.
**What goes wrong if ignored:** If I didn't add the rate limiter, someone could just run a script to guess thousands of passwords until they finally get in. And if I didn't change the error message, hackers could just test random emails to see exactly who uses the platform, which is a big privacy issue.

### Q2 — Law of Leaky Abstractions
**Code reference:** `package.json` line 7 (`prisma migrate deploy`) and `prisma/schema.prisma` lines 6-8
**My Answer:** Prisma is usually great because it hides all the complicated SQL stuff. But when I tried deploying my app on Vercel with Supabase, Prisma completely "leaked." It assumes it has a normal, direct connection to the database. Because Vercel uses serverless functions, I couldn't just use Prisma normally. I actually had to dig into the settings, add a `directUrl` in the schema, and figure out how to use Supabase's special port 6543 transaction pooler just to make the connection work.
**What goes wrong if ignored:** If I didn't figure out the connection poolers, my Vercel deployment would say "successful," but the moment anyone tried to log in or use the app, it would crash and say "Can't reach database server" because Prisma would be completely confused by the serverless network.

### Q3 — YAGNI
**Code reference:** `lib/auth.ts` lines 7-45 (Providers array)
**My Answer:** YAGNI stands for "You Aren't Gonna Need It." Adding things like social logins or multi-factor auth right now would break this rule because we don't actually need them for this MVP. I just focused on getting the email and password working perfectly. Later on, if we actually need Google login, I can easily just add it to the NextAuth `providers` list without breaking anything else.
**What goes wrong if ignored:** If I tried to build all those extra features right now, I would have wasted days writing code that nobody asked for. It would have delayed the launch and just filled up the codebase with extra stuff that could cause confusing bugs later on.

### Q4 — Kerckhoffs's Principle
**Code reference:** `app/api/register/route.ts` line 36 (`bcrypt.hash(password, 12)`)
**My Answer:** A salt is just a random string added to a password before we hash it. That way, if two users have the password "password123", they won't have the same hash in the database. Kerckhoffs's Principle basically says you shouldn't rely on keeping your algorithm a secret to stay safe.
**What goes wrong if ignored:** If I just used a fast algorithm like SHA-256 without a salt, a hacker could steal the database and use a "Rainbow Table" to crack everyone's passwords almost instantly. We use bcrypt because it's intentionally slow, which makes brute-forcing impossible.

### Q5 — Postel's Law + Security by Design
**Code reference:** `app/api/forgot-password/route.ts` lines 29-31
**My Answer:** When you try to reset a password, my code says "If an account exists, an email was sent" even if the email doesn't actually exist in the database. This is a Security by Design trick to stop "User Enumeration."
**What goes wrong if ignored:** If the API actually told you "Email not found," hackers could write a script to check millions of emails. They would instantly know exactly who has an account on SecureGate, which is a huge privacy breach.

### Q6 — The Boy Scout Rule
**Code reference:** `components/ui/Input.module.css` lines 44-49
**My Answer:** While I was adding the grey background color for filled inputs, I noticed the spacing between the inputs and the error messages looked a bit off. Even though it wasn't part of my main task, I applied the Boy Scout Rule and fixed the margin so everything looked neat and tight.
**What goes wrong if ignored:** If I ignored those little things, the app would still work, but it would look unpolished. Over time, those tiny messy details add up and make the whole platform feel cheap to users.

### Q7 — Gall's Law
**Code reference:** The gradual evolution of `lib/auth.ts` and `app/api/register/route.ts`
**My Answer:** Gall's Law says you have to start simple before building something complex. We didn't build SecureGate all at once. We started with a basic UI, then added the database, then NextAuth, then Resend for emails, and finally the rate limiter. We tested each step before moving on.
**What goes wrong if ignored:** If we tried to build the UI, database, emails, and security all at the exact same time, we would have run into a huge wall of errors. We wouldn't even know if a bug was coming from Vercel, Prisma, or just a simple typo.

### Q8 — Law of Leaky Abstractions (ORMs)
**Code reference:** `prisma/schema.prisma` lines 10-18 (`@updatedAt`)
**My Answer:** In our Prisma schema, we use `@updatedAt`. It looks like the database is magically updating the timestamp for us. But actually, Prisma is doing it behind the scenes in our Node.js code before it even sends the data to Postgres.
**What goes wrong if ignored:** If someone else tries to connect to this exact same database using Python instead of our Prisma setup, the `updatedAt` field won't automatically update when they change a user. The abstraction "leaks" because the database itself doesn't actually know about that rule.

### Q9 — Zawinski's Law
**Code reference:** `lib/rate-limit.ts` lines 3-21
**My Answer:** Zawinski's Law warns that apps tend to keep growing until they get bloated. I kept my rate limiter super simple and just focused on stopping people from brute-forcing the login routes. I didn't try to build a massive global tracking system.
**What goes wrong if ignored:** If I tried to make the rate limiter track every single thing a user does, it would have bloated the app, slowed down the website, and probably broken on Vercel's serverless edge network.

### Q10 — The Principle of Least Surprise
**Code reference:** `components/forms/LoginForm.tsx` lines 47-51
**My Answer:** When someone types the wrong password, the form just says "Invalid email or password." I used this exact wording because it's what users are used to seeing on every other website. It doesn't surprise them, and it keeps things secure.
**What goes wrong if ignored:** If I showed a crazy technical error, users would get scared. And if I specifically said "Password incorrect," I'd be helping hackers figure out which emails are real. "Invalid email or password" is the perfect balance.

### Q11 — Murphy's Law + Defensive Programming
**Code reference:** `lib/auth.ts` (NextAuth JWT strategy)
**My Answer:** NextAuth handles our sessions using encrypted cookies. If a user tries to mess with their cookies in the browser or deletes them, the app defensively catches it, fails the validation, and just kicks them back to the login page.
**What goes wrong if ignored:** If we just used a basic browser variable like `isLoggedIn = true`, a malicious user could just change that variable themselves and bypass all our security to get into the dashboard.

### Q12 — Kerckhoffs's Principle + Technical Debt
**Code reference:** `.env.local` (`NEXTAUTH_SECRET`)
**My Answer:** If I accidentally pushed my `NEXTAUTH_SECRET` to GitHub, anyone could use it to fake a login session and access any account. To fix it, I'd have to quickly generate a brand new secret, update it in Vercel, and redeploy. That would instantly log everyone out.
**What goes wrong if ignored:** If I didn't fix it, hackers would have a permanent backdoor into the app, and they could just log in as whoever they want, which would be a massive data breach.

### Q13 — Conway's Law
**Code reference:** The strict architectural separation of `/components`, `/lib`, and `/app/api`
**My Answer:** Conway's Law says that how a team talks shapes how they build their system. Since I built both the frontend and backend myself, my folder structure matches how I think: UI stuff goes in `/components`, reusable logic goes in `/lib`, and backend routes go in `/app/api`.
**What goes wrong if ignored:** If I just threw all the database queries, email sending, and UI code into one giant React file, it would be impossible to read, a nightmare to fix, and really hard to pass on to another developer later.

### Q14 — Technical Debt
**Code reference:** `lib/rate-limit.ts` (In-memory Map)
**My Answer:** Right now, I'm using a simple JavaScript `Map` for rate limiting. It works perfectly on my local computer, but it becomes technical debt on Vercel. Because Vercel uses different serverless functions across the world, they don't share memory.
**What goes wrong if ignored:** If an attacker really wanted to, they could bypass my rate limit just by sending requests from different locations, because Vercel wouldn't be able to track the IP address across all its different servers.

### Q15 — Synthesis Question
**Code reference:** Entire architectural foundation
**My Answer:** If we added Flutterwave payments, **Murphy's Law** is the biggest deal. We have to assume the network will fail right when someone pays. We'd need to use webhooks to make absolutely sure nobody gets charged twice. For **YAGNI**, we shouldn't build complex subscription systems if they just want simple one-time payments. And for **Security by Design**, we definitely shouldn't save credit card numbers in our own database—we should let Flutterwave handle that.
**What goes wrong if ignored:** If we ignored these laws with money involved, we could double-charge customers, leak their financial info, and get into serious legal trouble.

---

## Part 4 — One Thing I Would Refactor
The main technical debt right now is my simple rate limiter in `lib/rate-limit.ts`. It's great for local testing, but because Vercel uses serverless functions that don't share memory, it won't work perfectly in production. I'd want to refactor it to use Upstash Redis so it tracks IPs globally.

**Refactored Version:**
```typescript
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function rateLimit(identifier: string, limit = 5, windowMs = 600000) {
  const currentCount = await redis.incr(identifier);
  if (currentCount === 1) {
    await redis.expire(identifier, windowMs / 1000);
  }
  return { success: currentCount <= limit };
}
```

## Part 5 — How This Changes How I Build
This project really changed how I think. Before, I mostly just cared about making the UI look pretty and working if the user clicks everything perfectly (the "Happy Path"). Now, I realize that real engineering is about handling what happens when things break. Between using Zod to validate messy inputs, hiding error messages so hackers can't scrape our emails, and figuring out connection pooling for Vercel, I've learned that you always have to assume the users, the network, and the servers are going to fail or act maliciously.
