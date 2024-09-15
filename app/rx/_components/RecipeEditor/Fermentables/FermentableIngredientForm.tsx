"use client";
import { IconButton } from "@/components/Button";
import { AmountField, Autocomplete, Form, ID, Select } from "@/components/Form";
import { EditIcon } from "@/components/Icon/EditIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { Section } from "@/components/Section";
import { ExtendedFermentableIngredient, ExtendedRecipe } from "@/types/Recipe";
import {
  Fermentable,
  FermentableIngredient,
  FermentableIngredientUsage,
} from "@prisma/client";
import { Controller, useForm } from "react-hook-form";

export const FermentableIngredientFormContainer = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action: any;
}) => {
  return <Form action={action}>{children}</Form>;
};
export type FermentableIngredientFormProps = {
  src?: ExtendedFermentableIngredient;
  //recipe?: ExtendedRecipe | null;
  fermentables: Fermentable[];
};
export const FermentableIngredientForm = ({
  //recipe,
  src,
  fermentables,
}: FermentableIngredientFormProps) => {
  const { control, register, reset } = useForm<FermentableIngredient>({
    defaultValues: src,
  });
  const options = fermentables.reduce(
    (acc, profile) => {
      acc[profile.id] = `${profile.name}`;
      return acc;
    },
    {} as Record<string, string>
  );
  const handleChange = (id?: ID) => {
    const { id: _id, ...ferm } = fermentables.find((p) => p.id === id) ?? {};
    reset({ ...ferm, fermentableId: _id });
  };

  return (
    <Section
      Icon={EditIcon}
      header="Fermentables"
      actions={
        <IconButton type="submit" Icon={SaveIcon}>
          Save
        </IconButton>
      }
    >
      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <input type="hidden" {...register("id")} />
        <input type="hidden" {...register("recipeId")} />
        <div className="col-span-2 md:col-span-3 lg:col-span-6">
          <Autocomplete
            {...register("fermentableId")}
            //isNumeric
            options={options}
            handleChange={handleChange}
            value={src?.fermentableId ?? undefined}
          />
        </div>
        <div className="lg:col-span-2">
          <Controller
            name="amount"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <AmountField
                {...field}
                value={field.value ?? 0}
                step={0.01}
                label="Amount"
                amountType="fermentableMass"
              />
            )}
          />
        </div>
        <div className="lg:col-span-2">
          <Select {...register("usage")} options={FermentableIngredientUsage} />
        </div>
        <div className="lg:col-span-2">
          <Controller
            name="color"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <AmountField
                {...field}
                value={field.value ?? 0}
                step={0.01}
                label="Color"
                amountType="color"
              />
            )}
          />
        </div>
        <div className="lg:col-span-2">
          <Controller
            name="potential"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <AmountField
                {...field}
                value={field.value ?? 0}
                step={0.01}
                label="Potential"
                amountType="potential"
              />
            )}
          />
        </div>
      </div>
    </Section>
  );
};
export default FermentableIngredientForm;
