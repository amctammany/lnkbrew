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
  return <div className="">{children}</div>;
}
