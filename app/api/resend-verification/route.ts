import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { rateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const resendSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const { success } = rateLimit(`resend_${ip}`, 3, 15 * 60 * 1000); // 3 per 15 min
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    const parsed = resendSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { email } = parsed.data;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      // Generic message to prevent enumeration
      return NextResponse.json({ message: "If an account exists, a verification email has been sent." }, { status: 200 });
    }

    if (existingUser.emailVerified) {
      return NextResponse.json({ error: "Email already verified" }, { status: 400 });
    }

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(email, verificationToken.token);

    return NextResponse.json({ message: "If an account exists, a verification email has been sent." }, { status: 200 });
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
