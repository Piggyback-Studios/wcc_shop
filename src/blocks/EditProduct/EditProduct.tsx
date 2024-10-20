"use client";

import { useParams } from "next/navigation";

import ContentContainer from "@/src/components/common/ContentContainer";
import EditProductForm from "@/src/components/EditProductForm";

const EditProduct = () => {
  const { productId } = useParams();
  return (
    <section>
      <ContentContainer>
        <h1>Edit </h1>
        <EditProductForm id={productId as string} />
      </ContentContainer>
    </section>
  );
};

export default EditProduct;
