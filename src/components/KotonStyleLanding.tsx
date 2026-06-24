import {
  ArrowRight,
  Clock3,
  CreditCard,
  Headphones,
  Heart,
  PackageCheck,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SlotText } from "slot-text/react";
import CustomerFeedbackSection from "./community/CustomerFeedbackSection";
import HomeBestSellerGrid from "./HomeBestSellerGrid";
import ProductGridWrapper from "./ProductGridWrapper";
import { useToast } from "./ToastProvider";
import { Language, useLanguage } from "../i18n";

const categories = [
  {
    key: "dresses",
    image: "/assets/dress/5.png",
    to: "/shop/special-edition",
  },
  {
    key: "newArrivals",
    image: "/assets/luxury category 2.png",
    to: "/shop",
  },
  {
    key: "luxury",
    image: "/assets/product image 6.jpg",
    to: "/shop/luxury-collection",
  },
  {
    key: "essentials",
    image: "/assets/product image 18.jpg",
    to: "/shop/unique-collection",
  },
  {
    key: "accessories",
    image: "/assets/luxury category 4.png",
    to: "/shop/summer-edition",
  },
  {
    key: "editorialCollection",
    image: "/assets/generated/editorial-orbit-tailoring.png",
    to: "/shop/editorial-collection",
  },
] as const;

const trustItems = [
  {
    key: "shipping",
    icon: Truck,
  },
  {
    key: "returns",
    icon: RotateCcw,
  },
  {
    key: "checkout",
    icon: ShieldCheck,
  },
  {
    key: "support",
    icon: Headphones,
  },
] as const;

type RollingArrowLinkProps = {
  href: string;
  className: string;
  text: string;
  hoverText: string;
  ariaLabel?: string;
};

const RollingArrowLink = ({
  href,
  className,
  text,
  hoverText,
  ariaLabel,
}: RollingArrowLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label={ariaLabel ?? text}
      className={className}
    >
      <SlotText
        className="slot-text"
        text={isHovered ? hoverText : text}
        options={{
          direction: isHovered ? "up" : "down",
          skipUnchanged: false,
        }}
      />
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
};

export const FeaturedCategoriesSection = () => {
  const { language } = useLanguage();
  const copy = landingCopy[language];

  return (
    <section className="mx-auto max-w-screen-2xl px-5 py-14 md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b6b43]">
            {copy.categoryEyebrow}
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-stone-950 md:text-5xl">
            {copy.categoryTitle}
          </h2>
        </div>
        <Link
          href="/shop"
          className="inline-flex w-fit items-center gap-2 text-sm font-bold text-stone-950 transition hover:text-[#9b6b43]"
        >
          {copy.categoryCta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category) => {
          const categoryCopy = copy.categories[category.key];

          return (
            <Link
              key={category.key}
              href={category.to}
              className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_18px_45px_rgba(28,25,23,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_65px_rgba(28,25,23,0.12)] focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
            >
              <div className="aspect-[4/5] overflow-hidden bg-stone-100">
                <img
                  src={category.image}
                  alt={`${categoryCopy.title} category`}
                  className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-2xl font-semibold">
                  {categoryCopy.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  {categoryCopy.text}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#9b6b43]">
                  {copy.shopNow}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

const landingCopy: Record<
  Language,
  {
    badges: [string, string];
    eyebrow: string;
    title: string;
    intro: string;
    primaryCta: string;
    secondaryCta: string;
    secondaryCtaHover: string;
    stats: [string, string, string];
    heroEdit: string;
    heroTitle: string;
    viewProduct: string;
    viewProductHover: string;
    limitedDrop: string;
    satinTitle: string;
    searchTitle: string;
    searchText: string;
    searchCta: string;
    searchCtaHover: string;
    categoryEyebrow: string;
    categoryTitle: string;
    categoryCta: string;
    shopNow: string;
    categories: Record<(typeof categories)[number]["key"], { title: string; text: string }>;
    saleEyebrow: string;
    saleTitle: string;
    saleText: string;
    saleCta: string;
    dressesCta: string;
    dressesCtaHover: string;
    styleEyebrow: string;
    styleTitle: string;
    styleText: string;
    editorialCta: string;
    editorialCtaHover: string;
    viewAllProducts: string;
    viewAllProductsHover: string;
    feedbackEyebrow: string;
    feedbackTitle: string;
    feedbackText: string;
    trust: Record<(typeof trustItems)[number]["key"], { title: string; text: string }>;
    signupEyebrow: string;
    signupTitle: string;
    signupText: string;
    emailLabel: string;
    emailPlaceholder: string;
    signupCta: string;
    noSpam: string;
    comingSoonTitle: string;
    comingSoonSubtitle: (feature: string) => string;
    earlyAccessFeature: string;
  }
> = {
  en: {
    badges: ["Spring Atelier Drop", "Limited sizes back in stock"],
    eyebrow: "Premium dresses and modern clothing",
    title: "Build a wardrobe that feels quietly unforgettable.",
    intro:
      "Discover sculptural dresses, soft tailoring, and elevated everyday pieces curated for weddings, dinners, workdays, and weekend escapes.",
    primaryCta: "Shop New Arrivals",
    secondaryCta: "Explore Collection",
    secondaryCtaHover: "Open Collection",
    stats: ["Curated styles", "Average rating", "Fast dispatch"],
    heroEdit: "Hero edit",
    heroTitle: "Ivory occasion dresses",
    viewProduct: "View Product",
    viewProductHover: "Open Product",
    limitedDrop: "Limited drop",
    satinTitle: "Satin and soft structure",
    searchTitle: "Find your next signature piece.",
    searchText:
      "Search by collection, occasion, color, or size and move quickly from discovery to checkout.",
    searchCta: "Search the store",
    searchCtaHover: "Open Search",
    categoryEyebrow: "Shop by mood",
    categoryTitle: "Featured categories",
    categoryCta: "Explore all categories",
    shopNow: "Shop now",
    categories: {
      dresses: {
        title: "Dresses",
        text: "Occasion-ready shapes in satin, ivory, and cocoa tones.",
      },
      newArrivals: {
        title: "New Arrivals",
        text: "Fresh weekly edits for weekday polish and evening plans.",
      },
      luxury: {
        title: "Luxury Collection",
        text: "Elevated textures, sculpted tailoring, and limited runs.",
      },
      essentials: {
        title: "Essentials",
        text: "Foundational pieces designed to be worn on repeat.",
      },
      accessories: {
        title: "Accessories",
        text: "Finishing details for day-to-night styling.",
      },
      editorialCollection: {
        title: "Editorial Collection",
        text: "Concept mannequin looks with halo details and uniform styling.",
      },
    },
    saleEyebrow: "Seasonal private sale",
    saleTitle: "Up to 30 percent off selected occasion pieces.",
    saleText:
      "A short-run edit of dresses, knits, and polished separates with the same premium styling and a softer price.",
    saleCta: "Shop the Sale",
    dressesCta: "View New Dresses",
    dressesCtaHover: "Open Dresses",
    styleEyebrow: "Style notes",
    styleTitle: "Designed for the moments that make the calendar.",
    styleText:
      "Our edit balances clean lines, touchable textures, and confidence at checkout. Build complete outfits from dresses, refined tops, accessories, and seasonal layers without losing the premium feel.",
    editorialCta: "Read the editorial",
    editorialCtaHover: "Open editorial",
    viewAllProducts: "View all products",
    viewAllProductsHover: "Browse products",
    feedbackEyebrow: "Customer notes",
    feedbackTitle: "What shoppers are saying.",
    feedbackText:
      "A rotating wall of fake user feedback using the same motion style as the provided scroll row design.",
    trust: {
      shipping: {
        title: "Free shipping",
        text: "Complimentary delivery on orders over $150.",
      },
      returns: {
        title: "Easy returns",
        text: "14-day returns with prepaid labels.",
      },
      checkout: {
        title: "Secure checkout",
        text: "Encrypted demo checkout flow.",
      },
      support: {
        title: "Style support",
        text: "Fit and occasion guidance when you need it.",
      },
    },
    signupEyebrow: "Community first access",
    signupTitle: "Get early access to limited drops and private styling edits.",
    signupText:
      "Join for restock alerts, curated outfit ideas, and first notice when best-selling dresses return. Demo signup only, no production email service is connected.",
    emailLabel: "Email address",
    emailPlaceholder: "Email address",
    signupCta: "Sign Up",
    noSpam: "No spam. Just product drops, style edits, and member offers.",
    comingSoonTitle: "Coming soon",
    comingSoonSubtitle: (feature) => `${feature} is not ready yet.`,
    earlyAccessFeature: "Early access signup",
  },
  de: {
    badges: ["Spring Atelier Drop", "Ausgewählte Größen wieder verfügbar"],
    eyebrow: "Premium-Kleider und moderne Mode",
    title: "Baue eine Garderobe, die leise unvergesslich wirkt.",
    intro:
      "Entdecke skulpturale Kleider, weiches Tailoring und gehobene Alltagsstücke für Hochzeiten, Dinner, Arbeitstage und Wochenenden.",
    primaryCta: "Neuheiten shoppen",
    secondaryCta: "Kollektion entdecken",
    secondaryCtaHover: "Kollektion öffnen",
    stats: ["Kuratierte Styles", "Durchschnittsbewertung", "Schneller Versand"],
    heroEdit: "Hero Edit",
    heroTitle: "Ivory Anlasskleider",
    viewProduct: "Produkt ansehen",
    viewProductHover: "Produkt öffnen",
    limitedDrop: "Limitierter Drop",
    satinTitle: "Satin und weiche Struktur",
    searchTitle: "Finde dein nächstes Signature-Piece.",
    searchText:
      "Suche nach Kollektion, Anlass, Farbe oder Größe und gehe schnell von der Entdeckung zur Kasse.",
    searchCta: "Store durchsuchen",
    searchCtaHover: "Suche öffnen",
    categoryEyebrow: "Nach Stimmung shoppen",
    categoryTitle: "Ausgewählte Kategorien",
    categoryCta: "Alle Kategorien entdecken",
    shopNow: "Jetzt shoppen",
    categories: {
      dresses: {
        title: "Kleider",
        text: "Anlassbereite Silhouetten in Satin, Ivory und Cocoa-Tönen.",
      },
      newArrivals: {
        title: "Neuheiten",
        text: "Frische Wochenedits für Alltag, Büro und Abendlooks.",
      },
      luxury: {
        title: "Luxuskollektion",
        text: "Erhöhte Texturen, klare Schnitte und limitierte Stückzahlen.",
      },
      essentials: {
        title: "Essentials",
        text: "Basisstücke, die immer wieder getragen werden können.",
      },
      accessories: {
        title: "Accessoires",
        text: "Feine Details für Looks von Tag bis Abend.",
      },
      editorialCollection: {
        title: "Editorial-Kollektion",
        text: "Konzeptuelle Mannequin-Looks mit Halo-Details und Uniform-Styling.",
      },
    },
    saleEyebrow: "Saisonaler Private Sale",
    saleTitle: "Bis zu 30 Prozent auf ausgewählte Anlassstücke.",
    saleText:
      "Ein kurzer Edit aus Kleidern, Strick und eleganten Separates mit Premium-Styling zu einem sanfteren Preis.",
    saleCta: "Sale shoppen",
    dressesCta: "Neue Kleider ansehen",
    dressesCtaHover: "Kleider öffnen",
    styleEyebrow: "Style Notes",
    styleTitle: "Entworfen für die Momente, die im Kalender zählen.",
    styleText:
      "Unser Edit verbindet klare Linien, spürbare Texturen und Sicherheit beim Checkout. Stelle komplette Outfits aus Kleidern, feinen Tops, Accessoires und saisonalen Layern zusammen.",
    editorialCta: "Editorial lesen",
    editorialCtaHover: "Editorial öffnen",
    viewAllProducts: "Alle Produkte ansehen",
    viewAllProductsHover: "Produkte ansehen",
    feedbackEyebrow: "Kundenstimmen",
    feedbackTitle: "Was Käuferinnen sagen.",
    feedbackText:
      "Eine rotierende Wand aus Fake-Feedback im gleichen Scroll-Row-Stil wie das bereitgestellte Design.",
    trust: {
      shipping: {
        title: "Kostenloser Versand",
        text: "Kostenfreie Lieferung ab 150 $ Bestellwert.",
      },
      returns: {
        title: "Einfache Rückgabe",
        text: "14 Tage Rückgabe mit vorbereitetem Label.",
      },
      checkout: {
        title: "Sicherer Checkout",
        text: "Verschlüsselter Demo-Checkout.",
      },
      support: {
        title: "Style Support",
        text: "Fit- und Anlassberatung, wenn du sie brauchst.",
      },
    },
    signupEyebrow: "Community First Access",
    signupTitle: "Erhalte frühen Zugang zu limitierten Drops und privaten Styling-Edits.",
    signupText:
      "Erhalte Restock-Hinweise, Outfitideen und erste Updates zu beliebten Kleidern. Demo-Anmeldung, kein Produktions-E-Mail-Service verbunden.",
    emailLabel: "E-Mail-Adresse",
    emailPlaceholder: "E-Mail-Adresse",
    signupCta: "Anmelden",
    noSpam: "Kein Spam. Nur Produktdrops, Style-Edits und Member-Angebote.",
    comingSoonTitle: "Kommt bald",
    comingSoonSubtitle: (feature) => `${feature} ist noch nicht verfügbar.`,
    earlyAccessFeature: "Early-Access-Anmeldung",
  },
  tr: {
    badges: ["İlkbahar Atölye Seçkisi", "Sınırlı bedenler yeniden stokta"],
    eyebrow: "Premium elbiseler ve modern giyim",
    title: "Sessizce unutulmaz hissettiren bir gardırop kur.",
    intro:
      "Düğünler, akşam yemekleri, iş günleri ve hafta sonu kaçamakları için seçilmiş heykelsi elbiseleri, yumuşak terziliği ve yükseltilmiş günlük parçaları keşfet.",
    primaryCta: "Yeni Gelenleri Al",
    secondaryCta: "Koleksiyonu Keşfet",
    secondaryCtaHover: "Koleksiyonu Aç",
    stats: ["Seçilmiş stil", "Ortalama puan", "Hızlı gönderim"],
    heroEdit: "Öne çıkan seçki",
    heroTitle: "Fildişi davet elbiseleri",
    viewProduct: "Ürünü Gör",
    viewProductHover: "Ürünü Aç",
    limitedDrop: "Limitli seri",
    satinTitle: "Saten ve yumuşak yapı",
    searchTitle: "Bir sonraki imza parçanı bul.",
    searchText:
      "Koleksiyon, davet, renk veya bedene göre ara; keşiften ödemeye hızlıca geç.",
    searchCta: "Mağazada ara",
    searchCtaHover: "Aramayı Aç",
    categoryEyebrow: "Ruh haline göre alışveriş",
    categoryTitle: "Öne çıkan kategoriler",
    categoryCta: "Tüm kategorileri keşfet",
    shopNow: "Alışveriş yap",
    categories: {
      dresses: {
        title: "Elbiseler",
        text: "Saten, fildişi ve kakao tonlarında davete hazır silüetler.",
      },
      newArrivals: {
        title: "Yeni Gelenler",
        text: "Hafta içi şıklığı ve akşam planları için taze haftalık seçkiler.",
      },
      luxury: {
        title: "Lüks Koleksiyon",
        text: "Yükseltilmiş dokular, heykelsi kalıplar ve sınırlı üretimler.",
      },
      essentials: {
        title: "Temel Parçalar",
        text: "Tekrar tekrar giyilmek üzere tasarlanmış gardırop temelleri.",
      },
      accessories: {
        title: "Aksesuarlar",
        text: "Gündüzden geceye geçişi tamamlayan son dokunuşlar.",
      },
      editorialCollection: {
        title: "Editoryal Koleksiyon",
        text: "Halo detaylı ve üniforma etkili konsept vitrin görünümleri.",
      },
    },
    saleEyebrow: "Sezonluk özel indirim",
    saleTitle: "Seçili davet parçalarında yüzde 30'a varan indirim.",
    saleText:
      "Aynı premium styling hissini daha yumuşak bir fiyatla sunan kısa süreli elbise, triko ve şık ayrı parça seçkisi.",
    saleCta: "İndirimi Alışverişe Aç",
    dressesCta: "Yeni Elbiseleri Gör",
    dressesCtaHover: "Elbiseleri Aç",
    styleEyebrow: "Stil notları",
    styleTitle: "Takvimde yer eden anlar için tasarlandı.",
    styleText:
      "Seçkimiz temiz çizgileri, dokunulabilir kumaşları ve güvenli alışveriş akışını dengeler. Elbiseler, rafine üstler, aksesuarlar ve sezon katmanlarıyla premium hissi kaybetmeden tam kombinler oluştur.",
    editorialCta: "Editoryali oku",
    editorialCtaHover: "Editoryali aç",
    viewAllProducts: "Tüm ürünleri gör",
    viewAllProductsHover: "Ürünlere göz at",
    feedbackEyebrow: "Müşteri notları",
    feedbackTitle: "Alıcılar ne diyor?",
    feedbackText:
      "Sağlanan scroll-row tasarımıyla aynı hareket stilini kullanan sahte kullanıcı geri bildirimleri.",
    trust: {
      shipping: {
        title: "Ücretsiz kargo",
        text: "150 $ üzeri siparişlerde ücretsiz teslimat.",
      },
      returns: {
        title: "Kolay iade",
        text: "Ön ödemeli etiketle 14 gün içinde iade.",
      },
      checkout: {
        title: "Güvenli ödeme",
        text: "Şifrelenmiş demo ödeme akışı.",
      },
      support: {
        title: "Stil desteği",
        text: "İhtiyacın olduğunda beden ve davet önerileri.",
      },
    },
    signupEyebrow: "Topluluğa erken erişim",
    signupTitle: "Limitli serilere ve özel styling seçkilerine erken erişim al.",
    signupText:
      "Stok bildirimleri, seçilmiş kombin fikirleri ve çok satan elbiseler geri döndüğünde ilk haberi almak için katıl. Bu yalnızca demo kaydıdır; gerçek e-posta servisi bağlı değildir.",
    emailLabel: "E-posta adresi",
    emailPlaceholder: "E-posta adresi",
    signupCta: "Kayıt Ol",
    noSpam: "Spam yok. Sadece ürün serileri, stil seçkileri ve üye teklifleri.",
    comingSoonTitle: "Yakında",
    comingSoonSubtitle: (feature) => `${feature} henüz hazır değil.`,
    earlyAccessFeature: "Erken erişim kaydı",
  },
};

const KotonStyleLanding = () => {
  const { showToast } = useToast();
  const { language } = useLanguage();
  const copy = landingCopy[language];

  const showComingSoonToast = (feature: string) => {
    showToast({
      key: `coming-soon-${feature.toLowerCase().replace(/\s+/g, "-")}`,
      title: copy.comingSoonTitle,
      subtitle: copy.comingSoonSubtitle(feature),
      leading: () => <Clock3 className="h-5 w-5" />,
    });
  };

  return (
    <main className="bg-[#fbfaf8] text-stone-950">
      <section className="mx-auto grid max-w-screen-2xl gap-6 px-5 py-6 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-10">
        <div className="flex min-h-[620px] flex-col justify-between rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_80px_rgba(28,25,23,0.08)] sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d8c2a6] bg-[#f8f0e7] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#79522f]">
              <Sparkles className="h-4 w-4" />
              {copy.badges[0]}
            </span>
            <span className="rounded-full border border-stone-200 px-4 py-2 text-xs font-semibold text-stone-600">
              {copy.badges[1]}
            </span>
          </div>

          <div className="py-14 lg:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
              {copy.eyebrow}
            </p>
            <h1 className="mt-5 max-w-2xl font-serif text-5xl font-semibold leading-[0.95] text-stone-950 sm:text-6xl lg:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-stone-600 sm:text-lg">
              {copy.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex h-[52px] items-center justify-center rounded-full bg-stone-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-[#9b6b43] focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
              >
                {copy.primaryCta}
              </Link>
              <RollingArrowLink
                href="/shop/luxury-collection"
                ariaLabel={copy.secondaryCta}
                className="inline-flex h-[52px] min-w-[210px] items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-7 py-4 text-sm font-bold text-stone-950 transition hover:border-stone-950 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
                text={copy.secondaryCta}
                hoverText={copy.secondaryCtaHover}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-stone-200 pt-6 text-sm">
            <div>
              <p className="font-serif text-3xl font-semibold">180+</p>
              <p className="mt-1 text-stone-500">{copy.stats[0]}</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-semibold">4.8</p>
              <p className="mt-1 text-stone-500">{copy.stats[1]}</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-semibold">48h</p>
              <p className="mt-1 text-stone-500">{copy.stats[2]}</p>
            </div>
          </div>
        </div>

        <div className="grid min-h-[620px] gap-4 sm:grid-cols-[1.15fr_0.85fr]">
          <div className="group relative overflow-hidden rounded-[2rem] bg-stone-200">
            <img
              src="/assets/dress/1.png"
              alt="Ivory evening dress from the spring atelier collection"
              className="h-full min-h-[520px] w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/75 via-stone-950/10 to-transparent p-6 text-white sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/80">
                {copy.heroEdit}
              </p>
              <h2 className="mt-2 font-serif text-4xl font-semibold">
                {copy.heroTitle}
              </h2>
              <RollingArrowLink
                href="/shop/special-edition"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-stone-950 transition group-hover:bg-[#f8f0e7]"
                text={copy.viewProduct}
                hoverText={copy.viewProductHover}
              />
            </div>
          </div>

          <div className="grid gap-4">
            <Link
              href="/shop/luxury-collection"
              className="group relative min-h-[300px] overflow-hidden rounded-[2rem] bg-stone-200"
            >
              <img
                src="/assets/luxury fashion 7 1.png"
                alt="Editorial luxury clothing look"
                className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/92 p-4 shadow-lg backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b6b43]">
                  {copy.limitedDrop}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-semibold">
                  {copy.satinTitle}
                </h3>
              </div>
            </Link>
            <div className="rounded-[2rem] border border-stone-200 bg-[#1c1917] p-6 text-white">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="mt-8 font-serif text-3xl font-semibold">
                {copy.searchTitle}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                {copy.searchText}
              </p>
              <RollingArrowLink
                href="/search"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#ead7bd] transition hover:text-white"
                text={copy.searchCta}
                hoverText={copy.searchCtaHover}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-5 py-14 md:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b6b43]">
              Featured drop
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-stone-950 md:text-5xl">
              Best-selling pieces this week
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
              Product cards are built for browsing: clear imagery, prices,
              stock status, wishlist saves, and quick cart actions.
            </p>
          </div>
          <RollingArrowLink
            href="/shop"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-bold text-stone-950 transition hover:border-stone-950 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
            text={copy.viewAllProducts}
            hoverText={copy.viewAllProductsHover}
          />
        </div>
        <ProductGridWrapper sortCriteria="popularity" limit={6}>
          <HomeBestSellerGrid />
        </ProductGridWrapper>
      </section>

      <section className="mx-auto max-w-screen-2xl px-5 py-10 md:px-8">
        <div className="grid overflow-hidden rounded-[2rem] bg-[#1c1917] text-white shadow-[0_28px_80px_rgba(28,25,23,0.16)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ead7bd]">
              {copy.saleEyebrow}
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              {copy.saleTitle}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-8 text-white/72">
              {copy.saleText}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold text-stone-950 transition hover:bg-[#ead7bd] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-stone-950"
              >
                {copy.saleCta}
              </Link>
              <RollingArrowLink
                href="/shop/special-edition"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-4 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
                text={copy.dressesCta}
                hoverText={copy.dressesCtaHover}
              />
            </div>
          </div>
          <div className="grid min-h-[360px] grid-cols-2 gap-2 p-2">
            <img
              src="/assets/dress/2.png"
              alt="Blue satin evening dress"
              className="h-full w-full rounded-[1.5rem] object-cover object-top"
            />
            <img
              src="/assets/dress/4.png"
              alt="Cocoa wrap dress"
              className="h-full w-full rounded-[1.5rem] object-cover object-top"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-screen-2xl gap-6 px-5 py-16 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="grid grid-cols-[0.9fr_1.1fr] gap-4 max-sm:grid-cols-1">
          <img
            src="/assets/banner1.jpg"
            alt="Editorial styling story with layered clothing"
            className="h-[540px] w-full rounded-[2rem] object-cover max-sm:h-[360px]"
          />
          <div className="grid gap-4">
            <img
              src="/assets/product image 5.jpg"
              alt="Close editorial fashion detail"
              className="h-[258px] w-full rounded-[2rem] object-cover"
            />
            <img
              src="/assets/product image 15.jpg"
              alt="Neutral premium clothing look"
              className="h-[258px] w-full rounded-[2rem] object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_18px_55px_rgba(28,25,23,0.06)] sm:p-10 lg:p-14">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b6b43]">
            {copy.styleEyebrow}
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            {copy.styleTitle}
          </h2>
          <p className="mt-5 text-base leading-8 text-stone-600">
            {copy.styleText}
          </p>
          <RollingArrowLink
            href="/info/about"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-stone-300 px-6 py-3 text-sm font-bold text-stone-950 transition hover:border-stone-950 hover:bg-stone-50"
            text={copy.editorialCta}
            hoverText={copy.editorialCtaHover}
          />
        </div>
      </section>

      <CustomerFeedbackSection
        eyebrow={copy.feedbackEyebrow}
        title={copy.feedbackTitle}
        text={copy.feedbackText}
      />

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 divide-y divide-stone-200 px-5 md:grid-cols-4 md:divide-x md:divide-y-0 md:px-8">
          {trustItems.map(({ key, icon: Icon }) => (
            <div key={key} className="flex gap-4 py-7 md:px-5 lg:px-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f8f0e7] text-[#9b6b43]">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-stone-950">
                  {copy.trust[key].title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-stone-600">
                  {copy.trust[key].text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8">
        <div className="grid gap-8 rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_18px_55px_rgba(28,25,23,0.06)] sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:p-14">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-950 text-white">
              <PackageCheck className="h-5 w-5" />
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-[#9b6b43]">
              {copy.signupEyebrow}
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              {copy.signupTitle}
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-base leading-8 text-stone-600">
              {copy.signupText}
            </p>
            <form className="mt-7 flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="homepage-newsletter-email">
                {copy.emailLabel}
              </label>
              <input
                id="homepage-newsletter-email"
                type="email"
                placeholder={copy.emailPlaceholder}
                className="h-14 min-w-0 flex-1 rounded-full border-stone-300 bg-[#fbfaf8] px-5 text-sm text-stone-950 placeholder:text-stone-400 focus:border-stone-950 focus:ring-stone-950"
              />
              <button
                type="button"
                onClick={() => showComingSoonToast(copy.earlyAccessFeature)}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-stone-950 px-7 text-sm font-bold text-white transition hover:bg-[#9b6b43] focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
              >
                {copy.signupCta}
                <CreditCard className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-5 flex items-center gap-2 text-sm text-stone-500">
              <Heart className="h-4 w-4 text-[#9b6b43]" />
              {copy.noSpam}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default KotonStyleLanding;
