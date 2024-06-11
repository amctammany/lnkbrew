import { Prop } from "@/components/Prop";
import { User } from "@prisma/client";
import { VariantProps, cva } from "class-variance-authority";

const dashboardStyles = cva([""], {
  variants: {
    variant: {
      default: [],
    },
  },
  defaultVariants: { variant: "default" },
});
type DashboardProps = { src?: User | null } & VariantProps<
  typeof dashboardStyles
>;
export function Dashboard({ src, variant }: DashboardProps) {
  return <div className={dashboardStyles({ variant })}>Dashboard</div>;
}

export default Dashboard;
