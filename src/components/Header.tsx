import { HiBars3 } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Link from "next/link";
import SidebarMenu from "./SidebarMenu";
import { useEffect, useState } from "react";
import { useLanguage } from "../i18n";
import { Heart, ShieldCheck } from "lucide-react";
import LanguageSelectorDropdown from "./LanguageSelectorDropdown";
import customFetch from "../axios/custom";

const navItems = [
  { labelKey: "newArrivals", to: "/shop" },
  { labelKey: "navDresses", to: "/shop/special-edition" },
  { labelKey: "navLuxury", to: "/shop/luxury-collection" },
  { labelKey: "navEssentials", to: "/shop/unique-collection" },
  { labelKey: "navAccessories", to: "/shop/summer-edition" },
  { labelKey: "navEditorial", to: "/shop/editorial-collection" },
  { labelKey: "navSale", to: "/shop" },
] as const;

const Header = () => {
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await customFetch.get("/auth/me");
        setIsLoggedIn(Boolean(response.data?.id));
        setIsAdmin(response.data?.role === "admin");
      } catch {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    fetchSession();
  }, []);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/95 text-stone-950 shadow-[0_1px_20px_rgba(28,25,23,0.04)] backdrop-blur">
      <div className="mx-auto grid h-[68px] max-w-screen-2xl grid-cols-[1fr_auto_1fr] items-center px-7 max-lg:flex max-lg:justify-between max-lg:px-4">
        <nav className="flex items-center gap-7 text-sm font-semibold max-xl:gap-5 max-lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.labelKey}
              href={item.to}
              className="transition hover:text-[#9b6b43] focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
            >
              {t(item.labelKey)}
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
        href="/"
        className="font-serif text-4xl font-bold uppercase tracking-normal text-stone-950 max-sm:text-3xl"
      >
        {t("brand")}
      </Link>

      <div className="flex items-center justify-end gap-4 text-stone-950 max-sm:gap-3">
        <Link
          href="/search"
          aria-label={t("search")}
          className="flex h-10 items-center gap-2 rounded-full border border-stone-200 px-3 transition hover:border-stone-950 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 max-md:border-0 max-md:px-0"
        >
          <HiOutlineMagnifyingGlass className="text-2xl max-sm:text-xl" />
          <span className="text-sm font-semibold max-md:hidden">{t("search")}</span>
        </Link>
        <Link
          href="/info/club"
          className="text-center text-xs font-black uppercase leading-[0.9] tracking-wide text-[#9b6b43] max-sm:hidden"
        >
          {t("fashionClub").split(" ")[0]}
          <br />
          {t("fashionClub").split(" ").slice(1).join(" ")}
        </Link>
        <LanguageSelectorDropdown className="max-sm:hidden" />
        {isAdmin && (
          <Link href="/admin" aria-label="Admin" className="max-sm:hidden">
            <ShieldCheck className="h-6 w-6 max-sm:h-5 max-sm:w-5" />
          </Link>
        )}
        <Link href="/wishlist" aria-label="Wishlist">
          <Heart className="h-6 w-6 max-sm:h-5 max-sm:w-5" />
        </Link>
        <Link
          href={isLoggedIn ? "/user-profile" : "/login"}
          aria-label={isLoggedIn ? "Profile" : t("account")}
        >
          <HiOutlineUser className="text-2xl max-sm:text-xl" />
        </Link>
        <Link href="/cart" aria-label={t("cart")}>
          <HiOutlineShoppingBag className="text-2xl max-sm:text-xl" />
        </Link>
      </div>
      </div>
    </header>
    <SidebarMenu
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      onLogout={() => {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }}
    />
    </>
  );
};
export default Header;
