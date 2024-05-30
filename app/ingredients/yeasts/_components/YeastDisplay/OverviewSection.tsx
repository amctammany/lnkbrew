import { Prop } from "@/components/Prop";
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
      <Prop label="Attenuation">{yeast?.attenuation}</Prop>
      <Prop label="Flocculation">{yeast?.flocculation}</Prop>
      <Prop label="Tolerance" unit="%">
        {yeast?.tolerance}
      </Prop>
      <Prop label="Temperature Range" unit="°F">
        {yeast?.tempLow} - {yeast?.tempHigh}
      </Prop>
    </ClientSection>
  );
}

export default OverviewSection;
