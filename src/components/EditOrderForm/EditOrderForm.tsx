"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import CustomInput from "@/src/components/common/CustomInput";
import CustomButton from "@/src/components/common/CustomButton";
import { EditOrderFormProps, EditOrderFormType } from "@/src/shared/types";
import toast from "@/src/utils/toast";

const EditOrderForm = ({ id }: EditOrderFormProps) => {
  const { register, handleSubmit, reset } = useForm<EditOrderFormType>({});

  const [defaultValues, setDefaultValues] = useState<EditOrderFormType>();
  const loadOrder = async () => {
    const res = await fetch(`/api/orders/${id}`);
    const { order } = await res.json();
  };
  useEffect(() => {
    loadOrder();
  }, []);
  const onSubmit: SubmitHandler<EditOrderFormType> = async (values) => {
    const { shipped } = values;
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify({ shipped }),
    }).then((res) => {
      if (res.status === 200) toast("Product edited!", "success");
      else
        toast(
          `There was an issue editing Order #${id}. Please try again.`,
          "error"
        );
    });
  };
  const { ref: shippedRef, ...shippedRest } = register("shipped");
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        placeholder="Order Shipped"
        type="checkbox"
        {...shippedRest}
        forwardRef={shippedRef}
        label="Active"
      />
      <CustomButton label="submit" />
    </form>
  );
};

export default EditOrderForm;
