import {
  EquipmentProfile,
  MashProfile,
  MashStep,
  WaterProfile,
} from "@prisma/client";
import { BaseUser } from "./User";
export type ExtendedEquipmentProfile = EquipmentProfile & {
  owner?: BaseUser;
  origin?: EquipmentProfile;
};
export type ExtendedWaterProfile = WaterProfile & {
  owner?: BaseUser;
  origin?: WaterProfile;
};
export type ExtendedMashProfile = Omit<MashProfile, "id"> & {
  owner?: BaseUser;
  origin?: MashProfile;
  id?: number;
  steps: MashStep[];
  //steps: Omit<MashStep, "mashProfileId">[];
};
export type MashProfileInput = Omit<MashProfile, "id"> & {
  id?: number;
  steps: Omit<MashStep, "id" | "userId" | "mashProfileId">[];
};
