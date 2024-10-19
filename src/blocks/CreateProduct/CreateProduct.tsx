import ContentContainer from "@/src/components/common/ContentContainer";
import CreateProductForm from "@/src/components/CreateProductForm";

const CreateProduct = () => {
  return (
    <section>
      <ContentContainer>
        <h1>Create a Product</h1>
        <CreateProductForm />
      </ContentContainer>
    </section>
  );
};

export default CreateProduct;
