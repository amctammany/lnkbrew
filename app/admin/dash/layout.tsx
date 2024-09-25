import { DashboardIcon } from "@/components/Icon/DashboardIcon";
import { LogoutIcon } from "@/components/Icon/LogoutIcon";
import { ProfileIcon } from "@/components/Icon/ProfileIcon";
import { SettingsIcon } from "@/components/Icon/SettingsIcon";
import { Label } from "@/components/Label";
import Body from "@/components/Nav/Body";
import NavLink from "@/components/Nav/NavLink";
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
    <SubNav body={children} className="h-full">
      <NavLink variant="subnav" href="/admin/dash/home" className="flex-grow">
        <Label text="Dashboard">
          <DashboardIcon />
        </Label>
      </NavLink>
      <NavLink
        variant="subnav"
        href="/admin/dash/profile"
        className="flex-grow"
      >
        <Label text="Profile">
          <ProfileIcon />
        </Label>
      </NavLink>
      <NavLink
        variant="subnav"
        href="/admin/dash/settings"
        className="flex-grow"
      >
        <Label text="Settings">
          <SettingsIcon />
        </Label>
      </NavLink>
      <NavLink variant="danger" href="/api/auth/signout" className="flex-grow">
        <Label text="Logout">
          <LogoutIcon />
        </Label>
      </NavLink>
    </SubNav>
  );
}
