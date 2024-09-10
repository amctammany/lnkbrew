import { Recipe } from "@prisma/client";
import { BaseUser } from "./User";

export type ExtendedRecipe = Recipe & {
  owner?: BaseUser;
  origin?: Recipe;
};
