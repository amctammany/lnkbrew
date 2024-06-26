import Grain from "./svgr/Grain";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const GrainIcon = ({ variant, size, className }: IconProps) => (
  <Grain className={clsx(iconStyles({ variant, size }), className)} />
);
