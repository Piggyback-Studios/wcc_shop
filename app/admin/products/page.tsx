"use client";

import ProductGalleryBlock from "@/src/blocks/ProductGalleryBlock";
import Spacer from "@/src/blocks/ui/Spacer";

export default function Products() {
  return (
    <main className="flex flex-col items-center min-h-[calc(screen - 90px)]">
      <Spacer size="lg" />
      <ProductGalleryBlock />
      <Spacer size="lg" />
    </main>
  );
}
