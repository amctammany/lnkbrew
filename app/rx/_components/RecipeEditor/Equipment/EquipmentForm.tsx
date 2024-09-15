"use client";
import { IconButton } from "@/components/Button";
import { AmountField, Autocomplete, Form } from "@/components/Form";
import { EditIcon } from "@/components/Icon/EditIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { Section } from "@/components/Section";
import { ID } from "@/types/App";
import { ExtendedRecipe } from "@/types/Recipe";
import { EquipmentProfile } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";

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
};
export const EquipmentForm = ({ recipe, profiles }: EquipmentFormProps) => {
  const { control, register, reset } = useForm<ExtendedRecipe>({
    defaultValues: recipe as ExtendedRecipe,
  });
  const options = profiles.reduce(
    (acc, profile) => {
      acc[profile.id] = `${profile.name}`;
      return acc;
    },
    {} as Record<string, string>
  );
  const handleChange = (id?: ID) => {
    const profile = profiles.find((p) => p.id === id) ?? {};
    reset({ ...profile, id: recipe?.id });
  };

  return (
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
          <Controller
            name="batchVolume"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <AmountField
                {...field}
                value={field.value ?? 0}
                step={0.01}
                label="Batch Volume"
                amountType="volume"
              />
            )}
          />
        </div>
        <div className="lg:col-span-2">
          <Controller
            name="boilTime"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <AmountField
                {...field}
                value={field.value ?? 0}
                step={0.01}
                label="Boil Time"
                amountType="time"
              />
            )}
          />
        </div>
        <div className="lg:col-span-2">
          <Controller
            name="boilVolume"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <AmountField
                {...field}
                step={0.01}
                value={field.value ?? 0}
                label="Boil Volume"
                amountType="volume"
              />
            )}
          />
        </div>
        <div className="lg:col-span-2">
          <Controller
            name="mashEfficiency"
            control={control}
            defaultValue={70}
            render={({ field }) => (
              <AmountField
                {...field}
                step={0.1}
                value={field.value ?? 0}
                label="Mash Efficiency"
                amountType="percent"
              />
            )}
          />
        </div>
        <div className="lg:col-span-2">
          <Controller
            name="brewEfficiency"
            control={control}
            defaultValue={60}
            render={({ field }) => (
              <AmountField
                {...field}
                step={0.1}
                value={field.value ?? 0}
                label="Brew Efficiency"
                amountType="percent"
              />
            )}
          />
        </div>
      </div>
    </Section>
  );
};
export default EquipmentForm;
