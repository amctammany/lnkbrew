"use client";
import { updateRecipe } from "@/app/recipes/actions";
import { IconButton } from "@/components/Button";
import { Form, TextField } from "@/components/Form";
import { EditIcon } from "@/components/Icon/EditIcon";
import { EquipmentProfileIcon } from "@/components/Icon/EquipmentProfileIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { Section } from "@/components/Section";
import { State } from "@/lib/validateSchema";
import { ExtendedRecipe } from "@/types/Recipe";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";

export const GeneralFormContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Form action={updateRecipe}>{children}</Form>;
};
export type GeneralFormProps = {
  recipe?: ExtendedRecipe | null;
  action: any;
};
export const GeneralForm = ({ action, recipe }: GeneralFormProps) => {
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
        header={recipe?.name ?? "New Recipe"}
        actions={
          <IconButton type="submit" Icon={SaveIcon}>
            Save
          </IconButton>
        }
      >
        <div className="grid gap-2 md:gap-4 grid-cols-3 md:grid-cols-6">
          <input type="hidden" {...register("id")} />
          <input type="hidden" {...register("owner.id")} />
          <input type="hidden" {...register("forkedFrom")} />
          <div className="col-span-3 md:col-span-6">
            <TextField {...register("name")} label="Name" />
          </div>
          <div className="col-span-3 md:col-span-6">
            <TextField {...register("description")} label="Description" />
          </div>
        </div>
      </Section>
    </Form>
  );
};
export default GeneralForm;
