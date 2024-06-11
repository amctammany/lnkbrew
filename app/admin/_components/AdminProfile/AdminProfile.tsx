import { Prop } from "@/components/Prop";
import { User } from "@prisma/client";
import { VariantProps, cva } from "class-variance-authority";

const adminProfileStyles = cva([""], {
  variants: {
    variant: {
      default: [],
    },
  },
  defaultVariants: { variant: "default" },
});
type AdminProfileProps = { src?: User | null } & VariantProps<
  typeof adminProfileStyles
>;
export function AdminProfile({ src, variant }: AdminProfileProps) {
  return (
    <div className={adminProfileStyles({ variant })}>
      <h4>Profile</h4>
      <Prop label="Name" value={src?.name} />
      <Prop label="Email" value={src?.email} />
      <Prop label="Username" value={src?.username} />
    </div>
  );
}

export default AdminProfile;
