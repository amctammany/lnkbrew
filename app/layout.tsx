import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNavLink from "@/components/Nav/SideNavLink";
import { SideNav } from "@/components/Nav/SideNav";
import UserProvider from "./UserProvider";
import { SessionProvider } from "next-auth/react";
import { Nav, NavLink } from "@/components/Nav";

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
        </Nav>
        <SideNav
          title="LNK"
          body={
            <main className="in-w-full items-center justify-between p-0 ">
              <SessionProvider>
                <UserProvider>{children}</UserProvider>
              </SessionProvider>
            </main>
          }
        >
          <SideNavLink href="/recipes">Recipes</SideNavLink>
          <SideNavLink href="/ingredients">Ingredients</SideNavLink>
          <SideNavLink href="/styles">Styles</SideNavLink>
          <SideNavLink href="/profiles">Profiles</SideNavLink>
        </SideNav>
      </body>
    </html>
  );
}
