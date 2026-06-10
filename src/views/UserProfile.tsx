import { useEffect, useState } from "react";
import Button from "../components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import customFetch from "../axios/custom";
import { checkUserProfileFormData } from "../utils/checkUserProfileFormData";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";
import { ArrowRight, LogOut, ReceiptText, UserRound } from "lucide-react";

const UserProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>();

  const logout = async () => {
    await customFetch.post("/auth/logout").catch(() => null);
    toast.error("Logged out successfully");
    localStorage.removeItem("user");
    store.dispatch(setLoginStatus(false));
    router.push("/login");
  };

  const fetchUser = async (userId: number | string) => {
    const response = await customFetch(`/users/${userId}`);
    setUser(response.data);
  };

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get form data
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    // Check if form data is valid
    if (!checkUserProfileFormData(data)) return;
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
    if (userId) {
      try {
        await customFetch.put(`/users/${userId}`, data);
      } catch (e) {
        toast.error("User update failed");
        return;
      }
      toast.success("User updated successfully");
    } else {
      toast.error("Please login to view this page");
      router.push("/login");
    }
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
    if (!userId) {
      toast.error("Please login to view this page");
      router.push("/login");
    } else {
      fetchUser(userId);
    }
  }, [router]);
  return (
    <main className="bg-[#fbfaf8] px-5 py-10 md:px-8">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_80px_rgba(28,25,23,0.07)] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b6b43]">
                Account settings
              </p>
              <h1 className="mt-3 font-serif text-4xl font-semibold text-stone-950 sm:text-5xl">
                User Profile
              </h1>
              <p className="mt-3 max-w-2xl leading-7 text-stone-600">
                Update your demo storefront account details and review recent orders.
              </p>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f8f0e7] text-[#9b6b43]">
              <UserRound className="h-6 w-6" />
            </span>
          </div>

          <form className="mt-8 grid gap-5" onSubmit={updateUser}>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="First Name" htmlFor="firstname">
                <input
                  type="text"
                  className="checkout-input rounded-full border-stone-300 bg-[#fbfaf8]"
                  placeholder="Enter first name"
                  id="firstname"
                  name="name"
                  defaultValue={user?.name}
                />
              </FormField>
              <FormField label="Last Name" htmlFor="lastname">
                <input
                  type="text"
                  className="checkout-input rounded-full border-stone-300 bg-[#fbfaf8]"
                  placeholder="Enter last name"
                  id="lastname"
                  name="lastname"
                  defaultValue={user?.lastname}
                />
              </FormField>
            </div>
            <FormField label="Email" htmlFor="email">
              <input
                type="email"
                className="checkout-input rounded-full border-stone-300 bg-[#fbfaf8]"
                placeholder="Enter email address"
                id="email"
                name="email"
                defaultValue={user?.email}
              />
            </FormField>
            <FormField label="Password" htmlFor="password">
              <input
                type="password"
                className="checkout-input rounded-full border-stone-300 bg-[#fbfaf8]"
                placeholder="Enter password"
                id="password"
                name="password"
                defaultValue={user?.password}
              />
            </FormField>

            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Button type="submit" text="Update Profile" mode="brown" />
              <Link
                href="/order-history"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-7 py-4 text-sm font-bold text-stone-950 transition hover:border-stone-950 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
              >
                <ReceiptText className="h-4 w-4" />
                Order History
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={logout}
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-7 py-4 text-sm font-bold text-stone-950 transition hover:border-stone-950 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

const FormField = ({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) => (
  <label htmlFor={htmlFor} className="grid gap-2 text-sm font-bold text-stone-700">
    {label}
    {children}
  </label>
);

export default UserProfile;
