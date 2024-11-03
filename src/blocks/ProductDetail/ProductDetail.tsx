import ContentContainer from "@/src/components/common/ContentContainer";
import ProductDetailDisplay from "@/src/components/ProductDetailDisplay";
import { ProductDetailBlockProps } from "@/src/shared/types";
import { notFound } from "next/navigation";

const ProductDetail = async ({ id }: ProductDetailBlockProps) => {
  const res = await fetch(`/api/products/${id}`);
  const resJson = await res.json();
  const product = resJson.body;
  if (!product) return notFound();
  return (
    <section>
      <ContentContainer>
        <ProductDetailDisplay {...product} />
      </ContentContainer>
    </section>
  );
};

export default ProductDetail;
