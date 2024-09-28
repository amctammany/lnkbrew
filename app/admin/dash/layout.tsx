import { DashboardIcon } from "@/components/Icon/DashboardIcon";
import { LogoutIcon } from "@/components/Icon/LogoutIcon";
import { ProfileIcon } from "@/components/Icon/ProfileIcon";
import { SettingsIcon } from "@/components/Icon/SettingsIcon";
import { Label } from "@/components/Label";
import { SideNav, SideNavLink } from "@/components/Nav";
import Body from "@/components/Nav/Body";
import NavLink from "@/components/Nav/NavLink";
import SideNavDropdown from "@/components/Nav/SideNavDropdown";
import { SubNav } from "@/components/Nav/SubNav";
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
  return (
    <SideNav body={children}>
      <SideNavLink
        href="/admin/dash/home"
        className="flex-grow"
        label="Dashboard"
      >
        <DashboardIcon />
      </SideNavLink>

      <SideNavLink
        href="/admin/dash/profile"
        className="flex-grow"
        label="Profile"
      >
        <ProfileIcon />
      </SideNavLink>
      <SideNavDropdown
        label="Settings"
        href="/admin/dash/settings"
        className="flex-grow"
        Icon={<SettingsIcon />}
      >
        <SideNavLink
          variant="dropdown"
          href="/admin/dash/settings/units"
          className="flex-grow"
          label="Units"
        >
          <DashboardIcon />
        </SideNavLink>

        <SideNavLink
          href="/admin/dash/settings/defaults"
          variant="dropdown"
          className="flex-grow"
          label="Defaults"
        >
          <ProfileIcon />
        </SideNavLink>
      </SideNavDropdown>
      <SideNavLink
        //variant="danger"
        href="/api/auth/signout"
        className="flex-grow"
        label="Logout"
      >
        <LogoutIcon />
      </SideNavLink>
    </SideNav>
  );
}
