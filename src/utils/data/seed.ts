import { db, VercelPoolClient } from "@vercel/postgres";
import bcrypt from "bcrypt";
import Stripe from "stripe";
import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";

async function seedProducts(client: VercelPoolClient) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        stripe_id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(5000),
        price BIGINT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        quantity BIGINT NOT NULL,
        active BOOLEAN NOT NULL
      );
    `;
  console.log(`Created "products" table`);

  const stripe = new Stripe(process.env.STRIPE_SK || "");
  const products = await stripe.products.list();

  products.data.map(async (product, idx) => {
    if (product.default_price) {
      const price = await stripe.prices.retrieve(
        product.default_price as string
      );
      const quantity = Math.floor(Math.random() * (25 - 1) + 25);
      client.sql`
        INSERT INTO products 
        (id, stripe_id, name, description, price, image_url, quantity, active) 
        VALUES (${uuid()}, ${product.id}, ${product.name}, ${
        product.description
      }, ${price.unit_amount}, ${product.images[0]}, ${quantity}, ${
        product.active
      });
      `;
    }
  });
}

async function seedCategories(client: VercelPoolClient) {}

async function seedProductCategories(client: VercelPoolClient) {}

async function seedAdminUsers(client: VercelPoolClient) {
  // try {
  //   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  //   // Create the "adminUsers" table if it doesn't exist
  //   const createTable = await client.sql`
  //     CREATE TABLE IF NOT EXISTS adminUsers (
  //       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  //       firstName VARCHAR(255) NOT NULL,
  //       lastName VARCHAR(255) NOT NULL,
  //       email TEXT NOT NULL UNIQUE,
  //       password TEXT NOT NULL,
  //       adminLevel TEXT NOT NULL
  //     );
  //   `;
  //   console.log(`Created "adminUsers" table`);
  //   // Insert data into the "adminUsers" table
  //   const insertedAdminUsers = await Promise.all(
  //     adminUsers.map(async (user: AdminUser) => {
  //       const hashedPassword = await bcrypt.hash(user.password, 10);
  //       return client.sql`
  //       INSERT INTO adminUsers (id, firstName, lastName, email, password, adminLevel)
  //       VALUES (${user.id}, ${user.firstName}, ${user.lastName}, ${user.email}, ${hashedPassword}, ${user.adminLevel})
  //       ON CONFLICT (id) DO NOTHING;
  //     `;
  //     })
  //   );
  //   // console.log(`Seeded ${insertedAdminUsers.length} adminUsers`);
  //   return {
  //     createTable,
  //     // adminUsers: insertedAdminUsers,
  //   };
  // } catch (error) {
  //   console.error("Error seeding adminUsers:", error);
  //   throw error;
  // }
}

async function seedCustomerUsers(client: VercelPoolClient) {
  // try {
  //   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  //   // Create the "customers" table if it doesn't exist
  //   const createTable = await client.sql`
  //     CREATE TABLE IF NOT EXISTS customerUsers (
  //       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  //       name VARCHAR(255) NOT NULL,
  //       email VARCHAR(255) NOT NULL,
  //       image_url VARCHAR(255) NOT NULL
  //     );
  //   `;
  //   console.log(`Created "customers" table`);
  //   console.log(createTable);
  //   // Insert data into the "customers" table
  //   const insertedCustomers = await Promise.all(
  //     customerUsers.map(
  //       (customer: any) => client.sql`
  //       INSERT INTO customerUsers (id, name, email, image_url)
  //       VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
  //       ON CONFLICT (id) DO NOTHING;
  //     `
  //     )
  //   );
  //   console.log(`Seeded ${insertedCustomers.length} customers`);
  //   return {
  //     createTable,
  //     customers: insertedCustomers,
  //   };
  // } catch (error) {
  //   console.error("Error seeding customers:", error);
  //   throw error;
  // }
}

async function main() {
  const client = await db.connect();
  const promises = [
    await seedProducts(client),
    await seedAdminUsers(client),
    await seedCustomerUsers(client),
  ];
  Promise.all(promises)
    .then(() => {
      console.log("Db Seeded!");
      return;
    })
    .catch((err: any) => {
      console.log("Error:", err);
      return;
    });
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
