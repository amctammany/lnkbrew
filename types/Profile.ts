import {
  EquipmentProfile,
  MashProfile,
  MashStep,
  WaterProfile,
} from "@prisma/client";
import { BaseUser } from "./User";
export type ExtendedEquipmentProfile = EquipmentProfile & {
  //id?: number;
  owner?: BaseUser;
  origin?: EquipmentProfile;
};
export type ExtendedWaterProfile = WaterProfile & {
  //id?: number;
  owner?: BaseUser;
  origin?: WaterProfile;
};
export type ExtendedMashProfile = MashProfile & {
  owner?: BaseUser;
  //id?: number;
  steps: MashStep[];
  origin?: MashProfile;
  //steps: Omit<MashStep, "mashProfileId">[];
};
export type WaterProfileInput = Omit<WaterProfile, "id"> & {
  id?: number;
  //steps: Omit<MashStep, "id" | "userId" | "mashProfileId">[];
};
export type EquipmentProfileInput = Omit<EquipmentProfile, "id"> & {
  id?: number;
  //steps: Omit<MashStep, "id" | "userId" | "mashProfileId">[];
};
export type MashProfileInput = Omit<MashProfile, "id"> & {
  id?: number;
  steps: Omit<MashStep, "id" | "userId" | "mashProfileId">[];
};
