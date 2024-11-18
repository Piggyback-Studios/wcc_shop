"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import CustomInput from "@/src/components/common/CustomInput";
import CustomButton from "@/src/components/common/CustomButton";
import { EditOrderFormProps, EditOrderFormType } from "@/src/shared/types";
import toast from "@/src/utils/toast";

const EditOrderForm = ({ id }: EditOrderFormProps) => {
  const { handleSubmit } = useForm<EditOrderFormType>({});

  const loadOrder = async () => {
    const res = await fetch(`/api/orders/${id}`);
    const { order } = await res.json();
    console.log(order);
  };
  useEffect(() => {
    loadOrder();
  }, []);
  const onSubmit: SubmitHandler<EditOrderFormType> = async (values) => {
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      body: null,
    }).then((res) => {
      if (res.status === 200)
        toast(`Order #${id} Marked as Shipped!`, "success");
      else
        toast(
          `There was an issue editing Order #${id}. Please try again.`,
          "error"
        );
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomButton label="Mark as Shipped" />
    </form>
  );
};

export default EditOrderForm;
