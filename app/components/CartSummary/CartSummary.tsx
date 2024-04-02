import { useCartContext } from "@/app/context/Cart";
import { CartItem } from "@/app/types/cart.types";

const CartDisplayItem = (props: CartItem) => {
  const { price, quantity } = props;
  return <div>{}</div>;
};

const CartSummary = () => {
  const [cart] = useCartContext();
  return (
    <>
      {cart?.cartItems &&
        cart?.cartItems.map((cartItem) => (
          <CartDisplayItem
            {...cartItem}
            key={cartItem.productName + Math.round(Math.random() * 100)}
          />
        ))}
      {!cart?.cartItems && <p>No items in cart...</p>}
    </>
  );
};

export default CartSummary;
