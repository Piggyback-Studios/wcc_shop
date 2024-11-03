import { redirect } from "next/navigation";

import Spacer from "@/src/blocks/ui/Spacer";
import CreateProduct from "@/src/blocks/CreateProduct";
import { getSession } from "@/src/utils/auth";

export default async function CreateProductPage() {
  const session = await getSession();
  if (!session) redirect("/admin");
  return (
    <main className="flex flex-col items-center">
      <Spacer size="lg" />
      <CreateProduct />
      <Spacer size="lg" />
    </main>
  );
}
