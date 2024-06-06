import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) return redirect("/admin/login");
  return redirect("/admin/dash");
}
