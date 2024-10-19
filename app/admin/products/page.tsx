"use server";

import { isEmpty } from "lodash";
import { redirect } from "next/navigation";

import { getSession } from "@/src/utils/auth";
import Spacer from "@/src/blocks/ui/Spacer";
import ProductListBlock from "@/src/blocks/ProductListBlock";

export default async function Products() {
  const session = getSession();
  //   there is no session cookie set...?
  //   if (isEmpty(session)) redirect("/admin");
  return (
    <main className="flex flex-col items-center min-h-[calc(screen - 90px)]">
      <Spacer size="lg" />
      {JSON.stringify(session)}
      <ProductListBlock />
      <Spacer size="lg" />
    </main>
  );
}
