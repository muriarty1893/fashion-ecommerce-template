import { Eye, EyeOff } from "lucide-react";
import { FormEvent, ReactNode, useState } from "react";
import { useLanguage } from "../../i18n";

type SignInPageProps = {
  title?: ReactNode;
  description?: string;
  heroImageSrc?: string;
  onSignIn: (event: FormEvent<HTMLFormElement>) => void;
  onCreateAccount: () => void;
};

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden="true">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

const SignInPage = ({
  title,
  description,
  heroImageSrc,
  onSignIn,
  onCreateAccount,
}: SignInPageProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-screen-2xl grid-cols-1 bg-white md:grid-cols-2">
      <section className="flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-md">
          <h1 className="animate-element text-4xl font-semibold leading-tight text-gray-950 md:text-5xl">
            {title ?? t("welcomeBack")}
          </h1>
          <p className="animate-element animate-delay-100 mt-4 text-gray-600">
            {description ?? t("loginDescription")}
          </p>

          <form className="mt-8 space-y-5" onSubmit={onSignIn}>
            <label className="animate-element animate-delay-200 block text-sm font-medium text-gray-700">
              {t("email")}
              <input
                name="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm outline-none transition focus:border-secondaryBrown focus:bg-white"
              />
            </label>

            <label className="animate-element animate-delay-300 block text-sm font-medium text-gray-700">
              {t("password")}
              <span className="relative mt-2 block">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("passwordPlaceholder")}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-4 pr-12 text-sm outline-none transition focus:border-secondaryBrown focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 transition hover:text-gray-950"
                  aria-label={showPassword ? t("hidePassword") : t("showPassword")}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </span>
            </label>

            <div className="animate-element animate-delay-400 flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-3 text-gray-700">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="rounded border-gray-300 text-secondaryBrown focus:ring-secondaryBrown"
                />
                {t("keepSignedIn")}
              </label>
              <button
                type="button"
                className="text-secondaryBrown hover:underline"
              >
                {t("resetPassword")}
              </button>
            </div>

            <button
              type="submit"
              className="animate-element animate-delay-500 w-full rounded-2xl bg-gray-950 py-4 font-medium text-white transition hover:bg-secondaryBrown"
            >
              {t("signIn")}
            </button>
          </form>

          <div className="animate-element animate-delay-600 relative my-6 flex items-center justify-center">
            <span className="w-full border-t border-gray-200" />
            <span className="absolute bg-white px-4 text-sm text-gray-500">
              {t("continueWith")}
            </span>
          </div>

          <button
            type="button"
            className="animate-element animate-delay-700 flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 py-4 transition hover:bg-gray-50"
          >
            <GoogleIcon />
            {t("continueGoogle")}
          </button>

          <p className="animate-element animate-delay-800 mt-6 text-center text-sm text-gray-500">
            {t("newToBrand")}{" "}
            <button
              type="button"
              onClick={onCreateAccount}
              className="text-secondaryBrown hover:underline"
            >
              {t("createAccount")}
            </button>
          </p>
        </div>
      </section>

      <section className="relative hidden p-4 md:block">
        <div
          className="animate-slide-right h-full min-h-[620px] rounded-3xl bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImageSrc})` }}
        />
        <div className="absolute bottom-10 left-10 right-10 rounded-3xl border border-white/20 bg-white/20 p-5 text-white shadow-2xl backdrop-blur-md">
          <p className="text-sm uppercase tracking-[0.24em]">{t("memberAccess")}</p>
          <p className="mt-2 text-2xl font-semibold">
            {t("memberText")}
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignInPage;
