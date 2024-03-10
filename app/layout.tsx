import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RootNav } from "./RootNav";

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
        <RootNav />
        <main className="top-16 min-h-screen min-w-full left-2 right-2 items-center justify-between p-2 md:p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
