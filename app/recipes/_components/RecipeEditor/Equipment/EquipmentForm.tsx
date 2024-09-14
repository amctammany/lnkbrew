"use client";
import { updateRecipe } from "@/app/recipes/actions";
import { IconButton } from "@/components/Button";
import {
  AmountField,
  Autocomplete,
  Form,
  Option,
  TextField,
} from "@/components/Form";
import { EditIcon } from "@/components/Icon/EditIcon";
import { EquipmentProfileIcon } from "@/components/Icon/EquipmentProfileIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { Section } from "@/components/Section";
import { ExtendedRecipe } from "@/types/Recipe";
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
  profiles?: any;
};
export const EquipmentForm = ({ recipe, profiles }: EquipmentFormProps) => {
  const { control, register, trigger } = useForm<ExtendedRecipe>({
    defaultValues: recipe as ExtendedRecipe,
  });

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
      <div className="grid gap-2 md:gap-4 grid-cols-3 md:grid-cols-6">
        <input type="hidden" {...register("id")} />
        <div className="col-span-3 md:col-span-6">
          <Autocomplete
            {...register("equipmentProfileId")}
            options={profiles}
            value={recipe?.equipmentProfileId ?? ""}
          />
        </div>
        <div className="col-span-3 md:col-span-6">
          <Controller
            name="batchVolume"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <AmountField
                {...field}
                value={field.value ?? 0}
                label="Batch Volume"
                amountType="volume"
              />
            )}
          />
        </div>
        <div className="col-span-3 md:col-span-6">
          <Controller
            name="boilTime"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <AmountField
                {...field}
                value={field.value ?? 0}
                label="Boil Time"
                amountType="time"
              />
            )}
          />
        </div>
      </div>
    </Section>
  );
};
export default EquipmentForm;
