import { Prop } from "@/components/Prop";
import { ClientSection } from "@/components/Section";
import { Hop } from "@prisma/client";

export type DetailsSectionProps = {
  hop: Hop | null;
};
export function DetailsSection({ hop }: DetailsSectionProps) {
  return (
    <ClientSection className="px-4 py-2" title="Details">
      <div className="">
        <Prop label="Alpha" unit="%">
          {hop?.alpha}
        </Prop>
        <Prop label="Beta" unit="%">
          {hop?.beta}
        </Prop>
        <Prop label="Caryophyllene" unit="%">
          {hop?.caryophyllene}
        </Prop>
        <Prop label="Cohumulone" unit="%">
          {hop?.cohumulone}
        </Prop>
        <Prop label="Farnesene" unit="%">
          {hop?.farnesene}
        </Prop>
        <Prop label="Humulene" unit="%">
          {hop?.humulene}
        </Prop>
        <Prop label="Myrcene" unit="%">
          {hop?.myrcene}
        </Prop>
        <Prop label="Total Oil" unit="mL/100g">
          {hop?.totalOil}
        </Prop>
      </div>
    </ClientSection>
  );
}

export default DetailsSection;
