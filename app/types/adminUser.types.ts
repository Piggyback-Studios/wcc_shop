import { User } from "./user.types";

export type AdminUser = User & {
  adminLevel: "owner" | "editor" | "basic";
};
