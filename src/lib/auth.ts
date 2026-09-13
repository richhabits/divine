import { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

/**
 * Timing-safe string equality comparison to prevent timing attacks.
 */
function safeCompare(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const adminUser = process.env.ADMIN_USERNAME || "admin";
        const adminPass = process.env.ADMIN_PASSWORD || "divine2026!";
        const djUser = process.env.DJ_USERNAME || "dj";
        const djPass = process.env.DJ_PASSWORD || "divine-dj-2026!";

        // Timing-safe authentication comparison
        if (
          safeCompare(credentials.username, adminUser) &&
          safeCompare(credentials.password, adminPass)
        ) {
          return { id: "1", name: "Admin User", role: "ADMIN" };
        }

        if (
          safeCompare(credentials.username, djUser) &&
          safeCompare(credentials.password, djPass)
        ) {
          return { id: "2", name: "DJ Fivestack", role: "DJ" };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "divine-local-dev-secret-2026-change-in-prod",
};
