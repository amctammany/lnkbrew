"use client";
//import Link, { LinkProps } from "next/link";
import { IconProps } from "../Icon/Icon";
import { ButtonProps } from "./Button";
import { IconNames } from "../Icon";
import { useState } from "react";
import { IconButton, IconButtonProps } from "./IconButton";

export type ToggleButtonProps = Omit<
  IconButtonProps,
  "iconType" | "iconVariant"
> & {
  defaultIconVariant?: IconProps["variant"];
  activeIconVariant?: IconProps["variant"];
  activeVariant?: ButtonProps["variant"];
  activeIconType?: IconNames;
  defaultIconType?: IconNames;
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
  const activeIconType = props.activeIconType ?? "MinimizeIcon";
  const defaultIconType = props.defaultIconType ?? "MaximizeIcon";
  const activeIconVariant = props.activeIconVariant ?? "default";
  const defaultIconVariant = props.defaultIconVariant ?? "default";

  return (
    <IconButton
      {...props}
      iconType={active ? activeIconType : defaultIconType}
      iconVariant={active ? activeIconVariant : defaultIconVariant}
      variant={active ? activeVariant : props.variant}
      onClick={handleToggle}
    >
      {children}
    </IconButton>
  );
};
