import { Recipe, Style } from "@prisma/client";
import { BaseUser } from "./User";
//import { BaseUser } from "./User";
export type BaseStyle = Pick<
  Style,
  "id" | "name" | "identifier" | "subcategoryId"
>;
//export type BaseStyle = Omit<Style, "recipes" | "owner"> & {
//recipes: Recipe[];
//owner?: BaseUser;
//};
