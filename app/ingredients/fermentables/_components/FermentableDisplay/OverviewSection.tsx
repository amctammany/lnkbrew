import { ClientSection } from "@/components/Section";
import { Fermentable } from "@prisma/client";

export type OverviewSectionProps = {
  fermentable: Fermentable | null;
};
export function OverviewSection({ fermentable }: OverviewSectionProps) {
  return (
    <ClientSection title="Overview">
      <div className="">
        {(
          [
            "name",
            "country",
            "notes",
            "color",
            "potential",
            "manufacturer",
            "maxUsage",
          ] as (keyof Fermentable)[]
        ).map((field) => (
          <div key={field} className="grid grid-cols-3 p-2 border-b-4">
            <div className="uppercase">{field}</div>
            <div className="col-span-2">{fermentable?.[field]}</div>
          </div>
        ))}
      </div>
    </ClientSection>
  );
}

export default OverviewSection;
