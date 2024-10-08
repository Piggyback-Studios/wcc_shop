"use client";

import LandingHero from "@/src/blocks/LandingHero";
import ProductGalleryBlock from "@/src/blocks/ProductGalleryBlock";
import Spacer from "@/src/blocks/ui/Spacer";
import { heroData } from "@/src/shared/data/pages/landing.data";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <LandingHero {...heroData} />
      <Spacer size="lg" />
      <ProductGalleryBlock />
      <Spacer size="lg" />
    </main>
  );
}
