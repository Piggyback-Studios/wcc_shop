"use client";

import LandingHero from "@/src/blocks/LandingHero";
import ProductGalleryBlock from "@/src/blocks/ProductGalleryBlock";
import Spacer from "@/src/blocks/ui/Spacer";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <LandingHero />
      <Spacer size="lg" />
      <ProductGalleryBlock />
      <Spacer size="lg" />
    </main>
  );
}
