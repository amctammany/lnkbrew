import { prisma } from "@/lib/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserPreferences } from "@prisma/client";
import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
//import { NextResponse } from "next/server";
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      UserPreferences: UserPreferences;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}
export const AuthOptions: NextAuthConfig = {
  secret: "secret",
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  //callbacks: {},
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token, user }) {
      //session.preferences = ((token.user || {}) as any).UserPreferences as any;

      session.user = token.user as any;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      const currentUser = await prisma.user.findFirst({
        where: {
          id: token.id as string,
        },
        include: { UserPreferences: true },
      });
      if (currentUser) {
        token.user = currentUser;
      }
      return token;
    },
  },
};
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth(AuthOptions);
