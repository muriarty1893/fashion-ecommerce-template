import { HiChevronUp } from "react-icons/hi2";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="px-5 max-[400px]:px-3 mt-12 mb-24">
      <div className="flex flex-col gap-6 justify-center items-center w-1/2 mx-auto max-sm:w-3/4 max-sm:gap-5">
        <p className="text-xl max-sm:text-lg">
          {t("showing")} {showingProducts} {t("of")} {totalProducts} {t("productsShown")}
        </p>
        {showingProducts < totalProducts && (
          <Button
            text={t("showMore")}
            mode="white"
            onClick={() => {
              setCurrentPage(page + 1);
              navigate(`/shop${category ? `/${category}` : ""}?page=${page + 1}`);
            }}
          />
        )}
        <a href="#gridTop" className="flex justify-center items-center text-xl gap-2 max-sm:text-lg">
          {t("backTop")} <HiChevronUp />
        </a>
      </div>
    </div>
  );
};
export default ShowingPagination;
