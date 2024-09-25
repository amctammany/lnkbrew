import { DashboardIcon } from "@/components/Icon/DashboardIcon";
import { LogoutIcon } from "@/components/Icon/LogoutIcon";
import { ProfileIcon } from "@/components/Icon/ProfileIcon";
import { SettingsIcon } from "@/components/Icon/SettingsIcon";
import { Label } from "@/components/Label";
import { SubNav, NavLink } from "@/components/Nav";
import { SideNav } from "@/components/Nav/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SideNav body={children}>
      <NavLink
        variant="sidenav"
        href="/admin/dash/settings/units"
        className="flex-grow"
      >
        <Label text="Units">
          <DashboardIcon />
        </Label>
      </NavLink>
      <NavLink
        variant="sidenav"
        href="/admin/dash/settings/defaults"
        className="flex-grow"
      >
        <Label text="Defaults">
          <ProfileIcon />
        </Label>
      </NavLink>
    </SideNav>
  );
}
