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
  const louie = await db.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      firstName: "Louie",
      lastName: "Williford",
      password: "123",
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
