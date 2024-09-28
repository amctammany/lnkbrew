import { EquipmentProfileIcon } from "@/components/Icon/EquipmentProfileIcon";
import { MashProfileIcon } from "@/components/Icon/MashProfileIcon";
import { WaterProfileIcon } from "@/components/Icon/WaterProfileIcon";
import { Label } from "@/components/Label";
import { Body } from "@/components/Nav/Body";
import { NavLink, NavLinkProps } from "@/components/Nav/NavLink";
import { SideNav } from "@/components/Nav/SideNav";
import SideNavLink from "@/components/Nav/SideNavLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LNK Profiles",
  description: "Profile Pages",
};
type ProfileLinkProps = NavLinkProps & {
  href: string;
  Icon: any;
  children: React.ReactNode;
};
const ProfileLink = ({ href, Icon, children }: ProfileLinkProps) => {
  return (
    <SideNavLink href={href} className="flex-grow" label={children}>
      <Icon className="m-0" />
    </SideNavLink>
  );
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SideNav body={children} title="Profiles">
      <ProfileLink
        Icon={WaterProfileIcon}
        variant="sidenav"
        href="/profiles/water"
      >
        Water
      </ProfileLink>
      <ProfileLink
        Icon={MashProfileIcon}
        variant="sidenav"
        href="/profiles/mash"
      >
        Mash
      </ProfileLink>
      <ProfileLink
        Icon={EquipmentProfileIcon}
        variant="sidenav"
        href="/profiles/equipment"
      >
        Equipment
      </ProfileLink>
    </SideNav>
  );
}
