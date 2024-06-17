import { Prop } from "@/components/Prop";
import { ClientSection } from "@/components/Section";
import { Hop } from "@prisma/client";

export type OverviewSectionProps = {
  hop: Hop | null;
};
export function OverviewSection({ hop }: OverviewSectionProps) {
  return (
    <ClientSection className="px-4 py-2" title="Overview">
      <div className="">
        <Prop label="Name">{hop?.name}</Prop>
        <Prop label="Country">{hop?.country}</Prop>
        <Prop label="Characteristics">{hop?.characteristics}</Prop>
        <Prop label="Usage">{hop?.usage}</Prop>
      </div>
    </ClientSection>
  );
}

export default OverviewSection;
