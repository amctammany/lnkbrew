import { Recipe } from "@prisma/client";
import { BaseUser } from "./User";
import { BaseStyle } from "./Style";
export type ExtendedRecipe = Recipe & {
  owner?: BaseUser;
  origin?: Recipe | null;
  style?: BaseStyle | null;
};
