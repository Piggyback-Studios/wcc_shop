import { ProductDetailDisplayProps } from "@/src/shared/types";
import Image from "next/image";
import Link from "next/link";

const ProductDetailDisplay = ({
  id,
  name,
  description,
  imageUrl,
  price,
}: ProductDetailDisplayProps) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>{name}</h1>
        <Link href="/">Back</Link>
      </div>
      <div className="grid md:grid-cols-[2fr_1fr]">
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
        <div>
          <p>{name}</p>
          <p>{price}</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailDisplay;
