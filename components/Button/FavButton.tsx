"use client";
import { IconButton } from "@/components/Button/IconButton";
import { SolidStarIcon, StarIcon } from "@/components/Icon/StarIcon";
import { UserPreferences } from "@prisma/client";
import clsx from "clsx";
import React from "react";
import { SubmitHandler } from "react-hook-form";

export type FavButtonProps = {
  name: any;
  action?: any;
  id?: number;
  label?: string | React.ReactNode;
  isActive?: boolean;
};
export function FavButton({
  label,
  action,
  name,
  isActive,
  id,
}: FavButtonProps) {
  //const onSubmit: SubmitHandler<Partial<UserPreferences>> = (data) => {
  //const body = new FormData();
  //body.append(name, (isActive ? 0 : id).toString());
  //action(body);
  //};

  const className = clsx(
    "border hover:text-red-300  hover:bg-white text-white rounded-md ",
    {
      "bg-blue-300": isActive,
      "bg-red-300": !isActive,
    }
  );
  const handleAction = async () => {
    const res = await action(isActive ? null : id);
  };
  return (
    <IconButton
      Icon={isActive ? SolidStarIcon : StarIcon}
      onClick={handleAction}
      className={className}
    >
      {label ?? "fav"}
    </IconButton>
  );
}

export default FavButton;
