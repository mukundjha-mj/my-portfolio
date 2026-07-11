import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

/**
 * Auth.js (NextAuth v5). Providers auto-read credentials from env:
 *   AUTH_GITHUB_ID / AUTH_GITHUB_SECRET
 *   AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET
 * plus AUTH_SECRET. See .env.example.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
  trustHost: true,
  callbacks: {
    session({ session, user }) {
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
});
