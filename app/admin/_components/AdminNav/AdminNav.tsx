import { auth } from "@/app/auth";
//import { AppIcon } from "@/components/AppIcon";
import { StarIcon } from "@/components/Icon/StarIcon";
import NavLink from "@/components/Nav/NavLink";
//import Link from "next/link";
export type AdminNavProps = {};

const Text: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="font-extrabold ">{children}</div>;
};
export async function AdminNav({}: AdminNavProps) {
  const session = await auth();
  const body = session ? (
    <div>
      <NavLink
        className="flex font-extrabold py-2 px-4 mr-4"
        href="/admin/dash/home"
      >
        <Text>Admin</Text>
      </NavLink>
    </div>
  ) : (
    <div className="">
      <NavLink href="/admin/login">Sign In</NavLink>
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
