import {
  TimeUnit,
  UserColorPreference,
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
  | "color"
  | "percent"
  | "time"
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
export const timeConverters: Record<TimeUnit, Converter> = {
  min: (v) => v,
  hr: (v) => v / 60,
  day: (v) => v / (60 * 24),
};

export const gravityConverters: Record<UserGravityPreference, Converter> = {
  P: (v) => v,
  SG: (v) => 1 + v / (258.6 - (v / 258.2) * 227.1),
};
export const colorConverters: Record<UserColorPreference, Converter> = {
  L: (v) => v,
  SRM: (v) => v * 1.35 - 0.6,
};

export type UnitTypes =
  | UserColorPreference
  | UserMassPreference
  | UserVolumePreference
  | UserGravityPreference
  | UserTemperaturePreference;
export const converters: Record<AmountType, any> = {
  color: (type: UserColorPreference) => colorConverters[type],
  time: (type: TimeUnit) => timeConverters[type],
  mass: (type: UserMassPreference) => massConverters[type],
  hopMass: (type: UserMassPreference) => massConverters[type],
  fermentableMass: (type: UserMassPreference) => massConverters[type],
  volume: (type: UserVolumePreference) => volumeConverters[type],
  temperature: (type: UserTemperaturePreference) => temperatureConverters[type],
  gravity: (type: UserGravityPreference) => gravityConverters[type],
  percent: (v: number) => 100 * v,
};

export function getConverterUnits(prefs: Partial<UserPreferences>) {
  return {
    color: prefs.colorUnit === "L" ? "°L" : prefs.colorUnit,
    percent: "%",
    time: prefs.timeUnit,
    mass: prefs.hopMassUnit,
    hopMass: prefs.hopMassUnit,
    fermentableMass: prefs.fermentableMassUnit,
    volume: prefs.volumeUnit,
    temperature: prefs.temperatureUnit,
    gravity: prefs.gravityUnit,
  };
}
export function getConverters(prefs: Partial<UserPreferences>) {
  return {
    color: converters.color(prefs.colorUnit),
    percent: converters.percent,
    time: converters.time(prefs.timeUnit),
    mass: converters.mass(prefs.hopMassUnit),
    hopMass: converters.mass(prefs.hopMassUnit),
    fermentableMass: converters.mass(prefs.fermentableMassUnit),
    volume: converters.volume(prefs.volumeUnit),
    temperature: converters.temperature(prefs.temperatureUnit),
    gravity: converters.temperature(prefs.gravityUnit),
  };
}
