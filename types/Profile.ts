import { EquipmentProfile, WaterProfile } from "@prisma/client";
import { BaseUser } from "./User";
export type ExtendedEquipmentProfile = EquipmentProfile & { owner?: BaseUser };
export type ExtendedWaterProfile = WaterProfile & { owner?: BaseUser };
