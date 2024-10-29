import ContentContainer from "@/src/components/common/ContentContainer";
import { useCartContext } from "@/src/context/Cart";

const CartTotalsSummary = () => {
  const [cart] = useCartContext();
  return (
    <section className="w-full flex justify-center">
      <ContentContainer>
        <div className="grid w-full">
          {cart.cartSubtotal ? (
            <div className="flex justify-between items-center">
              <span>Subtotal:</span> <hr />
              <span>{cart.cartSubtotal}</span>
            </div>
          ) : (
            ""
          )}
          {cart.taxesAmount ? <div>{cart.taxesAmount}</div> : ""}
          {cart.shippingAmount ? <div>{cart.shippingAmount}</div> : ""}
          {cart.cartTotal ? <div>{cart.cartTotal}</div> : ""}
        </div>
      </ContentContainer>
    </section>
  );
};

export default CartTotalsSummary;
