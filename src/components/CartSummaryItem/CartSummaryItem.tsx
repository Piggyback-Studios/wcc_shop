import { Product } from "@/src/shared/types";
import Image from "next/image";

import { useCartContext } from "@/src/context/Cart";
import styles from "./component.module.css";

const CartSummaryItem = ({ name, price, cartQuantity, imageUrl }: Product) => {
  const [cart, setCart] = useCartContext();

  const editProductInCart = (product: Product) => {
    // TODO: do this
  };

  const removeProductFromCart = (product: Product) => {
    const otherItemsInCart = cart.cartProducts.filter(
      (cartProduct) => cartProduct.id !== product.id
    );
    const totalCartItemsQuantity = otherItemsInCart.reduce(
      (runningTotal, current) => {
        return (runningTotal += current.cartQuantity);
      },
      1
    );
    setCart({
      ...cart,
      cartProducts: [...otherItemsInCart],
      totalCartProductsQuantity: totalCartItemsQuantity - product.cartQuantity,
    });
  };

  return (
    <div className="grid md:grid-cols-2">
      <div className="flex flex-col justify-between">
        <div>
          {name && <h3 className={styles.name}>{name}</h3>}
          {price && <span className={styles.price}>${price}</span>}
          {cartQuantity && (
            <p className={styles.quantity}>Qty: {cartQuantity}</p>
          )}
        </div>

        <div className="flex gap-4 mb-4 md:mb-0">
          <button
            className={styles.edit_cart_display_item_button}
            // TODO: fix this
            // onClick={() => editProductInCart({ ...props })}
          >
            edit
          </button>
          <button
            className={styles.add_to_cart_button}
            // onClick={() => removeProductFromCart({ ...props })}
          >
            remove
          </button>
        </div>
      </div>
      {imageUrl && (
        <Image
          src={imageUrl}
          width={500}
          height={500}
          alt={`picture of ${name}`}
          className={styles.cart_display_item_image}
          layout="responsive"
        />
      )}
    </div>
  );
};

export default CartSummaryItem;
