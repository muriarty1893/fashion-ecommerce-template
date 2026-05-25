import { useEffect, useState } from "react";
import {
  ProductGrid,
  ProductGridWrapper,
  ShowingSearchPagination,
} from "../components";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Search as SearchIcon,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useLanguage } from "../i18n";

const defaultFilters: ShopFilters = {
  minPrice: "",
  maxPrice: "",
  color: "",
  size: "",
  availability: "",
};

const popularSearches = ["silk dress", "black dress", "ivory", "occasion", "essentials"];

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get("page") || "1")
  );
  const [sortCriteria, setSortCriteria] = useState("default");
  const [filters, setFilters] = useState<ShopFilters>(defaultFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t } = useLanguage();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get("page") || "1"));
  }, [searchParams]);

  const updateFilter = (key: keyof ShopFilters, value: string) => {
    setFilters((currentFilters) => ({ ...currentFilters, [key]: value }));
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchInput = String(formData.get("searchInput") || "");
    router.push(`/search?query=${encodeURIComponent(searchInput)}`);
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <main className="bg-[#fbfaf8] text-stone-950">
      <section className="mx-auto max-w-screen-2xl px-5 py-10 md:px-8 lg:py-14">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-[0_24px_80px_rgba(28,25,23,0.07)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b6b43]">
                Product search
              </p>
              <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-stone-950 sm:text-5xl lg:text-6xl">
                Find the piece that completes the look.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">
                Search dresses, refined essentials, and limited drops by mood,
                color, collection, or occasion.
              </p>
            </div>

            <div>
              <form onSubmit={handleSearch} className="relative">
                <label className="sr-only" htmlFor="searchInput">
                  {t("searchProducts")}
                </label>
                <SearchIcon className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                <input
                  id="searchInput"
                  type="text"
                  defaultValue={query}
                  placeholder="Search dresses, luxury pieces, essentials..."
                  className="h-16 w-full rounded-full border border-stone-300 bg-[#fbfaf8] pl-[52px] pr-36 text-base font-medium text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:ring-2 focus:ring-stone-950/10 max-sm:h-auto max-sm:min-h-14 max-sm:rounded-3xl max-sm:py-4 max-sm:pl-12 max-sm:pr-4"
                  name="searchInput"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 inline-flex h-12 items-center justify-center rounded-full bg-stone-950 px-6 text-sm font-bold text-white transition hover:bg-[#9b6b43] focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4 max-sm:static max-sm:mt-3 max-sm:w-full"
                >
                  {t("search")}
                </button>
              </form>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="font-semibold text-stone-500">Popular:</span>
                {popularSearches.map((term) => (
                  <Link
                    key={term}
                    href={`/search?query=${encodeURIComponent(term)}`}
                    className="rounded-full border border-stone-200 bg-white px-4 py-2 font-semibold text-stone-700 transition hover:border-stone-950 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-screen-2xl gap-6 px-5 pb-16 md:px-8 lg:grid-cols-[300px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-[0_18px_45px_rgba(28,25,23,0.05)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9b6b43]">
                  Refine
                </p>
                <h2 className="mt-1 text-lg font-bold">Filters & sort</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterOpen((isOpen) => !isOpen)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-950 transition hover:border-stone-950 lg:hidden"
                aria-expanded={isFilterOpen}
                aria-controls="search-filters"
                aria-label="Toggle search filters"
              >
                <SlidersHorizontal className="h-5 w-5" />
              </button>
            </div>

            <div
              id="search-filters"
              className={`mt-5 gap-4 ${isFilterOpen ? "grid" : "hidden lg:grid"}`}
            >
              <FilterField label="Sort by">
                <select
                  className="filter-input rounded-full border-stone-300 bg-[#fbfaf8]"
                  onChange={(event) => setSortCriteria(event.target.value)}
                  value={sortCriteria}
                >
                  <option value="default">{t("defaultSort")}</option>
                  <option value="newest">Newest</option>
                  <option value="popularity">{t("popularity")}</option>
                  <option value="best-rated">Best rated</option>
                  <option value="price-asc">{t("priceAsc")}</option>
                  <option value="price-desc">{t("priceDesc")}</option>
                </select>
              </FilterField>

              <div className="grid grid-cols-2 gap-3">
                <FilterField label="Min price">
                  <input
                    type="number"
                    min="0"
                    value={filters.minPrice}
                    onChange={(event) => updateFilter("minPrice", event.target.value)}
                    className="filter-input rounded-full border-stone-300 bg-[#fbfaf8]"
                    placeholder="0"
                  />
                </FilterField>
                <FilterField label="Max price">
                  <input
                    type="number"
                    min="0"
                    value={filters.maxPrice}
                    onChange={(event) => updateFilter("maxPrice", event.target.value)}
                    className="filter-input rounded-full border-stone-300 bg-[#fbfaf8]"
                    placeholder="9000"
                  />
                </FilterField>
              </div>

              <FilterField label="Color">
                <select
                  value={filters.color}
                  onChange={(event) => updateFilter("color", event.target.value)}
                  className="filter-input rounded-full border-stone-300 bg-[#fbfaf8]"
                >
                  <option value="">Any color</option>
                  <option value="black">Black</option>
                  <option value="ivory">Ivory</option>
                  <option value="cocoa">Cocoa</option>
                  <option value="sage">Sage</option>
                </select>
              </FilterField>

              <FilterField label="Size">
                <select
                  value={filters.size}
                  onChange={(event) => updateFilter("size", event.target.value)}
                  className="filter-input rounded-full border-stone-300 bg-[#fbfaf8]"
                >
                  <option value="">Any size</option>
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </FilterField>

              <FilterField label="Availability">
                <select
                  value={filters.availability}
                  onChange={(event) => updateFilter("availability", event.target.value)}
                  className="filter-input rounded-full border-stone-300 bg-[#fbfaf8]"
                >
                  <option value="">All products</option>
                  <option value="in-stock">In stock</option>
                  <option value="sold-out">Sold out</option>
                </select>
              </FilterField>

              <button
                type="button"
                onClick={() => setFilters(defaultFilters)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-stone-300 px-4 text-sm font-bold text-stone-700 transition hover:border-stone-950 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2"
              >
                <X className="h-4 w-4" />
                Clear filters
              </button>
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-stone-200 bg-white p-5 shadow-[0_18px_45px_rgba(28,25,23,0.05)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-stone-500">
                {query ? "Showing results for" : "Browse curated products"}
              </p>
              <h2 className="mt-1 font-serif text-3xl font-semibold text-stone-950">
                {query ? `"${query}"` : "All searchable styles"}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {activeFilterCount > 0 && (
                <span className="rounded-full bg-[#f8f0e7] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#79522f]">
                  {activeFilterCount} active
                </span>
              )}
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-[#9b6b43] focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
              >
                Shop all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <ProductGridWrapper
            searchQuery={query}
            sortCriteria={sortCriteria}
            filters={filters}
            page={currentPage}
          >
            <ProductGrid />
          </ProductGridWrapper>

          <ShowingSearchPagination
            page={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </section>
    </main>
  );
};

const FilterField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="grid gap-2 text-sm font-semibold text-stone-700">
    {label}
    {children}
  </label>
);

export default Search;
