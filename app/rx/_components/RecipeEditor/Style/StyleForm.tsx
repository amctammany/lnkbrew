"use client";
import { updateRecipe } from "@/app/recipes/actions";
import { IconButton } from "@/components/Button";
import { Autocomplete, Form, TextField } from "@/components/Form";
import { EditIcon } from "@/components/Icon/EditIcon";
import { EquipmentProfileIcon } from "@/components/Icon/EquipmentProfileIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { Section } from "@/components/Section";
import { State } from "@/lib/validateSchema";
import { ExtendedRecipe } from "@/types/Recipe";
import { Style } from "@prisma/client";
import { useActionState, useEffect } from "react";
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
  action: any;
};
export const StyleForm = ({ recipe, action, styles }: StyleFormProps) => {
  const [state, formAction] = useActionState<State<ExtendedRecipe>>(action, {
    success: true,
    errors: undefined,
    data: recipe!,
  });

  const { setError, register, trigger } = useForm<ExtendedRecipe>({
    values: state.data,
  });
  useEffect(() => {
    //reset(state.data);
    if (!state.success) {
      Object.entries(state?.errors ?? []).map(([n, err]) => {
        setError(err.path as any, err);
      });
    }
  }, [state, setError]);

  return (
    <Form action={formAction}>
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
            isNumeric
            options={styles}
            value={recipe?.styleId ?? ""}
          />
          <IconButton type="submit" Icon={SaveIcon}>
            Save
          </IconButton>
        </div>
      </Section>
    </Form>
  );
};
export default StyleForm;
