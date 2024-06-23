"use client";
import { Form, Submit, TextArea, TextField } from "@/components/Form";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  createEquipmentProfile,
  updateEquipmentProfile,
} from "@/app/profiles/equipment/actions";
import { Prisma, TimeUnit } from "@prisma/client";
//import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { AmountField1 as AmountField } from "@/components/Form/AmountField1";
import { Ca2, Cl, HCO3, MgSo4, Na, SO4 } from "@/components/Elements";
import { IconButton } from "@/components/Button/IconButton";
import { EquipmentProfile, UserVolumePreference } from "@prisma/client";
import { Section } from "@/components/Section";
import { EquipmentProfileIcon } from "@/components/Icon/EquipmentProfileIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
type EquipmentProfileInput = any;

export type EquipmentProfileFormProps = {
  profile: EquipmentProfileInput | null;
};
export const EquipmentProfileForm = ({
  profile,
}: EquipmentProfileFormProps) => {
  const { control, register, trigger } = useForm<EquipmentProfile>({
    defaultValues: profile,
  });
  const action = profile?.id ? updateEquipmentProfile : createEquipmentProfile;

  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    return action(data);
  };
  /**
   <Toolbar variant="topbar" title={profile?.name ?? "New EquipmentProfile"}>
        <IconButton type="submit" iconType="EditIcon">
          Save
        </IconButton>
      </Toolbar>
*
   */
  return (
    <Form action={onSubmit}>
      <Section
        icon="EquipmentProfileIcon"
        header={profile?.name ?? "New EquipmentProfile"}
        actions={
          <IconButton type="submit" Icon={SaveIcon}>
            Save
          </IconButton>
        }
      >
        <div className="grid gap-2 md:gap-4 grid-cols-3 md:grid-cols-6">
          <input type="hidden" {...register("id")} />
          <input type="hidden" {...register("userId")} />
          <input type="hidden" {...register("forkedFrom")} />
          <div className="col-span-3 md:col-span-6">
            <TextField {...register("name")} label="Name" />
          </div>
          <div className="col-span-3 md:col-span-6">
            <TextField {...register("description")} label="Description" />
          </div>
          <div className="col-span-2 lg:col-span-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <Controller
              name="batchVolume"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  //{...register("batchVolume")}
                  {...field}
                  value={field.value ?? 0}
                  label="Batch Volume"
                  amountType="volume"
                  //amount
                  //amountTypes={UserVolumePreference}
                  step={0.01}
                />
              )}
            />
            <Controller
              name="boilTime"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  //{...register("batchVolume")}
                  {...field}
                  value={field.value ?? 0}
                  label="Boil Time"
                  amountType="time"
                  //amount
                  //amountTypes={UserVolumePreference}
                  step={1}
                />
              )}
            />
            <Controller
              name="boilOffRate"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  //{...register("batchVolume")}
                  {...field}
                  value={field.value ?? 0}
                  label="Boil Off Rate"
                  amountType="flow"
                  //amount
                  //amountTypes={UserVolumePreference}
                  step={0.01}
                />
              )}
            />
            <Controller
              name="trubLoss"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  {...field}
                  value={field.value ?? 0}
                  label="Trub Loss"
                  amountType="volume"
                  step={0.01}
                  //amount
                  //amountTypes={UserVolumePreference}
                  //step={0.01}
                />
              )}
            />
            <Controller
              name="fermenterLoss"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  {...field}
                  value={field.value ?? 0}
                  label="Fermenter Loss"
                  amountType="volume"
                  step={0.01}
                  //amount
                  //amountTypes={UserVolumePreference}
                  //step={0.01}
                />
              )}
            />
            <Controller
              name="mashLoss"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  //{...register("batchVolume")}
                  {...field}
                  value={field.value ?? 0}
                  label="Mass Loss"
                  amountType="volume"
                  //amount
                  //amountTypes={UserVolumePreference}
                  step={0.01}
                />
              )}
            />
          </div>
        </div>
        <Toolbar>
          <IconButton Icon={SaveIcon} type="submit">
            Save
          </IconButton>
        </Toolbar>
      </Section>
    </Form>
  );
};
