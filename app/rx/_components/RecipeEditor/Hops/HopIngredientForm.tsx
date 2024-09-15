"use client";
import { IconButton } from "@/components/Button";
import { AmountField, Autocomplete, Form, ID } from "@/components/Form";
import { EditIcon } from "@/components/Icon/EditIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { Section } from "@/components/Section";
import { ExtendedRecipe } from "@/types/Recipe";
import {
  Hop,
  HopIngredient,
  HopIngredientUsage,
  HopUsage,
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
  const { control, register, reset } = useForm<HopIngredient>({
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
      ...hop
    } = hops.find((p) => p.id === id) ?? {
      id: undefined,
    };
    if (hop)
      reset({
        alpha,
        hopId,
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
      </div>
    </Section>
  );
};
export default HopIngredientForm;
