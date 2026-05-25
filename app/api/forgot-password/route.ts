import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";
import { rateLimit } from "@/lib/rate-limit";
import { forgotPasswordSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const { success } = rateLimit(`forgot_${ip}`, 3, 15 * 60 * 1000); // 3 per 15 min
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { email } = parsed.data;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "If an account exists, a password reset email has been sent." }, { status: 200 });
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(email, passwordResetToken.token);

    return NextResponse.json({ message: "If an account exists, a password reset email has been sent." }, { status: 200 });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
