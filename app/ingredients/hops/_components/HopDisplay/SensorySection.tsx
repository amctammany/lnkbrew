import { Prop } from "@/components/Prop";
import { ClientSection } from "@/components/Section";
import { ExtendedHop } from "@/types/Ingredient";
import { HopSensoryChart } from "../HopSensoryChart";
//import { Hop } from "@prisma/client";

export type SensorySectionProps = {
  hop: ExtendedHop | null;
};
export function SensorySection({ hop }: SensorySectionProps) {
  return (
    <ClientSection className="px-4 py-2" title="Sensory">
      <div className="">
        {hop?.HopSensoryPanel.map((data) => (
          <HopSensoryChart key={data.id} data={data} />
        ))}
      </div>
    </ClientSection>
  );
}

export default SensorySection;
