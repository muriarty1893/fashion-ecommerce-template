import { Link, Navigate, useParams } from "react-router-dom";
import {
  Award,
  Building2,
  Headphones,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../i18n";

type InfoPageContent = {
  title: string;
  eyebrow: string;
  intro: string;
  highlights: string[];
  sections: {
    title: string;
    body: string;
  }[];
};

const pages: Record<string, InfoPageContent> = {
  "client-service": {
    title: "Client Service",
    eyebrow: "Support",
    intro:
      "Our client team helps with product questions, sizing, orders, returns, and account support before and after checkout.",
    highlights: [
      "Response target under 24 hours",
      "Sizing and styling guidance",
      "Order and delivery support",
    ],
    sections: [
      {
        title: "How we help",
        body:
          "Ask about fabric, fit, availability, order status, or checkout issues. We keep support practical and focused on getting you the right answer quickly.",
      },
      {
        title: "Contact window",
        body:
          "Support is available Monday through Friday. Weekend requests are queued and handled on the next business day.",
      },
    ],
  },
  "after-sale-service": {
    title: "After-sale Service",
    eyebrow: "Care",
    intro:
      "After your order arrives, we continue supporting exchanges, returns, damaged-package checks, and care recommendations.",
    highlights: [
      "Easy exchange guidance",
      "Return eligibility review",
      "Care and repair advice",
    ],
    sections: [
      {
        title: "Returns and exchanges",
        body:
          "Items should be unworn, clean, and returned with original packaging where possible. Final-sale exceptions are shown before checkout.",
      },
      {
        title: "Product care",
        body:
          "We include basic care details on each product page and can help with garment-specific questions after purchase.",
      },
    ],
  },
  "free-insurance": {
    title: "Free Insurance",
    eyebrow: "Protection",
    intro:
      "Eligible shipments include complimentary delivery protection against loss or visible transit damage.",
    highlights: [
      "Transit damage review",
      "Lost package support",
      "Proof-based claim handling",
    ],
    sections: [
      {
        title: "Coverage",
        body:
          "Coverage applies while the parcel is in transit. If a package arrives damaged, keep the packaging and contact support with photos.",
      },
      {
        title: "Resolution",
        body:
          "Depending on stock and claim outcome, we arrange replacement, repair support, store credit, or refund.",
      },
    ],
  },
  company: {
    title: "The Company",
    eyebrow: "About",
    intro:
      "MODE is a boutique fashion storefront focused on curated seasonal edits, premium textures, and a simple shopping experience.",
    highlights: [
      "Curated seasonal collections",
      "Small-batch buying approach",
      "Practical premium styling",
    ],
    sections: [
      {
        title: "What we build",
        body:
          "We organize product discovery around collections, categories, and complete outfit thinking rather than endless inventory.",
      },
      {
        title: "How we work",
        body:
          "The catalog is intentionally edited so customers can compare shape, texture, and occasion without browsing fatigue.",
      },
    ],
  },
  excellence: {
    title: "The Excellence",
    eyebrow: "Standards",
    intro:
      "Our quality standards focus on fabric hand-feel, reliable construction, easy styling, and clear product information.",
    highlights: [
      "Fabric and finish review",
      "Fit notes on key products",
      "Usability-first shopping flow",
    ],
    sections: [
      {
        title: "Product review",
        body:
          "Pieces are assessed for silhouette, comfort, styling range, finishing, and how well they serve the collection edit.",
      },
      {
        title: "Customer clarity",
        body:
          "We prioritize clear images, concise descriptions, sizing context, and checkout details customers can scan quickly.",
      },
    ],
  },
  awards: {
    title: "International Awards",
    eyebrow: "Recognition",
    intro:
      "This demo page represents brand recognition content that a fashion storefront could use for press, awards, and market milestones.",
    highlights: [
      "Editorial recognition",
      "Marketplace milestones",
      "Customer experience focus",
    ],
    sections: [
      {
        title: "Press-ready storytelling",
        body:
          "Use this page to list real awards, press links, wholesale milestones, or designer recognition when available.",
      },
      {
        title: "Current status",
        body:
          "The content here is placeholder brand copy and should be replaced with verified awards before production use.",
      },
    ],
  },
  "our-story": {
    title: "Our Story",
    eyebrow: "Brand",
    intro:
      "MODE started as a curated way to shop fashion by mood, material, and occasion instead of sorting through overwhelming catalogs.",
    highlights: [
      "Built around edited discovery",
      "Inspired by boutique merchandising",
      "Designed for repeat shopping",
    ],
    sections: [
      {
        title: "The idea",
        body:
          "A smaller, better-organized selection can feel more useful than a larger catalog when customers are building outfits.",
      },
      {
        title: "The experience",
        body:
          "The storefront balances editorial presentation with practical cart, checkout, account, and order-history flows.",
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    eyebrow: "Legal",
    intro:
      "This demo cookie policy explains how a fashion storefront could describe analytics, preference, and checkout cookies.",
    highlights: [
      "Preference cookies for language",
      "Analytics cookies for store improvements",
      "Checkout cookies for cart continuity",
    ],
    sections: [
      {
        title: "Cookie types",
        body:
          "Essential cookies keep the cart, language selection, and checkout flow working. Analytics cookies help understand product discovery and page performance.",
      },
      {
        title: "Managing cookies",
        body:
          "In a production store, customers should be able to adjust non-essential cookie preferences from a privacy settings panel.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    eyebrow: "Legal",
    intro:
      "This demo privacy policy explains what customer data a storefront may collect to support orders, accounts, and service requests.",
    highlights: [
      "Order and contact information",
      "Account profile data",
      "Support communication history",
    ],
    sections: [
      {
        title: "Data we use",
        body:
          "A real store uses contact, shipping, billing, and order details to process purchases, provide support, and prevent fraud.",
      },
      {
        title: "Customer rights",
        body:
          "Customers should be able to request access, correction, deletion, or export of personal data according to applicable law.",
      },
    ],
  },
  legal: {
    title: "Legal Notes",
    eyebrow: "Legal",
    intro:
      "This page collects general demo terms for purchasing, returns, intellectual property, and storefront availability.",
    highlights: [
      "Demo terms of service",
      "Return and purchase conditions",
      "Brand and content usage",
    ],
    sections: [
      {
        title: "Terms of sale",
        body:
          "Prices, availability, delivery windows, and promotional terms can change. Final order details should be confirmed at checkout.",
      },
      {
        title: "Content ownership",
        body:
          "Product photography, copy, interface content, and brand assets should not be reused without permission in a production setting.",
      },
    ],
  },
  facebook: {
    title: "Facebook Community",
    eyebrow: "Social",
    intro:
      "Follow MODE on Facebook for collection notes, seasonal campaigns, and customer service announcements.",
    highlights: ["Campaign launches", "Service updates", "Community styling"],
    sections: [
      {
        title: "What to expect",
        body:
          "This demo social page stands in for an external Facebook profile. Replace it with the real brand URL before launch.",
      },
    ],
  },
  instagram: {
    title: "Instagram",
    eyebrow: "Social",
    intro:
      "See editorial styling, outfit details, fabric close-ups, and short-form collection stories from MODE.",
    highlights: ["Outfit styling", "New arrivals", "Editorial stories"],
    sections: [
      {
        title: "Visual updates",
        body:
          "Use Instagram for shoppable visuals, reels, behind-the-scenes content, and product launch reminders.",
      },
    ],
  },
  tiktok: {
    title: "TikTok",
    eyebrow: "Social",
    intro:
      "Short styling videos, try-on edits, packing guides, and quick product comparisons live here.",
    highlights: ["Try-on edits", "Styling tips", "Trend notes"],
    sections: [
      {
        title: "Video content",
        body:
          "This demo page should be replaced by the brand's TikTok profile when the store has a real social channel.",
      },
    ],
  },
  linkedin: {
    title: "LinkedIn",
    eyebrow: "Social",
    intro:
      "Follow company updates, hiring notes, marketplace milestones, and operational announcements.",
    highlights: ["Company news", "Hiring updates", "Milestones"],
    sections: [
      {
        title: "Business updates",
        body:
          "A production LinkedIn page can support wholesale, recruiting, partnerships, and press credibility.",
      },
    ],
  },
  pinterest: {
    title: "Pinterest",
    eyebrow: "Social",
    intro:
      "Save outfit boards, seasonal palettes, occasion edits, and product styling references.",
    highlights: ["Outfit boards", "Color palettes", "Occasion edits"],
    sections: [
      {
        title: "Shopping inspiration",
        body:
          "Pinterest is useful for evergreen discovery and visual planning around seasons, events, and capsules.",
      },
    ],
  },
  youtube: {
    title: "YouTube",
    eyebrow: "Social",
    intro:
      "Long-form collection walkthroughs, fabric guides, care advice, and behind-the-scenes videos.",
    highlights: ["Collection guides", "Care advice", "Brand films"],
    sections: [
      {
        title: "Video library",
        body:
          "Use this route as a placeholder for a future YouTube channel or embedded video archive.",
      },
    ],
  },
};

const icons = [Headphones, PackageCheck, ShieldCheck, Building2, Sparkles, Award];

const InfoPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const page = slug ? pages[slug] : undefined;

  if (!page) return <Navigate to="/" replace />;

  return (
    <main className="mx-auto max-w-screen-2xl px-5 py-16 max-[400px]:px-3">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm uppercase tracking-[0.28em] text-secondaryBrown">
            {page.eyebrow}
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight text-gray-950 max-sm:text-4xl">
            {page.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-gray-600">
            {page.intro}
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex h-11 items-center rounded-full bg-gray-950 px-5 text-sm font-medium text-white transition hover:bg-secondaryBrown"
          >
            {t("shopNow")}
          </Link>
        </div>

        <div className="grid gap-6">
          <section className="grid gap-4 md:grid-cols-3">
            {page.highlights.map((highlight, index) => {
              const Icon = icons[index % icons.length];
              return (
                <div
                  key={highlight}
                  className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gray-950 text-white">
                    <Icon size={18} />
                  </span>
                  <p className="mt-4 text-sm font-medium leading-6 text-gray-950">
                    {highlight}
                  </p>
                </div>
              );
            })}
          </section>

          <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
            {page.sections.map((section) => (
              <div key={section.title} className="border-b border-gray-200 p-6 last:border-b-0">
                <h2 className="text-xl font-semibold text-gray-950">{section.title}</h2>
                <p className="mt-3 leading-7 text-gray-600">{section.body}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};

export default InfoPage;
