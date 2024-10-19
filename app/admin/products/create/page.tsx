import { redirect } from "next/navigation";
import { isEmpty } from "lodash";

import Spacer from "@/src/blocks/ui/Spacer";
import CreateProduct from "@/src/blocks/CreateProduct";
import { getSession } from "@/src/utils/auth";

export default function ContactPage() {
  const session = getSession();
  if (isEmpty(session)) redirect("/admin");
  return (
    <main className="flex flex-col items-center">
      <Spacer size="lg" />
      {JSON.stringify(session)}
      <CreateProduct />
      <Spacer size="lg" />
    </main>
  );
}
