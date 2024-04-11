// need to track address, email, products. quantity

import { Product } from "./product.types";

interface IOrderProduct extends Product {
  quantityOrdered: number;
}

export type Order = {
  userId: string;
  products: IOrderProduct[];
  paymentId: string;
  status: "PAID" | "PROCESSING" | "SHIPPED";
};
