import { User } from "@prisma/client";

export type BaseUser = Pick<User, "name" | "email" | "id" | "username">;
