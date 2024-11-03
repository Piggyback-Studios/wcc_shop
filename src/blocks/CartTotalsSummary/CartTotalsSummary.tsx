import ContentContainer from "@/src/components/common/ContentContainer";
import { useTotalsContext } from "@/src/context/Totals";

const CartTotalsSummary = () => {
  const [totals] = useTotalsContext();
  return (
    <section className="w-full flex justify-center">
      <ContentContainer>
        <div className="grid w-full">
          {totals.cartSubtotal ? (
            <div className="flex justify-between items-center">
              <span>Subtotal:</span> <hr />
              <span>{totals.cartSubtotal}</span>
            </div>
          ) : (
            ""
          )}
          {totals.taxesAmount ? <div>{totals.taxesAmount}</div> : ""}
          {totals.shippingAmount ? <div>{totals.shippingAmount}</div> : ""}
          {totals.cartTotal ? <div>{totals.cartTotal}</div> : ""}
        </div>
      </ContentContainer>
    </section>
  );
};

export default CartTotalsSummary;
