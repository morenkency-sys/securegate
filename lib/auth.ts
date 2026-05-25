import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "./db";
import { rateLimit } from "./rate-limit";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const ip = req?.headers?.["x-forwarded-for"] || "127.0.0.1";
        const identifier = `${ip}-signin`;
        const { success } = rateLimit(identifier, 5, 10 * 60 * 1000); // 5 attempts per 10 mins

        if (!success) {
          throw new Error("Too many login attempts. Please try again in 10 minutes.");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          // Prevent credential enumeration by throwing a generic error
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.emailVerified = (user as any).emailVerified;
      } else if (token.email) {
        // Update token with latest DB info if needed
        const dbUser = await db.user.findUnique({ where: { email: token.email } });
        if (dbUser) {
          token.emailVerified = dbUser.emailVerified;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).emailVerified = token.emailVerified;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", // Error code passed in query string as ?error=
  },
};
