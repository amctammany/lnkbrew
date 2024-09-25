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

type AdminSettingsDefaultsProps = {
  src: UserPreferences;
  action: any;
  mashProfiles: any;
  waterProfiles: any;
  equipmentProfiles: any;
};
//const equipmentProfiles = ["equ1", "eq2"];
//const mashProfiles = ["equ1", "eq2"];
export function AdminSettingsDefaults({
  src,
  action,
  mashProfiles,
  waterProfiles,
  equipmentProfiles,
}: AdminSettingsDefaultsProps) {
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
    defaultValues: src,
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
        header={"Admin Settings Defaults"}
        className="m-auto w-full "
        actions={
          <>
            <Submit>Save</Submit>
          </>
        }
      >
        <div className="gap-2 md:gap-4 m-4">
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
          <Toolbar className="md:col-span-2">
            <Submit>Save</Submit>
          </Toolbar>
        </div>
      </Section>
    </Form>
  );
}

export default AdminSettingsDefaults;
/**
        <Select {...register("mashProfileId")} options={mashProfiles} />
        <Select {...register("sourceWaterProfileId")} options={waterProfiles} />
        <Select {...register("targetWaterProfileId")} options={waterProfiles} />
        */
