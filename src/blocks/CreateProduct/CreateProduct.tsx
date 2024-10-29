import ContentContainer from "@/src/components/common/ContentContainer";
import CreateProductForm from "@/src/components/CreateProductForm";

const CreateProduct = () => {
  return (
    <section className="w-full flex justify-center">
      <ContentContainer>
        <h1>Create a Product</h1>
        <CreateProductForm />
      </ContentContainer>
    </section>
  );
};

export default CreateProduct;
