import { Icon, IconProps } from "./Icon";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export const MaximizeIcon = (props: IconProps) => (
  <Icon Svg={ChevronDownIcon} {...props} />
);
