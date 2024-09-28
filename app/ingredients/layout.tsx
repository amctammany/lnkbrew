import { GrainIcon } from "@/components/Icon/GrainIcon";
import { HopIcon } from "@/components/Icon/HopIcon";
import { YeastIcon } from "@/components/Icon/YeastIcon";
import { Label } from "@/components/Label";
import { SideNavLink } from "@/components/Nav";
import { Body } from "@/components/Nav/Body";
import NavLink from "@/components/Nav/NavLink";
import { SideNav } from "@/components/Nav/SideNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LNK Ingredients",
  description: "Ingredient Pages",
};

type IngredientLinkProps = {
  href: string;
  text: string;
  children: React.ReactNode;
};
const IngredientLink = ({ href, text, children }: IngredientLinkProps) => {
  return (
    <SideNavLink href={href} className="flex-grow" label={text}>
      {children}
    </SideNavLink>
  );
};
export default function IngredientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SideNav body={children}>
      <IngredientLink href="/ingredients/hops" text="Hops">
        <HopIcon />
      </IngredientLink>

      <IngredientLink href="/ingredients/fermentables" text="Fermentables">
        <GrainIcon />
      </IngredientLink>
      <IngredientLink href="/ingredients/yeasts" text="Yeasts">
        <YeastIcon />
      </IngredientLink>
    </SideNav>
  );
}
