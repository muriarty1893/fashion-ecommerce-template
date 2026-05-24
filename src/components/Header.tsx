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
  { label: "Kadın", to: "/shop" },
  { label: "Genç", to: "/shop/summer-edition" },
  { label: "Erkek", to: "/shop/luxury-collection" },
  { label: "Çocuk", to: "/shop/special-edition" },
  { label: "Bebek", to: "/shop/unique-collection" },
  { label: "Fırsatlar", to: "/shop" },
  { label: "Sürdürülebilirlik", to: "/info/sustainability" },
];

const Header = () => {
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white text-black">
      <div className="mx-auto grid h-[60px] max-w-screen-2xl grid-cols-[1fr_auto_1fr] items-center px-7 max-lg:flex max-lg:justify-between max-lg:px-4">
        <nav className="flex items-center gap-7 text-sm font-medium max-lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="transition hover:text-gray-500"
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
        className="text-4xl font-black uppercase tracking-[-0.08em] max-sm:text-3xl"
      >
        {t("brand")}
      </Link>

      <div className="flex items-center justify-end gap-4 text-black max-sm:gap-3">
        <Link
          to="/search"
          aria-label={t("search")}
          className="flex h-10 items-center gap-2 border-b-2 border-black px-1 max-md:border-b-0"
        >
          <HiOutlineMagnifyingGlass className="text-2xl max-sm:text-xl" />
          <span className="text-sm tracking-[0.2em] max-md:hidden">Ara</span>
        </Link>
        <Link
          to="/info/club"
          className="text-center text-xs font-black uppercase leading-[0.9] tracking-[-0.04em] max-sm:hidden"
        >
          Fashion
          <br />
          Club
        </Link>
        <Globe2 className="h-5 w-5 max-sm:hidden" />
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value as Language)}
          className="h-9 border-0 bg-white px-1 text-sm font-semibold text-black outline-none focus:ring-0 max-sm:hidden"
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
