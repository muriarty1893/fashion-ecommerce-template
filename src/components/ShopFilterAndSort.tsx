import { useAppSelector } from "../hooks";
import { useLanguage } from "../i18n";

const ShopFilterAndSort = ({
  sortCriteria,
  setSortCriteria,
  filters,
  setFilters,
}: {
  sortCriteria: string;
  setSortCriteria: (value: string) => void;
  filters: ShopFilters;
  setFilters: (value: ShopFilters) => void;
}) => {
  const { showingProducts, totalProducts } = useAppSelector(
    (state) => state.shop
  );
  const { t } = useLanguage();
  const updateFilter = (key: keyof ShopFilters, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <section className="px-5 md:px-8 max-[400px]:px-3">
      <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-[0_18px_45px_rgba(28,25,23,0.05)]">
        <div className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9b6b43]">
              Product results
            </p>
            <p className="mt-1 text-sm font-semibold text-stone-600">
              {t("showing")} {showingProducts === 0 ? 0 : 1}-{showingProducts}{" "}
              {t("of")} {totalProducts} {t("productsShown")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm font-bold text-stone-700">{t("sortBy")}</p>
            <select
              className="h-11 rounded-full border border-stone-300 bg-[#fbfaf8] px-4 text-sm font-semibold text-stone-950"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setSortCriteria(event.target.value)
              }
              value={sortCriteria}
            >
              <option value="default">{t("defaultSort")}</option>
              <option value="newest">Newest</option>
              <option value="popularity">{t("popularity")}</option>
              <option value="best-rated">Best rated</option>
              <option value="price-asc">{t("priceAsc")}</option>
              <option value="price-desc">{t("priceDesc")}</option>
            </select>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
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
              onChange={(event) =>
                updateFilter("availability", event.target.value)
              }
              className="filter-input rounded-full border-stone-300 bg-[#fbfaf8]"
            >
              <option value="">All</option>
              <option value="in-stock">In stock</option>
              <option value="sold-out">Sold out</option>
            </select>
          </FilterField>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() =>
                setFilters({
                  minPrice: "",
                  maxPrice: "",
                  color: "",
                  size: "",
                  availability: "",
                })
              }
              className="h-10 w-full rounded-full border border-stone-300 px-3 text-sm font-bold text-stone-700 transition hover:border-stone-950 hover:text-stone-950"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FilterField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="flex flex-col gap-2 text-sm font-semibold text-stone-700">
    {label}
    {children}
  </label>
);

export default ShopFilterAndSort;
