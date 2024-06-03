import { Prop } from "@/components/Prop";
import { ClientSection } from "@/components/Section";
import { Style } from "@prisma/client";

export type VitalsSectionProps = {
  style: Style | null;
};
export function VitalsSection({ style }: VitalsSectionProps) {
  return (
    <ClientSection title="Vitals">
      <Prop label="IBU Range" unit="">
        {style?.ibuLow} - {style?.ibuHigh}
      </Prop>

      <Prop label="ABV Range" unit="">
        {style?.abvLow} - {style?.abvHigh}
      </Prop>
      <Prop label="OG Range" unit="">
        {style?.ogLow} - {style?.ogHigh}
      </Prop>
      <Prop label="FG Range" unit="">
        {style?.fgLow} - {style?.fgHigh}
      </Prop>
      <Prop label="SRM Range" unit="">
        {style?.srmLow} - {style?.srmHigh}
      </Prop>
    </ClientSection>
  );
}

export default VitalsSection;
