import {
  EquipmentProfile,
  MashProfile,
  MashStep,
  WaterProfile,
} from "@prisma/client";
import { BaseUser } from "./User";
export type ExtendedEquipmentProfile = EquipmentProfile & { owner?: BaseUser };
export type ExtendedWaterProfile = WaterProfile & { owner?: BaseUser };
export type ExtendedMashProfile = Omit<MashProfile, "id"> & {
  owner?: BaseUser;
  id?: number;
  steps: MashStep[];
  //steps: Omit<MashStep, "mashProfileId">[];
};
export type MashProfileInput = Omit<MashProfile, "id"> & {
  id?: number;
  steps: Omit<MashStep, "id" | "userId" | "mashProfileId">[];
};
