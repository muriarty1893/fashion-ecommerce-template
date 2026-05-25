import { useLanguage } from "../i18n";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import { ArrowRight, Clock3, Mail, Phone, Smartphone } from "lucide-react";
import { useToast } from "./ToastProvider";

type FooterLinkItem = {
  label: string;
  to?: string;
  comingSoon?: boolean;
};

type FooterColumn = {
  title: string;
  links: FooterLinkItem[];
};

const footerColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About", to: "/info/about" },
      { label: "Editorial", comingSoon: true },
      { label: "Sustainability", comingSoon: true },
      { label: "Careers", comingSoon: true },
      { label: "Contact", to: "/info/contact" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Help Center", to: "/info/faq" },
      { label: "Returns", to: "/info/returns" },
      { label: "Order Tracking", comingSoon: true },
      { label: "Shipping", to: "/info/shipping" },
      { label: "Size Guide", comingSoon: true },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Dresses", to: "/shop/special-edition" },
      { label: "New Arrivals", to: "/shop" },
      { label: "Luxury Collection", to: "/shop/luxury-collection" },
      { label: "Essentials", to: "/shop/unique-collection" },
      { label: "Accessories", to: "/shop/summer-edition" },
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "Best Sellers", to: "/shop" },
      { label: "Occasion Edit", comingSoon: true },
      { label: "Atelier Drop", comingSoon: true },
      { label: "Resort", comingSoon: true },
      { label: "Private Sale", comingSoon: true },
    ],
  },
];

const Footer = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const showComingSoonToast = (feature: string) => {
    showToast({
      key: `coming-soon-${feature.toLowerCase().replace(/\s+/g, "-")}`,
      title: "Coming soon",
      subtitle: `${feature} is not ready yet.`,
      leading: () => <Clock3 className="h-5 w-5" />,
    });
  };

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
              onClick={() => showComingSoonToast("Newsletter signup")}
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
              <button
                type="button"
                onClick={() => showComingSoonToast("App Store download")}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-xs font-bold transition hover:bg-white hover:text-stone-950"
              >
                <Smartphone className="h-4 w-4" />
                App Store
              </button>
              <button
                type="button"
                onClick={() => showComingSoonToast("Google Play download")}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-xs font-bold transition hover:bg-white hover:text-stone-950"
              >
                <Smartphone className="h-4 w-4" />
                Google Play
              </button>
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
                <FooterLink
                  key={link.label}
                  to={link.to}
                  onComingSoon={
                    link.comingSoon
                      ? () => showComingSoonToast(link.label)
                      : undefined
                  }
                >
                  {link.label}
                </FooterLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-screen-2xl items-center justify-between border-t border-white/10 px-8 py-7 max-sm:flex-col max-sm:gap-5 max-sm:px-4">
        <div className="flex items-center gap-3">
          {[
            { label: "Facebook", icon: FaFacebookF },
            { label: "Instagram", icon: FaInstagram },
            { label: "LinkedIn", icon: FaLinkedinIn },
            { label: "YouTube", icon: FaYoutube },
            { label: "TikTok", icon: FaTiktok },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => showComingSoonToast(`${label} social link`)}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-stone-950"
              aria-label={`${label} social link`}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
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
  onComingSoon,
  children,
}: {
  to?: string;
  onComingSoon?: () => void;
  children: React.ReactNode;
}) => {
  const className = "text-left text-sm text-white/62 transition hover:text-white";

  if (!to) {
    return (
      <button type="button" onClick={onComingSoon} className={className}>
        {children}
      </button>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

export default Footer;
