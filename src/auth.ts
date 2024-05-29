import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/schemas";
import { getUserByEmail, getUserById } from "./db/queries/user";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & { role: UserRole };

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const result = signInSchema.safeParse(credentials);
        if (result.success) {
          const { email, password } = result.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const passwordIsValid = await bcrypt.compare(password, user.password);
          if (passwordIsValid) return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  // callbacks: {
  //   async session({ session, user }: any) {
  //     if (session && user) {
  //       session.user.id = user.id;
  //     }
  //     return session;
  //   },
  // },
});
