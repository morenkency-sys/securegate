// Simple in-memory rate limiter for demonstration purposes.
// In a real production environment with multiple server instances, use Redis (e.g., upstash-redis).
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

export function rateLimit(identifier: string, limit = 5, windowMs = 60 * 1000) {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || record.expiresAt < now) {
    rateLimitMap.set(identifier, { count: 1, expiresAt: now + windowMs });
    return { success: true };
  }

  if (record.count >= limit) {
    return { success: false };
  }

  record.count += 1;
  return { success: true };
}
