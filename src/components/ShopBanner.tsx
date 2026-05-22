import { formatCategoryName } from "../utils/formatCategoryName";
import { useLanguage } from "../i18n";

const ShopBanner = ({ category }: { category: string }) => {
  const { language, t } = useLanguage();

  return (
    <div className="bg-secondaryBrown text-white py-10 flex justify-center items-center mx-5 my-10">
      <h2 className="text-3xl max-sm:text-2xl">
        {category ? formatCategoryName(category, language) : t("shopPage")}
      </h2>
    </div>
  );
};
export default ShopBanner;
