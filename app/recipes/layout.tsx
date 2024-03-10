import Body from "@/components/Nav/Body";
import NavLink from "@/components/Nav/NavLink";
import { SubNav } from "@/components/Nav/SubNav";
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
    <>
      <SubNav title="Recipes">
        <NavLink variant="subnav" href="/recipes/library">
          Library
        </NavLink>
      </SubNav>

      <Body>{children}</Body>
    </>
  );
}
