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
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { RangeValue } from "@/components/Range/RangeSlider";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { Hop, HopUsage } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";

export type HopEditorProps = {
  hop: Hop | null;
  action?: (formData: FormData) => void;
};
export function HopEditor({ hop, action }: HopEditorProps) {
  const { register, control, getValues } = useForm<
    Hop & { alphaRange?: RangeValue; betaRange?: RangeValue }
  >({
    defaultValues: hop || {},
  });

  return (
    <Form action={action}>
      <Section
        title={hop?.name ?? "New Hop"}
        actions={<IconButton Icon={SaveIcon}>Save</IconButton>}
      >
        <div className="p-4">
          <input type="hidden" {...register("id")} />
          <TextField className="w-full" label="Name" {...register("name")} />
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
                  <RangeField {...field} label="Alpha Acids" step={0.01} />
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
                  <RangeField {...field} label="Beta Acids" step={0.01} />
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
