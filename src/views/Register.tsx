import Link from "next/link";
import { useRouter } from "next/navigation";
import { checkRegisterFormData } from "../utils/checkRegisterFormData";
import customFetch from "../axios/custom";
import toast from "react-hot-toast";
import { useLanguage } from "../i18n";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const Register = () => {
  const router = useRouter();
  const { t } = useLanguage();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    if (!checkRegisterFormData(data)) return;

    try {
      const response = await customFetch.post("/auth/register", data);
      toast.success(t("registerSuccess"));
      localStorage.setItem("user", JSON.stringify(response.data));
      router.push("/user-profile");
    } catch (error: unknown) {
      const status =
        typeof error === "object" && error !== null && "response" in error
          ? (error as { response?: { status?: number } }).response?.status
          : undefined;
      toast.error(status === 409 ? t("userExists") : t("genericError"));
    }
  };

  return (
    <main className="bg-[#fbfaf8] px-5 py-10 md:px-8">
      <div className="mx-auto grid max-w-screen-2xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="relative min-h-[680px] overflow-hidden rounded-[2rem] bg-stone-900 text-white">
          <img
            src="/assets/luxury fashion 7 2.png"
            alt="Editorial fashion membership visual"
            className="absolute inset-0 h-full w-full object-cover object-top opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/35 to-transparent" />
          <div className="relative flex h-full min-h-[680px] flex-col justify-end p-7 sm:p-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Fashion Club
            </span>
            <h1 className="mt-5 max-w-xl font-serif text-5xl font-semibold leading-tight sm:text-6xl">
              Create an account for faster checkout and saved edits.
            </h1>
            <p className="mt-4 max-w-lg leading-8 text-white/78">
              Save wishlists, view demo orders, and move through checkout with a
              cleaner shopping flow.
            </p>
          </div>
        </section>

        <section className="flex items-center">
          <form
            onSubmit={handleRegister}
            className="w-full rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_80px_rgba(28,25,23,0.07)] sm:p-8 lg:p-10"
          >
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9b6b43]">
              New customer
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-stone-950 sm:text-5xl">
              {t("createAccount")}
            </h2>
            <p className="mt-3 leading-7 text-stone-600">
              This is a local demo account flow connected to the Next API.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <FormField label={t("firstName")} htmlFor="name">
                <input
                  type="text"
                  className="checkout-input rounded-full border-stone-300 bg-[#fbfaf8]"
                  placeholder={t("namePlaceholder")}
                  id="name"
                  name="name"
                />
              </FormField>
              <FormField label={t("lastName")} htmlFor="lastname">
                <input
                  type="text"
                  className="checkout-input rounded-full border-stone-300 bg-[#fbfaf8]"
                  placeholder={t("lastnamePlaceholder")}
                  id="lastname"
                  name="lastname"
                />
              </FormField>
              <div className="sm:col-span-2">
                <FormField label={t("email")} htmlFor="email">
                  <input
                    type="email"
                    className="checkout-input rounded-full border-stone-300 bg-[#fbfaf8]"
                    placeholder={t("emailPlaceholder")}
                    id="email"
                    name="email"
                  />
                </FormField>
              </div>
              <FormField label={t("password")} htmlFor="password">
                <input
                  type="password"
                  className="checkout-input rounded-full border-stone-300 bg-[#fbfaf8]"
                  placeholder={t("passwordPlaceholder")}
                  id="password"
                  name="password"
                />
              </FormField>
              <FormField label={t("confirmPassword")} htmlFor="confirmPassword">
                <input
                  type="password"
                  className="checkout-input rounded-full border-stone-300 bg-[#fbfaf8]"
                  placeholder={t("confirmPasswordPlaceholder")}
                  id="confirmPassword"
                  name="confirmPassword"
                />
              </FormField>
            </div>

            <button
              type="submit"
              className="mt-7 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-stone-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-[#9b6b43] focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4"
            >
              {t("register")}
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-[#fbfaf8] p-4 text-sm text-stone-600">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#9b6b43]" />
              Demo credentials are stored through the backend with hashed
              passwords and an HTTP-only session cookie.
            </div>

            <p className="mt-6 text-center text-sm text-stone-600">
              {t("alreadyAccount")}{" "}
              <Link href="/login" className="font-bold text-[#9b6b43]">
                {t("loginNow")}
              </Link>
            </p>
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

export default Register;
