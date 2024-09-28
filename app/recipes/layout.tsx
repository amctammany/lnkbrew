import Body from "@/components/Nav/Body";
import NavLink from "@/components/Nav/NavLink";
import { SideNav } from "@/components/Nav/SideNav";
import SideNavLink from "@/components/Nav/SideNavLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LNK Recipes",
  description: "Recipe Pages",
};

export default function RecipeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SideNav body={children}>
      <SideNavLink href="/recipes/library" label="Library"></SideNavLink>
    </SideNav>
  );
}
