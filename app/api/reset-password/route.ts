import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { rateLimit } from "@/lib/rate-limit";
import { resetPasswordSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const { success } = rateLimit(`reset_${ip}`, 5, 15 * 60 * 1000); // 5 per 15 min
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    const parsed = resetPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { token, password } = parsed.data;

    const existingToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    if (!existingToken) {
      return NextResponse.json({ error: "Token is invalid or has expired" }, { status: 400 });
    }

    if (new Date(existingToken.expires) < new Date()) {
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }

    const existingUser = await db.user.findUnique({
      where: { email: existingToken.email },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "Token is invalid or has expired" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.user.update({
      where: { id: existingUser.id },
      data: {
        password: hashedPassword,
      },
    });

    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
