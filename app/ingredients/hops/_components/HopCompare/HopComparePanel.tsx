import { ExtendedHop } from "@/types/Ingredient";

export type HopComparePanelProps = {
  hop: ExtendedHop | null;
};

function HopComparePanel({ hop }: HopComparePanelProps) {
  return (
    <div className="">
      Hop Compare
      {hop?.toString()}
    </div>
  );
}

export default HopComparePanel;
