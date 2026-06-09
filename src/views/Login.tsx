import { useRouter } from "next/navigation";
import { checkLoginFormData } from "../utils/checkLoginFormData";
import customFetch from "../axios/custom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";
import SignInPage from "../components/community/SignInPage";
import { useLanguage } from "../i18n";

const Login = () => {
  const router = useRouter();
  const { t } = useLanguage();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get form data
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    // Check if form data is valid
    if (!checkLoginFormData(data)) return;
    
    try {
      const response = await customFetch.post("/auth/login", data);
      toast.success(t("loginSuccess"));
      localStorage.setItem("user", JSON.stringify(response.data));
      store.dispatch(setLoginStatus(true));
      router.push("/");
      return;
    } catch {
      toast.error(t("loginError"));
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      toast.success(t("alreadyLoggedIn"));
      router.push("/");
    }
  }, [router, t]);

  return (
    <SignInPage
      heroImageSrc="/assets/banner1.jpg"
      onSignIn={handleLogin}
      onCreateAccount={() => router.push("/register")}
    />
  );
};
export default Login;
