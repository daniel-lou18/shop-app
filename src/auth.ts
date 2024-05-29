import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/schemas";
import { getUserByEmail } from "./db/queries/user";
import bcrypt from "bcrypt";

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
  // callbacks: {
  //   async session({ session, user }: any) {
  //     if (session && user) {
  //       session.user.id = user.id;
  //     }
  //     return session;
  //   },
  // },
});
