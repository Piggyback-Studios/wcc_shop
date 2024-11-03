import SearchProducts from "@/src/blocks/SearchProducts";
import Spacer from "@/src/blocks/ui/Spacer";

export default function Search() {
  return (
    <main className="flex flex-col items-center">
      <Spacer size="lg" />
      <SearchProducts />
    </main>
  );
}
