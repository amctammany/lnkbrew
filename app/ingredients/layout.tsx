import { GrainIcon } from "@/components/Icon/GrainIcon";
import { HopIcon } from "@/components/Icon/HopIcon";
import { YeastIcon } from "@/components/Icon/YeastIcon";
import { Body } from "@/components/Nav/Body";
import NavLink from "@/components/Nav/NavLink";
import { SubNav } from "@/components/Nav/SubNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LNK Ingredients",
  description: "Ingredient Pages",
};

type IngredientLinkProps = {
  href: string;
  Icon: any;
  children: React.ReactNode;
};
const IngredientLink = ({ href, Icon, children }: IngredientLinkProps) => {
  return (
    <NavLink variant="subnav" href={href} className="flex-grow">
      <div className=" flex mx-auto">
        <Icon className="m-0" />
        <span className="hidden sm:block ml-3">{children}</span>
      </div>
    </NavLink>
  );
};
export default function IngredientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SubNav body={children}>
      <IngredientLink href="/ingredients/hops" Icon={HopIcon}>
        Hops
      </IngredientLink>

      <IngredientLink href="/ingredients/fermentables" Icon={GrainIcon}>
        Fermentables
      </IngredientLink>
      <IngredientLink href="/ingredients/yeasts" Icon={YeastIcon}>
        Yeasts
      </IngredientLink>
    </SubNav>
  );
}
