import { Body } from "@/components/Nav/Body";
import NavLink from "@/components/Nav/NavLink";
import { SubNav } from "@/components/Nav/SubNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LNK Ingredients",
  description: "Ingredient Pages",
};

export default function IngredientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SubNav body={children}>
      <NavLink variant="subnav" href="/ingredients/hops">
        Hops
      </NavLink>
      <NavLink variant="subnav" href="/ingredients/fermentables">
        Fermentables
      </NavLink>
    </SubNav>
  );
}
