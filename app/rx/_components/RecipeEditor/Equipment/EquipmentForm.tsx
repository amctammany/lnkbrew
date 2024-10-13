"use client";
import { IconButton } from "@/components/Button";
import {
  AmountField,
  Autocomplete,
  Form,
  NumberField,
} from "@/components/Form";
import { PrefAmountField } from "@/components/Form/PrefAmountField";
import { EditIcon } from "@/components/Icon/EditIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { Section } from "@/components/Section";
import { State } from "@/lib/validateSchema";
import { ID } from "@/types/App";
import { ExtendedRecipe } from "@/types/Recipe";
import { EquipmentProfile } from "@prisma/client";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";

export const EquipmentFormContainer = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action: any;
}) => {
  return <Form action={action}>{children}</Form>;
};
export type EquipmentFormProps = {
  recipe?: ExtendedRecipe | null;
  profiles: EquipmentProfile[];
  action: any;
};
export const EquipmentForm = ({
  action,
  recipe,
  profiles,
}: EquipmentFormProps) => {
  const [state, formAction] = useActionState<State<ExtendedRecipe>>(action, {
    success: true,
    errors: undefined,
    data: recipe!,
  });

  const { setError, register, reset } = useForm<ExtendedRecipe>({
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

  const options = profiles.reduce((acc, profile) => {
    acc[profile.id] = `${profile.name}`;
    return acc;
  }, {} as Record<string, string>);
  const handleChange = (id?: ID) => {
    const profile = profiles.find((p) => p.id === id) ?? {};
    reset({ ...profile, id: recipe?.id });
  };

  return (
    <Form action={formAction}>
      <Section
        Icon={EditIcon}
        header="Equipment"
        actions={
          <IconButton type="submit" Icon={SaveIcon}>
            Save
          </IconButton>
        }
      >
        <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <input type="hidden" {...register("id")} />
          <div className="col-span-2 md:col-span-3 lg:col-span-6">
            <Autocomplete
              {...register("equipmentProfileId")}
              isNumeric
              options={options}
              handleChange={handleChange}
              value={recipe?.equipmentProfileId ?? ""}
            />
          </div>
          <div className="lg:col-span-2">
            <PrefAmountField
              {...register("batchVolume", { valueAsNumber: true })}
              step={0.01}
              label="Batch Volume"
              type="volume"
              error={state.errors?.batchVolume}
            />
          </div>
          <div className="lg:col-span-2">
            <PrefAmountField
              {...register("boilTime", { valueAsNumber: true })}
              step={0.1}
              label="Boil Time"
              type="time"
              error={state.errors?.boilTime}
            />
          </div>
          <div className="lg:col-span-2">
            <PrefAmountField
              {...register("boilVolume", { valueAsNumber: true })}
              step={0.1}
              label="Boil Volume"
              type="volume"
              error={state.errors?.boilVolume}
            />
          </div>
          <div className="lg:col-span-2">
            <PrefAmountField
              {...register("preboilVolume", { valueAsNumber: true })}
              step={0.1}
              label="Pre-Boil Volume"
              type="volume"
              error={state.errors?.preboilVolume}
            />
          </div>

          <div className="lg:col-span-2">
            <PrefAmountField
              {...register("mashEfficiency", {
                valueAsNumber: true,
              })}
              type="percentage"
              step={0.01}
              label="Mash Efficiency"
              error={state.errors?.mashEfficiency}
            />
          </div>

          <div className="lg:col-span-2">
            <PrefAmountField
              {...register("brewEfficiency", {
                valueAsNumber: true,
              })}
              step={0.01}
              label="Brew Efficiency"
              type="percentage"
              error={state.errors?.brewEfficiency}
            />
          </div>
        </div>
      </Section>
    </Form>
  );
};
export default EquipmentForm;
