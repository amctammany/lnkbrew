import {
  UserGravityPreference,
  UserMassPreference,
  UserPreferences,
  UserTemperaturePreference,
  UserVolumePreference,
} from "@prisma/client";
import { AmountType } from "../Form/AmtField";
export type Converter<T = any> = (value: number) => T;
export type MassConverter<T = MassValue> = (value: number) => T;
export type AmountType =
  | "mass"
  | "hopMass"
  | "fermentableMass"
  | "volume"
  | "temperature"
  | "gravity";
const gramToOunce: MassConverter<number> = (v) => v * 0.035274;

type MassValue = number | [number, number];
export const massConverters: Record<
  UserMassPreference,
  (value: number) => MassValue
> = {
  g: (value) => value,
  Kg: (v) => v / 1000,
  Lb: (v) => v / 454,
  LbOz: (v) => [Math.floor(v / 454), gramToOunce(v % 454)],
  Oz: gramToOunce,
};
export const volumeConverters: Record<UserVolumePreference, Converter> = {
  L: (v) => v,
  gal: (v) => v * 0.264172,
  bbl: (v) => v * 0.008522,
};
export const temperatureConverters: Record<
  UserTemperaturePreference,
  Converter
> = {
  F: (v) => v,
  C: (v) => (v - 32) * (5 / 9),
};
export const gravityConverters: Record<UserGravityPreference, Converter> = {
  P: (v) => v,
  SG: (v) => 1 + v / (258.6 - (v / 258.2) * 227.1),
};

export type UnitTypes =
  | UserMassPreference
  | UserVolumePreference
  | UserGravityPreference
  | UserTemperaturePreference;
export const converters: Record<AmountType, any> = {
  mass: (type: UserMassPreference) => massConverters[type],
  hopMass: (type: UserMassPreference) => massConverters[type],
  fermentableMass: (type: UserMassPreference) => massConverters[type],
  volume: (type: UserVolumePreference) => volumeConverters[type],
  temperature: (type: UserTemperaturePreference) => temperatureConverters[type],
  gravity: (type: UserGravityPreference) => gravityConverters[type],
};

export function getConverters(prefs: Partial<UserPreferences>) {
  return {
    mass: converters.mass(prefs.hopMassUnit),
    hopMass: converters.mass(prefs.hopMassUnit),
    fermentableMass: converters.mass(prefs.fermentableMassUnit),
    volume: converters.volume(prefs.volumeUnit),
    temperature: converters.temperature(prefs.temperatureUnit),
    gravity: converters.temperature(prefs.gravityUnit),
  };
}
