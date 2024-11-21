"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import CustomButton from "@/src/components/common/CustomButton";
import {
  EditOrderFormProps,
  EditOrderFormType,
  OrderDetail,
} from "@/src/shared/types";
import toast from "@/src/utils/toast";
import CustomInput from "../common/CustomInput";

const EditOrderForm = ({ id }: EditOrderFormProps) => {
  const { handleSubmit, register } = useForm<EditOrderFormType>({});
  const [orderDetail, setOrderDetail] = useState<OrderDetail>();

  const loadOrder = async () => {
    const res = await fetch(`/api/orders/${id}`);
    const { order, products } = await res.json();
    console.log({ ...order, products });
    setOrderDetail({ ...order, products });
  };
  useEffect(() => {
    loadOrder();
  }, []);
  const onSubmit: SubmitHandler<EditOrderFormType> = async (values) => {
    if (values.trackingCode) {
      const formData = new FormData();
      formData.append("trackingCode", values.trackingCode as unknown as string);
      await fetch(`/api/orders/${id}`, {
        method: "PUT",
        body: formData,
      }).then((res) => {
        if (res.status === 200)
          toast(`Order #${id} Marked as Shipped!`, "success");
        else
          toast(
            `There was an issue editing Order #${id}. Please try again.`,
            "error"
          );
      });
    } else
      toast(
        "Please submit a shipping code to mark this order as shipped.",
        "error"
      );
  };
  const { ref: trackingCodeRef, ...trackingCodeRest } =
    register("trackingCode");
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {orderDetail && (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4>Customer Information</h4>
            {/* email, shipping information, etc */}
            {orderDetail.customerEmail && <p>{orderDetail.customerEmail}</p>}
            {orderDetail.shippingStreetAddress && (
              <p>{orderDetail.shippingStreetAddress}</p>
            )}
            {orderDetail.shippingState &&
              orderDetail.shippingCity &&
              orderDetail.shippingPostalCode && (
                <p>
                  {orderDetail.shippingCity}, {orderDetail.shippingState}{" "}
                  {orderDetail.shippingPostalCode}
                </p>
              )}
          </div>
          <div>
            <h4>Order Information</h4>
            {/* products, totals, etc */}
            {orderDetail.products && (
              <>
                {orderDetail.products.map((product, idx) => (
                  <p key={idx}>{product.name}</p>
                ))}
              </>
            )}
          </div>
          <div>
            <h4>Internal Shipping Information</h4>
            {!orderDetail.shipped ? (
              <CustomInput
                label="Shipping Code"
                placeholder="XYZ-SHIPPING-CODE"
                forwardRef={trackingCodeRef}
                {...trackingCodeRest}
                type="text"
              />
            ) : (
              <p>{orderDetail.trackingCode}</p>
            )}
            {!orderDetail.shipped && (
              <CustomButton label="Mark as Shipped" type="submit" />
            )}
          </div>
        </div>
      )}
    </form>
  );
};

export default EditOrderForm;
