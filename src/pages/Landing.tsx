import { Banner, CategoriesSection, HomeCollectionSection } from "../components";
import AnimatedCardStack from "../components/community/AnimatedCardStack";
import CircularTestimonials from "../components/community/CircularTestimonials";
import PixelLogoGrid from "../components/community/PixelLogoGrid";
import { useLanguage } from "../i18n";

const testimonials = [
  {
    quote:
      "Parçalar özenle seçilmiş hissettiriyor ama kullanımı zor değil. Ödeme hızlıydı, beden notları da doğruydu.",
    name: "Mina Aydın",
    designation: "Doğrulanmış müşteri",
    src: "/assets/luxury category 1.png",
  },
  {
    quote:
      "Tek ziyarette tam bir hafta sonu kombini buldum. Koleksiyon sayfaları doku ve renk karşılaştırmayı kolaylaştırıyor.",
    name: "Elif Kaya",
    designation: "Düzenli müşteri",
    src: "/assets/luxury category 2.png",
  },
  {
    quote:
      "Mağaza premium hissettiriyor ama pratik kalıyor. Ürün kartları, sepet ve sipariş akışı anlaşılır.",
    name: "Sara Demir",
    designation: "Moda alıcısı",
    src: "/assets/luxury category 3.png",
  },
];

const Landing = () => {
  const { language } = useLanguage();
  const localizedTestimonials = {
    en: [
      {
        quote:
          "The pieces feel curated without being difficult to wear. Checkout was quick and the sizing notes were accurate.",
        name: "Mina Aydin",
        designation: "Verified shopper",
        src: "/assets/luxury category 1.png",
      },
      {
        quote:
          "I found a complete weekend outfit in one visit. The collection pages make it easy to compare textures and colors.",
        name: "Elif Kaya",
        designation: "Returning customer",
        src: "/assets/luxury category 2.png",
      },
      {
        quote:
          "The store feels premium but still practical. Product cards, cart, and order flow all make sense.",
        name: "Sara Demir",
        designation: "Fashion buyer",
        src: "/assets/luxury category 3.png",
      },
    ],
    de: [
      {
        quote:
          "Die Teile wirken kuratiert, sind aber trotzdem einfach zu tragen. Der Checkout war schnell und die Größenhinweise stimmten.",
        name: "Mina Aydin",
        designation: "Verifizierte Kundin",
        src: "/assets/luxury category 1.png",
      },
      {
        quote:
          "Ich habe in einem Besuch ein komplettes Wochenend-Outfit gefunden. Die Kollektionen machen Vergleiche leicht.",
        name: "Elif Kaya",
        designation: "Stammkundin",
        src: "/assets/luxury category 2.png",
      },
      {
        quote:
          "Der Store fühlt sich hochwertig und trotzdem praktisch an. Produktkarten, Warenkorb und Bestellung sind klar.",
        name: "Sara Demir",
        designation: "Modeeinkäuferin",
        src: "/assets/luxury category 3.png",
      },
    ],
    tr: testimonials,
  };

  return (
    <>
      <Banner />
      <HomeCollectionSection />
      <AnimatedCardStack />
      <PixelLogoGrid />
      <CategoriesSection />
      <CircularTestimonials testimonials={localizedTestimonials[language]} />
    </>
  );
};
export default Landing;
