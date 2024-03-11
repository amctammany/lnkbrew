import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { Icon, IconProps } from "./Icon";

export const CloseIcon = (props: IconProps) => (
  <Icon Svg={XMarkIcon} {...props} />
);
