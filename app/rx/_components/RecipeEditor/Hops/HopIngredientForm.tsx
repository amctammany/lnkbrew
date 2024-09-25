"use client";
import { IconButton } from "@/components/Button";
import {
  AmountField,
  Autocomplete,
  Form,
  Label,
  NumberField,
  Select,
} from "@/components/Form";
import { DeleteIcon } from "@/components/Icon/DeleteIcon";
import { EditIcon } from "@/components/Icon/EditIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { RemoveButton } from "@/components/RemoveButton/RemoveButton";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { ID } from "@/types/App";
import { ExtendedRecipe } from "@/types/Recipe";
import {
  Hop,
  HopIngredient,
  HopIngredientUsage,
  HopUsage,
  TimeUnit,
} from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import RemoveHopIngredientButton from "./RemoveHopIngredientButton";
type HopIngredientFooterProps = { recipeId?: string; id?: number };
const HopIngredientFooter = ({ recipeId, id }: HopIngredientFooterProps) => {
  return (
    <Toolbar>
      <RemoveHopIngredientButton id={id} recipeId={recipeId} />
      <IconButton type="submit" Icon={SaveIcon}>
        Save
      </IconButton>
    </Toolbar>
  );
};

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
    HopIngredient & {
      year?: number;
      beta?: number | null;
      temperature?: number;
    }
  >({
    defaultValues: src,
  });
  const options = hops.reduce((acc, profile) => {
    acc[profile.id] = `${profile.name}`;
    return acc;
  }, {} as Record<string, string>);
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
      footer={<HopIngredientFooter id={src?.id} />}
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
            value={src?.hopId ?? ""}
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
          <Controller
            name="temperature"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <AmountField
                {...field}
                value={field.value ?? 0}
                step={0.01}
                label="Temperature"
                amountType="temperature"
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
                amountType="percentage"
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
                amountType="percentage"
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
