import Image from "next/image";
import Link from "next/link";

import CustomButton from "@/src/components/common/CustomButton";
import { ProductDetailDisplayProps, Product } from "@/src/shared/types";
import { useCartContext } from "@/src/context/Cart";
import toast from "@/src/utils/toast";

const ProductDetailDisplay = ({
  id,
  name,
  description,
  imageUrl,
  price,
  stripeId,
  priceId,
  stockQuantity,
  cartQuantity,
}: ProductDetailDisplayProps) => {
  const [cart, setCart] = useCartContext();
  const addProductToCart = (product: Product) => {
    // i dont necessarily like this solution
    const itemInCart = cart.cartProducts.filter(
      (cartProduct) => cartProduct.id === product.id
    )[0];
    const otherItemsInCart = cart.cartProducts.filter(
      (cartProduct) => cartProduct.id !== product.id
    );

    setCart({
      cartProducts: [
        ...otherItemsInCart,
        {
          ...product,
          cartQuantity: itemInCart ? itemInCart.cartQuantity + 1 : 1,
        } as Product,
      ],
    });
  };

  const handleClick = (product: Product) => {
    addProductToCart(product);
    toast(`${product.name} added to cart`, "success");
  };
  return (
    <div className="grid gap-8">
      <div className="flex justify-between items-center">
        <h1>{name}</h1>
        <Link href="/">Back</Link>
      </div>
      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
        <div>
          {imageUrl && (
            <Image
              src={imageUrl}
              width={768}
              height={768}
              alt="product detail image"
            />
          )}
        </div>
        <div className="flex flex-col items-start gap-8">
          <p>{name}</p>
          <p>{price}</p>
          <p>{description}</p>
          <CustomButton
            onClick={() =>
              handleClick({
                id,
                name,
                price,
                description,
                imageUrl,
                stripeId,
                priceId,
                stockQuantity,
                cartQuantity,
              } as Product)
            }
            label="Add to Cart"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailDisplay;
