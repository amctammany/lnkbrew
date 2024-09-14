"use client";
//import { User } from "@prisma/client";
import {
  TimeUnit,
  UserColorPreference,
  UserGravityPreference,
  UserMassPreference,
  UserPreferences,
  UserTemperaturePreference,
  UserVolumePreference,
} from "@prisma/client";
import { Autocomplete } from "@/components/Form/Autocomplete";
import { Form } from "@/components/Form/Form";
import { Select } from "@/components/Form/Select";
import { Submit } from "@/components/Form/Submit";

import React, { act, FC, useMemo } from "react";
import { Controller, useController, useForm } from "react-hook-form";
import { RangeField } from "@/components/Form/RangeField";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { Radio } from "@/components/Form/Radio";
import RadioGroup from "@/components/Form/RadioGroup";

type AdminSettingsProps = {
  src?: UserPreferences | null;
  action: any;
  mashProfiles: any;
  waterProfiles: any;
  equipmentProfiles: any;
};
//const equipmentProfiles = ["equ1", "eq2"];
//const mashProfiles = ["equ1", "eq2"];
export function AdminSettings({
  src,
  action,
  mashProfiles,
  waterProfiles,
  equipmentProfiles,
}: AdminSettingsProps) {
  const {
    register,
    control,
    formState: { errors },
    setError,
    getValues,
  } = useForm<
    UserPreferences & {
      range: { min: number; max: number }; //[number, number];
      rangeLoaw?: number;
      rangeHigh?: number;
    }
  >({
    defaultValues: src || {},
  });
  const onSubmit = async (data: FormData) => {
    const res = await action(data);
    if (res?.errors?.length) {
      res.errors.forEach((err: any) =>
        setError(err.path, { type: err.code, message: err.message })
      );
    }
    //if (res?.redirect) redirect(res.redirect);
    //await trigger();
  };

  return (
    <Form action={action}>
      <Section
        header={"Admin Settings"}
        className="m-auto w-full "
        actions={
          <>
            <Submit>Save</Submit>
          </>
        }
      >
        <div className="grid md:grid-cols-2 gap-2 md:gap-4 m-4">
          <Section header="Units">
            <div>
              <input type="hidden" {...register("userId")} />
              <RadioGroup
                variant="inline"
                {...register("volumeUnit")}
                label="Volume Unit"
                error={errors.volumeUnit}
                options={UserVolumePreference}
              />
              <RadioGroup
                variant="inline"
                {...register("colorUnit")}
                label="Color Unit"
                error={errors.colorUnit}
                options={UserColorPreference}
              />
              <RadioGroup
                variant="inline"
                {...register("timeUnit")}
                label="Time Unit"
                error={errors.timeUnit}
                options={TimeUnit}
              />
              <Select
                variant="inline"
                label="Hop Mass Unit"
                {...register("hopMassUnit")}
                options={UserMassPreference}
              />
              <Select
                variant="inline"
                {...register("fermentableMassUnit")}
                label="Fermentable Mass Unit"
                error={errors?.fermentableMassUnit}
                options={UserMassPreference}
              />
              <RadioGroup
                variant="inline"
                label="Temperature Unit"
                error={errors?.temperatureUnit}
                options={UserTemperaturePreference}
                {...register("temperatureUnit")}
              />
              <RadioGroup
                variant="inline"
                {...register("gravityUnit")}
                label="Gravity Unit"
                error={errors?.gravityUnit}
                options={UserGravityPreference}
              />
            </div>
          </Section>
          <Section header="Default Profiles">
            <Autocomplete
              //required
              error={errors?.sourceWaterProfileId}
              {...register("sourceWaterProfileId")}
              label="Source Water"
              value={src?.sourceWaterProfileId ?? undefined}
              options={waterProfiles}
            />
            <Autocomplete
              //required
              error={errors?.targetWaterProfileId}
              label="Target Water"
              {...register("targetWaterProfileId")}
              value={src?.targetWaterProfileId ?? undefined}
              options={waterProfiles}
            />

            <Autocomplete
              //required
              error={errors?.equipmentProfileId}
              {...register("equipmentProfileId")}
              value={src?.equipmentProfileId ?? undefined}
              label="Equipment Profile"
              options={equipmentProfiles}
            />
            <Autocomplete
              //required
              error={errors?.mashProfileId}
              {...register("mashProfileId")}
              label="Mash Profile"
              value={src?.mashProfileId ?? undefined}
              options={mashProfiles}
            />
          </Section>
          <Toolbar className="md:col-span-2">
            <Submit>Save</Submit>
          </Toolbar>
        </div>
      </Section>
    </Form>
  );
}

export default AdminSettings;
/**
        <Select {...register("mashProfileId")} options={mashProfiles} />
        <Select {...register("sourceWaterProfileId")} options={waterProfiles} />
        <Select {...register("targetWaterProfileId")} options={waterProfiles} />
        */
