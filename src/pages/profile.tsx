import FormInput, { FormPhoneInput } from "@/components/form-input";
import Button from "@/components/ui/Button";
import { useLoggedInUser } from "@/data/auth";
import { useEditProfile } from "@/mutations/auth/profile";
import { Formik } from "formik";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { data } = useLoggedInUser();
  const editProfile = useEditProfile();

  return (
    <Formik
      initialValues={{
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        phone: data?.phone,
      }}
      onSubmit={async (values) => {
        try {
          await editProfile.mutateAsync(values);
          toast.success("Profile updated successfully");
        } catch {
          toast.error("Something went wrong");
        }
      }}>
      {({ handleSubmit, dirty }) => (
        <form onSubmit={handleSubmit} className="space-y-1 ">
          <FormInput
            name="first_name"
            label="First Name"
            required
            error={editProfile.error?.response?.data?.first_name}
          />
          <FormInput name="last_name" label="Last Name" required error={editProfile.error?.response?.data?.last_name} />
          <FormInput name="email" type="email" readOnly label="Email" required />
          <FormPhoneInput readOnly name="phone" label="Phone" required />
          <div className="flex justify-end">
            <Button
              isLoading={editProfile.isLoading}
              loadingText="Updating..."
              disabled={!dirty || editProfile.isLoading}
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
