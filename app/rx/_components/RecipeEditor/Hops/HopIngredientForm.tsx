"use client";
import { IconButton } from "@/components/Button";
import {
  AmountField,
  Autocomplete,
  Form,
  ID,
  Label,
  NumberField,
  Select,
} from "@/components/Form";
import { EditIcon } from "@/components/Icon/EditIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { Section } from "@/components/Section";
import { ExtendedRecipe } from "@/types/Recipe";
import {
  Hop,
  HopIngredient,
  HopIngredientUsage,
  HopUsage,
  TimeUnit,
} from "@prisma/client";
import { Controller, useForm } from "react-hook-form";

export const HopIngredientFormContainer = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action: any;
}) => {
  return <Form action={action}>{children}</Form>;
};
export type HopIngredientFormProps = {
  src?: HopIngredient;
  //recipe?: ExtendedRecipe | null;
  hops: Hop[];
};
export const HopIngredientForm = ({
  //recipe,
  src,
  hops,
}: HopIngredientFormProps) => {
  const { control, register, reset } = useForm<
    HopIngredient & { year?: number; beta?: number | null }
  >({
    defaultValues: src,
  });
  const options = hops.reduce(
    (acc, profile) => {
      acc[profile.id] = `${profile.name}`;
      return acc;
    },
    {} as Record<string, string>
  );
  const handleChange = (id?: ID) => {
    const {
      id: hopId,
      usage,
      alpha,
      beta,
      ...hop
    } = hops.find((p) => p.id === id) ?? {
      id: undefined,
    };
    if (hop)
      reset({
        alpha,
        hopId,
        beta,
      });
  };

  return (
    <Section
      Icon={EditIcon}
      header="Hops"
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
            {...register("hopId")}
            options={options}
            handleChange={handleChange}
            value={src?.hopId}
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
                amountType="hopMass"
              />
            )}
          />
        </div>
        <div className="lg:col-span-2">
          <Controller
            name="duration"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <AmountField
                {...field}
                value={field.value ?? 0}
                step={0.01}
                label="Duration"
                amountType="time"
              />
            )}
          />
        </div>
        <div className="lg:col-span-2">
          <Select {...register("usage")} options={HopIngredientUsage} />
        </div>
        <div className="lg:col-span-2">
          <Controller
            name="alpha"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <AmountField
                {...field}
                value={field.value ?? 0}
                step={0.01}
                label="Alpha Acids"
                amountType="percent"
              />
            )}
          />
        </div>
        <div className="lg:col-span-2">
          <Controller
            name="beta"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <AmountField
                {...field}
                value={field.value ?? 0}
                step={0.01}
                label="Beta Acids"
                amountType="percent"
              />
            )}
          />
        </div>

        <div className="lg:col-span-2">
          <NumberField label="Year" {...register("year")} />
        </div>
      </div>
    </Section>
  );
};
export default HopIngredientForm;
