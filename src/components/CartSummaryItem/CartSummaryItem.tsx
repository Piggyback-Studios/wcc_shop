import { CartItem } from "@/app/types/cart.types";
import Image from "next/image";

import { useCartContext } from "@/src/context/Cart";
import styles from "./component.module.css";

const CartSummaryItem = (props: CartItem) => {
  const { name, price, quantity, image } = props;
  const [cart, setCart] = useCartContext();

  const editProductInCart = (product: CartItem) => {
    // TODO: do this
    console.log("hello!");
  };

  const removeProductFromCart = (product: CartItem) => {
    const otherItemsInCart = cart.cartItems.filter(
      (cartProduct) => cartProduct.id !== product.id
    );
    const totalCartItemsQuantity = otherItemsInCart.reduce(
      (runningTotal, current) => {
        return (runningTotal += current.quantity);
      },
      1
    );
    setCart({
      cartItems: [...otherItemsInCart],
      totalCartItemsQuantity: totalCartItemsQuantity - product.quantity,
    });
  };

  return (
    <div className="grid md:grid-cols-2">
      <div className={styles.top_row}>
        <div className={styles.info_section}>
          {name && <h3 className={styles.name}>{name}</h3>}
          {price && <span className={styles.price}>${price}</span>}
          {quantity && <p className={styles.quantity}>Qty: {quantity}</p>}
        </div>
        {image && (
          <Image
            src={image}
            width={500}
            height={500}
            alt={`picture of ${name}`}
            className={styles.cart_display_item_image}
            layout="responsive"
          />
        )}
      </div>

      <div className={styles.button_row}>
        <button
          className={styles.edit_cart_display_item_button}
          onClick={() => editProductInCart({ ...props })}
        >
          edit
        </button>
        <button
          className={styles.add_to_cart_button}
          onClick={() => removeProductFromCart({ ...props })}
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default CartSummaryItem;
