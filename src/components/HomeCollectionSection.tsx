import ProductGrid from "./ProductGrid";
import ProductGridWrapper from "./ProductGridWrapper";
import { useLanguage } from "../i18n";

const HomeCollectionSection = () => {
  const { t } = useLanguage();

  return (
    <div>
      <div className="mx-auto mt-24 flex max-w-screen-2xl items-center justify-between px-5 max-[400px]:px-3">
        <h2 className="text-5xl font-normal tracking-[1.56px] text-black max-sm:text-4xl">
          {t("collection")}
        </h2>
      </div>
      <ProductGridWrapper limit={6}>
        <ProductGrid />
      </ProductGridWrapper>
    </div>
  );
};
export default HomeCollectionSection;
