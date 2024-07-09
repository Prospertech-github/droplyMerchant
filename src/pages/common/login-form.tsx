import useLogin from "@/mutations/auth/login";
import { object, string } from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import FormInput from "@/components/form-input";

const schema = object({
  email: string().email("Invalid email").required("Email is Required"),
  password: string().required("Password is Required"),
}).required();

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const login = useLogin();
  const { state } = useLocation();
  const onSubmit = (data: Record<"email" | "password", string>) => {
    login.mutateAsync(data).then(() => {
      navigate(state?.from || "/dashboard", { replace: true });
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <FormInput
            name="email"
            label="email"
            type="email"
            className="h-[48px]"
            error={login.error?.response?.data?.email}
          />
          <FormInput
            // defaultValue=""
            name="password"
            label="password"
            type="password"
            className="h-[48px]"
            error={login.error?.response?.data?.password}
          />
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
            >
              Forgot Password?{" "}
            </Link>
          </div>

          {/* @ts-ignore */}
          <Button
            type="submit"
            isLoading={login.isLoading}
            disabled={login.isLoading}
            text="Sign in"
            className="btn btn-dark block w-full text-center "
            loadingText="Signing in..."
          />
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
