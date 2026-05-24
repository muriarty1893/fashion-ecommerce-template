import {
  ArrowRight,
  CreditCard,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Store,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

const heroTiles = [
  {
    title: "Bayrama Özel Fırsatlar",
    text: "Seçili ürünlerde %30, %40, %50 indirimli yaz stilleri.",
    image: "/assets/luxury category 1.png",
    to: "/shop/special-edition",
  },
  {
    title: "Yeni Sezon Kadın",
    text: "Keten, denim ve hafif elbiselerle yaz koleksiyonu.",
    image: "/assets/luxury category 2.png",
    to: "/shop/luxury-collection",
  },
];

const campaignTiles = [
  {
    title: "Elbise",
    image: "/assets/dress/1.png",
    to: "/shop/special-edition",
  },
  {
    title: "Koton Jeans",
    image: "/assets/product image 17.jpg",
    to: "/shop/luxury-collection",
  },
  {
    title: "Ofis Stili",
    image: "/assets/product image 8.jpg",
    to: "/shop/unique-collection",
  },
  {
    title: "Plaj Giyim",
    image: "/assets/luxury category 4.png",
    to: "/shop/summer-edition",
  },
];

const serviceItems = [
  { label: "Mağazadan Gel-Al", icon: Store },
  { label: "Mağazada Değişim & İade", icon: RotateCcw },
  { label: "Kapıda Ödeme", icon: CreditCard },
  { label: "Bi Tıkla Kapında", icon: Truck },
  { label: "Güvenli Alışveriş", icon: ShieldCheck },
  { label: "Ücretsiz İade", icon: PackageCheck },
];

const KotonStyleLanding = () => {
  return (
    <main className="bg-white text-black">
      <section className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-2 px-3 pt-3 max-md:grid-cols-1 max-md:px-0 max-md:pt-0">
        {heroTiles.map((tile) => (
          <Link
            key={tile.title}
            to={tile.to}
            className="group relative block h-[640px] overflow-hidden bg-gray-100 max-lg:h-[520px] max-sm:h-[430px]"
          >
            <img
              src={tile.image}
              alt={tile.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent p-8 text-white max-sm:p-5">
              <h1 className="max-w-sm text-4xl font-bold uppercase leading-tight tracking-[-0.02em] max-sm:text-3xl">
                {tile.title}
              </h1>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/90">
                {tile.text}
              </p>
              <span className="mt-5 inline-flex h-11 items-center bg-white px-7 text-sm font-bold uppercase tracking-wide text-black transition group-hover:bg-black group-hover:text-white">
                Alışverişe Başla
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-screen-2xl px-3 py-5 max-md:px-0">
        <div className="border-y border-gray-200 py-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gray-500">
            Seçili Ürünlerde
          </p>
          <h2 className="mt-2 text-5xl font-black uppercase tracking-[-0.04em] text-red-600 max-sm:text-4xl">
            Net %50'ye Varan İndirim!
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Sepette ek indirimli sezon favorilerini keşfet.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-screen-2xl grid-cols-4 gap-2 px-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:px-0">
        {campaignTiles.map((tile) => (
          <Link
            key={tile.title}
            to={tile.to}
            className="group relative block h-[560px] overflow-hidden bg-gray-100 max-xl:h-[460px] max-sm:h-[420px]"
          >
            <img
              src={tile.image}
              alt={tile.title}
              className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-x-5 bottom-5 bg-white px-5 py-4 text-center shadow-sm">
              <h3 className="text-xl font-bold uppercase tracking-tight">
                {tile.title}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Keşfet
              </p>
            </div>
          </Link>
        ))}
      </section>

      <section className="mx-auto grid max-w-screen-2xl grid-cols-[0.9fr_1.6fr] gap-5 px-3 py-24 max-lg:grid-cols-1 max-sm:py-14">
        <div className="flex flex-col justify-center bg-[#f6f6f6] p-12 max-sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
            Koton Blog
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight">
            Sezon trendleri ve stil haberleri senin için burada.
          </h2>
          <Link
            to="/shop"
            className="mt-7 inline-flex h-12 w-fit items-center gap-3 bg-black px-8 text-sm font-bold uppercase tracking-wide text-white"
          >
            Trendleri Keşfet
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 max-sm:grid-cols-1">
          <img
            src="/assets/banner1.jpg"
            alt="Denim collection"
            className="h-[360px] w-full object-cover max-sm:h-[300px]"
          />
          <img
            src="/assets/product image 5.jpg"
            alt="Summer detail"
            className="h-[360px] w-full object-cover max-sm:h-[300px]"
          />
          <img
            src="/assets/product image 18.jpg"
            alt="Season look"
            className="h-[360px] w-full object-cover max-sm:h-[300px]"
          />
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-6 text-center max-lg:grid-cols-3 max-sm:grid-cols-2">
          {serviceItems.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex min-h-28 flex-col items-center justify-center gap-3 border-r border-gray-200 px-4 last:border-r-0 max-sm:min-h-24"
            >
              <Icon className="h-7 w-7 stroke-[1.6]" />
              <p className="text-sm font-bold">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default KotonStyleLanding;
