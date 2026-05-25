import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { signUpSchema } from "@/lib/validations";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const { success } = rateLimit(`register_${ip}`, 5, 15 * 60 * 1000); // 5 per 15 min
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    const parsed = signUpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { name, email, password } = parsed.data;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Prevent credential enumeration by returning success or generic message
      // But typically for registration, returning a generic error is standard.
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(email, verificationToken.token);

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
