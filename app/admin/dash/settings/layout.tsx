import { DashboardIcon } from "@/components/Icon/DashboardIcon";
import { LogoutIcon } from "@/components/Icon/LogoutIcon";
import { ProfileIcon } from "@/components/Icon/ProfileIcon";
import { SettingsIcon } from "@/components/Icon/SettingsIcon";
import { Label } from "@/components/Label";
import { SideNavLink } from "@/components/Nav";
import { SideNav } from "@/components/Nav/SideNav";
import SideNavDropdown from "@/components/Nav/SideNavDropdown";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SideNav body={children}>
      <SideNavLink href="/admin/dash/settings/units" className="flex-grow">
        <Label text="Units">
          <DashboardIcon />
        </Label>
      </SideNavLink>
      <SideNavLink href="/admin/dash/settings/defaults" className="flex-grow">
        <Label text="Defaults">
          <ProfileIcon />
        </Label>
      </SideNavLink>
      <SideNavDropdown label="Dropdown" className="flex-grow">
        <SideNavLink href="/admin/dash/settings/defaults" className="flex-grow">
          <Label text="Defaults">
            <ProfileIcon />
          </Label>
        </SideNavLink>
      </SideNavDropdown>
    </SideNav>
  );
}
