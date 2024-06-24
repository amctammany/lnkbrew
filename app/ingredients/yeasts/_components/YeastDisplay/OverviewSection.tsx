import { Prop } from "@/components/Prop";
import AmountProp from "@/components/Prop/AmountProp";
import { ClientSection } from "@/components/Section";
import { Yeast } from "@prisma/client";

export type OverviewSectionProps = {
  yeast: Yeast | null;
};
export function OverviewSection({ yeast }: OverviewSectionProps) {
  return (
    <ClientSection title="Overview">
      <Prop label="Name">{yeast?.name}</Prop>
      <Prop label="Notes">{yeast?.notes}</Prop>
      <AmountProp
        label="Attenuation"
        value={yeast?.attenuation}
        unitType="percent"
      />
      <Prop label="Flocculation">{yeast?.flocculation}</Prop>
      <AmountProp
        label="Tolerance"
        unitType="percentage"
        value={yeast?.tolerance}
      />
      <Prop label="Temperature Range" unit="°F">
        {yeast?.tempLow} - {yeast?.tempHigh}
      </Prop>
    </ClientSection>
  );
}

export default OverviewSection;
