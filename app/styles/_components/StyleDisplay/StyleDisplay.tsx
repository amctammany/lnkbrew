import { Style } from "@prisma/client";
import OverviewSection from "./OverviewSection";
import { Toolbar } from "@/components/Toolbar";
import VitalsSection from "./VitalsSection";
import { Section } from "@/components/Section";

export type StyleDisplayProps = {
  style: Style | null;
};
export function StyleDisplay({ style }: StyleDisplayProps) {
  const title = `${style?.identifier} - ${style?.name}`;
  return (
    <Section title={title}>
      <div className="p-4">
        <OverviewSection style={style} />
        <VitalsSection style={style} />
      </div>
    </Section>
  );
}

export default StyleDisplay;
