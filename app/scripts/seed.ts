import { db, VercelPoolClient } from "@vercel/postgres";
import { customerUsers, adminUsers } from "./placeholder-data";
import bcrypt from "bcrypt";
import { AdminUser } from "../types/adminUser.types.js";

async function seedAdminUsers(client: VercelPoolClient) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "adminUsers" table if it doesn't exist
    // CREATE TABLE IF NOT EXISTS adminUsers (
    //   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    //   firstName VARCHAR(255) NOT NULL,
    //   lastName VARCHAR(255) NOT NULL,
    //   email TEXT NOT NULL UNIQUE,
    //   password TEXT NOT NULL,
    //   adminLevel TEXT NOT NULL
    // );
    const createTable = await client.sql`
      select * from adminUsers;
    `;

    console.log(`Created "adminUsers" table`);

    // Insert data into the "adminUsers" table
    // const insertedAdminUsers = await Promise.all(
    //   adminUsers.map(async (user: AdminUser) => {
    //     const hashedPassword = await bcrypt.hash(user.password, 10);
    //     return client.sql`
    //     INSERT INTO adminUsers (id, firstName, lastName, email, password, adminLevel)
    //     VALUES (${user.id}, ${user.firstName}, ${user.lastName}, ${user.email}, ${hashedPassword}, ${user.adminLevel})
    //     ON CONFLICT (id) DO NOTHING;
    //   `;
    //   })
    // );

    // console.log(`Seeded ${insertedAdminUsers.length} adminUsers`);

    return {
      createTable,
      // adminUsers: insertedAdminUsers,
    };
  } catch (error) {
    console.error("Error seeding adminUsers:", error);
    throw error;
  }
}

async function seedCustomerUsers(client: VercelPoolClient) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customerUsers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);
    console.log(createTable);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customerUsers.map(
        (customer: any) => client.sql`
        INSERT INTO customerUsers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error("Error seeding customers:", error);
    throw error;
  }
}

// async function seedInvoices(client: VercelPoolClient) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     // Create the "invoices" table if it doesn't exist
//     const createTable = await client.sql`
//     CREATE TABLE IF NOT EXISTS invoices (
//     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//     customer_id UUID NOT NULL,
//     amount INT NOT NULL,
//     status VARCHAR(255) NOT NULL,
//     date DATE NOT NULL
//   );
// `;

//     console.log(`Created "invoices" table`);

//     // Insert data into the "invoices" table
//     const insertedInvoices = await Promise.all(
//       invoices.map(
//         (invoice: any) => client.sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//         ON CONFLICT (id) DO NOTHING;
//       `
//       )
//     );

//     console.log(`Seeded ${insertedInvoices.length} invoices`);

//     return {
//       createTable,
//       invoices: insertedInvoices,
//     };
//   } catch (error) {
//     console.error("Error seeding invoices:", error);
//     throw error;
//   }
// }

// async function seedRevenue(client: VercelPoolClient) {
//   try {
//     // Create the "revenue" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS revenue (
//         month VARCHAR(4) NOT NULL UNIQUE,
//         revenue INT NOT NULL
//       );
//     `;

//     console.log(`Created "revenue" table`);

//     // Insert data into the "revenue" table
//     const insertedRevenue = await Promise.all(
//       revenue.map(
//         (rev: any) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `
//       )
//     );

//     console.log(`Seeded ${insertedRevenue.length} revenue`);

//     return {
//       createTable,
//       revenue: insertedRevenue,
//     };
//   } catch (error) {
//     console.error("Error seeding revenue:", error);
//     throw error;
//   }
// }

async function main() {
  const client = await db.connect();
  const promises = [
    await seedAdminUsers(client),
    await seedCustomerUsers(client),
    // await seedInvoices(client),
    // await seedRevenue(client),
  ];
  Promise.all(promises)
    .then(() => {
      console.log("Db Seeded!");
    })
    .catch((err: any) => {
      console.log("Error:", err);
    });
  return;
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
