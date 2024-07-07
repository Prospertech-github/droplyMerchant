import { Link } from "react-router-dom";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Logo from "@/assets/images/logo/logo.svg";
import useDarkmode from "@/hooks/useDarkMode";
import RegisterUserForm from "./common/reg-user";

export default function RegisterPage() {
  const [isDark] = useDarkmode();
  return (
    <>
      <div className="items-center text-center bg-white dark:bg-slate-800 flex justify-center p-5">
        <img src={isDark ? LogoWhite : Logo} alt="" className="h-10" />
      </div>
      <div className="p-6 md:p-16">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-2">Sign up as a Merchant</h1>
          <p className="mb-6">Complete the sign up form below to create an account with Droply</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-10 max-w-lg mx-auto">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6 text-center">
            Personal details
          </h2>
          <RegisterUserForm />
        </div>
        <p className="font-semibold text-slate-800 dark:text-slate-200 mt-2 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </>
  );
}
