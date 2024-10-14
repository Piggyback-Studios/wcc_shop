"use client";

import CustomInput from "@/src/components/common/CustomInput";
import CustomButton from "../common/CustomButton";

import { useForm, SubmitHandler } from "react-hook-form";
import { CreateProductFormType } from "@/src/shared/types";

const CreateProductForm = () => {
  // (id, stripe_id, name, description, price, image_url, quantity, active)
  const { register, handleSubmit } = useForm<CreateProductFormType>();

  const onSubmit: SubmitHandler<CreateProductFormType> = async (values) => {
    console.log(values);
    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(values),
    }).then((res) => {
      console.log(res);
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        placeholder="product name"
        type="text"
        {...register("name")}
      />
      <CustomInput
        placeholder=""
        type="textarea"
        {...register("description")}
      />
      <CustomInput placeholder="" type="number" {...register("price")} />
      <CustomInput placeholder="" type="file" {...register("image")} />
      <CustomInput
        placeholder="quantity in stock"
        type="number"
        {...register("stockQuantity")}
      />
      <CustomInput
        placeholder="active"
        type="checkbox"
        {...register("active")}
      />
      <CustomButton label="submit" />
    </form>
  );
};

export default CreateProductForm;
