import Link from "next/link";
import { useLanguage } from "../i18n";

const Banner = () => {
  const { t } = useLanguage();

  return (
    <div className="banner flex w-full flex-col items-center justify-end px-5 pb-10 text-center max-sm:h-[550px]">
      <h2 className="max-w-3xl font-serif text-5xl font-semibold leading-tight text-white sm:text-6xl">
        {t("heroTitle").split("\n")[0]} <br />
        {t("heroTitle").split("\n")[1]}
      </h2>
      <h3 className="mt-4 text-xl font-medium text-white/90 sm:text-2xl">
        {t("heroSubtitle")}
      </h3>
      <div className="mt-7 flex w-full max-w-md items-center justify-center gap-3 max-[430px]:flex-col">
        <Link
          href="/shop"
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-stone-950 transition hover:bg-[#f8f0e7]"
        >
          {t("shopNow")}
        </Link>
        <Link
          href="/shop"
          className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/80 px-6 text-sm font-bold text-white transition hover:bg-white hover:text-stone-950"
        >
          {t("seeCollection")}
        </Link>
      </div>
    </div>
  );
};
export default Banner;
