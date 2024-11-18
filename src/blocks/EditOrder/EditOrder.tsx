"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import ContentContainer from "@/src/components/common/ContentContainer";
import EditOrderForm from "@/src/components/EditOrderForm";

const EditOrder = () => {
  const { id } = useParams();

  return (
    <section className="w-full flex justify-center">
      <ContentContainer>
        <div className="flex justify-between items-center mb-8">
          <h1>Edit Order</h1>
          <Link href="/admin/orders">Back</Link>
        </div>
        <EditOrderForm id={id as string} />
      </ContentContainer>
    </section>
  );
};

export default EditOrder;
