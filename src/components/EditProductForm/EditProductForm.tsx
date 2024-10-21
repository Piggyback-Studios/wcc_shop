"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import CustomInput from "@/src/components/common/CustomInput";
import CustomButton from "@/src/components/common/CustomButton";
import { CreateProductFormType } from "@/src/shared/types";

const EditProductForm = ({ id }: { id: string }) => {
  const [defaultValues, setDefaultValues] = useState<CreateProductFormType>();
  const loadProduct = async () => {
    const res = await fetch(`/api/products/${id}`);
    const { product } = await res.json();
    setDefaultValues(product);
  };
  useEffect(() => {
    loadProduct();
  }, []);
  const { register, handleSubmit } = useForm<CreateProductFormType>({
    defaultValues: {
      name: defaultValues ? defaultValues.name : "",
      description: defaultValues ? defaultValues.description : "",
    },
  });
  const onSubmit: SubmitHandler<CreateProductFormType> = async (values) => {
    const { name, price, description, stockQuantity, active, image } = values;
    const formData = new FormData();
    formData.append("image", image[0], image[0].name);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("stockQuantity", stockQuantity as unknown as string);
    formData.append("price", price as unknown as string);
    formData.append("active", active as unknown as string);
    formData.append("id", id);
    await fetch(`/api/products`, {
      method: "PUT",
      body: formData,
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
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <CustomInput
        placeholder="product name"
        type="text"
        {...nameRest}
        forwardRef={nameRef}
        label="Product Name"
        value={defaultValues ? defaultValues.name : null}
      />
      <CustomInput
        placeholder="product description"
        type="textarea"
        {...descriptionRest}
        forwardRef={descriptionRef}
        label="Product Description"
        value={defaultValues ? defaultValues.description : null}
      />
      <CustomInput
        placeholder="19"
        type="number"
        {...priceRest}
        forwardRef={priceRef}
        label="Product Price"
        value={defaultValues ? defaultValues.price : null}
      />
      <CustomInput
        placeholder=""
        type="file"
        {...imageRest}
        forwardRef={imageRef}
        label="Product Image"
        value={defaultValues ? defaultValues.image : null}
      />
      <CustomInput
        placeholder="1"
        type="number"
        {...stockQuantityRest}
        forwardRef={stockQuantityRef}
        label="Quantity in Stock"
        value={defaultValues ? defaultValues.stockQuantity : null}
      />
      <CustomInput
        placeholder="Product Active"
        type="checkbox"
        {...activeRest}
        forwardRef={activeRef}
        label="Active"
        value={defaultValues ? defaultValues.active : null}
      />
      <CustomButton label="submit" />
    </form>
  );
};

export default EditProductForm;
