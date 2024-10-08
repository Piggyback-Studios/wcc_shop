import React from "react";

import { useCartContext } from "@/src/context/Cart";
import Link from "next/link";
import CartSummaryItem from "@/src/components/CartSummaryItem";
import ContentContainer from "@/src/components/common/ContentContainer";

const CartSummary = () => {
  const [cart] = useCartContext();
  return (
    <section>
      <ContentContainer>
        {cart?.cartItems.length
          ? cart?.cartItems.map((cartItem) => (
              <CartSummaryItem
                {...cartItem}
                key={cartItem.name + Math.round(Math.random() * 100)}
              />
            ))
          : ""}
        {cart?.cartItems.length ? (
          <Link href={"/checkout"}>
            <button className="btn-bordered">go to checkout</button>
          </Link>
        ) : (
          ""
        )}
        {!cart?.cartItems.length && <p>No items in cart...</p>}
      </ContentContainer>
    </section>
  );
};

export default CartSummary;
