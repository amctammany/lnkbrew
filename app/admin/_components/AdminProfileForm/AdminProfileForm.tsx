"use client";
import { IconButton } from "@/components/Button";
import { Form, TextField } from "@/components/Form";
import { EquipmentProfileIcon } from "@/components/Icon/EquipmentProfileIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { Prop } from "@/components/Prop";
import { Section } from "@/components/Section";
import { User } from "@prisma/client";
import { VariantProps, cva } from "class-variance-authority";
import { useActionState } from "react";
import { useForm } from "react-hook-form";

const adminProfileFormStyles = cva([""], {
  variants: {
    variant: {
      default: [],
    },
  },
  defaultVariants: { variant: "default" },
});
type AdminProfileFormProps = { src?: User | null; action: any } & VariantProps<
  typeof adminProfileFormStyles
>;
export function AdminProfileForm({
  src,
  action,
  variant,
}: AdminProfileFormProps) {
  const { control, register, trigger } = useForm<any>({
    defaultValues: {
      ...src,
      id: src?.id,
      username: src?.username ?? src?.name?.split(" ").join("").toLowerCase(),
    },
  });
  //const [state, formAction] = useActionState<any, FormData>(action, null);
  //console.log(src, state);

  return (
    <div className={adminProfileFormStyles({ variant })}>
      <Form action={action}>
        <Section
          Icon={EquipmentProfileIcon}
          header={src?.name ?? "Admin Profile form"}
          actions={
            <IconButton type="submit" Icon={SaveIcon}>
              Save
            </IconButton>
          }
        >
          <div>
            <input type="hidden" {...register("id")} />
            <div className="col-span-3 md:col-span-6">
              <TextField {...register("name")} label="Name" />
            </div>
            <div className="col-span-3 md:col-span-6">
              <TextField type="email" {...register("email")} label="Email" />
            </div>

            <div className="col-span-3 md:col-span-6">
              <TextField {...register("username")} label="UserName" />
            </div>
          </div>
        </Section>
      </Form>
    </div>
  );
}

export default AdminProfileForm;
