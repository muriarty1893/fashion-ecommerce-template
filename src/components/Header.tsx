import { HiBars3 } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import { useState } from "react";
import { Language, useLanguage } from "../i18n";

const Header = () => {
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <>
    <header className="sticky top-0 z-40 mx-auto flex max-w-screen-2xl items-center justify-between border-b border-gray-200 bg-white px-5 py-4 text-center text-gray-950 shadow-sm max-sm:px-5 max-[400px]:px-3">
      <button
        type="button"
        aria-label={t("menuOpen")}
        className="mr-20 grid h-10 w-10 place-items-center rounded-lg text-gray-950 transition hover:bg-gray-100 max-lg:mr-0"
        onClick={() => setIsSidebarOpen(true)}
      >
        <HiBars3 className="text-2xl max-sm:text-xl" />
      </button>
      <Link
        to="/"
        className="text-4xl font-light tracking-[1.08px] max-sm:text-3xl max-[400px]:text-2xl"
      >
        {t("brand")}
      </Link>
      <div className="flex gap-4 items-center max-sm:gap-2">
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value as Language)}
          className="h-9 rounded-lg border border-gray-300 bg-white px-2 text-sm text-gray-950 outline-none"
          aria-label="Language"
        >
          <option value="en">EN</option>
          <option value="de">DE</option>
          <option value="tr">TR</option>
        </select>
        <Link to="/search" aria-label={t("search")}>
          <HiOutlineMagnifyingGlass className="text-2xl max-sm:text-xl" />
        </Link>
        <Link to="/login" aria-label={t("account")}>
          <HiOutlineUser className="text-2xl max-sm:text-xl" />
        </Link>
        <Link to="/cart" aria-label={t("cart")}>
          <HiOutlineShoppingBag className="text-2xl max-sm:text-xl" />
        </Link>
      </div>
    </header>
    <SidebarMenu isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
    </>
  );
};
export default Header;
