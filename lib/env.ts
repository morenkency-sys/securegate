// Environment variable access — validated at runtime, not at build time.
// Never access these server-side env vars from client components.

export const env = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET as string,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL as string,
  RESEND_API_KEY: process.env.RESEND_API_KEY as string,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL as string,
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS || "12", 10),
} as const;

// Runtime guard — called from API routes, not at import time.
export function validateEnv() {
  const required = [
    "DATABASE_URL",
    "NEXTAUTH_SECRET",
    "NEXTAUTH_URL",
    "RESEND_API_KEY",
    "RESEND_FROM_EMAIL",
  ] as const;

  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}
