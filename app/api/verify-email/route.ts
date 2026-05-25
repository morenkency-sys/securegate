import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const verifySchema = z.object({
  token: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const { success } = rateLimit(`verify_${ip}`, 10, 15 * 60 * 1000); // 10 per 15 min
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const { token } = parsed.data;

    const existingToken = await db.verificationToken.findUnique({
      where: { token },
    });

    if (!existingToken) {
      return NextResponse.json({ error: "Token is invalid or has expired" }, { status: 400 });
    }

    if (new Date(existingToken.expires) < new Date()) {
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }

    const existingUser = await db.user.findUnique({
      where: { email: existingToken.identifier },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "Email does not exist" }, { status: 400 });
    }

    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.identifier,
      },
    });

    await db.verificationToken.delete({
      where: { identifier_token: { identifier: existingToken.identifier, token: existingToken.token } },
    });

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
