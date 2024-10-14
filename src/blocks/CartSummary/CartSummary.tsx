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
        <div className="grid gap-8 mb-8">
          {cart?.cartProducts.length > 0 &&
            cart?.cartProducts.map((cartItem) => (
              <CartSummaryItem
                {...cartItem}
                key={cartItem.name + Math.round(Math.random() * 100)}
              />
            ))}
          {!cart?.cartProducts.length && <p>No items in cart...</p>}
        </div>
        {cart?.cartProducts.length > 0 && (
          <CustomLink href="/checkout" label="go to checkout" />
        )}
      </ContentContainer>
    </section>
  );
};

export default CartSummary;
