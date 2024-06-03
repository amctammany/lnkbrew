import { Body } from "@/components/Nav/Body";
import NavLink from "@/components/Nav/NavLink";
import { SubNav } from "@/components/Nav/SubNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LNK Profiles",
  description: "Profile Pages",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SubNav body={children}>
      <NavLink variant="subnav" href="/profiles/water">
        Water
      </NavLink>
      <NavLink variant="subnav" href="/profiles/mash">
        Mash
      </NavLink>
      <NavLink variant="subnav" href="/profiles/equipment">
        Equipment
      </NavLink>
    </SubNav>
  );
}
