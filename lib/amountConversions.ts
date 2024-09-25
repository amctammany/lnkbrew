import {
  TimeUnit,
  UserColorPreference,
  UserGravityPreference,
  UserMassPreference,
  UserPreferences,
  UserTemperaturePreference,
  UserVolumePreference,
} from "@prisma/client";
//import { AmountType } from "../Form/AmtField";
export type Converter<S = number, T = number> =
  | [(value: S) => T, (value: T) => S]
  | S;
export type MassConverter<T = MassValue> = (value: number) => T;
export type AmountType =
  | "flow"
  | "concentration"
  | "color"
  | "percent"
  | "percentage"
  | "time"
  | "mass"
  | "potential"
  | "hopMass"
  | "fermentableMass"
  | "volume"
  | "temperature"
  | "gravity"
  | "unit";
const gramToOunce: MassConverter<number> = (v) => v * 0.035274;

type MassValue = number | [number, number];
export const massConverters: Record<
  UserMassPreference,
  Converter<MassValue, MassValue>
> = {
  g: 1, //(value) => value,
  Kg: 1 / 1000, //(v) => v / 1000,
  Lb: 1 / 454, //(v) => v / 454,
  LbOz: [
    (v) => (Array.isArray(v) ? v : [Math.floor(v / 454), gramToOunce(v % 454)]),
    (v) => (Array.isArray(v) ? v : [Math.floor(v / 454), gramToOunce(v % 454)]),
  ],
  Oz: 0.035274, //gramToOunce,
};
export const volumeConverters: Record<UserVolumePreference, Converter> = {
  L: 1, //(v) => v,
  gal: 0.264172, //(v) => v * 0.264172,
  bbl: 0.008522, //(v) => v * 0.008522,
};
export const temperatureConverters: Record<
  UserTemperaturePreference,
  Converter
> = {
  F: 1,
  C: [(v) => (v - 32) * (5 / 9), (v) => (9 / 5) * v + 32],
};
export const timeConverters: Record<TimeUnit, Converter> = {
  min: 1, //(v) => v,
  hr: 1 / 60, //(v) => v / 60,
  day: 1 / (60 * 24), //(v) => v / (60 * 24),
};

export const gravityConverters: Record<UserGravityPreference, Converter> = {
  P: 1,
  SG: [
    (v) => 1 + v / (258.6 - (v / 258.2) * 227.1),
    (v) => 1 + v / (258.6 - (v / 258.2) * 227.1),
  ],
};
export const colorConverters: Record<UserColorPreference, Converter> = {
  L: 1,
  SRM: [(v) => v * 1.35 - 0.6, (v) => (v + 0.6) / 1.35],
};
export const percentConverters: Record<string, Converter> = {
  "%": 100,
};
export const percentageConverters: Record<string, Converter> = {
  "%": 1,
};

export const concentrationConverters: Record<string, Converter> = {
  ppm: 1, // / 100,
  ppb: 1 / 1000,
};
export const flowConverters: Record<string, Converter> = {
  "gal/hr": 1,
  "gal/min": 1 / 60,
};
export type UnitTypes =
  | UserColorPreference
  | UserMassPreference
  | UserVolumePreference
  | UserGravityPreference
  | UserTemperaturePreference
  | "°Lintner"
  | "PPG"
  | "g/mL";
export const rawConverters: Record<AmountType, any> = {
  unit: { unit: 1 },
  potential: { ppg: 1 },
  flow: flowConverters,
  concentration: concentrationConverters,
  color: colorConverters,
  time: timeConverters,
  mass: massConverters,
  hopMass: massConverters,
  fermentableMass: massConverters,
  volume: volumeConverters,
  temperature: temperatureConverters,
  gravity: gravityConverters,
  percent: percentConverters,
  percentage: percentageConverters,
};
export type ConverterClass<S = number> = {
  to: (v: number) => S;
  from: (v: S) => number;
};
function makeClassConverter(src: Converter): ConverterClass {
  if (Array.isArray(src)) {
    return { to: src[0], from: src[1] };
  }
  return { to: (v: number) => v * src, from: (v: number) => v / src };
}
function makeClassConverters(src: Record<UnitTypes, Converter>) {
  return Object.entries(src).reduce((acc, [k, v]) => {
    acc[k as UnitTypes] = makeClassConverter(v);
    return acc;
  }, {} as Record<UnitTypes, ConverterClass>);
}
export const classConverters = Object.entries(rawConverters).reduce(
  (acc, [k, raw]) => {
    acc[k as AmountType] = makeClassConverters(raw);
    return acc;
  },
  {} as Record<AmountType, Record<UnitTypes, ConverterClass>>
);

export const converters: Record<AmountType, any> = {
  potential: () => (v: number) => v,
  unit: () => (v: number) => v,
  flow: () => (v: number) => v,
  color: (type: UserColorPreference = "L") => colorConverters[type],
  time: (type: TimeUnit = "min") => timeConverters[type],
  mass: (type: UserMassPreference = "Lb") => massConverters[type],
  hopMass: (type: UserMassPreference = "Oz") => massConverters[type],
  fermentableMass: (type: UserMassPreference = "Lb") => massConverters[type],
  volume: (type: UserVolumePreference = "gal") => volumeConverters[type],
  temperature: (type: UserTemperaturePreference = "F") =>
    temperatureConverters[type],
  gravity: (type: UserGravityPreference = "SG") => gravityConverters[type],
  percent: (v: number) => v * 100,
  percentage: (v: number) => v * 1,
  concentration: (v: number) => v * 1,
};
const conversionOptions: Record<AmountType, Record<string, string>> = {
  unit: { item: "item", group: "group" },
  color: { ...UserColorPreference, L: "°L" },
  flow: { "gal/hr": "gal/hr", "l/min": "l/min" },
  concentration: { ppm: "ppm", ppb: "ppb" },
  time: TimeUnit,
  mass: UserMassPreference,
  hopMass: UserMassPreference,
  fermentableMass: UserMassPreference,
  volume: UserVolumePreference,
  gravity: UserGravityPreference,
  temperature: UserTemperaturePreference,
  potential: { ppg: "ppg" },
  percent: { "%": "%" },
  percentage: { "%": "%" },
};
export function getConversionOptions(amountType: AmountType) {
  return Object.entries(conversionOptions[amountType]);
}
export function getConverterUnits(prefs: Partial<UserPreferences>) {
  return {
    color: prefs.color === "L" ? "°L" : prefs.color,
    potential: "ppg",
    unit: undefined,
    flow: "gal/min",
    percent: "%",
    percentage: "%",
    concentration: "ppm",
    time: prefs.time,
    mass: prefs.hopMass,
    hopMass: prefs.hopMass,
    fermentableMass: prefs.fermentableMass,
    volume: prefs.volume,
    temperature: prefs.temperature,
    gravity: prefs.gravity,
  };
}
export function getConverters(prefs: Partial<UserPreferences>) {
  return {
    potential: (v: number) => v,
    unit: (v: number) => v,
    flow: (v: number) => v,
    concentration: converters.concentration,
    color: converters.color(prefs.color),
    percent: converters.percent,
    percentage: converters.percentage,
    time: converters.time(prefs.time),
    mass: converters.mass(prefs.hopMass),
    hopMass: converters.mass(prefs.hopMass),
    fermentableMass: converters.mass(prefs.fermentableMass),
    volume: converters.volume(prefs.volume),
    temperature: converters.temperature(prefs.temperature),
    gravity: converters.temperature(prefs.gravity),
  };
}
