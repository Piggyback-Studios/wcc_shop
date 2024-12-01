import OrderSummary from "@/src/blocks/OrderSummary";
import Spacer from "@/src/blocks/ui/Spacer";

export default function OrderComplete() {
  return (
    <main className="flex flex-col items-center">
      <Spacer size="lg" />
      <OrderSummary />
      <Spacer size="lg" />
    </main>
  );
}
