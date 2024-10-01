"use client";
import { IconButton } from "@/components/Button/IconButton";
import {
  AmountField,
  Form,
  Select,
  TextArea,
  TextField,
} from "@/components/Form";
import { RangeField } from "@/components/Form/RangeField";
import { HopIcon } from "@/components/Icon/HopIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { RangeValue } from "@/components/Range/RangeSlider";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { State } from "@/lib/validateSchema";
import { HopInput } from "@/types/Ingredient";
import { Hop, HopUsage } from "@prisma/client";
import { useActionState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export type HopEditorProps = {
  hop: Hop | null;
  action: any;
};
export function HopEditor({ hop, action }: HopEditorProps) {
  const [state, formAction] = useActionState<State<HopInput>>(action, {
    success: true,
    data: hop!,
    errors: undefined,
  });
  const { register, control, setError, getValues } = useForm<HopInput>({
    //defaultValues: hop || {},
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

  return (
    <Form action={formAction}>
      <Section
        title={hop?.name ?? "New Hop"}
        Icon={HopIcon}
        actions={<IconButton Icon={SaveIcon}>Save</IconButton>}
      >
        <div className="p-4">
          <input type="hidden" {...register("id")} />
          <TextField
            className="w-full"
            label="Name"
            {...register("name")}
            error={state?.errors?.name}
          />
          <TextField
            className="w-full"
            label="Country"
            {...register("country")}
          />
          <Select
            {...register("usage")}
            className="w-full"
            options={HopUsage}
          />
          <TextArea label="flavor" {...register("flavor")} />

          <TextArea
            rows={3}
            label="Characteristics"
            {...register("characteristics")}
          />
          <TextArea rows={3} label="Notes" {...register("notes")} />

          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <div className="col-span-2 md:col-span-4">
              <Controller
                name="alphaRange"
                control={control}
                defaultValue={getValues(["alphaLow", "alphaHigh"]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue
                )}
                render={({ field }) => (
                  <RangeField
                    {...field}
                    label="Alpha Acids"
                    step={0.01}
                    min={0}
                    max={40}
                  />
                )}
              />
            </div>
            <div className="col-span-2 md:col-span-4">
              <Controller
                name="betaRange"
                control={control}
                defaultValue={getValues(["betaLow", "betaHigh"]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue
                )}
                render={({ field }) => (
                  <RangeField
                    {...field}
                    label="Beta Acids"
                    min={0}
                    max={30}
                    step={0.01}
                  />
                )}
              />
            </div>
            <div className="col-span-2 md:col-span-4">
              <Controller
                name="cohumuloneRange"
                control={control}
                defaultValue={getValues([
                  "cohumuloneLow",
                  "cohumuloneHigh",
                ]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue
                )}
                render={({ field }) => (
                  <RangeField
                    {...field}
                    label="Cohumulone"
                    min={0}
                    max={65}
                    step={0.01}
                  />
                )}
              />
            </div>
            <div className="col-span-2 md:col-span-4">
              <Controller
                name="caryophylleneRange"
                control={control}
                defaultValue={getValues([
                  "caryophylleneLow",
                  "caryophylleneHigh",
                ]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue
                )}
                render={({ field }) => (
                  <RangeField
                    {...field}
                    label="Caryophyllene Range"
                    step={0.01}
                    min={0}
                    max={20}
                  />
                )}
              />
            </div>

            <div className="col-span-2 md:col-span-4">
              <Controller
                name="humuleneRange"
                control={control}
                defaultValue={getValues(["humuleneLow", "humuleneHigh"]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue
                )}
                render={({ field }) => (
                  <RangeField
                    {...field}
                    label="Humulene"
                    step={0.01}
                    min={0}
                    max={65}
                  />
                )}
              />
            </div>

            <div className="col-span-2 md:col-span-4">
              <Controller
                name="myrceneRange"
                control={control}
                defaultValue={getValues(["myrceneLow", "myrceneHigh"]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue
                )}
                render={({ field }) => (
                  <RangeField
                    {...field}
                    label="Myrcene"
                    step={0.01}
                    min={0}
                    max={65}
                  />
                )}
              />
            </div>

            <div className="col-span-2 md:col-span-4">
              <Controller
                name="farneseneRange"
                control={control}
                defaultValue={getValues([
                  "farneseneLow",
                  "farneseneHigh",
                ]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue
                )}
                render={({ field }) => (
                  <RangeField
                    {...field}
                    label="Farnesene"
                    step={0.01}
                    min={0}
                    max={35}
                  />
                )}
              />
            </div>

            <div className="col-span-2 md:col-span-4">
              <Controller
                name="totalOilRange"
                control={control}
                defaultValue={getValues(["totalOilLow", "totalOilHigh"]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue
                )}
                render={({ field }) => (
                  <RangeField
                    {...field}
                    label="Total Oil"
                    step={0.01}
                    max={15}
                  />
                )}
              />
            </div>

            <Controller
              name="alpha"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  {...field}
                  value={field.value ?? 0}
                  label="Alpha Acids"
                  amountType="percentage"
                  step={0.01}
                />
              )}
            />
            <Controller
              name="beta"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  {...field}
                  value={field.value ?? 0}
                  label="Beta Acids"
                  amountType="percentage"
                  step={0.01}
                />
              )}
            />

            <Controller
              name="cohumulone"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  {...field}
                  value={field.value ?? 0}
                  label="Cohumulone"
                  amountType="percentage"
                  step={0.01}
                />
              )}
            />

            <Controller
              name="caryophyllene"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  {...field}
                  value={field.value ?? 0}
                  label="Caryophyllene"
                  amountType="percentage"
                  step={0.01}
                />
              )}
            />

            <Controller
              name="farnesene"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  {...field}
                  value={field.value ?? 0}
                  label="Farnesene"
                  amountType="percentage"
                  step={0.01}
                />
              )}
            />

            <Controller
              name="humulene"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  {...field}
                  value={field.value ?? 0}
                  label="Humulene"
                  amountType="percentage"
                  step={0.01}
                />
              )}
            />

            <Controller
              name="myrcene"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  {...field}
                  value={field.value ?? 0}
                  label="Myrcene"
                  amountType="percentage"
                  step={0.01}
                />
              )}
            />
            <Controller
              name="totalOil"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  {...field}
                  value={field.value ?? 0}
                  label="Total Oils"
                  amountType="unit"
                  amountUnit="g/mL"
                  step={0.01}
                />
              )}
            />
          </div>
        </div>
      </Section>
    </Form>
  );
}

export default HopEditor;
/**            <AmountField
              step={0.01}
              min={0}
              max={35}
              amountType="%"
              label="Beta Acids"
              {...register("beta", { valueAsNumber: true })}
            />
            <AmountField
              step={0.01}
              min={0}
              max={25}
              amountType="%"
              label="Cohumulone"
              {...register("cohumulone", { valueAsNumber: true })}
            />
            <AmountField
              step={0.01}
              min={0}
              max={75}
              amountType="%"
              label="Caryophyllene"
              {...register("caryophyllene", { valueAsNumber: true })}
            />
            <AmountField
              step={0.01}
              min={0}
              max={35}
              amountType="%"
              label="Farnesene"
              {...register("farnesene", { valueAsNumber: true })}
            />
            <AmountField
              step={0.01}
              min={0}
              max={35}
              amountType="%"
              label="Humulene"
              {...register("humulene", { valueAsNumber: true })}
            />
            <AmountField
              step={0.01}
              min={0}
              max={85}
              amountType="%"
              label="Myrcene"
              {...register("myrcene", { valueAsNumber: true })}
            />
            <AmountField
              step={0.01}
              min={0}
              max={15}
              amountType="%"
              label="Total Oils"
              {...register("totalOil", { valueAsNumber: true })}
            />
 */
