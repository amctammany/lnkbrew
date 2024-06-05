import {
  EquipmentProfile,
  MashProfile,
  MashStep,
  WaterProfile,
} from "@prisma/client";
import { BaseUser } from "./User";
export type ExtendedEquipmentProfile = EquipmentProfile & { owner?: BaseUser };
export type ExtendedWaterProfile = WaterProfile & { owner?: BaseUser };
export type ExtendedMashProfile = MashProfile & {
  owner?: BaseUser;
  steps: MashStep[];
};
