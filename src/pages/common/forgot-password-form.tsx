import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { Formik } from "formik";
import FormInput from "@/components/form-input";
import useForgotPassword from "@/mutations/auth/password";
import Modal from "@/components/ui/Modal";
import { useState } from "react";

const schema = object({
  email: string().email("Invalid email").required("Email is Required"),
}).required();

const initialValues = {
  email: "",
};

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resetPassword = useForgotPassword();
  const onSubmit = (data: Record<"email", string>) => {
    resetPassword.mutateAsync(data).then(() => {
      setIsModalOpen(true);
    });
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <FormInput
              name="email"
              label="email"
              type="email"
              className="h-[48px]"
              error={resetPassword.error?.response?.data?.email}
            />

            {/* @ts-ignore */}
            <Button
              type="submit"
              isLoading={resetPassword.isLoading}
              disabled={resetPassword.isLoading}
              text="Send Reset Link"
              className="btn btn-dark block w-full text-center "
              loadingText="Sending..."
            />
          </form>
        )}
      </Formik>
      <Modal centered activeModal={isModalOpen} onClose={() => {}} title="Reset Link Sent!">
        <p className="text-sm text-center mb-6">
          Please check your email for a link to reset your password. If it doesn't appear within a few minutes, check
          your spam folder.
        </p>
        <Button
          onClick={() => {
            setIsModalOpen(false);
            navigate("/login");
          }}
          text="Back to Login"
          className="btn btn-dark block w-full text-center "
        />
      </Modal>
    </>
  );
}
