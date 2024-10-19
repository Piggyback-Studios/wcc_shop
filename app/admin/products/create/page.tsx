import Spacer from "@/src/blocks/ui/Spacer";

import CreateProduct from "@/src/blocks/CreateProduct";

export default function ContactPage() {
  return (
    <main className="flex flex-col items-center">
      <Spacer size="lg" />
      <CreateProduct />
      <Spacer size="lg" />
    </main>
  );
}
