import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavLink from "@/components/Nav/NavLink";
import { Nav } from "@/components/Nav/Nav";
import UserProvider from "./UserProvider";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LNK",
  description: "LNK Brew Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav>
          <NavLink href="/recipes">Recipes</NavLink>
          <NavLink href="/ingredients">Ingredients</NavLink>
          <NavLink href="/styles">Styles</NavLink>
          <NavLink href="/profiles">Profiles</NavLink>
        </Nav>

        <main className="in-w-full items-center justify-between p-0 ">
          <SessionProvider>
            <UserProvider>{children}</UserProvider>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
