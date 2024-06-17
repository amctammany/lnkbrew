import { Prop } from "@/components/Prop";
import RangeProp from "@/components/Prop/RangeProp";
import { ClientSection } from "@/components/Section";
import { Hop } from "@prisma/client";

export type DetailsSectionProps = {
  hop: Hop | null;
};
export function DetailsSection({ hop }: DetailsSectionProps) {
  console.log(hop);
  return (
    <ClientSection className="px-4 py-2" title="Details">
      <div className="">
        <RangeProp
          label="Alpha"
          //unit="%"
          min={0}
          max={30}
          value={hop?.alpha}
          range={[hop?.alphaLow, hop?.alphaHigh]}
        />
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
