"use client";
import UserProvider, { UserContext } from "@/app/UserProvider";
import { IconButton } from "@/components/Button/IconButton";
import { SolidStarIcon, StarIcon } from "@/components/Icon/StarIcon";
import { UserPreferences } from "@prisma/client";
import clsx from "clsx";
import { User } from "next-auth";
import React, { use } from "react";
import { SubmitHandler } from "react-hook-form";

export type FavButtonProps = {
  //name: keyof Omit<UserPreferences, "userId">;
  name: Exclude<
    keyof UserPreferences,
    | "gravityUnit"
    | "temperatureUnit"
    | "userId"
    | "volumeUnit"
    | "hopMassUnit"
    | "colorUnit"
    | "timeUnit"
    | "fermentableMassUnit"
  >;

  action?: any;
  id?: number;
  label?: string | React.ReactNode;
  //isActive?: boolean;
};
export function FavButton({
  label,
  action,
  name,
  //isActive,
  id,
}: FavButtonProps) {
  //const onSubmit: SubmitHandler<Partial<UserPreferences>> = (data) => {
  //const body = new FormData();
  //body.append(name, (isActive ? 0 : id).toString());
  //action(body);
  //};

  const user = use(UserContext);
  const isActive = user?.[name] === id;
  const className = clsx(
    "border hover:text-red-300  hover:bg-white text-white rounded-md ",
    {
      "bg-blue-300": isActive,
      "bg-red-300": !isActive,
    }
  );
  const handleAction = async () => {
    const res = await user.toggleUserFavorite?.(
      user.userId,
      name,
      isActive ? null : id!
    );
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
