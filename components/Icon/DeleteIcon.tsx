import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { Icon, IconProps } from "./Icon";

export const DeleteIcon = (props: IconProps) => (
  <Icon Svg={TrashIcon} {...props} />
);
