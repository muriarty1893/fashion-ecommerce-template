import { HiBars3 } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import { useState } from "react";
import { Language, useLanguage } from "../i18n";
import { Globe2, Heart, ShieldCheck } from "lucide-react";

const navItems = [
  { label: "New Arrivals", to: "/shop" },
  { label: "Dresses", to: "/shop/special-edition" },
  { label: "Luxury", to: "/shop/luxury-collection" },
  { label: "Essentials", to: "/shop/unique-collection" },
  { label: "Accessories", to: "/shop/summer-edition" },
  { label: "Sale", to: "/shop" },
];

const Header = () => {
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/95 text-stone-950 shadow-[0_1px_20px_rgba(28,25,23,0.04)] backdrop-blur">
      <div className="mx-auto grid h-[68px] max-w-screen-2xl grid-cols-[1fr_auto_1fr] items-center px-7 max-lg:flex max-lg:justify-between max-lg:px-4">
        <nav className="flex items-center gap-7 text-sm font-semibold max-xl:gap-5 max-lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="transition hover:text-[#9b6b43] focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={t("menuOpen")}
          className="hidden h-10 w-10 place-items-center text-black max-lg:grid"
          onClick={() => setIsSidebarOpen(true)}
        >
          <HiBars3 className="text-2xl" />
        </button>

      <Link
        to="/"
        className="font-serif text-4xl font-bold uppercase tracking-normal text-stone-950 max-sm:text-3xl"
      >
        {t("brand")}
      </Link>

      <div className="flex items-center justify-end gap-4 text-stone-950 max-sm:gap-3">
        <Link
          to="/search"
          aria-label={t("search")}
          className="flex h-10 items-center gap-2 rounded-full border border-stone-200 px-3 transition hover:border-stone-950 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 max-md:border-0 max-md:px-0"
        >
          <HiOutlineMagnifyingGlass className="text-2xl max-sm:text-xl" />
          <span className="text-sm font-semibold max-md:hidden">Search</span>
        </Link>
        <Link
          to="/info/club"
          className="text-center text-xs font-black uppercase leading-[0.9] tracking-wide text-[#9b6b43] max-sm:hidden"
        >
          Fashion
          <br />
          Club
        </Link>
        <Globe2 className="h-5 w-5 max-sm:hidden" />
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value as Language)}
          className="h-9 border-0 bg-transparent px-1 text-sm font-semibold text-stone-950 outline-none focus:ring-0 max-sm:hidden"
          aria-label="Language"
        >
          <option value="en">EN</option>
          <option value="de">DE</option>
          <option value="tr">TR</option>
        </select>
        <Link to="/admin" aria-label="Admin" className="max-sm:hidden">
          <ShieldCheck className="h-6 w-6 max-sm:h-5 max-sm:w-5" />
        </Link>
        <Link to="/wishlist" aria-label="Wishlist">
          <Heart className="h-6 w-6 max-sm:h-5 max-sm:w-5" />
        </Link>
        <Link to="/login" aria-label={t("account")}>
          <HiOutlineUser className="text-2xl max-sm:text-xl" />
        </Link>
        <Link to="/cart" aria-label={t("cart")}>
          <HiOutlineShoppingBag className="text-2xl max-sm:text-xl" />
        </Link>
      </div>
      </div>
    </header>
    <SidebarMenu isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
    </>
  );
};
export default Header;
