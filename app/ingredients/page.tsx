import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import Link from "next/link";
import { HopIcon } from "@/components/Icon/HopIcon";
import { IconProps } from "@/components/Icon/Icon";
//import { AdminPage } from "./AdminPage";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

//import { auth } from "@/app/auth";
type BoxProps = {
  href: string;
  Icon: React.FC<IconProps>;
  children?: React.ReactNode;
};
const Box = ({ href, children, Icon }: BoxProps) => {
  return (
    <Link
      className="text-center text-2xl bg-slate-500 hover:bg-slate-200 p-8 border border-black flex"
      href={href}
    >
      <Icon size="xl" />
      <div className="flex-grow hidden sm:grid">
        <span className="m-auto text-lg md:text-2xl lg:text-4xl">
          {children}
        </span>
      </div>
    </Link>
  );
};
export default async function Page() {
  const session = await auth();

  if (!session) return redirect("/");
  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
    include: {
      //ingredients: { select: { name: true, id: true, styleIdentifer: true } },
    },
  });
  return (
    <div className="grid w-full h-full grid-cols-2 gap-10 p-10">
      <Box Icon={HopIcon} href="/ingredients/hops">
        Hops
      </Box>
      <Box Icon={HopIcon} href="/ingredients/fermentables">
        Fermentables
      </Box>
      <Box Icon={HopIcon} href="/ingredients/yeasts">
        Yeasts
      </Box>
      <Box Icon={HopIcon} href="/ingredients/other">
        Other
      </Box>
    </div>
  );
}
