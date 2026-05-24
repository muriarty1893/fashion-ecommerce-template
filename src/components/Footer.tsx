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
    title: "Company",
    links: ["About", "Editorial", "Sustainability", "Careers", "Contact"],
  },
  {
    title: "Customer Care",
    links: ["Help Center", "Returns", "Order Tracking", "Shipping", "Size Guide"],
  },
  {
    title: "Categories",
    links: ["Dresses", "New Arrivals", "Luxury Collection", "Essentials", "Accessories"],
  },
  {
    title: "Collections",
    links: ["Best Sellers", "Occasion Edit", "Atelier Drop", "Resort", "Private Sale"],
  },
];

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-stone-200 bg-[#1c1917] text-white">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-10 px-8 py-12 max-lg:grid-cols-1 max-sm:px-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ead7bd]">
            Join the edit
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl font-semibold">
            Receive private drops, styling notes, and restock alerts.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-white/65">
            Demo signup only. No production email service is connected.
          </p>
          <form className="mt-6 flex max-w-md rounded-full border border-white/20 bg-white/8 p-1">
            <label className="sr-only" htmlFor="newsletter-email">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Email address"
              className="h-12 min-w-0 flex-1 border-0 bg-transparent px-4 text-sm text-white placeholder:text-white/45 outline-none focus:ring-0"
            />
            <button
              type="button"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-stone-950 transition hover:bg-[#ead7bd]"
              aria-label="Subscribe"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>

        <div className="flex items-start justify-between gap-8 max-sm:flex-col">
          <div>
            <h2 className="font-serif text-3xl font-semibold">Shop anywhere</h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/65">
              Keep wishlists, cart review, and order status close across your
              demo shopping flow.
            </p>
            <div className="mt-5 flex gap-2">
              <span className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-xs font-bold">
                <Smartphone className="h-4 w-4" />
                App Store
              </span>
              <span className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-xs font-bold">
                <Smartphone className="h-4 w-4" />
                Google Play
              </span>
            </div>
          </div>
          <div className="border-l border-white/15 pl-8 max-sm:border-l-0 max-sm:pl-0">
            <h3 className="text-lg font-black">Contact</h3>
            <p className="mt-4 flex items-center gap-2 text-sm font-bold text-white/82">
              <Phone className="h-4 w-4" />
              0850 208 71 71
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm font-bold text-white/82">
              <Mail className="h-4 w-4" />
              ekermuratinfo@gmail.com
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-screen-2xl grid-cols-4 gap-10 border-t border-white/10 px-8 py-10 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:px-4">
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-[#ead7bd]">
              {column.title}
            </h3>
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

      <div className="mx-auto flex max-w-screen-2xl items-center justify-between border-t border-white/10 px-8 py-7 max-sm:flex-col max-sm:gap-5 max-sm:px-4">
        <div className="flex items-center gap-3">
          {[FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTiktok].map(
            (Icon, index) => (
              <Link
                key={index}
                to="/info/social"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-stone-950"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ),
          )}
        </div>
        <div className="text-center">
          <h2 className="font-serif text-4xl font-bold uppercase tracking-normal">
            {t("brand")}
          </h2>
          <p className="mt-1 text-xs text-white/45">{t("rights")}</p>
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
    className="text-sm text-white/62 transition hover:text-white"
  >
    {children}
  </Link>
);

export default Footer;
