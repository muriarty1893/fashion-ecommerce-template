import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductGrid from "./ProductGrid";
import ProductGridWrapper from "./ProductGridWrapper";

const HomeCollectionSection = () => {
  return (
    <section className="bg-[#fbfaf8] py-16">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-5 px-5 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b6b43]">
            Featured drop
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-stone-950 md:text-5xl">
            Best-selling pieces this week
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
            Product cards are built for browsing: clear imagery, prices, stock
            status, wishlist saves, and quick cart actions.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-bold text-stone-950 transition hover:border-stone-950 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
        >
          View all products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <ProductGridWrapper sortCriteria="popularity" limit={6}>
        <ProductGrid />
      </ProductGridWrapper>
    </section>
  );
};
export default HomeCollectionSection;
