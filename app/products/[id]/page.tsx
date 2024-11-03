"use client";

import { useParams } from "next/navigation";

import ProductDetail from "@/src/blocks/ProductDetail";
import Spacer from "@/src/blocks/ui/Spacer";

export default function ProductDetailPage() {
  const { id } = useParams();
  return (
    <main className="flex flex-col items-center">
      <Spacer size="lg" />
      <ProductDetail id={id as string} />
      <Spacer size="lg" />
    </main>
  );
}
