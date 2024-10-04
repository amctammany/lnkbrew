import { auth } from "@/app/auth";
import { IconButton, IconButtonLink } from "@/components/Button";
import { AddIcon } from "@/components/Icon/AddIcon";
import { DashboardIcon } from "@/components/Icon/DashboardIcon";
import { LogoutIcon } from "@/components/Icon/LogoutIcon";
//import { AppIcon } from "@/components/AppIcon";
import { StarIcon } from "@/components/Icon/StarIcon";
import { Label } from "@/components/Label";
import NavLink from "@/components/Nav/NavLink";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
//import Link from "next/link";
export type AdminNavProps = {};

const Text: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <span className="font-extrabold ">{children}</span>;
};
export async function AdminNav({}: AdminNavProps) {
  const session = await auth();
  const body = session ? (
    <>
      <IconButtonLink
        Icon={DashboardIcon}
        href="/admin/dash/home"
        //prefetch={false}
        className={"flex-grow flex text-center font-bold  "}
      >
        Admin
      </IconButtonLink>
    </>
  ) : (
    <div className="">
      <Link href="/admin/login" prefetch={false} className={"flex-grow"}>
        <Label text="Sign In" textClassName="hidden md:block">
          <AddIcon />
        </Label>
      </Link>
    </div>
  );
  return <>{body}</>;
  /**
  return (
    <div className="flex flex-shrink items-center flex-row font-medium p-2 md:p-0  md:space-x-8">
      <div className="md:hidden ">{body}</div>

      <div className="hidden w-full flex-grow md:flex lg:items-center lg:w-auto">
        <div className="flex flex-grow items-center flex-row font-medium p-2 md:p-0  md:space-x-8">
          {body}
        </div>
      </div>
    </div>
  );
   */
}

export default AdminNav;
