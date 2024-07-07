import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Logo from "@/assets/images/logo/logo.svg";
import useDarkmode from "@/hooks/useDarkMode";
import CompleteSignupForm from "./common/complete-signup-form";

export default function CompleteSignupPage() {
  const [isDark] = useDarkmode();

  return (
    <>
      <div className="items-center text-center bg-white dark:bg-slate-800 flex justify-center p-5">
        <img src={isDark ? LogoWhite : Logo} alt="" className="h-10" />
      </div>
      <div className="p-6 md:p-16">
        <div className="bg-white dark:bg-slate-800 p-10 max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-6 text-center">
            Company details
          </h2>
          <CompleteSignupForm />
        </div>
      </div>
    </>
  );
}
