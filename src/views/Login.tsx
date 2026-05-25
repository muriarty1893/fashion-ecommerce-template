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
    
    // Check if user with the email and password exists
    const users = await customFetch.get("/users");
    let userId: number = 0; // Initialize userId with a default value
    const userExists = users.data.some(
      (user: { id: number; email: string; password: string }) => {
        if (user.email === data.email) {
          userId = user.id;
        }
        return user.email === data.email && user.password === data.password;
      }
    );
    
    // if user exists, show success message
    if (userExists) {
      toast.success(t("loginSuccess"));
      localStorage.setItem("user", JSON.stringify({...data, id: userId}));
      store.dispatch(setLoginStatus(true));
      router.push("/user-profile");
      return;
    } else {
      toast.error(t("loginError"));
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      toast.success(t("alreadyLoggedIn"));
      router.push("/user-profile");
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
