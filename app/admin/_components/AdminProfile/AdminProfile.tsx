import { IconButtonLink } from "@/components/Button";
import { EditIcon } from "@/components/Icon/EditIcon";
import { Prop } from "@/components/Prop";
import { Section } from "@/components/Section";
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
    <Section
      header="Profile"
      actions={
        <>
          <IconButtonLink Icon={EditIcon} href="/admin/dash/profile/edit">
            Edit
          </IconButtonLink>
        </>
      }
    >
      <div className={adminProfileStyles({ variant })}>
        <h4>Profile</h4>
        <Prop label="Name" value={src?.name} />
        <Prop label="Email" value={src?.email} />
        <Prop label="Username" value={src?.username} />
      </div>
    </Section>
  );
}

export default AdminProfile;
