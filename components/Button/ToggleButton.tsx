"use client";
//import Link, { LinkProps } from "next/link";
import { Icon, IconProps } from "../Icon/Icon";
import { ButtonProps } from "./Button";
//import { IconNames } from "../Icon";
import { useState } from "react";
import { IconButton, IconButtonProps } from "./IconButton";
import { MinimizeIcon } from "../Icon/MinimizeIcon";
import { MaximizeIcon } from "../Icon/MaximizeIcon";

export type ToggleButtonProps = Omit<
  IconButtonProps,
  "Icon" | "iconVariant"
> & {
  defaultIconVariant?: IconProps["variant"];
  activeIconVariant?: IconProps["variant"];
  activeVariant?: ButtonProps["variant"];
  activeIcon?: typeof Icon;
  defaultIcon?: typeof Icon;
  onToggle?: React.MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
};
export const ToggleButton = ({
  children,
  active: _active,
  activeVariant,
  onToggle,
  ...props
}: ToggleButtonProps) => {
  const [active, setActive] = useState(_active);
  const handleToggle: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setActive((a) => !a);
    if (onToggle) onToggle(e);
  };
  const activeIcon = props.activeIcon ?? MinimizeIcon;
  const defaultIcon = props.defaultIcon ?? MaximizeIcon;
  const activeIconVariant = props.activeIconVariant ?? "default";
  const defaultIconVariant = props.defaultIconVariant ?? "default";

  return (
    <IconButton
      {...props}
      Icon={active ? activeIcon : defaultIcon}
      iconVariant={active ? activeIconVariant : defaultIconVariant}
      variant={active ? activeVariant : props.variant}
      onClick={handleToggle}
    >
      {children}
    </IconButton>
  );
};
