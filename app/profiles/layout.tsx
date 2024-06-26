import { EquipmentProfileIcon } from "@/components/Icon/EquipmentProfileIcon";
import { MashProfileIcon } from "@/components/Icon/MashProfileIcon";
import { WaterProfileIcon } from "@/components/Icon/WaterProfileIcon";
import { Body } from "@/components/Nav/Body";
import { NavLink, NavLinkProps } from "@/components/Nav/NavLink";
import { SubNav } from "@/components/Nav/SubNav";
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
    <NavLink variant="subnav" href={href} className="flex-grow">
      <div className=" flex mx-auto">
        <Icon className="m-0" />
        <span className="hidden sm:block ml-3">{children}</span>
      </div>
    </NavLink>
  );
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SubNav body={children}>
      <ProfileLink
        Icon={WaterProfileIcon}
        variant="subnav"
        href="/profiles/water"
      >
        Water
      </ProfileLink>
      <ProfileLink
        Icon={MashProfileIcon}
        variant="subnav"
        href="/profiles/mash"
      >
        Mash
      </ProfileLink>
      <ProfileLink
        Icon={EquipmentProfileIcon}
        variant="subnav"
        href="/profiles/equipment"
      >
        Equipment
      </ProfileLink>
    </SubNav>
  );
}
