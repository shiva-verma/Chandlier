import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { DefaultSession } from "next-auth";
import { isMongoConfigured } from "@/lib/mongoose";
import {
  adminEmail,
  adminPassword,
  ensureAdminBootstrap,
  getPasswordHash,
  getUserByEmail,
  verifyPassword,
  type SafeUser,
} from "@/lib/users";

export type AppRole = "admin" | "super_admin" | "customer" | "trade_customer";

declare module "next-auth" {
  interface Session {
    user: {
      role?: AppRole;
    } & DefaultSession["user"];
  }

  interface User {
    role?: AppRole;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: AppRole;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "tejora-dev-secret",
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        let account: SafeUser | null = null;

        if (isMongoConfigured()) {
          await ensureAdminBootstrap();
          account = await getUserByEmail(email);
          if (!account) return null;
          const hash = await getPasswordHash(email);
          if (!hash || !(await verifyPassword(password, hash))) return null;
        } else {
          // No database configured: fall back to the environment admin account
          // so the dashboard stays usable before MongoDB is provisioned.
          if (email === adminEmail() && password === adminPassword()) {
            account = {
              id: "env-admin",
              name: "Studio Admin",
              email: adminEmail(),
              role: "admin",
              createdAt: new Date().toISOString(),
            };
          }
          if (!account) return null;
        }

        return {
          id: account.id,
          name: account.name,
          email: account.email,
          role: account.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as { role?: AppRole }).role;
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.role = token.role as AppRole | undefined;
      return session;
    },
  },
});
