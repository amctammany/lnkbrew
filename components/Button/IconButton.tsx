import Link, { LinkProps } from "next/link";
import { Icon, IconProps } from "../Icon/Icon";
import { Button, ButtonProps } from "./Button";

export type IconButtonProps = ButtonProps & {
  Icon: typeof Icon;
  iconVariant?: IconProps["variant"];
};
export const IconButton = ({
  Icon,
  iconVariant,
  children,
  ...props
}: IconButtonProps) => {
  const body = (
    <div className="flex px-1 text-sm -mx-2">
      <Icon variant={iconVariant} />
      <span className="block m-auto pl-1 uppercase">{children}</span>
    </div>
  );
  return <Button {...props}>{body}</Button>;
};
