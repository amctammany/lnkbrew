import { User } from "@prisma/client";

type AdminPageProps = { src?: User | null };
export function AdminPage({ src }: AdminPageProps) {
  return <div className="">{JSON.stringify(src)}</div>;
}

export default AdminPage;
