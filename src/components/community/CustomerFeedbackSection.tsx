"use client";

import { Star } from "lucide-react";
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "./ThreeDScrollTrigger";

type FeedbackCard = {
  name: string;
  handle: string;
  quote: string;
  product: string;
  location: string;
  initials: string;
};

type CustomerFeedbackSectionProps = {
  eyebrow: string;
  title: string;
  text: string;
};

const rowOne: FeedbackCard[] = [
  {
    name: "Ayla M.",
    handle: "@aylam",
    quote:
      "The dress arrived looking exactly like the photos. The fit felt polished without being stiff.",
    product: "Special Edition Dress",
    location: "London",
    initials: "AM",
  },
  {
    name: "Noah R.",
    handle: "@noahr",
    quote:
      "I bought the luxury collection blazer for a dinner event and ended up wearing it twice that week.",
    product: "Luxury Collection",
    location: "Berlin",
    initials: "NR",
  },
  {
    name: "Mira K.",
    handle: "@mirak",
    quote:
      "The product photos made the palette easy to trust. The fabric is softer than I expected.",
    product: "New Arrivals",
    location: "Milan",
    initials: "MK",
  },
  {
    name: "Jonas L.",
    handle: "@jonasl",
    quote:
      "Fast delivery, clean packaging, and the quality reads like a much more expensive label.",
    product: "Essentials",
    location: "Copenhagen",
    initials: "JL",
  },
];

const rowTwo: FeedbackCard[] = [
  {
    name: "Sofia T.",
    handle: "@sofiat",
    quote:
      "The accessories completed the outfit instead of competing with it. That balance is rare.",
    product: "Accessories",
    location: "Paris",
    initials: "ST",
  },
  {
    name: "Eren Y.",
    handle: "@ereny",
    quote:
      "The editorial collection looks bold on screen, but in person it still feels wearable.",
    product: "Editorial Collection",
    location: "Istanbul",
    initials: "EY",
  },
  {
    name: "Leah S.",
    handle: "@leahs",
    quote:
      "I used the size guide and got it right the first time. That saved me a return loop.",
    product: "Dresses",
    location: "New York",
    initials: "LS",
  },
  {
    name: "Tariq A.",
    handle: "@tariqa",
    quote:
      "Everything from the checkout to the product page feels careful. The brand story is consistent.",
    product: "Luxury Collection",
    location: "Dubai",
    initials: "TA",
  },
];

const rowThree: FeedbackCard[] = [
  {
    name: "Hana P.",
    handle: "@hanap",
    quote:
      "The knit I ordered layers nicely with the dress I already had. It made the whole wardrobe feel more complete.",
    product: "Essentials",
    location: "Seoul",
    initials: "HP",
  },
  {
    name: "Luca V.",
    handle: "@lucav",
    quote:
      "The photos and the fit notes lined up well. I didn’t have to guess what I was getting.",
    product: "New Arrivals",
    location: "Rome",
    initials: "LV",
  },
  {
    name: "Zara N.",
    handle: "@zaran",
    quote:
      "It reads like a small boutique with better logistics. That is exactly the right feel for this store.",
    product: "Special Edition Dress",
    location: "Madrid",
    initials: "ZN",
  },
  {
    name: "Omar F.",
    handle: "@omarf",
    quote:
      "The color palette is understated, but the silhouettes still feel special enough for occasion wear.",
    product: "Editorial Collection",
    location: "Riyadh",
    initials: "OF",
  },
];

const feedbackRows = [
  { items: rowOne, direction: 1 as const, baseVelocity: 7 },
  { items: rowTwo, direction: -1 as const, baseVelocity: 6 },
  { items: rowThree, direction: 1 as const, baseVelocity: 8 },
];

const FeedbackCardView = ({ card }: { card: FeedbackCard }) => (
  <article className="mr-4 flex h-[220px] w-[320px] flex-col rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-[0_18px_45px_rgba(28,25,23,0.06)]">
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f8f0e7] text-sm font-bold text-[#9b6b43]">
        {card.initials}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1 text-[#9b6b43]">
          {[...Array(5)].map((_, index) => (
            <Star key={index} className="h-3.5 w-3.5 fill-current" />
          ))}
        </div>
        <h3 className="mt-2 truncate font-semibold text-stone-950">
          {card.name}
        </h3>
        <p className="text-xs text-stone-500">{card.handle}</p>
      </div>
    </div>

    <p className="mt-5 flex-1 text-sm leading-7 text-stone-600">“{card.quote}”</p>

    <div className="mt-5 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.18em] text-stone-400">
      <span className="truncate">{card.product}</span>
      <span>{card.location}</span>
    </div>
  </article>
);

const CustomerFeedbackSection = ({
  eyebrow,
  title,
  text,
}: CustomerFeedbackSectionProps) => {
  return (
    <section className="border-y border-stone-200 bg-[#fbfaf8]">
      <div className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b6b43]">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-stone-950 md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
            {text}
          </p>
        </div>

        <ThreeDScrollTriggerContainer className="mt-10 space-y-4">
          {feedbackRows.map((row, index) => (
            <ThreeDScrollTriggerRow
              key={`${row.direction}-${index}`}
              baseVelocity={row.baseVelocity}
              direction={row.direction}
              className="py-1"
            >
              {row.items.map((card) => (
                <FeedbackCardView key={`${card.name}-${card.product}`} card={card} />
              ))}
            </ThreeDScrollTriggerRow>
          ))}
        </ThreeDScrollTriggerContainer>
      </div>
    </section>
  );
};

export default CustomerFeedbackSection;
