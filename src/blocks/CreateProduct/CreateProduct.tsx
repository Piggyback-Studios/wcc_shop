import Link from "next/link";

import ContentContainer from "@/src/components/common/ContentContainer";
import CreateProductForm from "@/src/components/CreateProductForm";

const CreateProduct = () => {
  return (
    <section className="w-full flex justify-center">
      <ContentContainer>
        <div className="flex justify-between items-center">
          <h1>Create a Product</h1>
          <Link href="/admin/products">Back</Link>
        </div>
        <CreateProductForm />
      </ContentContainer>
    </section>
  );
};

export default CreateProduct;
