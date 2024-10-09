import React from "react";

import { useCartContext } from "@/src/context/Cart";
import CartSummaryItem from "@/src/components/CartSummaryItem";
import ContentContainer from "@/src/components/common/ContentContainer";
import CustomLink from "@/src/components/common/CustomLink";

const CartSummary = () => {
  const [cart] = useCartContext();

  return (
    <section>
      <ContentContainer>
        {cart?.cartItems.length > 0 &&
          cart?.cartItems.map((cartItem) => (
            <CartSummaryItem
              {...cartItem}
              key={cartItem.name + Math.round(Math.random() * 100)}
            />
          ))}
        {cart?.cartItems.length > 0 && (
          <CustomLink href="/checkout" label="go to checkout" />
        )}
        {!cart?.cartItems.length && <p>No items in cart...</p>}
      </ContentContainer>
    </section>
  );
};

export default CartSummary;
