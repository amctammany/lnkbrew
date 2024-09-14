import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import Link from "next/link";
import { HopIcon } from "@/components/Icon/HopIcon";
import { IconProps } from "@/components/Icon/Icon";
import { GrainIcon } from "@/components/Icon/GrainIcon";
import { YeastIcon } from "@/components/Icon/YeastIcon";
import { Box } from "@/components/Box";
//import { AdminPage } from "./AdminPage";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

//import { auth } from "@/app/auth";
export default async function Page() {
  const session = await auth();

  if (!session) return redirect("/");
  const user = await prisma.user.findFirst({
    where: { username: session?.user?.username },
    include: {
      //ingredients: { select: { name: true, id: true, styleIdentifer: true } },
    },
  });
  return (
    <div className="grid w-full h-full grid-cols-2 gap-10 p-10">
      <Box Icon={HopIcon} href="/ingredients/hops">
        Hops
      </Box>
      <Box Icon={GrainIcon} href="/ingredients/fermentables">
        Fermentables
      </Box>
      <Box Icon={YeastIcon} href="/ingredients/yeasts">
        Yeasts
      </Box>
      <Box Icon={HopIcon} href="/ingredients/other">
        Other
      </Box>
    </div>
  );
}
