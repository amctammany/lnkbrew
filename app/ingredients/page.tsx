import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import Link from "next/link";
//import { AdminPage } from "./AdminPage";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

//import { auth } from "@/app/auth";
type BoxProps = { href: string; children?: React.ReactNode };
const Box = ({ href, children }: BoxProps) => {
  return (
    <Link
      className="text-center text-2xl bg-slate-500 hover:bg-slate-200 p-8 border border-black"
      href={href}
    >
      {children}
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
      <Box href="/ingredients/hops">Hops</Box>
      <Box href="/ingredients/fermentables">Fermentables</Box>
      <Box href="/ingredients/yeasts">Yeasts</Box>
      <Box href="/ingredients/other">Other</Box>
    </div>
  );
}
