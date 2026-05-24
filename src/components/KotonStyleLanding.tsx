import {
  ArrowRight,
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
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Dresses",
    text: "Occasion-ready shapes in satin, ivory, and cocoa tones.",
    image: "/assets/dress/5.png",
    to: "/shop/special-edition",
  },
  {
    title: "New Arrivals",
    text: "Fresh weekly edits for weekday polish and evening plans.",
    image: "/assets/luxury category 2.png",
    to: "/shop",
  },
  {
    title: "Luxury Collection",
    text: "Elevated textures, sculpted tailoring, and limited runs.",
    image: "/assets/product image 6.jpg",
    to: "/shop/luxury-collection",
  },
  {
    title: "Essentials",
    text: "Foundational pieces designed to be worn on repeat.",
    image: "/assets/product image 18.jpg",
    to: "/shop/unique-collection",
  },
  {
    title: "Accessories",
    text: "Finishing details for day-to-night styling.",
    image: "/assets/luxury category 4.png",
    to: "/shop/summer-edition",
  },
];

const trustItems = [
  {
    title: "Free shipping",
    text: "Complimentary delivery on orders over $150.",
    icon: Truck,
  },
  {
    title: "Easy returns",
    text: "14-day returns with prepaid labels.",
    icon: RotateCcw,
  },
  {
    title: "Secure checkout",
    text: "Encrypted demo checkout flow.",
    icon: ShieldCheck,
  },
  {
    title: "Style support",
    text: "Fit and occasion guidance when you need it.",
    icon: Headphones,
  },
];

const KotonStyleLanding = () => {
  return (
    <main className="bg-[#fbfaf8] text-stone-950">
      <section className="mx-auto grid max-w-screen-2xl gap-6 px-5 py-6 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-10">
        <div className="flex min-h-[620px] flex-col justify-between rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_80px_rgba(28,25,23,0.08)] sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d8c2a6] bg-[#f8f0e7] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#79522f]">
              <Sparkles className="h-4 w-4" />
              Spring Atelier Drop
            </span>
            <span className="rounded-full border border-stone-200 px-4 py-2 text-xs font-semibold text-stone-600">
              Limited sizes back in stock
            </span>
          </div>

          <div className="py-14 lg:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
              Premium dresses and modern clothing
            </p>
            <h1 className="mt-5 max-w-2xl font-serif text-5xl font-semibold leading-[0.95] text-stone-950 sm:text-6xl lg:text-7xl">
              Build a wardrobe that feels quietly unforgettable.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-stone-600 sm:text-lg">
              Discover sculptural dresses, soft tailoring, and elevated
              everyday pieces curated for weddings, dinners, workdays, and
              weekend escapes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/shop"
                className="inline-flex h-[52px] items-center justify-center rounded-full bg-stone-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-[#9b6b43] focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
              >
                Shop New Arrivals
              </Link>
              <Link
                to="/shop/luxury-collection"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-7 py-4 text-sm font-bold text-stone-950 transition hover:border-stone-950 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-stone-200 pt-6 text-sm">
            <div>
              <p className="font-serif text-3xl font-semibold">180+</p>
              <p className="mt-1 text-stone-500">Curated styles</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-semibold">4.8</p>
              <p className="mt-1 text-stone-500">Average rating</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-semibold">48h</p>
              <p className="mt-1 text-stone-500">Fast dispatch</p>
            </div>
          </div>
        </div>

        <div className="grid min-h-[620px] gap-4 sm:grid-cols-[1.15fr_0.85fr]">
          <Link
            to="/shop/special-edition"
            className="group relative overflow-hidden rounded-[2rem] bg-stone-200"
          >
            <img
              src="/assets/dress/1.png"
              alt="Ivory evening dress from the spring atelier collection"
              className="h-full min-h-[520px] w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/75 via-stone-950/10 to-transparent p-6 text-white sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/80">
                Hero edit
              </p>
              <h2 className="mt-2 font-serif text-4xl font-semibold">
                Ivory occasion dresses
              </h2>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-stone-950 transition group-hover:bg-[#f8f0e7]">
                View Product
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>

          <div className="grid gap-4">
            <Link
              to="/shop/luxury-collection"
              className="group relative min-h-[300px] overflow-hidden rounded-[2rem] bg-stone-200"
            >
              <img
                src="/assets/luxury fashion 7 1.png"
                alt="Editorial luxury clothing look"
                className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/92 p-4 shadow-lg backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b6b43]">
                  Limited drop
                </p>
                <h3 className="mt-1 font-serif text-2xl font-semibold">
                  Satin and soft structure
                </h3>
              </div>
            </Link>
            <div className="rounded-[2rem] border border-stone-200 bg-[#1c1917] p-6 text-white">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="mt-8 font-serif text-3xl font-semibold">
                Find your next signature piece.
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Search by collection, occasion, color, or size and move quickly
                from discovery to checkout.
              </p>
              <Link
                to="/search"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#ead7bd] transition hover:text-white"
              >
                Search the store
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-5 py-14 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b6b43]">
              Shop by mood
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-stone-950 md:text-5xl">
              Featured categories
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex w-fit items-center gap-2 text-sm font-bold text-stone-950 transition hover:text-[#9b6b43]"
          >
            Explore all categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.title}
              to={category.to}
              className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_18px_45px_rgba(28,25,23,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_65px_rgba(28,25,23,0.12)] focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
            >
              <div className="aspect-[4/5] overflow-hidden bg-stone-100">
                <img
                  src={category.image}
                  alt={`${category.title} category`}
                  className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-2xl font-semibold">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  {category.text}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#9b6b43]">
                  Shop now
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-5 py-10 md:px-8">
        <div className="grid overflow-hidden rounded-[2rem] bg-[#1c1917] text-white shadow-[0_28px_80px_rgba(28,25,23,0.16)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ead7bd]">
              Seasonal private sale
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Up to 30 percent off selected occasion pieces.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-8 text-white/72">
              A short-run edit of dresses, knits, and polished separates with
              the same premium styling and a softer price.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold text-stone-950 transition hover:bg-[#ead7bd] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-stone-950"
              >
                Shop the Sale
              </Link>
              <Link
                to="/shop/special-edition"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-4 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
              >
                View New Dresses
                <ArrowRight className="h-4 w-4" />
              </Link>
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
            Style notes
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Designed for the moments that make the calendar.
          </h2>
          <p className="mt-5 text-base leading-8 text-stone-600">
            Our edit balances clean lines, touchable textures, and confidence at
            checkout. Build complete outfits from dresses, refined tops,
            accessories, and seasonal layers without losing the premium feel.
          </p>
          <Link
            to="/info/about"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-stone-300 px-6 py-3 text-sm font-bold text-stone-950 transition hover:border-stone-950 hover:bg-stone-50"
          >
            Read the editorial
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 divide-y divide-stone-200 px-5 md:grid-cols-4 md:divide-x md:divide-y-0 md:px-8">
          {trustItems.map(({ title, text, icon: Icon }) => (
            <div key={title} className="flex gap-4 py-7 md:px-5 lg:px-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f8f0e7] text-[#9b6b43]">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-stone-950">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-stone-600">{text}</p>
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
              Community first access
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Get early access to limited drops and private styling edits.
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-base leading-8 text-stone-600">
              Join for restock alerts, curated outfit ideas, and first notice
              when best-selling dresses return. Demo signup only, no production
              email service is connected.
            </p>
            <form className="mt-7 flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="homepage-newsletter-email">
                Email address
              </label>
              <input
                id="homepage-newsletter-email"
                type="email"
                placeholder="Email address"
                className="h-14 min-w-0 flex-1 rounded-full border-stone-300 bg-[#fbfaf8] px-5 text-sm text-stone-950 placeholder:text-stone-400 focus:border-stone-950 focus:ring-stone-950"
              />
              <button
                type="button"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-stone-950 px-7 text-sm font-bold text-white transition hover:bg-[#9b6b43] focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
              >
                Sign Up
                <CreditCard className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-5 flex items-center gap-2 text-sm text-stone-500">
              <Heart className="h-4 w-4 text-[#9b6b43]" />
              No spam. Just product drops, style edits, and member offers.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default KotonStyleLanding;
