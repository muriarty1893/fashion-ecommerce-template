import ProductGrid from "./ProductGrid";
import ProductGridWrapper from "./ProductGridWrapper";
import { useLanguage } from "../i18n";

const HomeCollectionSection = () => {
  const { t } = useLanguage();

  return (
    <div>
      <div className="mx-auto mt-20 flex max-w-screen-2xl items-end justify-between px-3 max-sm:mt-14">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
            Yeni Gelenler
          </p>
          <h2 className="mt-2 text-4xl font-black uppercase tracking-[-0.04em] text-black max-sm:text-3xl">
            {t("collection")}
          </h2>
        </div>
      </div>
      <ProductGridWrapper limit={6}>
        <ProductGrid />
      </ProductGridWrapper>
    </div>
  );
};
export default HomeCollectionSection;
