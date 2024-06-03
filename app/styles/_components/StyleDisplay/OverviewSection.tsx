import { Prop } from "@/components/Prop";
import { ClientSection } from "@/components/Section";
import { Style } from "@prisma/client";

export type OverviewSectionProps = {
  style: Style | null;
};
export function OverviewSection({ style }: OverviewSectionProps) {
  return (
    <ClientSection title="Overview">
      <Prop label="Name">{style?.name}</Prop>
      <Prop label="Identifier">{style?.identifier}</Prop>
      <Prop label="Overall">{style?.overall}</Prop>
      <Prop label="Appearance">{style?.appearance}</Prop>
      <Prop label="Aroma">{style?.aroma}</Prop>
      <Prop label="Flavor">{style?.flavor}</Prop>
      <Prop label="Mouthfeel">{style?.mouthfeel}</Prop>
      <Prop label="Comments">{style?.comments}</Prop>
      <Prop label="Ingredients">{style?.ingredients}</Prop>
      <Prop label="History">{style?.history}</Prop>
      <Prop label="Examples">{style?.examples}</Prop>
    </ClientSection>
  );
}

export default OverviewSection;
