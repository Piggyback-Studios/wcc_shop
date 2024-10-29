import { AdminUser } from "@/src/shared/types";

import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";

const admin2First = faker.person.firstName();
const admin2Last = faker.person.lastName();
const admin2Rand = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

const admin3First = faker.person.firstName();
const admin3Last = faker.person.lastName();
const admin3Rand = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

export const adminUsers: AdminUser[] = [
  {
    id: uuid(),
    firstName: "Louie",
    lastName: "Williford",
    email: "louie@piggybackstudios.co",
    password: "123456",
    adminLevel: "owner",
  },
  {
    id: uuid(),
    firstName: admin2First,
    lastName: admin2Last,
    email: `${admin2First}.${admin2Last}${admin2Rand}@piggybackstudios.co`,
    password: faker.internet.password(),
    adminLevel: "editor",
  },
  {
    id: uuid(),
    firstName: admin3First,
    lastName: admin3Last,
    email: `${admin3First}.${admin3Last}${admin3Rand}@piggybackstudios.co`,
    password: faker.internet.password(),
    adminLevel: "basic",
  },
];
