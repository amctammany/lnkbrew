"use client";
import { updateRecipe } from "@/app/recipes/actions";
import { IconButton } from "@/components/Button";
import { Autocomplete, Form, TextField } from "@/components/Form";
import { EditIcon } from "@/components/Icon/EditIcon";
import { EquipmentProfileIcon } from "@/components/Icon/EquipmentProfileIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { Section } from "@/components/Section";
import { ExtendedRecipe } from "@/types/Recipe";
import { Style } from "@prisma/client";
import { useForm } from "react-hook-form";

export const StyleFormContainer = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: any;
}) => {
  return <Form action={action}>{children}</Form>;
};
export type StyleFormProps = {
  recipe?: ExtendedRecipe | null;
  styles: any;
};
export const StyleForm = ({ recipe, styles }: StyleFormProps) => {
  const { control, register, trigger } = useForm<ExtendedRecipe>({
    defaultValues: recipe as ExtendedRecipe,
  });

  return (
    <Section
      Icon={EditIcon}
      header="Style"
      actions={
        <IconButton type="submit" Icon={SaveIcon}>
          Save
        </IconButton>
      }
    >
      <div>
        Styles!
        <input type="hidden" {...register("id")} />
        <input type="hidden" {...register("name")} />
        <Autocomplete
          {...register("styleId")}
          className="w-full"
          options={styles}
          value={recipe?.styleId ?? ""}
        />
        <IconButton type="submit" Icon={SaveIcon}>
          Save
        </IconButton>
      </div>
    </Section>
  );
};
export default StyleForm;
