import bcrypt from "bcrypt";
import Stripe from "stripe";

import db from "@/src/utils/data/db";
import { Product } from "@prisma/client";

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
  await db.user.upsert({
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
};

const createProducts = async () => {
  const priceInt = 1999;
  const stripe = new Stripe(process.env.STRIPE_SK!);
  for (let i = 0; i < 12; i++) {
    const { name, id, description, default_price } =
      await stripe.products.create({
        name: `Seeded Product ${i + 1}`,
        description: `Seeded product ${i + 1} description.`,
        default_price_data: {
          currency: "usd",
          unit_amount: priceInt,
        },
        active: true,
      });
    await db.product.create({
      data: {
        name: name,
        stripeId: id,
        description: description || "",
        price: priceInt,
        imageUrl: "/images/test/product-image.jpg",
        priceId: default_price as string,
        quantity: 0,
        active: true,
      },
    });
  }
};

const createCategories = async () => {
  const categories = await db.category.createManyAndReturn({
    data: [
      {
        name: "Winter 2024",
        description: "Winter 2024 Collection Description",
        imageUrl: "images/test/product-image.jpg",
        active: true,
      },
      {
        name: "Spring 2025",
        description: "Spring 2025 Collection Description",
        imageUrl: "images/test/product-image.jpg",
        active: true,
      },
      {
        name: "Fall 2025",
        description: "Fall 2025 Collection Description",
        imageUrl: "images/test/product-image.jpg",
        active: true,
      },
      {
        name: "Winter 2025",
        description: "Winter 2025 Collection Description",
        imageUrl: "images/test/product-image.jpg",
        active: true,
      },
    ],
  });
  const products = await db.product.findMany();
  products.forEach(async (product) => {
    for (let i = 0; i < 3; i++) {
      const random = Math.floor(Math.random() * categories.length);
      const randomCat = categories[random];
      await db.productCategories.create({
        data: {
          categoryId: randomCat.id,
          productId: product.id,
        },
      });
    }
  });
};

const createOrders = async () => {
  // unpaid order (customer never completed purchase)
  const unpaidProducts = await db.product.findMany({
    where: {
      id: {
        // Only fetch products with even IDs
        in: await db.product
          .findMany({
            select: { id: true },
          })
          .then((products) =>
            products.filter((p) => p.id % 2 === 0).map((p) => p.id)
          ),
      },
    },
  });
  await db.order.create({
    data: {
      paid: false,
      shipped: false,
      customerEmail: "test1@piggybackstudios.co",
      // these are 'orderproduct' records - not 'product' records
      products: {
        connect: unpaidProducts.map((product) => ({ id: product.id })),
      },
    },
  });

  // paid order (customer completed purchase)
  const paidProducts = await db.product.findMany({
    where: {
      id: {
        // Only fetch products with even IDs
        in: await db.product
          .findMany({
            select: { id: true },
          })
          .then((products) =>
            products.filter((p) => p.id % 2 === 1).map((p) => p.id)
          ),
      },
    },
  });
  await db.order.create({
    data: {
      paymentId: "1234",
      paid: true,
      shipped: false,
      customerEmail: "test2@piggybackstudios.co",
      shippingName: "Shipping Name Here",
      shippingStreetAddress: "123 Main St.",
      shippingCity: "Colorado Springs",
      shippingPostalCode: "80909",
      shippingState: "CO",
      orderDate: new Date(),
      products: {
        connect: paidProducts.map((product) => ({ id: product.id })),
      },
    },
  });

  // shipped order (admin marked shipped in db)
  const shippedProducts = await db.product.findMany({
    where: {
      id: {
        // Only fetch products with even IDs
        in: await db.product
          .findMany({
            select: { id: true },
          })
          .then((products) =>
            products.filter((p) => p.id % 3 === 0).map((p) => p.id)
          ),
      },
    },
  });
  await db.order.create({
    data: {
      paymentId: "5678",
      paid: true,
      shipped: true,
      customerEmail: "test3@piggybackstudios.co",
      shippingName: "Shipping Name Here",
      shippingStreetAddress: "123 Main St.",
      shippingCity: "Colorado Springs",
      shippingPostalCode: "80909",
      shippingState: "CO",
      orderDate: new Date(),
      products: {
        connect: shippedProducts.map((product) => ({
          id: product.id,
        })),
      },
    },
  });
};

async function main() {
  await createUserTypes();
  await createUsers();
  await createProducts();
  await createCategories();
  await createOrders();
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
