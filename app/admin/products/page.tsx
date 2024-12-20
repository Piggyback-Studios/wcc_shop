"use server";

import { redirect } from "next/navigation";

import { getSession } from "@/src/utils/auth";
import Spacer from "@/src/blocks/ui/Spacer";
import ProductListBlock from "@/src/blocks/ProductListBlock";

export default async function Products() {
  const session = await getSession();
  if (!session) redirect("/admin");
  return (
    <main className="flex flex-col items-center min-h-[calc(screen - 90px)]">
      <Spacer size="lg" />
      <ProductListBlock />
      <Spacer size="lg" />
    </main>
  );
}
