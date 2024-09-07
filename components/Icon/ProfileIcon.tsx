import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import { Icon, IconProps } from "./Icon";

export const ProfileIcon = (props: IconProps) => (
  <Icon Svg={UserCircleIcon} {...props} />
);
