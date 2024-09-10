import { updateRecipe } from "@/app/recipes/actions";
import { IconButton } from "@/components/Button";
import { Form, TextField } from "@/components/Form";
import { EquipmentProfileIcon } from "@/components/Icon/EquipmentProfileIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { Section } from "@/components/Section";
import { ExtendedRecipe } from "@/types/Recipe";
import { useForm } from "react-hook-form";

export type GeneralFormProps = {
  recipe?: ExtendedRecipe | null;
};
export const GeneralForm = ({ recipe }: GeneralFormProps) => {
  const { control, register, trigger } = useForm<ExtendedRecipe>({
    defaultValues: recipe as ExtendedRecipe,
  });

  return (
    <Form action={updateRecipe}>
      <Section
        Icon={EquipmentProfileIcon}
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
