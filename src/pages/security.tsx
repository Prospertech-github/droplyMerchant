import { useChangePassword } from "@/mutations/auth/password";
import { object, string, ref } from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";
import FormInput from "@/components/form-input";
import Button from "@/components/ui/Button";

const initialValues = {
  current_password: "",
  new_password: "",
  re_new_password: "",
};

const validationSchema = object({
  current_password: string().required("Current password is required"),
  new_password: string().required("New password is required"),
  re_new_password: string()
    .oneOf([ref("new_password"), ""], "Passwords must match")
    .required("Confirm new password is required"),
}).required();

export default function Security() {
  const changePassword = useChangePassword();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        changePassword
          .mutateAsync(values)
          .then(() => {
            resetForm();
            toast.success("Password updated successfully");
          })
          .catch((e) => {
            console.log(e);
            if (e.response?.data?.message || e.response?.data?.error) {
              toast.error(e.response.data?.message || e.response.data?.error);
            } else {
              toast.error("An error occured");
            }
          });
      }}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            required
            name="current_password"
            label="Current Password"
            type="password"
            autoComplete="current-password"
            // @ts-ignore
            error={changePassword.error?.response?.data?.current_password}
          />
          <FormInput
            required
            name="new_password"
            label="New Password"
            type="password"
            autoComplete="new-password"
            // @ts-ignore
            error={changePassword.error?.response?.data?.new_password}
          />
          <FormInput
            required
            name="re_new_password"
            label="Confirm New Password"
            type="password"
            autoComplete="new-password"
            // @ts-ignore
            error={changePassword.error?.response?.data?.re_new_password}
          />
          <div className="flex justify-end">
            {/* @ts-ignore */}
            <Button
              isLoading={changePassword.isLoading}
              loadingText="Updating..."
              type="submit"
              className="btn btn-dark">
              Update
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
