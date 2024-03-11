import Link, { LinkProps } from "next/link";
import { Icon, IconProps } from "../Icon/Icon";
import { Button, ButtonProps } from "./Button";
import { IconNames } from "../Icon";
import { AppIcon } from "../AppIcon";

export type IconButtonProps = ButtonProps & {
  //Icon: typeof Icon;
  iconVariant?: IconProps["variant"];
  iconType: IconNames;
};
export const IconButton = ({
  //Icon,
  iconVariant,
  iconType,
  children,
  ...props
}: IconButtonProps) => {
  const body = (
    <div className="flex px-1 text-sm -mx-2">
      <AppIcon type={iconType} variant={iconVariant} />
      {children && (
        <span className="block m-auto pl-1 uppercase">{children}</span>
      )}
    </div>
  );
  return <Button {...props}>{body}</Button>;
};
