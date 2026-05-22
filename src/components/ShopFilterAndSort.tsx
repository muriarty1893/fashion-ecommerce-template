import { useAppSelector } from "../hooks";
import { useLanguage } from "../i18n";

const ShopFilterAndSort = ({
  sortCriteria,
  setSortCriteria,
}: {
  sortCriteria: string;
  setSortCriteria: (value: string) => void;
}) => {
  const { showingProducts, totalProducts } = useAppSelector(state => state.shop)
  const { t } = useLanguage();

  return (
    <div className="flex justify-between items-center px-5 max-sm:flex-col max-sm:gap-5">
      <p className="text-lg">
        {t("showing")} 1-{showingProducts} {t("of")} {totalProducts} {t("productsShown")}
      </p>
      <div className="flex gap-3 items-center">
        <p>{t("sortBy")}</p>
        <div className="relative">
          <select
            className="border border-[rgba(0,0,0,0.40)] px-2 py-1"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortCriteria(e.target.value)
            }
            value={sortCriteria}
          >
            <option value="default">{t("defaultSort")}</option>
            <option value="popularity">{t("popularity")}</option>
            <option value="price-asc">{t("priceAsc")}</option>
            <option value="price-desc">{t("priceDesc")}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default ShopFilterAndSort;
