import SocialMediaFooter from "./SocialMediaFooter";
import { HiChevronDown } from "react-icons/hi2";
import { useLanguage } from "../i18n";
import { Link } from "react-router-dom";


const Footer = () => {
  const { t } = useLanguage();

  return (
    <>
      <SocialMediaFooter />
      <footer className="max-w-screen-2xl mx-auto border-b-8 border-secondaryBrown px-5 max-[400px]:px-3">
        <div className="flex justify-center gap-24 text-center mt-12 max-[800px]:flex-col max-[800px]:gap-10">
          <div className="flex flex-col gap-1">
            <Link
              to="/info/client-service"
              className="text-2xl font-bold transition hover:text-secondaryBrown max-sm:text-xl"
            >
              {t("footerClient")}
            </Link>
            <FooterLink to="/info/after-sale-service">{t("afterSale")}</FooterLink>
            <FooterLink to="/info/free-insurance">{t("freeInsurance")}</FooterLink>
          </div>

          <div className="flex flex-col gap-1">
            <Link
              to="/info/our-story"
              className="text-2xl font-bold transition hover:text-secondaryBrown max-sm:text-xl"
            >
              {t("ourBrand")}
            </Link>
            <FooterLink to="/info/company">{t("companyFooter")}</FooterLink>
            <FooterLink to="/info/about">About</FooterLink>
            <FooterLink to="/info/contact">Contact</FooterLink>
            <FooterLink to="/info/faq">FAQ</FooterLink>
            <FooterLink to="/info/excellence">{t("excellence")}</FooterLink>
            <FooterLink to="/info/awards">{t("awards")}</FooterLink>
            <FooterLink to="/info/our-story">{t("ourStory")}</FooterLink>
          </div>

          <div className="flex flex-col gap-1">
            <Link
              to="/shop"
              className="text-2xl font-bold transition hover:text-secondaryBrown max-sm:text-xl"
            >
              {t("luxuryClothing")}
            </Link>
            <FooterLink to="/shop/special-edition">{t("specialEdition")}</FooterLink>
            <FooterLink to="/shop/luxury-collection">{t("luxuryCollection")}</FooterLink>
            <FooterLink to="/shop/summer-edition">{t("summerEdition")}</FooterLink>
            <FooterLink to="/shop/unique-collection">{t("uniqueCollection")}</FooterLink>
          </div>
        </div>
        <div className="flex flex-col gap-8 my-20">
          <p className="flex justify-center items-center text-2xl gap-2 max-sm:text-xl">{t("locale")} <HiChevronDown /></p>
          <h2 className="text-6xl font-light text-center max-sm:text-5xl">{t("brand")}</h2>
          <p className="text-base text-center max-sm:text-sm">{t("rights")}</p>
          <ul className="flex flex-wrap justify-center items-center gap-7 text-base max-sm:text-sm max-[350px]:flex-col max-[350px]:gap-5">
            <li>
              <FooterLink to="/info/cookies">{t("cookies")}</FooterLink>
            </li>
            <li>
              <FooterLink to="/info/privacy">{t("privacy")}</FooterLink>
            </li>
            <li>
              <FooterLink to="/info/shipping">Shipping</FooterLink>
            </li>
            <li>
              <FooterLink to="/info/returns">Returns</FooterLink>
            </li>
            <li>
              <FooterLink to="/info/terms">{t("legal")}</FooterLink>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

const FooterLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="text-lg transition hover:text-secondaryBrown max-sm:text-base"
  >
    {children}
  </Link>
);

export default Footer;
