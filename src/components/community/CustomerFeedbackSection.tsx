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
      "The dress looked exactly like the photos, and the fabric had enough weight to feel polished without being stiff. I wore it to dinner straight from the package after one quick steam, and it still held its shape after sitting through a long meal and a cab ride home.",
    product: "Special Edition Dress",
    location: "London",
    initials: "AM",
  },
  {
    name: "Noah R.",
    handle: "@noahr",
    quote:
      "I bought the luxury collection blazer for a dinner event and ended up wearing it twice that week. It works with tailored trousers, but it also made a plain white tee feel intentional. The shoulder line is sharp without feeling boxy, which is usually the detail that makes or breaks a blazer for me.",
    product: "Luxury Collection",
    location: "Berlin",
    initials: "NR",
  },
  {
    name: "Mira K.",
    handle: "@mirak",
    quote:
      "The product photos made the palette easy to trust, which matters so much when you are matching shoes and a bag from your closet. The color arrived exactly as expected in daylight and indoor lighting, so I did not have that usual moment of wondering whether it would work with anything I own.",
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
      "The accessories completed the outfit instead of competing with it. I liked that the pieces felt special, but still quiet enough to wear again with jeans and a knit. They solved the last-minute styling problem without making the outfit look like I tried too hard.",
    product: "Accessories",
    location: "Paris",
    initials: "ST",
  },
  {
    name: "Eren Y.",
    handle: "@ereny",
    quote:
      "The editorial collection looks bold on screen, but in person it still feels wearable. The cut has that styled-for-a-shoot energy without making me feel overdressed at a normal dinner. I liked that the styling ideas on the product page were dramatic, but the actual piece still worked with the coat and shoes I already had.",
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
      "Everything from the checkout to the product page feels careful. I could understand the fit, fabric, and styling before buying, which made the whole order feel less like a guess. The detail shots were useful too, especially for seeing the texture and how the piece falls instead of relying on one polished campaign image.",
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
      "The knit layers nicely with the dress I already had, and the color is neutral without looking flat. It made my whole wardrobe feel more complete instead of like another random purchase. I have already worn it open over a slip dress, tucked into wide-leg trousers, and thrown over my shoulders at dinner.",
    product: "Essentials",
    location: "Seoul",
    initials: "HP",
  },
  {
    name: "Luca V.",
    handle: "@lucav",
    quote:
      "The photos and the fit notes lined up well. I did not have to guess what I was getting.",
    product: "New Arrivals",
    location: "Rome",
    initials: "LV",
  },
  {
    name: "Zara N.",
    handle: "@zaran",
    quote:
      "It reads like a small boutique with better logistics. The edit is tight, the styling is useful, and I did not have to scroll through hundreds of pieces to find something good. That made shopping feel calmer, especially because every product had enough context to imagine how I would actually wear it.",
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
  <article className="group relative z-0 mr-4 h-[220px] w-[320px] shrink-0 whitespace-normal hover:z-[200]">
    <div className="absolute left-1/2 top-1/2 z-0 flex max-h-[220px] min-h-[220px] w-[320px] -translate-x-1/2 -translate-y-1/2 origin-center flex-col overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-[0_18px_45px_rgba(28,25,23,0.06)] transition-[max-height,transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[max-height,transform] group-hover:z-[200] group-hover:max-h-[620px] group-hover:-translate-y-[54%] group-hover:shadow-[0_28px_70px_rgba(28,25,23,0.14)]">
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

      <p className="mt-5 min-w-0 max-h-14 flex-1 overflow-hidden text-wrap break-words text-sm leading-7 text-stone-600 transition-[max-height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:line-clamp-none group-hover:max-h-[390px]">
        “{card.quote}”
      </p>

      <div className="mt-auto flex min-w-0 items-center justify-between gap-4 pt-5 text-xs uppercase tracking-[0.18em] text-stone-400">
        <span className="min-w-0 truncate">{card.product}</span>
        <span className="shrink-0">{card.location}</span>
      </div>
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
