import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Logo from "@/assets/images/logo/logo.svg";
import useDarkmode from "@/hooks/useDarkMode";
import { Link } from "react-router-dom";
import ResetPasswordForm from "./common/reset-password-form";

export default function PasswordResetPage() {
  const [isDark] = useDarkmode();
  return (
    <>
      <div className="items-center text-center bg-white dark:bg-slate-800 flex justify-center p-5">
        <img src={isDark ? LogoWhite : Logo} alt="" className="h-10" />
      </div>
      <div className="p-6 md:p-16">
        <div className="bg-white dark:bg-slate-800 p-10 max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 text-center">Reset your Password</h2>
          <p className="text-sm text-center mb-6">Enter your new password and confirm it by typing it again.</p>
          <ResetPasswordForm />
        </div>
        <p className="font-semibold text-slate-800 dark:text-slate-200 mt-2 text-center">
          Still Remember your password?{" "}
          <Link to="/login" className="text-sky-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </>
  );
}
