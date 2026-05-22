import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLanguage } from "../../i18n";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

type CircularTestimonialsProps = {
  testimonials: Testimonial[];
};

const CircularTestimonials = ({ testimonials }: CircularTestimonialsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useLanguage();
  const active = testimonials[activeIndex];
  const visibleImages = useMemo(() => {
    const previous = (activeIndex - 1 + testimonials.length) % testimonials.length;
    const next = (activeIndex + 1) % testimonials.length;
    return [previous, activeIndex, next];
  }, [activeIndex, testimonials.length]);

  const move = (direction: number) => {
    setActiveIndex(
      (index) => (index + direction + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="mx-auto grid max-w-screen-xl gap-16 px-5 py-20 md:grid-cols-[0.95fr_1.05fr] md:items-center lg:gap-24">
      <div className="relative h-[360px] md:h-[460px]">
        {visibleImages.map((testimonialIndex, position) => {
          const testimonial = testimonials[testimonialIndex];
          const isActive = testimonialIndex === activeIndex;
          const x = position === 0 ? -58 : position === 2 ? 58 : 0;
          const y = isActive ? 20 : -18;

          return (
            <motion.img
              key={testimonial.src}
              src={testimonial.src}
              alt={testimonial.name}
              animate={{
                x,
                y,
                scale: isActive ? 1 : 0.82,
                opacity: isActive ? 1 : 0.75,
                zIndex: isActive ? 3 : 2,
              }}
              transition={{ type: "spring", stiffness: 180, damping: 24 }}
              className="absolute left-1/2 top-0 h-[330px] w-[230px] -translate-x-1/2 rounded-[28px] object-cover shadow-2xl md:h-[420px] md:w-[300px]"
            />
          );
        })}
      </div>

      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-secondaryBrown">
          {t("shopperSay")}
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="mt-4"
          >
            <h2 className="text-3xl font-semibold text-gray-950 md:text-5xl">
              {active.name}
            </h2>
            <p className="mt-2 text-sm text-gray-500">{active.designation}</p>
            <p className="mt-8 text-xl leading-9 text-gray-700">
              {active.quote}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex gap-4">
          <button
            type="button"
            onClick={() => move(-1)}
            className="grid h-12 w-12 place-items-center rounded-full bg-gray-950 text-white transition hover:bg-secondaryBrown"
            aria-label={t("previousReview")}
          >
            <FaArrowLeft />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            className="grid h-12 w-12 place-items-center rounded-full bg-gray-950 text-white transition hover:bg-secondaryBrown"
            aria-label={t("nextReview")}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CircularTestimonials;
