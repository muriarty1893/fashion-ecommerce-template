import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { checkRegisterFormData } from "../utils/checkRegisterFormData";
import customFetch from "../axios/custom";
import toast from "react-hot-toast";
import { useLanguage } from "../i18n";

const Register = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get form data
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    // Check if form data is valid
    if (!checkRegisterFormData(data)) return;

    // Check if user with this email already exists
    const users = await customFetch.get("/users");
    const userExists = users.data.some(
      (user: { email: string }) => user.email === data.email
    );
    if (userExists) {
      toast.error(t("userExists"));
      return;
    }

    // Register user
    const response = await customFetch.post("/users", data);
    if (response.status === 201) {
      toast.success(t("registerSuccess"));
      navigate("/login");
    } else {
      toast.error(t("genericError"));
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto pt-24 flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="max-w-5xl mx-auto flex flex-col gap-5 max-sm:gap-3 items-center justify-center max-sm:px-5"
      >
        <h2 className="text-5xl text-center mb-5 font-thin max-md:text-4xl max-sm:text-3xl max-[450px]:text-xl max-[450px]:font-normal">
          {t("registerTitle")}
        </h2>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">{t("name")}</label>
            <input
              type="text"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder={t("namePlaceholder")}
              id="name"
              name="name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lastname">{t("lastname")}</label>
            <input
              type="text"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder={t("lastnamePlaceholder")}
              id="lastname"
              name="lastname"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">{t("email")}</label>
            <input
              type="email"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder={t("emailPlaceholder")}
              id="email"
              name="email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">{t("password")}</label>
            <input
              type="password"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder={t("passwordPlaceholder")}
              id="password"
              name="password"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword">{t("confirmPassword")}</label>
            <input
              type="password"
              className="bg-white border border-black text-xl py-2 px-3 w-full outline-none max-[450px]:text-base"
              placeholder={t("confirmPasswordPlaceholder")}
              id="confirmPassword"
              name="confirmPassword"
            />
          </div>
        </div>
        <Button type="submit" text={t("register")} mode="brown" />
        <Link
          to="/login"
          className="text-xl max-md:text-lg max-[450px]:text-sm"
        >
          {t("alreadyAccount")}{" "}
          <span className="text-secondaryBrown">{t("loginNow")}</span>.
        </Link>
      </form>
    </div>
  );
};
export default Register;
