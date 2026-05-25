import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../i18n";

type CategorySlide = {
  title: string;
  link: string;
  image: string;
  pieceCount: number;
  mood: string;
  copy: string;
};

const CategoryImpactCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useLanguage();

  const categories: CategorySlide[] = useMemo(
    () => [
      {
        title: t("specialEdition"),
        link: "special-edition",
        image: "luxury category 1.png",
        pieceCount: 5,
        mood: "Evening focus",
        copy: "Limited wardrobe pieces with sharper shapes, polished finishes, and a dressed-up mood.",
      },
      {
        title: t("luxuryCollection"),
        link: "luxury-collection",
        image: "luxury category 2.png",
        pieceCount: 5,
        mood: "Premium dailywear",
        copy: "Elevated staples selected for texture, structure, and repeat styling through the week.",
      },
      {
        title: t("summerEdition"),
        link: "summer-edition",
        image: "luxury category 3.png",
        pieceCount: 2,
        mood: "Light layers",
        copy: "Breathable warm-weather pieces with clean color, soft movement, and easy packing.",
      },
      {
        title: t("uniqueCollection"),
        link: "unique-collection",
        image: "luxury category 4.png",
        pieceCount: 6,
        mood: "Statement edit",
        copy: "Distinctive silhouettes that anchor an outfit while staying simple to wear.",
      },
    ],
    [t],
  );

  const activeCategory = categories[activeIndex];
  const queuedCategories = useMemo(
    () =>
      categories.map((_, index) => categories[(activeIndex + index) % categories.length]),
    [activeIndex, categories]
  );

  const move = (direction: number) => {
    setActiveIndex(
      (index) => (index + direction + categories.length) % categories.length
    );
  };

  return (
    <section className="mx-auto mt-24 max-w-screen-2xl px-5 max-[400px]:px-3">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-secondaryBrown">
            Shop by mood
          </p>
          <h2 className="mt-3 text-5xl font-semibold tracking-normal text-gray-950 max-sm:text-4xl">
            {t("categories")}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => move(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-gray-300 text-gray-950 transition hover:border-gray-950"
            aria-label="Previous category"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            className="grid h-11 w-11 place-items-center rounded-full bg-gray-950 text-white transition hover:bg-secondaryBrown"
            aria-label="Next category"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid overflow-hidden rounded-lg border border-gray-200 bg-white lg:grid-cols-[1.1fr_0.9fr]">
        <Link
          href={`/shop/${activeCategory.link}`}
          className="relative block min-h-[520px] overflow-hidden bg-gray-100 max-md:min-h-[380px]"
        >
          <img
            src={`/assets/${activeCategory.image}`}
            alt={activeCategory.title}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
          <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-gray-950">
            {activeCategory.mood}
          </div>
        </Link>

        <div className="flex min-h-[520px] flex-col justify-between p-6 md:p-8">
          <div>
            <div className="grid grid-cols-3 gap-3 border-b border-gray-200 pb-6">
              <div>
                <p className="text-3xl font-semibold text-gray-950">
                  {activeCategory.pieceCount}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gray-500">
                  Pieces
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-gray-950">4</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gray-500">
                  Edits
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-gray-950">24h</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gray-500">
                  Dispatch
                </p>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-sm uppercase tracking-[0.28em] text-secondaryBrown">
                Category focus
              </p>
              <h3 className="mt-4 text-4xl font-semibold leading-tight text-gray-950 md:text-5xl">
                {activeCategory.title}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-gray-600">
                {activeCategory.copy}
              </p>
              <Link
                href={`/shop/${activeCategory.link}`}
                className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-gray-950 px-5 text-sm font-medium text-white transition hover:bg-secondaryBrown"
              >
                {t("seeCollection")}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {queuedCategories.slice(1, 4).map((category, index) => (
              <button
                key={category.link}
                type="button"
                onClick={() =>
                  setActiveIndex(
                    categories.findIndex((item) => item.link === category.link)
                  )
                }
                className="group overflow-hidden rounded-lg border border-gray-200 bg-gray-50 text-left"
              >
                <img
                  src={`/assets/${category.image}`}
                  alt={category.title}
                  className="h-28 w-full object-cover transition group-hover:scale-105"
                />
                <div className="p-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                    0{index + 2}
                  </p>
                  <p className="mt-1 line-clamp-1 text-sm font-medium text-gray-950">
                    {category.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryImpactCarousel;
