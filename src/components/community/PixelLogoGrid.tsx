import type { CSSProperties } from "react";
import { useLanguage } from "../../i18n";

const brands = [
  { name: "Atölye", color: "#8A8475" },
  { name: "Maison 21", color: "#111827" },
  { name: "Kuzey", color: "#0F766E" },
  { name: "Ruixen", color: "#7C3AED" },
  { name: "Ease", color: "#BE123C" },
  { name: "Shadway", color: "#2563EB" },
  { name: "Soliman", color: "#B45309" },
  { name: "Canvas", color: "#047857" },
];

const pixels = Array.from({ length: 42 }, (_, index) => index);

const PixelLogoGrid = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-white px-5 py-20">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-secondaryBrown">
              {t("featuredLabels")}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-950 md:text-5xl">
              {t("pixelHeading")}
            </h2>
          </div>
          <p className="max-w-md text-gray-600">
            {t("pixelText")}
          </p>
        </div>

        <div className="grid border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group relative isolate grid h-32 place-items-center overflow-hidden bg-white"
              style={{ "--brand": brand.color } as CSSProperties}
            >
              <div className="absolute inset-0 grid grid-cols-7 grid-rows-6 gap-1 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {pixels.map((pixel) => (
                  <span
                    key={pixel}
                    className="scale-0 bg-[var(--brand)] transition-transform duration-500 group-hover:scale-100"
                    style={{
                      transitionDelay: `${Math.abs(pixel - 21) * 12}ms`,
                    }}
                  />
                ))}
              </div>
              <span className="relative z-10 text-2xl font-semibold tracking-wide text-gray-400 transition group-hover:scale-105 group-hover:text-[var(--brand)]">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PixelLogoGrid;
