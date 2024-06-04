import { EquipmentProfile, User, WaterProfile, Prisma } from "@prisma/client";
export type BaseUser = Pick<User, "name" | "email" | "id" | "username"> | null;
export type ExtendedEquipmentProfile = EquipmentProfile & { owner?: BaseUser };
export type ExtendedWaterProfile = WaterProfile & { owner?: BaseUser };
