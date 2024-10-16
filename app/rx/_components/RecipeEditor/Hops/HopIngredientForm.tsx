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
  HopIngredientType,
  HopIngredientUsage,
  HopUsage,
  TimeUnit,
} from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import RemoveHopIngredientButton from "./RemoveHopIngredientButton";
import { TypedAmountField } from "@/components/Form/TypedAmountField";
import clsx from "clsx";
import { useActionForm } from "@/hooks/useActionForm";
import { PrefAmountField } from "@/components/Form/PrefAmountField";
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
  action: any;
  //recipe?: ExtendedRecipe | null;
  hops: Hop[];
};
export const HopIngredientForm = ({
  //recipe,
  action,
  src,
  hops,
}: HopIngredientFormProps) => {
  const { state, register, formAction, reset } = useActionForm(action, src!);
  //const { control, register, reset } = useForm<
  //HopIngredient & {
  //year?: number;
  //beta?: number | null;
  //temperature?: number;
  //}
  //>({
  //defaultValues: src,
  //});
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
        //beta,
      });
  };

  return (
    <Form action={formAction}>
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
            <TypedAmountField
              label="Amount"
              amountType="hopMass"
              fieldProps={register("amount")}
              step={2}
              unitProps={register("amountType")}
            />
          </div>
          <div className="lg:col-span-2">
            <TypedAmountField
              label="Duration"
              amountType="time"
              fieldProps={register("duration")}
              unitProps={register("durationType")}
            />
          </div>
          <div className="lg:col-span-2">
            <Select
              {...register("usage")}
              options={HopIngredientUsage}
              inputSize="full"
            />
          </div>
          <div className="lg:col-span-2">
            <Select
              {...register("type")}
              options={HopIngredientType}
              inputSize="full"
            />
          </div>

          <div className="lg:col-span-2">
            <PrefAmountField
              {...register("temperature", { valueAsNumber: true })}
              step={0.01}
              label="Temperature"
              type="temperature"
            />
          </div>

          <div className="flex lg:col-span-2">
            <NumberField
              label="Alpha Acids"
              {...register("alpha")}
              step={0.01}
              suffix="%"
            />
          </div>
          <div className="lg:col-span-2">
            <NumberField label="Beta Acids" step={0.01} suffix="%" />
          </div>

          <div className="lg:col-span-2">
            <NumberField label="Year" />
          </div>
        </div>
      </Section>
    </Form>
  );
};
export default HopIngredientForm;
