import bcrypt from "bcrypt";

import db from "@/src/utils/data/db";

const createUserTypes = async () => {
  await db.userType.upsert({
    where: { userType: "admin" },
    update: {},
    create: {
      userType: "admin",
    },
  });
  await db.userType.upsert({
    where: { userType: "customer" },
    update: {},
    create: {
      userType: "customer",
    },
  });
  await db.userType.upsert({
    where: { userType: "owner" },
    update: {},
    create: {
      userType: "owner",
    },
  });
};

const createUsers = async () => {
  const userType = await db.userType.findFirstOrThrow({
    where: { userType: "owner" },
  });
  const hashedPw = await bcrypt.hash("123456", 10);
  const louie = await db.user.upsert({
    where: { email: "louie@piggybackstudios.co" },
    update: {},
    create: {
      email: "louie@piggybackstudios.co",
      firstName: "Louie",
      lastName: "Williford",
      password: hashedPw,
      type: {
        connect: {
          id: userType.id,
        },
      },
    },
  });
  console.log({ louie });
};

async function main() {
  await createUserTypes();
  await createUsers();
}

main()
  .then(async () => {
    await db.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
