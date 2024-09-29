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
  // specify the adapter : we are using Prism ORM
  adapter: PrismaAdapter(db),
  // specifiy the use of JWT explicitly
  session: { strategy: "jwt" },
  /* specify the Credentials provider, which is used to authenticate users with email and password
   * (as opposed to pre-configured OAuth providers like Google or GitHub)
   */
  providers: [
    Credentials({
      // object passed to signIn function inside server action is accessible through credentials
      async authorize(credentials) {
        const result = signInSchema.safeParse(credentials);
        if (result.success) {
          const { email, password } = result.data;
          // get user from database
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          // use bcrypt to compare user provided password with hashed password stored in database
          const passwordIsValid = await bcrypt.compare(password, user.password);
          if (passwordIsValid) return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    /* this callback is called whenever a session is checked
     * check if sub and role properties exist on token and if user object exists in session
     * if so, add id and role to the user object
     */
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    /* this callback is called whenever a token is created or updated:
     * check if the token has a subject field
     * if so, get the user with this id from the database
     * if the user exists, add the role field to the token
     */
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
});
