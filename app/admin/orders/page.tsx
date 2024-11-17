"use server";

import { redirect } from "next/navigation";

import { getSession } from "@/src/utils/auth";
import Spacer from "@/src/blocks/ui/Spacer";
import OrdersListBlock from "@/src/blocks/OrdersListBlock";

export default async function Orders() {
  const session = await getSession();
  if (!session) redirect("/admin");
  return (
    <main className="flex flex-col items-center min-h-[calc(screen - 90px)]">
      <Spacer size="lg" />
      <OrdersListBlock />
      <Spacer size="lg" />
    </main>
  );
}
