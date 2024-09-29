import { UnitTypes } from "@/lib/amountConversions";
import { prisma } from "@/lib/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UnitPreferences, UserPreferences } from "@prisma/client";
import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
//import { NextResponse } from "next/server";
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    preferences: Omit<UnitPreferences, "id"> & {
      percent: "%";
      percentage: "%";
    };
    user: {
      /** The user's postal address. */
      UserPreferences: UserPreferences;
      username: string;
      recipeCounter: number;
      batchCounter: number;
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
      session.preferences = ((token.user || {}) as any).UserPreferences
        ?.UnitPreferences as any;

      session.preferences.percent = "%";
      session.preferences.percentage = "%";
      session.user = token.user as any;
      session.user.username = (token.user as any).username;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      const currentUser = await prisma.user.findFirst({
        where: {
          id: token.id as string,
        },
        include: { UserPreferences: { include: { UnitPreferences: true } } },
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
