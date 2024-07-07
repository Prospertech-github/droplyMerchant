import { useNavigate, useSearchParams } from "react-router-dom";
import { object, string } from "yup";
import { Formik } from "formik";
import FormInput from "@/components/form-input";
import Button from "@/components/ui/Button";
import { useRequestOTP, useVerifyOTP } from "@/mutations/auth/otp";
import useCountdown from "@/hooks/useCountDown";
import { toast } from "react-toastify";

const initialValues = {
  otp: "",
};

const validationSchema = object({
  otp: string()
    .required("Verification code is required")
    .length(6, "Verification code must be 6 characters")
    .matches(/^[0-9]+$/, "Verification code must be a number"),
}).required();

export default function VerifyForm() {
  const [search] = useSearchParams();
  const verifyOTP = useVerifyOTP();
  const navigate = useNavigate();

  const email = search.get("email");

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            await verifyOTP.mutateAsync(values);
            toast.success("Email verified successfully");
            navigate("/login", { replace: true });
          } catch (error: any) {
            if (error.response?.data?.message || error.response?.data?.error || error.response?.data?.detail) {
              toast.error(error.response?.data?.message || error.response?.data?.error || error.response?.data?.detail);
            } else {
              toast.error("Something went wrong, try again");
            }
          }
        }}>
        {({ handleSubmit }) => (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <FormInput name="otp" label="Verification code" error={verifyOTP.error?.response?.data?.otp} />
            <Button
              type="submit"
              className="btn btn-dark"
              isLoading={verifyOTP.isLoading}
              loadingText="Verifying..."
              disabled={verifyOTP.isLoading}>
              Verify
            </Button>
          </form>
        )}
      </Formik>
      <div className="mt-2 text-sm text-slate-800 dark:text-slate-200">{email && <ResendOTP email={email} />}</div>
    </>
  );
}

function ResendOTP({ email }: { email: string }) {
  const resendOTP = useRequestOTP();
  const [count, reset] = useCountdown(60);

  if (count) {
    return (
      <Button className="" disabled>
        Resend OTP in {count}
      </Button>
    );
  }
  return (
    <Button
      className=""
      disabled={resendOTP.isLoading}
      isLoading={resendOTP.isLoading}
      loadingText="Resending OTP..."
      onClick={async () => {
        try {
          await resendOTP.mutateAsync({ email });
        } catch {
          toast.error("Something went wrong, try again");
        } finally {
          reset();
        }
      }}>
      Resend OTP
    </Button>
  );
}
