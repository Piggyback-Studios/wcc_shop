"use client";

import React, { useEffect } from "react";
import Link from "next/link";

import ContentContainer from "@/src/components/common/ContentContainer";
import { Order } from "@/src/shared/types";
import { useOrdersContext } from "@/src/context/Orders";
import toast from "@/src/utils/toast";

const OrdersListBlock = () => {
  const [ordersContext, setOrders] = useOrdersContext();
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders", { method: "GET" });
      const jsonRes = await res.json();
      setOrders({ orders: jsonRes.orders });
    } catch (err) {
      console.log(err);
      toast(
        "There was an issue fetching orders. Please reload the page to try again.",
        "error"
      );
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <section className="w-full flex justify-center">
      <ContentContainer>
        <h1 className="mb-8">Current Orders</h1>
        {ordersContext.orders.length ? (
          <table className="table-auto text-left md:table-fixed border-separate border-spacing-x-2 border-spacing-y-1 md:border-spacing-x-4 border-spacing-y-2">
            <thead>
              <tr>
                <th>Order ID#</th>
                <th>Customer Name</th>
                <th>Street Address Line 1</th>
                <th className="hidden md:table-cell">Street Address Line 2</th>
                <th className="hidden md:table-cell">Paid</th>
                <th>Shipped</th>
              </tr>
            </thead>
            {ordersContext.orders.map(
              (
                {
                  id,
                  shippingName,
                  shippingStreetAddress,
                  shippingState,
                  shippingMunicipality,
                  shippingZip,
                  paid,
                  shipped,
                }: Order,
                idx: number
              ) => (
                <tr key={idx}>
                  <td>
                    <Link href={`/admin/orders/edit/${id}`}>{id}</Link>
                  </td>
                  <td>{shippingName}</td>
                  <td>{shippingStreetAddress}</td>
                  <td className="hidden md:table-cell">{`${shippingMunicipality}, ${shippingState} ${shippingZip}`}</td>
                  <td className="hidden md:table-cell">{paid}</td>
                  <td>{shipped}</td>
                </tr>
              )
            )}
          </table>
        ) : (
          <p>No orders created yet...</p>
        )}
      </ContentContainer>
    </section>
  );
};

export default OrdersListBlock;
