import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";
import { useLanguage } from "../i18n";
import customFetch from "../axios/custom";
import { Heart, Search, ShoppingBag, UserRound } from "lucide-react";

const SidebarMenu = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isAdmin,
  isLoggedIn,
  onLogout,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (prev: boolean) => void;
  isAdmin: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  const logout = async () => {
    await customFetch.post("/auth/logout").catch(() => null);
    toast.error(t("logoutSuccess"));
    localStorage.removeItem("user");
    store.dispatch(setLoginStatus(false));
    onLogout();
    router.push("/login");
  };

  useEffect(() => {
    if (isSidebarOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300); // Match the transition duration
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen]);

  return (
    <>
      {(isSidebarOpen || isAnimating) && (
        <div
          className={
            isSidebarOpen
              ? "fixed left-0 top-0 z-50 h-full w-80 max-w-[86vw] transform border-r border-stone-200 bg-white shadow-[0_24px_80px_rgba(28,25,23,0.14)] transition-transform duration-300 ease-in-out translate-x-0"
              : "fixed left-0 top-0 z-50 h-full w-80 max-w-[86vw] transform border-r border-stone-200 bg-white shadow-[0_24px_80px_rgba(28,25,23,0.14)] transition-transform duration-300 ease-in-out -translate-x-full"
          }
        >
          <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
            <Link
              href="/"
              className="font-serif text-3xl font-bold uppercase tracking-normal text-stone-950"
              onClick={() => setIsSidebarOpen(false)}
            >
              {t("brand")}
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-stone-200 text-stone-700 transition hover:border-stone-950 hover:bg-stone-50"
              onClick={() => setIsSidebarOpen(false)}
            >
              <HiXMark className="text-2xl" />
            </button>
          </div>

          <nav className="flex h-[calc(100%-73px)] flex-col justify-between overflow-y-auto bg-[#fbfaf8] p-5">
            <div className="grid gap-2">
              <p className="px-3 text-xs font-bold uppercase tracking-[0.24em] text-[#9b6b43]">
                Browse
              </p>
              <SidebarLink href="/" onClick={() => setIsSidebarOpen(false)}>
                {t("home")}
              </SidebarLink>
              <SidebarLink href="/shop" onClick={() => setIsSidebarOpen(false)}>
                {t("shop")}
              </SidebarLink>
              <SidebarLink href="/search" onClick={() => setIsSidebarOpen(false)} icon={<Search className="h-4 w-4" />}>
                {t("search")}
              </SidebarLink>
            {isAdmin && (
              <SidebarLink href="/admin" onClick={() => setIsSidebarOpen(false)}>
                Admin
              </SidebarLink>
            )}
              <SidebarLink href="/wishlist" onClick={() => setIsSidebarOpen(false)} icon={<Heart className="h-4 w-4" />}>
                Wishlist
              </SidebarLink>
              <SidebarLink href="/cart" onClick={() => setIsSidebarOpen(false)} icon={<ShoppingBag className="h-4 w-4" />}>
                {t("cart")}
              </SidebarLink>
            </div>

            <div className="mt-8 grid gap-2 border-t border-stone-200 pt-5">
              <p className="px-3 text-xs font-bold uppercase tracking-[0.24em] text-[#9b6b43]">
                Account
              </p>
            {isLoggedIn ? (
              <>
                <SidebarLink href="/user-profile" onClick={() => setIsSidebarOpen(false)} icon={<UserRound className="h-4 w-4" />}>
                  Profile
                </SidebarLink>
                <button
                  onClick={logout}
                  className="inline-flex h-11 w-full items-center justify-center rounded-full border border-stone-300 bg-white px-4 text-sm font-bold text-stone-950 transition hover:border-stone-950 hover:bg-stone-50"
                >
                  {t("logout")}
                </button>
              </>
            ) : (
              <>
                <SidebarLink href="/login" onClick={() => setIsSidebarOpen(false)}>
                  {t("signIn")}
                </SidebarLink>
                <Link
                  href="/register"
                  className="inline-flex h-11 w-full items-center justify-center rounded-full bg-stone-950 px-4 text-sm font-bold text-white transition hover:bg-[#9b6b43]"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {t("signUp")}
                </Link>
              </>
            )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

const SidebarLink = ({
  href,
  children,
  icon,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="inline-flex h-11 items-center gap-3 rounded-full px-4 text-sm font-bold text-stone-800 transition hover:bg-white hover:text-[#9b6b43] hover:shadow-[0_10px_30px_rgba(28,25,23,0.06)]"
  >
    {icon}
    {children}
  </Link>
);
export default SidebarMenu;
