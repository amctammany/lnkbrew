import { ClientSection } from "@/components/Section";
import { Hop } from "@prisma/client";

export type OverviewSectionProps = {
  hop: Hop | null;
};
export function OverviewSection({ hop }: OverviewSectionProps) {
  return (
    <ClientSection title="Overview">
      <div className="">
        {(["name", "country", "characteristics", "usage"] as (keyof Hop)[]).map(
          (field) => (
            <div key={field} className="grid grid-cols-3 p-2 border-b-4">
              <div className="uppercase">{field}</div>
              <div className="col-span-2">{hop?.[field]}</div>
            </div>
          )
        )}
      </div>
    </ClientSection>
  );
}

export default OverviewSection;
