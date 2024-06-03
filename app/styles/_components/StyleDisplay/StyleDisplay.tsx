import { Style } from "@prisma/client";
import OverviewSection from "./OverviewSection";
import { Toolbar } from "@/components/Toolbar";
import VitalsSection from "./VitalsSection";

export type StyleDisplayProps = {
  style: Style | null;
};
export function StyleDisplay({ style }: StyleDisplayProps) {
  console.log(style);
  return (
    <div>
      <Toolbar variant="topbar" title={style?.name}></Toolbar>
      <div className="p-4">
        <OverviewSection style={style} />
        <VitalsSection style={style} />
      </div>
    </div>
  );
}

export default StyleDisplay;
