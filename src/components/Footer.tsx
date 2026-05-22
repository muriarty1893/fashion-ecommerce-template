import SocialMediaFooter from "./SocialMediaFooter";
import { HiChevronDown } from "react-icons/hi2";
import { useLanguage } from "../i18n";


const Footer = () => {
  const { t } = useLanguage();

  return (
    <>
      <SocialMediaFooter />
      <footer className="max-w-screen-2xl mx-auto border-b-8 border-secondaryBrown px-5 max-[400px]:px-3">
        <div className="flex justify-center gap-24 text-center mt-12 max-[800px]:flex-col max-[800px]:gap-10">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold max-sm:text-xl">{t("footerClient")}</h3>
            <p className="text-lg max-sm:text-base">{t("afterSale")}</p>
            <p className="text-lg max-sm:text-base">{t("freeInsurance")}</p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold max-sm:text-xl">{t("ourBrand")}</h3>
            <p className="text-lg max-sm:text-base">{t("companyFooter")}</p>
            <p className="text-lg max-sm:text-base">{t("excellence")}</p>
            <p className="text-lg max-sm:text-base">{t("awards")}</p>
            <p className="text-lg max-sm:text-base">{t("ourStory")}</p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold max-sm:text-xl">{t("luxuryClothing")}</h3>
            <p className="text-lg max-sm:text-base">{t("specialEdition")}</p>
            <p className="text-lg max-sm:text-base">{t("summerEdition")}</p>
            <p className="text-lg max-sm:text-base">{t("uniqueCollection")}</p>
          </div>
        </div>
        <div className="flex flex-col gap-8 my-20">
          <p className="flex justify-center items-center text-2xl gap-2 max-sm:text-xl">{t("locale")} <HiChevronDown /></p>
          <h2 className="text-6xl font-light text-center max-sm:text-5xl">{t("brand")}</h2>
          <p className="text-base text-center max-sm:text-sm">{t("rights")}</p>
          <ul className="flex justify-center items-center gap-7 text-base max-sm:text-sm max-[350px]:flex-col max-[350px]:gap-5">
            <li>{t("cookies")}</li>
            <li>{t("privacy")}</li>
            <li>{t("legal")}</li>
          </ul>
        </div>
      </footer>
    </>
  );
};
export default Footer;
