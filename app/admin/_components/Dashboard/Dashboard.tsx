import { User } from "@prisma/client";

type DashboardProps = { src?: User | null };
export function Dashboard({ src }: DashboardProps) {
  return <div className="">{JSON.stringify(src)}</div>;
}

export default Dashboard;
