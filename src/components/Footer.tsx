import { useLanguage } from "../i18n";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import { ArrowRight, Mail, Phone, Smartphone } from "lucide-react";

const footerColumns = [
  {
    title: "Kurumsal",
    links: ["Hakkımızda", "Koton Blog", "Projelerimiz", "Kariyer", "İletişim"],
  },
  {
    title: "Yardım",
    links: ["Sıkça Sorulan Sorular", "İptal & İade", "Sipariş Takibi", "Mağazalarımız", "Kampanyalar"],
  },
  {
    title: "Popüler Kategoriler",
    links: ["Kadın Elbise", "Kadın Pantolon", "Keten Elbise", "Abiye Elbise", "Erkek Gömlek"],
  },
  {
    title: "Koleksiyonlar",
    links: ["Yeni Gelenler", "Çok Satanlar", "Ofis Stili", "Plaj Giyim", "Koton Jeans"],
  },
];

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-20 border-t border-gray-200 bg-[#f5f5f5] text-black">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-10 px-8 py-10 max-lg:grid-cols-1 max-sm:px-4">
        <div>
          <h2 className="text-xl font-black">En güncel moda haberleri için kaydolun</h2>
          <p className="mt-2 text-sm text-gray-600">
            Herkesten önce kaçırılmaması gereken haberleri alın.
          </p>
          <form className="mt-6 flex max-w-md">
            <label className="sr-only" htmlFor="newsletter-email">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="E-posta adresiniz"
              className="h-12 min-w-0 flex-1 border border-black bg-white px-4 text-sm outline-none focus:ring-0"
            />
            <button
              type="button"
              className="grid h-12 w-16 place-items-center bg-black text-white"
              aria-label="Subscribe"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>

        <div className="flex items-start justify-between gap-8 max-sm:flex-col">
          <div>
            <h2 className="text-xl font-black">Alışveriş Uygulamamızı İndirin</h2>
            <p className="mt-2 text-sm text-gray-600">
              Mobil uygulamamızı keşfedin, size özel fırsatları yakalayın.
            </p>
            <div className="mt-5 flex gap-2">
              <span className="inline-flex h-10 items-center gap-2 border border-black px-4 text-xs font-bold">
                <Smartphone className="h-4 w-4" />
                App Store
              </span>
              <span className="inline-flex h-10 items-center gap-2 border border-black px-4 text-xs font-bold">
                <Smartphone className="h-4 w-4" />
                Google Play
              </span>
            </div>
          </div>
          <div className="border-l border-gray-300 pl-8 max-sm:border-l-0 max-sm:pl-0">
            <h3 className="text-lg font-black">Bize Ulaşın</h3>
            <p className="mt-4 flex items-center gap-2 text-sm font-bold">
              <Phone className="h-4 w-4" />
              0850 208 71 71
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm font-bold">
              <Mail className="h-4 w-4" />
              ekermuratinfo@gmail.com
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-screen-2xl grid-cols-4 gap-10 border-t border-gray-200 px-8 py-10 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:px-4">
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-black uppercase">{column.title}</h3>
            <div className="mt-4 grid gap-2">
              {column.links.map((link) => (
                <FooterLink key={link} to="/info/about">
                  {link}
                </FooterLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-screen-2xl items-center justify-between border-t border-gray-200 px-8 py-7 max-sm:flex-col max-sm:gap-5 max-sm:px-4">
        <div className="flex items-center gap-3">
          {[FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTiktok].map(
            (Icon, index) => (
              <Link
                key={index}
                to="/info/social"
                className="grid h-9 w-9 place-items-center rounded-full bg-black text-white transition hover:bg-gray-700"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ),
          )}
        </div>
        <div className="text-center">
          <h2 className="text-4xl font-black uppercase tracking-[-0.08em]">
            {t("brand")}
          </h2>
          <p className="mt-1 text-xs text-gray-500">{t("rights")}</p>
        </div>
      </div>
    </footer>
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
    className="text-sm text-gray-600 transition hover:text-black"
  >
    {children}
  </Link>
);

export default Footer;
