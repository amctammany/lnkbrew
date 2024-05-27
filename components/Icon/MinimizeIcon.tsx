import { Icon, IconProps } from "./Icon";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

export const MinimizeIcon = (props: IconProps) => (
  <Icon Svg={ChevronUpIcon} {...props} />
);
