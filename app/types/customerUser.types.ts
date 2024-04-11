// need to track address, payments email etc
import { User } from "./user.types";

export type CustomerUser = User & {
  id: string;
  addressLineOne: string;
  addressLineTwo: string;
  stripeId: string;
};
