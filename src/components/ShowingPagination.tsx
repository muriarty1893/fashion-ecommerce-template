import { HiChevronUp } from "react-icons/hi2";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../hooks";
import { useLanguage } from "../i18n";

const ShowingPagination = ({
  page,
  category,
  setCurrentPage,
}: {
  page: number;
  category: string;
  setCurrentPage: (page: number) => void;
}) => {
  const { totalProducts, showingProducts } = useAppSelector(state => state.shop);
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="mb-16 mt-12 px-5 max-[400px]:px-3">
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-5 rounded-3xl border border-stone-200 bg-white p-6 text-center shadow-[0_18px_45px_rgba(28,25,23,0.05)]">
        <p className="text-base font-semibold text-stone-700">
          {t("showing")} {showingProducts} {t("of")} {totalProducts} {t("productsShown")}
        </p>
        {showingProducts < totalProducts && (
          <Button
            text={t("showMore")}
            mode="white"
            onClick={() => {
              setCurrentPage(page + 1);
              router.push(`/shop${category ? `/${category}` : ""}?page=${page + 1}`);
            }}
          />
        )}
        <a href="#gridTop" className="flex items-center justify-center gap-2 text-sm font-bold text-stone-600 transition hover:text-stone-950">
          {t("backTop")} <HiChevronUp />
        </a>
      </div>
    </div>
  );
};
export default ShowingPagination;
