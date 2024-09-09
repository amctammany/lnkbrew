import BeakerIcon from "@heroicons/react/24/outline/BeakerIcon";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const WaterProfileIcon = ({ variant, size, className }: IconProps) => (
  <BeakerIcon className={clsx(iconStyles({ variant, size }), className)} />
);
