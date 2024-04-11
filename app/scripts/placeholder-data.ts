import Stripe from "stripe";

import { AdminUser } from "../types/adminUser.types";
import { CustomerUser } from "../types/customerUser.types";

export const adminUsers: AdminUser[] = [
  {
    id: "410544b2-4001-1271-9855-fec4b6a6447a",
    firstName: "Owner",
    lastName: "Admin",
    email: "adminOne@email.com",
    password: "123456",
    adminLevel: "owner",
  },
  {
    id: "410544b2-4001-4271-9855-ffdc4b6a6492a",
    firstName: "Editor",
    lastName: "Admin",
    email: "adminTwo@email.com",
    password: "123456",
    adminLevel: "editor",
  },
  {
    id: "410544b2-4001-4271-7455-fec4b6a6442a",
    firstName: "Basic",
    lastName: "Admin",
    email: "adminThree@email.com",
    password: "123456",
    adminLevel: "basic",
  },
];

export const preCustomerUsers: CustomerUser[] = [
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    firstName: "Delba",
    lastName: "de Oliviera",
    email: "delba@oliveira.com",
    password: "123456",
    stripeId: "",
    addressLineOne: "",
    addressLineTwo: "",
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    firstName: "Lee",
    lastName: "Robinson",
    email: "lee@robinson.com",
    password: "123456",
    stripeId: "",
    addressLineOne: "",
    addressLineTwo: "",
  },
  {
    id: "3958dc9e-737f-4377-85e9-fec4b6a6442a",
    firstName: "Hector",
    lastName: "Simpson",
    email: "hector@simpson.com",
    password: "123456",
    stripeId: "",
    addressLineOne: "",
    addressLineTwo: "",
  },
  {
    id: "50ca3e18-62cd-11ee-8c99-0242ac120002",
    firstName: "Steven",
    lastName: "Tey",
    email: "steven@tey.com",
    password: "123456",
    stripeId: "",
    addressLineOne: "",
    addressLineTwo: "",
  },
  {
    id: "3958dc9e-787f-4377-85e9-fec4b6a6442a",
    firstName: "Steph",
    lastName: "Dietz",
    email: "steph@dietz.com",
    password: "123456",
    stripeId: "",
    addressLineOne: "",
    addressLineTwo: "",
  },
  {
    id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
    firstName: "Michael",
    lastName: "Novotny",
    email: "michael@novotny.com",
    password: "123456",
    stripeId: "",
    addressLineOne: "",
    addressLineTwo: "",
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    firstName: "Evil",
    lastName: "Rabbit",
    email: "evil@rabbit.com",
    password: "123456",
    stripeId: "",
    addressLineOne: "",
    addressLineTwo: "",
  },
];

// need to update the dummy customers into stripe if they already arent
const stripe = new Stripe(process.env.STRIPE_SK || "");
export const customerUsers = preCustomerUsers.map(
  async (customer: CustomerUser) => {
    const stripeCustomer = await stripe.customers.create({
      name: `${customer.firstName} ${customer.lastName}`,
      email: customer.email,
    });
    customer.stripeId = stripeCustomer.id;
  }
);

// const invoices = [
//   {
//     customer_id: customerUsers[0].id,
//     amount: 15795,
//     status: "pending",
//     date: "2022-12-06",
//   },
//   {
//     customer_id: customerUsers[1].id,
//     amount: 20348,
//     status: "pending",
//     date: "2022-11-14",
//   },
//   {
//     customer_id: customerUsers[4].id,
//     amount: 3040,
//     status: "paid",
//     date: "2022-10-29",
//   },
//   {
//     customer_id: customerUsers[3].id,
//     amount: 44800,
//     status: "paid",
//     date: "2023-09-10",
//   },
//   {
//     customer_id: customerUsers[5].id,
//     amount: 34577,
//     status: "pending",
//     date: "2023-08-05",
//   },
//   {
//     customer_id: customerUsers[7].id,
//     amount: 54246,
//     status: "pending",
//     date: "2023-07-16",
//   },
//   {
//     customer_id: customerUsers[6].id,
//     amount: 666,
//     status: "pending",
//     date: "2023-06-27",
//   },
//   {
//     customer_id: customerUsers[3].id,
//     amount: 32545,
//     status: "paid",
//     date: "2023-06-09",
//   },
//   {
//     customer_id: customerUsers[4].id,
//     amount: 1250,
//     status: "paid",
//     date: "2023-06-17",
//   },
//   {
//     customer_id: customerUsers[5].id,
//     amount: 8546,
//     status: "paid",
//     date: "2023-06-07",
//   },
//   {
//     customer_id: customerUsers[1].id,
//     amount: 500,
//     status: "paid",
//     date: "2023-08-19",
//   },
//   {
//     customer_id: customerUsers[5].id,
//     amount: 8945,
//     status: "paid",
//     date: "2023-06-03",
//   },
//   {
//     customer_id: customerUsers[2].id,
//     amount: 8945,
//     status: "paid",
//     date: "2023-06-18",
//   },
//   {
//     customer_id: customerUsers[0].id,
//     amount: 8945,
//     status: "paid",
//     date: "2023-10-04",
//   },
//   {
//     customer_id: customerUsers[2].id,
//     amount: 1000,
//     status: "paid",
//     datePlaced: "2022-06-05",
//   },
// ];

// const revenue = [
//   { month: "Jan", revenue: 2000 },
//   { month: "Feb", revenue: 1800 },
//   { month: "Mar", revenue: 2200 },
//   { month: "Apr", revenue: 2500 },
//   { month: "May", revenue: 2300 },
//   { month: "Jun", revenue: 3200 },
//   { month: "Jul", revenue: 3500 },
//   { month: "Aug", revenue: 3700 },
//   { month: "Sep", revenue: 2500 },
//   { month: "Oct", revenue: 2800 },
//   { month: "Nov", revenue: 3000 },
//   { month: "Dec", revenue: 4800 },
// ];

module.exports = {
  adminUsers,
  customerUsers,
  // invoices,
  // revenue,
};
