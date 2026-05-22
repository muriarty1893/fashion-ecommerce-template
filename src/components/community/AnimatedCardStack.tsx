import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Language, useLanguage } from "../../i18n";

type Card = {
  title: string;
  description: string;
  image: string;
};

type CardState = {
  id: number;
  templateIndex: number;
};

const cardTemplates: Record<Language, Card[]> = {
  en: [
    {
      title: "Evening Sharp",
      description: "Clean pieces for dinners, launches, and late plans.",
      image: "/assets/luxury fashion 7 1.png",
    },
    {
      title: "Soft Neutrals",
      description: "Simple, comfortable essentials for everyday wear.",
      image: "/assets/luxury category 2.png",
    },
    {
      title: "Weekend Layers",
      description: "Relaxed outerwear, soft textures, and calm colors.",
      image: "/assets/luxury category 4.png",
    },
  ],
  de: [
    {
      title: "Eleganter Abend",
      description: "Klare Pieces für Dinner, Launches und späte Pläne.",
      image: "/assets/luxury fashion 7 1.png",
    },
    {
      title: "Sanfte Neutrals",
      description: "Schlichte, bequeme Essentials für jeden Tag.",
      image: "/assets/luxury category 2.png",
    },
    {
      title: "Wochenend-Layer",
      description: "Lässige Outerwear, weiche Texturen und ruhige Farben.",
      image: "/assets/luxury category 4.png",
    },
  ],
  tr: [
    {
      title: "Şık Akşam",
      description: "Davetler, lansmanlar ve gece planları için net parçalar.",
      image: "/assets/luxury fashion 7 1.png",
    },
    {
      title: "Yumuşak Nötrler",
      description: "Günlük kullanım için sade ve rahat temel parçalar.",
      image: "/assets/luxury category 2.png",
    },
    {
      title: "Hafta Sonu Katmanları",
      description: "Rahat dış giyim, yumuşak dokular ve sakin renkler.",
      image: "/assets/luxury category 4.png",
    },
  ],
};

const initialCards: CardState[] = [
  { id: 1, templateIndex: 0 },
  { id: 2, templateIndex: 1 },
  { id: 3, templateIndex: 2 },
];

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
];

const AnimatedCardStack = () => {
  const [cards, setCards] = useState(initialCards);
  const [nextId, setNextId] = useState(4);
  const { language, t } = useLanguage();
  const localizedCards = cardTemplates[language];

  const handleAnimate = () => {
    const nextTemplate = cards[0];
    setCards([...cards.slice(1), { ...nextTemplate, id: nextId }]);
    setNextId((id) => id + 1);
  };

  return (
    <section className="bg-gray-950 px-5 py-20 text-white">
      <div className="mx-auto grid max-w-screen-xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-secondaryBrown">
            {t("styleStories")}
          </p>
          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
            {t("animatedCards")}
          </h2>
          <p className="mt-5 max-w-xl text-gray-300">
            {t("animatedCardsText")}
          </p>
          <button
            type="button"
            onClick={handleAnimate}
            className="mt-8 h-11 rounded-lg bg-white px-5 text-sm font-medium text-gray-950 transition hover:bg-secondaryBrown hover:text-white"
          >
            {t("animate")}
          </button>
        </div>

        <div className="relative h-[390px] overflow-hidden">
          <AnimatePresence initial={false}>
            {cards.slice(0, 3).map((card, index) => {
              const { scale, y } = positionStyles[index];
              const localizedCard = localizedCards[card.templateIndex];
              return (
                <motion.article
                  key={card.id}
                  initial={index === 2 ? { y: -16, scale: 0.9 } : false}
                  animate={{ y, scale }}
                  exit={{ y: 340, scale: 1, zIndex: 10 }}
                  transition={{ type: "spring", duration: 1, bounce: 0 }}
                  style={{ zIndex: 3 - index, left: "50%", x: "-50%" }}
                  className="absolute bottom-0 w-[min(92vw,520px)] overflow-hidden rounded-t-xl border border-white/10 bg-white p-1 text-gray-950 shadow-2xl"
                >
                  <img
                    src={localizedCard.image}
                    alt={localizedCard.title}
                    className="h-[230px] w-full rounded-lg object-cover"
                  />
                  <div className="flex items-center justify-between gap-4 px-4 py-5">
                    <div>
                      <h3 className="font-medium">{localizedCard.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {localizedCard.description}
                      </p>
                    </div>
                    <span className="rounded-full bg-gray-950 px-4 py-2 text-sm text-white">
                      {t("view")}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AnimatedCardStack;
