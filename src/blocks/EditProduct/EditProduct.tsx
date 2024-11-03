"use client";

import { useParams } from "next/navigation";

import ContentContainer from "@/src/components/common/ContentContainer";
import EditProductForm from "@/src/components/EditProductForm";
import Link from "next/link";

const EditProduct = () => {
  const { productId } = useParams();
  return (
    <section className="w-full flex justify-center">
      <ContentContainer>
        <div className="flex justify-between items-center">
          <h1>Edit Product</h1>
          <Link href="/admin/products">Back</Link>
        </div>
        <EditProductForm id={productId as string} />
      </ContentContainer>
    </section>
  );
};

export default EditProduct;
