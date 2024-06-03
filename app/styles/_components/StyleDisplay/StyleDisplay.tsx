import { Style } from "@prisma/client";
import Link from "next/link";
import OverviewSection from "./OverviewSection";
import { Toolbar } from "@/components/Toolbar";
import { IconButton } from "@/components/Button/IconButton";
import { IconButtonLink } from "@/components/Button";

export type StyleDisplayProps = {
  style: Style | null;
};
export function StyleDisplay({ style }: StyleDisplayProps) {
  console.log(style);
  return (
    <div>
      <Toolbar variant="topbar" title={style?.name}>
        <IconButtonLink
          href={`/ingredients/styles/${style?.slug}/edit`}
          iconType="EditIcon"
        >
          Edit
        </IconButtonLink>
      </Toolbar>
      <div className="p-4">
        <OverviewSection style={style} />
      </div>
    </div>
  );
}

export default StyleDisplay;
