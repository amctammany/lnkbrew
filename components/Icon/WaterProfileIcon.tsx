import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const WaterProfileIcon = ({ variant, size, className }: IconProps) => (
  <ChartBarSquareIcon
    className={clsx(iconStyles({ variant, size }), className)}
  />
);
