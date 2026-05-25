import { useParams, useSearchParams } from "next/navigation";
import { ShopBanner, ShopPageContent } from "../components";

const Shop = () => {
  const params = useParams<{ category?: string }>();
  const searchParams = useSearchParams();
  const category = params.category || "";
  return (
    <main className="mx-auto max-w-screen-2xl bg-[#fbfaf8] pt-6">
      <ShopBanner category={category} />
      <ShopPageContent
        category={category}
        page={parseInt(searchParams.get("page") || "1")}
      />
    </main>
  );
};
export default Shop;
