import { UserPreferences, User } from "@prisma/client";

export type BaseUser = Pick<User, "name" | "email" | "id" | "username">;
export type Preferences = Partial<Omit<UserPreferences, "userId">>;
