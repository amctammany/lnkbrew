import { auth } from "@/app/auth";
//import { AppIcon } from "@/components/AppIcon";
import { StarIcon } from "@/components/Icon/StarIcon";
import NavLink from "@/components/Nav/NavLink";
//import Link from "next/link";
export type AdminNavProps = {};

const Text: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <span className="font-extrabold ">{children}</span>;
};
export async function AdminNav({}: AdminNavProps) {
  const session = await auth();
  const body = session ? (
    <>
      <NavLink className="font-extrabold" href="/admin/dash/home">
        Admin
      </NavLink>
    </>
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
