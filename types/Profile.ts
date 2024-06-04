import { EquipmentProfile, MashProfile, WaterProfile } from "@prisma/client";
import { BaseUser } from "./User";
export type ExtendedEquipmentProfile = EquipmentProfile & { owner?: BaseUser };
export type ExtendedWaterProfile = WaterProfile & { owner?: BaseUser };
export type ExtendedMashProfile = MashProfile & { owner?: BaseUser };
