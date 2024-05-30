import { Prop } from "@/components/Prop";
import { ClientSection } from "@/components/Section";
import { Fermentable } from "@prisma/client";

export type OverviewSectionProps = {
  fermentable: Fermentable | null;
};
export function OverviewSection({ fermentable }: OverviewSectionProps) {
  return (
    <ClientSection title="Overview">
      <div className="">
        <Prop label="Name">{fermentable?.name}</Prop>
        <Prop label="Country">{fermentable?.country}</Prop>
        <Prop label="Notes">{fermentable?.notes}</Prop>
        <Prop label="Color" unit="°L">
          {fermentable?.color}
        </Prop>
        <Prop label="Potential">{fermentable?.potential}</Prop>
        <Prop label="Max Usage" unit="%">
          {fermentable?.maxUsage}
        </Prop>
      </div>
    </ClientSection>
  );
}

export default OverviewSection;
