import { Language, useLanguage } from "../i18n";
import Link from "next/link";
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
  labelKey: FooterLinkKey;
  to?: string;
  comingSoon?: boolean;
};

type FooterColumn = {
  titleKey: FooterColumnKey;
  links: FooterLinkItem[];
};

type FooterColumnKey = "company" | "customerCare" | "categories" | "collections";

type FooterLinkKey =
  | "about"
  | "editorial"
  | "sustainability"
  | "careers"
  | "contact"
  | "helpCenter"
  | "returns"
  | "orderTracking"
  | "shipping"
  | "sizeGuide"
  | "dresses"
  | "newArrivals"
  | "luxuryCollection"
  | "essentials"
  | "accessories"
  | "bestSellers"
  | "occasionEdit"
  | "atelierDrop"
  | "resort"
  | "privateSale";

const footerColumns: FooterColumn[] = [
  {
    titleKey: "company",
    links: [
      { labelKey: "about", to: "/info/about" },
      { labelKey: "editorial", comingSoon: true },
      { labelKey: "sustainability", comingSoon: true },
      { labelKey: "careers", comingSoon: true },
      { labelKey: "contact", to: "/info/contact" },
    ],
  },
  {
    titleKey: "customerCare",
    links: [
      { labelKey: "helpCenter", to: "/info/faq" },
      { labelKey: "returns", to: "/info/returns" },
      { labelKey: "orderTracking", comingSoon: true },
      { labelKey: "shipping", to: "/info/shipping" },
      { labelKey: "sizeGuide", comingSoon: true },
    ],
  },
  {
    titleKey: "categories",
    links: [
      { labelKey: "dresses", to: "/shop/special-edition" },
      { labelKey: "newArrivals", to: "/shop" },
      { labelKey: "luxuryCollection", to: "/shop/luxury-collection" },
      { labelKey: "essentials", to: "/shop/unique-collection" },
      { labelKey: "accessories", to: "/shop/summer-edition" },
    ],
  },
  {
    titleKey: "collections",
    links: [
      { labelKey: "bestSellers", to: "/shop" },
      { labelKey: "occasionEdit", comingSoon: true },
      { labelKey: "atelierDrop", comingSoon: true },
      { labelKey: "resort", comingSoon: true },
      { labelKey: "privateSale", comingSoon: true },
    ],
  },
];

const footerCopy: Record<
  Language,
  {
    joinEyebrow: string;
    joinTitle: string;
    joinText: string;
    emailLabel: string;
    emailPlaceholder: string;
    subscribeLabel: string;
    shopAnywhereTitle: string;
    shopAnywhereText: string;
    appStore: string;
    googlePlay: string;
    contactTitle: string;
    columns: Record<FooterColumnKey, string>;
    links: Record<FooterLinkKey, string>;
    comingSoonTitle: string;
    comingSoonSubtitle: (feature: string) => string;
    newsletterFeature: string;
    appStoreFeature: string;
    googlePlayFeature: string;
    socialFeature: (label: string) => string;
  }
> = {
  en: {
    joinEyebrow: "Join the edit",
    joinTitle: "Receive private drops, styling notes, and restock alerts.",
    joinText: "Demo signup only. No production email service is connected.",
    emailLabel: "Email",
    emailPlaceholder: "Email address",
    subscribeLabel: "Subscribe",
    shopAnywhereTitle: "Shop anywhere",
    shopAnywhereText:
      "Keep wishlists, cart review, and order status close across your demo shopping flow.",
    appStore: "App Store",
    googlePlay: "Google Play",
    contactTitle: "Contact",
    columns: {
      company: "Company",
      customerCare: "Customer Care",
      categories: "Categories",
      collections: "Collections",
    },
    links: {
      about: "About",
      editorial: "Editorial",
      sustainability: "Sustainability",
      careers: "Careers",
      contact: "Contact",
      helpCenter: "Help Center",
      returns: "Returns",
      orderTracking: "Order Tracking",
      shipping: "Shipping",
      sizeGuide: "Size Guide",
      dresses: "Dresses",
      newArrivals: "New Arrivals",
      luxuryCollection: "Luxury Collection",
      essentials: "Essentials",
      accessories: "Accessories",
      bestSellers: "Best Sellers",
      occasionEdit: "Occasion Edit",
      atelierDrop: "Atelier Drop",
      resort: "Resort",
      privateSale: "Private Sale",
    },
    comingSoonTitle: "Coming soon",
    comingSoonSubtitle: (feature) => `${feature} is not ready yet.`,
    newsletterFeature: "Newsletter signup",
    appStoreFeature: "App Store download",
    googlePlayFeature: "Google Play download",
    socialFeature: (label) => `${label} social link`,
  },
  de: {
    joinEyebrow: "Werde Teil des Edits",
    joinTitle: "Erhalte private Drops, Styling-Notizen und Restock-Hinweise.",
    joinText: "Nur Demo-Anmeldung. Kein Produktions-E-Mail-Service ist verbunden.",
    emailLabel: "E-Mail",
    emailPlaceholder: "E-Mail-Adresse",
    subscribeLabel: "Abonnieren",
    shopAnywhereTitle: "Überall shoppen",
    shopAnywhereText:
      "Behalte Wunschlisten, Warenkorbprüfung und Bestellstatus im Demo-Shoppingflow im Blick.",
    appStore: "App Store",
    googlePlay: "Google Play",
    contactTitle: "Kontakt",
    columns: {
      company: "Unternehmen",
      customerCare: "Kundenservice",
      categories: "Kategorien",
      collections: "Kollektionen",
    },
    links: {
      about: "Über uns",
      editorial: "Editorial",
      sustainability: "Nachhaltigkeit",
      careers: "Karriere",
      contact: "Kontakt",
      helpCenter: "Hilfe",
      returns: "Rückgabe",
      orderTracking: "Sendungsverfolgung",
      shipping: "Versand",
      sizeGuide: "Größenberater",
      dresses: "Kleider",
      newArrivals: "Neuheiten",
      luxuryCollection: "Luxuskollektion",
      essentials: "Essentials",
      accessories: "Accessoires",
      bestSellers: "Bestseller",
      occasionEdit: "Anlass-Edit",
      atelierDrop: "Atelier Drop",
      resort: "Resort",
      privateSale: "Private Sale",
    },
    comingSoonTitle: "Kommt bald",
    comingSoonSubtitle: (feature) => `${feature} ist noch nicht verfügbar.`,
    newsletterFeature: "Newsletter-Anmeldung",
    appStoreFeature: "App-Store-Download",
    googlePlayFeature: "Google-Play-Download",
    socialFeature: (label) => `${label} Social Link`,
  },
  tr: {
    joinEyebrow: "Seçkiye katıl",
    joinTitle: "Özel serileri, stil notlarını ve stok bildirimlerini al.",
    joinText: "Bu yalnızca demo kaydıdır. Gerçek e-posta servisi bağlı değildir.",
    emailLabel: "E-posta",
    emailPlaceholder: "E-posta adresi",
    subscribeLabel: "Abone ol",
    shopAnywhereTitle: "Her yerden alışveriş yap",
    shopAnywhereText:
      "Favorilerini, sepet kontrolünü ve sipariş durumunu demo alışveriş akışında yanında tut.",
    appStore: "App Store",
    googlePlay: "Google Play",
    contactTitle: "İletişim",
    columns: {
      company: "Şirket",
      customerCare: "Müşteri Hizmetleri",
      categories: "Kategoriler",
      collections: "Koleksiyonlar",
    },
    links: {
      about: "Hakkımızda",
      editorial: "Editoryal",
      sustainability: "Sürdürülebilirlik",
      careers: "Kariyer",
      contact: "İletişim",
      helpCenter: "Yardım Merkezi",
      returns: "İadeler",
      orderTracking: "Sipariş Takibi",
      shipping: "Kargo",
      sizeGuide: "Beden Rehberi",
      dresses: "Elbiseler",
      newArrivals: "Yeni Gelenler",
      luxuryCollection: "Lüks Koleksiyon",
      essentials: "Temel Parçalar",
      accessories: "Aksesuarlar",
      bestSellers: "Çok Satanlar",
      occasionEdit: "Davet Seçkisi",
      atelierDrop: "Atölye Serisi",
      resort: "Resort",
      privateSale: "Özel Satış",
    },
    comingSoonTitle: "Yakında",
    comingSoonSubtitle: (feature) => `${feature} henüz hazır değil.`,
    newsletterFeature: "Bülten kaydı",
    appStoreFeature: "App Store indirme",
    googlePlayFeature: "Google Play indirme",
    socialFeature: (label) => `${label} sosyal bağlantısı`,
  },
};

const Footer = () => {
  const { language, t } = useLanguage();
  const { showToast } = useToast();
  const copy = footerCopy[language];

  const showComingSoonToast = (feature: string) => {
    showToast({
      key: `coming-soon-${feature.toLowerCase().replace(/\s+/g, "-")}`,
      title: copy.comingSoonTitle,
      subtitle: copy.comingSoonSubtitle(feature),
      leading: () => <Clock3 className="h-5 w-5" />,
    });
  };

  return (
    <footer className="border-t border-stone-200 bg-[#1c1917] text-white">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-10 px-8 py-12 max-lg:grid-cols-1 max-sm:px-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ead7bd]">
            {copy.joinEyebrow}
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl font-semibold">
            {copy.joinTitle}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-white/65">
            {copy.joinText}
          </p>
          <form className="mt-6 flex max-w-md rounded-full border border-white/20 bg-white/8 p-1">
            <label className="sr-only" htmlFor="newsletter-email">
              {copy.emailLabel}
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder={copy.emailPlaceholder}
              className="h-12 min-w-0 flex-1 border-0 bg-transparent px-4 text-sm text-white placeholder:text-white/45 outline-none focus:ring-0"
            />
            <button
              type="button"
              onClick={() => showComingSoonToast(copy.newsletterFeature)}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-stone-950 transition hover:bg-[#ead7bd]"
              aria-label={copy.subscribeLabel}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>

        <div className="flex items-start justify-between gap-8 max-sm:flex-col">
          <div>
            <h2 className="font-serif text-3xl font-semibold">
              {copy.shopAnywhereTitle}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/65">
              {copy.shopAnywhereText}
            </p>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => showComingSoonToast(copy.appStoreFeature)}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-xs font-bold transition hover:bg-white hover:text-stone-950"
              >
                <Smartphone className="h-4 w-4" />
                {copy.appStore}
              </button>
              <button
                type="button"
                onClick={() => showComingSoonToast(copy.googlePlayFeature)}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-xs font-bold transition hover:bg-white hover:text-stone-950"
              >
                <Smartphone className="h-4 w-4" />
                {copy.googlePlay}
              </button>
            </div>
          </div>
          <div className="border-l border-white/15 pl-8 max-sm:border-l-0 max-sm:pl-0">
            <h3 className="text-lg font-black">{copy.contactTitle}</h3>
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
          <div key={column.titleKey}>
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-[#ead7bd]">
              {copy.columns[column.titleKey]}
            </h3>
            <div className="mt-4 grid gap-2">
              {column.links.map((link) => (
                <FooterLink
                  key={link.labelKey}
                  to={link.to}
                  onComingSoon={
                    link.comingSoon
                      ? () => showComingSoonToast(copy.links[link.labelKey])
                      : undefined
                  }
                >
                  {copy.links[link.labelKey]}
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
              onClick={() => showComingSoonToast(copy.socialFeature(label))}
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
    <Link href={to} className={className}>
      {children}
    </Link>
  );
};

export default Footer;
