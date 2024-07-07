import { object, string, ref } from "yup";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/ui/Button";
import { Formik } from "formik";
import FormInput from "@/components/form-input";
import { useResetPassword } from "@/mutations/auth/password";
import Modal from "@/components/ui/Modal";
import { useState } from "react";

const schema = object({
  new_password: string()
    .min(6, "Your new password must be at least 6 characters long.")
    .required("Type in your new password"),
  re_new_password: string()
    .oneOf([ref("new_password"), ""], "Passwords must match")
    .required("Confirm your new password"),
}).required();

export default function ResetPasswordForm() {
  const { token, uid } = useParams() as { token: string; uid: string };
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resetPassword = useResetPassword();
  const onSubmit = (data: Record<string, string>) => {
    resetPassword.mutateAsync(data).then(() => {
      setIsModalOpen(true);
    });
  };

  return (
    <>
      <Formik
        initialValues={{
          new_password: "",
          re_new_password: "",
          uid,
          token,
        }}
        validationSchema={schema}
        onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <FormInput
              name="new_password"
              label="New Password"
              type="password"
              className="h-[48px]"
              error={resetPassword.error?.response?.data?.new_password}
            />
            <FormInput
              name="re_new_password"
              label="Confirm New Password"
              type="password"
              className="h-[48px]"
              error={resetPassword.error?.response?.data?.re_new_password}
            />

            {/* @ts-ignore */}
            <Button
              type="submit"
              isLoading={resetPassword.isLoading}
              disabled={resetPassword.isLoading}
              text="Reset Password"
              className="btn btn-dark block w-full text-center "
              loadingText="Resetting..."
            />
          </form>
        )}
      </Formik>
      <Modal
        centered
        activeModal={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          navigate("/login");
        }}
        title="Password reset successfully!">
        <p className="text-sm text-center mb-6">
          Your password has been reset successfully. You can now login with your new password.
        </p>
        <Button
          onClick={() => {
            setIsModalOpen(false);
            navigate("/login");
          }}
          text="Proceed to Login"
          className="btn btn-dark block w-full text-center "
        />
      </Modal>
    </>
  );
}
