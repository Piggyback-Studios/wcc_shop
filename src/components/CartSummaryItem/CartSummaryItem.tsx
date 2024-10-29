import { Product } from "@/src/shared/types";
import Image from "next/image";

import { useCartContext } from "@/src/context/Cart";
import CustomButton from "@/src/components/common/CustomButton";

const CartSummaryItem = (product: Product) => {
  const { name, price, cartQuantity, imageUrl } = product;
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
      0
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
          {name && <h3>{name}</h3>}
          {price && <span>${price}</span>}
          {cartQuantity && <p>Qty: {cartQuantity}</p>}
        </div>
        <div className="flex gap-4 mb-4 md:mb-0">
          <CustomButton
            onClick={() => editProductInCart({ ...product })}
            label="edit"
          />
          <CustomButton
            onClick={() => removeProductFromCart({ ...product })}
            label="remove"
          />
        </div>
      </div>
      {imageUrl && (
        <Image
          src={imageUrl}
          width={500}
          height={500}
          alt={`picture of ${name}`}
          layout="responsive"
          className="rounded-lg border-2 border-dark-900"
        />
      )}
    </div>
  );
};

export default CartSummaryItem;
