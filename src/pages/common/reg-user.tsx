import { object, string, ref } from "yup";
import { Formik } from "formik";
import { isValidPhoneNumber } from "react-phone-number-input";
import FormInput, { FormPhoneInput } from "@/components/form-input";
import Button from "@/components/ui/Button";
import useSignUp from "@/mutations/auth/signup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialValues = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  password: "",
  re_password: "",
  account_type: "organization",
};

const validationSchema = object({
  first_name: string().required("First name is required"),
  last_name: string().required("Last name is required"),
  phone: string()
    .required("Phone number is required")
    .test("phone", "Invalid phone number", (value) => isValidPhoneNumber(value)),
  email: string().email("Invalid email").required("Email is required"),
  password: string().min(8, "Password must be at least 8 characters").required("Password is required"),
  re_password: string()
    .oneOf([ref("password"), ""], "Passwords must match")
    .required("Confirm password is required"),
  account_type: string()
    .oneOf(["individual", "organization"], "Invalid account type")
    .required("Account type is required"),
}).required();

export default function RegisterUserForm() {
  const signup = useSignUp();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          await signup.mutateAsync(values);
          toast.success("Account created successfully");
          navigate(`/verify?email=${encodeURIComponent(values.email)}`, { replace: true });
        } catch (error: any) {
          if (error.response?.data?.message || error.response?.data?.error || error.response?.data?.detail) {
            toast.error(error.response?.data?.message || error.response?.data?.error || error.response?.data?.detail);
          } else {
            toast.error("Something went wrong, try again");
          }
        }
      }}>
      {({ handleSubmit }) => (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormInput name="first_name" label="First name" error={signup.error?.response?.data?.first_name} />
          <FormInput name="last_name" label="Last name" error={signup.error?.response?.data?.last_name} />
          <FormPhoneInput name="phone" label="Phone number" error={signup.error?.response?.data?.phone} />
          <FormInput
            name="email"
            label="Email"
            type="email"
            autoComplete="username email"
            error={signup.error?.response?.data?.email}
          />
          <FormInput
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            error={signup.error?.response?.data?.password}
          />
          <FormInput
            name="re_password"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            error={signup.error?.response?.data?.re_password}
          />
          <div className="flex justify-between">
            <Button
              type="submit"
              className="btn btn-dark"
              isLoading={signup.isLoading}
              loadingText="Creating account..."
              disabled={signup.isLoading}>
              Create account
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
