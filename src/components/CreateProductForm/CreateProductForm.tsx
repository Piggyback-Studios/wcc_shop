"use client";

import CustomInput from "@/src/components/common/CustomInput";
import CustomButton from "../common/CustomButton";

import { useForm, SubmitHandler } from "react-hook-form";
import { CreateProductFormType } from "@/src/shared/types";

const CreateProductForm = () => {
  const { register, handleSubmit, setValue } = useForm<CreateProductFormType>();

  const onSubmit: SubmitHandler<CreateProductFormType> = async (values) => {
    const { name, price, description, stockQuantity, active, image } = values;
    await fetch(`/api/products?product_image=${values.image.name}`, {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        description,
        stockQuantity,
        active,
        image,
      }),
    }).then((res) => {
      console.log(res);
    });
  };
  const { ref: nameRef, ...nameRest } = register("name");
  const { ref: descriptionRef, ...descriptionRest } = register("description");
  const { ref: priceRef, ...priceRest } = register("price");
  const { ref: stockQuantityRef, ...stockQuantityRest } =
    register("stockQuantity");
  const { ref: imageRef, ...imageRest } = register("image");
  const { ref: activeRef, ...activeRest } = register("active");
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        placeholder="product name"
        type="text"
        {...nameRest}
        forwardRef={nameRef}
        label="Product Name"
      />
      <CustomInput
        placeholder="product description"
        type="textarea"
        {...descriptionRest}
        forwardRef={descriptionRef}
        label="Product Description"
      />
      <CustomInput
        placeholder="19"
        type="number"
        {...priceRest}
        forwardRef={priceRef}
        label="Product Price"
      />
      <CustomInput
        placeholder=""
        type="file"
        {...imageRest}
        forwardRef={imageRef}
        label="Product Image"
      />
      <CustomInput
        placeholder="1"
        type="number"
        {...stockQuantityRest}
        forwardRef={stockQuantityRef}
        label="Quantity in Stock"
      />
      <CustomInput
        placeholder="Product Active"
        type="checkbox"
        {...activeRest}
        forwardRef={activeRef}
        label="Active"
      />
      <CustomButton label="submit" />
    </form>
  );
};

export default CreateProductForm;
