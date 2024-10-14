"use client";
import { IconButton } from "@/components/Button";
import { AmountField, Autocomplete, Form, Select } from "@/components/Form";
import { DeleteIcon } from "@/components/Icon/DeleteIcon";
import { EditIcon } from "@/components/Icon/EditIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { ID } from "@/types/App";
import { ExtendedFermentableIngredient, ExtendedRecipe } from "@/types/Recipe";
import {
  Fermentable,
  FermentableIngredient,
  FermentableIngredientUsage,
} from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import RemoveFermentableIngredientButton from "./RemoveFermentableIngredientButton";
import { TypedAmountField } from "@/components/Form/TypedAmountField";
import { useActionForm } from "@/hooks/useActionForm";
import { PrefAmountField } from "@/components/Form/PrefAmountField";

type FermentableIngredientFooterProps = { id?: number; recipeId?: string };
const FermentableIngredientFooter = ({
  recipeId,
  id,
}: FermentableIngredientFooterProps) => {
  return (
    <Toolbar>
      <RemoveFermentableIngredientButton recipeId={recipeId} id={id} />
      <IconButton type="submit" Icon={SaveIcon}>
        Save
      </IconButton>
    </Toolbar>
  );
};
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
  action: any;
};
export const FermentableIngredientForm = ({
  //recipe,
  action,
  src,
  fermentables,
}: FermentableIngredientFormProps) => {
  const { state, register, reset, formAction } = useActionForm(action, src!);
  //const { control, register, reset } = useForm<FermentableIngredient>({
  //defaultValues: src,
  //});
  const options = fermentables.reduce((acc, profile) => {
    acc[profile.id] = `${profile.name}`;
    return acc;
  }, {} as Record<string, string>);
  const handleChange = (id?: ID) => {
    const { id: _id, ...ferm } = fermentables.find((p) => p.id === id) ?? {};
    reset({ ...ferm, fermentableId: _id });
  };

  return (
    <Form action={formAction}>
      <Section
        Icon={EditIcon}
        header="Fermentables"
        actions={
          <IconButton type="submit" Icon={SaveIcon}>
            Save
          </IconButton>
        }
        footer={
          <FermentableIngredientFooter recipeId={src?.recipeId} id={src?.id} />
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
              value={src?.fermentableId ?? ""}
            />
          </div>

          <div className="lg:col-span-3">
            <TypedAmountField
              label="Amount"
              amountType="fermentableMass"
              fieldProps={register("amount", { valueAsNumber: true })}
              unitProps={register("amountType")}
            />
          </div>
          <div className="lg:col-span-3">
            <Select
              {...register("usage")}
              options={FermentableIngredientUsage}
            />
          </div>
          <div className="lg:col-span-2">
            <PrefAmountField
              {...register("color", { valueAsNumber: true })}
              step={0.01}
              label="Color"
              type="color"
            />
          </div>
          <div className="lg:col-span-2">
            <PrefAmountField
              {...register("potential", { valueAsNumber: true })}
              step={0.01}
              label="Potential"
              type="potential"
            />
          </div>
        </div>
      </Section>
    </Form>
  );
};
export default FermentableIngredientForm;
/**
 *        <div className="lg:col-span-2">
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
                //amountUnit="LbOz"
              />
            )}
          />
        </div>
 */
