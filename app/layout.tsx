import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNavLink from "@/components/Nav/SideNavLink";
import { SideNav } from "@/components/Nav/SideNav";
import UserProvider from "./UserProvider";
import { SessionProvider } from "next-auth/react";
import { Nav, NavLink } from "@/components/Nav";
import SideNavDropdown from "@/components/Nav/SideNavDropdown";
import { RecipeIcon } from "@/components/Icon/RecipeIcon";
import { SettingsIcon } from "@/components/Icon/SettingsIcon";
import { GrainIcon } from "@/components/Icon/GrainIcon";
import { HopIcon } from "@/components/Icon/HopIcon";
import { YeastIcon } from "@/components/Icon/YeastIcon";
import { EquipmentProfileIcon } from "@/components/Icon/EquipmentProfileIcon";
import { MashProfileIcon } from "@/components/Icon/MashProfileIcon";
import { WaterProfileIcon } from "@/components/Icon/WaterProfileIcon";
import { ProfileIcon } from "@/components/Icon/ProfileIcon";
import { DashboardIcon } from "@/components/Icon/DashboardIcon";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LNK",
  description: "LNK Brew Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav>
          <NavLink href="/recipes">Recipes</NavLink>
        </Nav>
        <SideNav
          title="LNK"
          body={
            <main className="in-w-full items-center justify-between p-0 ">
              <SessionProvider>
                <UserProvider>{children}</UserProvider>
              </SessionProvider>
            </main>
          }
        >
          <SideNavDropdown
            Icon={<RecipeIcon />}
            href="/recipes"
            label="Recipes"
          >
            <SideNavLink href="/recipes/library" label="Library">
              <SettingsIcon />
            </SideNavLink>
          </SideNavDropdown>
          <SideNavDropdown
            Icon={<SettingsIcon />}
            href="/ingredients"
            label="Ingredients"
          >
            <SideNavLink href="/ingredients/hops" label="Hops">
              <HopIcon />
            </SideNavLink>
            <SideNavLink href="/ingredients/fermentables" label="Fermentables">
              <GrainIcon />
            </SideNavLink>
            <SideNavLink href="/ingredients/yeasts" label="Yeasts">
              <YeastIcon />
            </SideNavLink>
          </SideNavDropdown>
          <SideNavLink href="/styles" label="Styles">
            <RecipeIcon />
          </SideNavLink>
          <SideNavDropdown
            Icon={<ProfileIcon />}
            href="/profiles"
            label="Profiles"
          >
            <SideNavLink href="/profiles/equipment" label="Equipment">
              <EquipmentProfileIcon />
            </SideNavLink>
            <SideNavLink href="/profiles/mash" label="Mash">
              <MashProfileIcon />
            </SideNavLink>
            <SideNavLink href="/profiles/water" label="Water">
              <WaterProfileIcon />
            </SideNavLink>
          </SideNavDropdown>
          <SideNavDropdown Icon={<SettingsIcon />} href="/admin" label="Admin">
            <SideNavLink href="/admin/dash/home" label="Dashboard">
              <DashboardIcon />
            </SideNavLink>
            <SideNavDropdown
              Icon={<SettingsIcon />}
              href="/admin/dash/settings"
              label="Settings"
            >
              <SideNavLink href="/admin/dash/settings/units" label="Units">
                <SettingsIcon />
              </SideNavLink>
              <SideNavLink
                href="/admin/dash/settings/defaults"
                label="Defaults"
              >
                <SettingsIcon />
              </SideNavLink>
            </SideNavDropdown>
          </SideNavDropdown>
        </SideNav>
      </body>
    </html>
  );
}
