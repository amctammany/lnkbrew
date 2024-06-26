import Hop from "./svgr/Hop";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const HopIcon = ({ variant, size, className }: IconProps) => (
  <Hop className={clsx(iconStyles({ variant, size }), className)} />
);
