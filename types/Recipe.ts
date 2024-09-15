import {
  EquipmentProfile,
  Fermentable,
  FermentableIngredient,
  Hop,
  HopIngredient,
  Recipe,
} from "@prisma/client";
import { BaseUser } from "./User";
import { BaseStyle } from "./Style";
export type ExtendedRecipe = Recipe & {
  owner?: BaseUser;
  origin?: Recipe | null;
  style?: BaseStyle | null;
  equipmentProfile?: EquipmentProfile;
  fermentables: ExtendedFermentableIngredient[];
  hops: ExtendedHopIngredient[];
};
export type ExtendedFermentableIngredient = FermentableIngredient & {
  fermentable: Pick<Fermentable, "id" | "name" | "potential" | "color">;
};
export type ExtendedHopIngredient = HopIngredient & {
  hop: Pick<Hop, "id" | "name" | "alpha">;
};

/**
export type ExtendedHopIngredient = HopIngredient & {
  recipe: Recipe;
  hop?: Hop;
};
export type ExtendedFermentableIngredient = FermentableIngredient & {
  recipe: Recipe;
  fermentable: Fermentable;
};
*/
