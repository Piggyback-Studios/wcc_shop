"use client";

import ProductGalleryBlock from "@/src/blocks/ProductGalleryBlock";
import Spacer from "@/src/blocks/ui/Spacer";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Spacer size="lg" />
      <ProductGalleryBlock />
      <Spacer size="lg" />
    </main>
  );
}
