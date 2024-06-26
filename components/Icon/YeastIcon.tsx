import Yeast from "./svgr/Yeast";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const YeastIcon = ({ variant, size, className }: IconProps) => (
  <Yeast className={clsx(iconStyles({ variant, size }), className)} />
);
