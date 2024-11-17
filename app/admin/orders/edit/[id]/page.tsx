import { redirect } from "next/navigation";

import Spacer from "@/src/blocks/ui/Spacer";
import EditOrder from "@/src/blocks/EditOrder";
import { getSession } from "@/src/utils/auth";

export default async function EditOrderPage() {
  const session = await getSession();
  if (!session) redirect("/admin");
  return (
    <main className="flex flex-col items-center">
      <Spacer size="lg" />
      <EditOrder />
      <Spacer size="lg" />
    </main>
  );
}
