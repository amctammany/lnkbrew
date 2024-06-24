import { Prop } from "@/components/Prop";
import AmountProp from "@/components/Prop/AmountProp";
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
        <AmountProp label="Color" unitType="color" value={fermentable?.color} />
        <AmountProp
          label="Potential"
          unitType="unit"
          unit="PPG"
          value={fermentable?.potential}
        />
        <AmountProp
          label="Max Usage"
          unitType="percentage"
          value={fermentable?.maxUsage}
        />
      </div>
    </ClientSection>
  );
}

export default OverviewSection;
