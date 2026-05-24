import { formatCategoryName } from "../utils/formatCategoryName";
import { useLanguage } from "../i18n";

const ShopBanner = ({ category }: { category: string }) => {
  const { language, t } = useLanguage();
  const title = category ? formatCategoryName(category, language) : t("shopPage");

  return (
    <section className="mx-5 my-8 overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_80px_rgba(28,25,23,0.07)] md:mx-8">
      <div className="grid min-h-[280px] gap-6 p-6 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b6b43]">
            Curated fashion edit
          </p>
          <h1 className="mt-3 font-serif text-5xl font-semibold leading-tight text-stone-950 max-sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">
            Browse dresses, refined essentials, and limited seasonal drops with
            filters built for quick product discovery.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 max-sm:hidden">
          {["/assets/dress/5.png", "/assets/product image 6.jpg", "/assets/dress/4.png"].map(
            (image, index) => (
              <img
                key={image}
                src={image}
                alt={`${title} editorial ${index + 1}`}
                className="h-full min-h-[220px] rounded-3xl object-cover object-top"
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
};
export default ShopBanner;
