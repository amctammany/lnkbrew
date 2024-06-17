import { Prop } from "@/components/Prop";
import RangeProp from "@/components/Prop/RangeProp";
import { ClientSection } from "@/components/Section";
import { Hop } from "@prisma/client";

export type DetailsSectionProps = {
  hop: Hop | null;
};
export function DetailsSection({ hop }: DetailsSectionProps) {
  return (
    <ClientSection className="px-4 py-2" title="Details">
      <div className="">
        <RangeProp
          label="Alpha"
          unit="%"
          min={0}
          max={30}
          value={hop?.alpha}
          range={[hop?.alphaLow, hop?.alphaHigh]}
        />
        <RangeProp
          label="Beta"
          unit="%"
          min={0}
          max={20}
          value={hop?.beta}
          range={[hop?.betaLow, hop?.betaHigh]}
        />
        <RangeProp
          label="Cohumulone"
          unit="%"
          min={0}
          max={60}
          value={hop?.cohumulone}
          range={[hop?.cohumuloneLow, hop?.cohumuloneHigh]}
        />
        <RangeProp
          label="Caryophyllene"
          unit="%"
          min={0}
          max={15}
          value={hop?.caryophyllene}
          range={[hop?.caryophylleneLow, hop?.caryophylleneHigh]}
        />
        <RangeProp
          label="Farnesene"
          unit="%"
          min={0}
          max={10}
          value={hop?.farnesene}
          range={[hop?.farneseneLow, hop?.farneseneHigh]}
        />
        <RangeProp
          label="Humulene"
          unit="%"
          min={0}
          max={30}
          value={hop?.humulene}
          range={[hop?.humuleneLow, hop?.humuleneHigh]}
        />
        <RangeProp
          label="Myrcene"
          unit="%"
          min={0}
          max={75}
          value={hop?.myrcene}
          range={[hop?.myrceneLow, hop?.myrceneHigh]}
        />
        <RangeProp
          label="Total Oil"
          unit="mL/100g"
          min={0}
          max={5}
          value={hop?.totalOil}
          range={[hop?.totalOilLow, hop?.totalOilHigh]}
        />
      </div>
    </ClientSection>
  );
}

export default DetailsSection;
