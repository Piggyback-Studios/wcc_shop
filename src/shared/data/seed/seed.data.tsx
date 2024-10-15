import { AdminUser } from "@/src/shared/types";

import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";

export const adminUsers: AdminUser[] = [
  {
    id: uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    adminLevel: "owner",
  },
  {
    id: uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    adminLevel: "editor",
  },
  {
    id: uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    adminLevel: "basic",
  },
];
