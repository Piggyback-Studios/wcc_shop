import { redirect } from "next/navigation";

import Spacer from "@/src/blocks/ui/Spacer";
import EditProduct from "@/src/blocks/EditProduct";
import { getSession } from "@/src/utils/auth";

export default async function EditProductPage() {
  const session = await getSession();
  if (!session) redirect("/admin");
  return (
    <main className="flex flex-col items-center">
      <Spacer size="lg" />
      <EditProduct />
      <Spacer size="lg" />
    </main>
  );
}
