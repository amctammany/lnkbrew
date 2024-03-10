import Body from "@/components/Nav/Body";
import NavLink from "@/components/Nav/NavLink";
import { SubNav } from "@/components/Nav/SubNav";
import type { Metadata } from "next";
//import { Inter } from "next/font/google";
//import "./globals.css";
//import { RootNav } from "./RootNav";

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LNK Admin",
  description: "Admin Pages",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SubNav>
        <NavLink variant="subnav" href="/admin/settings">
          Settings
        </NavLink>
      </SubNav>
      <Body>{children}</Body>
    </>
  );
}
