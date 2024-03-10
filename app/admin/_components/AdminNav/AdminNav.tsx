import { auth } from "@/app/auth";
import Link from "next/link";
export type AdminNavProps = {};

export async function AdminNav({}: AdminNavProps) {
  const session = await auth();
  const body = session ? (
    <div>
      <Link className="flex-none font-extrabold py-2 px-4 mr-4" href="/admin">
        Admin
      </Link>
    </div>
  ) : (
    <div className="">
      <Link href="/api/auth/signin">Sign In</Link>
    </div>
  );
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
}

export default AdminNav;
