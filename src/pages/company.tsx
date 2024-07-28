import { Formik } from "formik";
import { toast } from "react-toastify";
import FormInput, {
  FormFileField,
  FormTextArea,
} from "@/components/form-input";
import { useLoggedInUser } from "@/data/auth";
import { useUpdateOrg } from "@/mutations/auth/profile";
import Button from "@/components/ui/Button";

export default function CompanyInfo() {
  const { data: user } = useLoggedInUser();
  const { mutateAsync: updateOrg } = useUpdateOrg();

  if (!user?.org_) return <div>Loading...</div>;

  return (
    <Formik
      initialValues={{
        name: user.org_.name,
        logo: user.org_.logo,
        description: user.org_.description,
        address: user.org_.address,
      }}
      onSubmit={async (values) => {
        await updateOrg(values);
        toast.success("Organization updated successfully");
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput name="name" label="Company Name" required />
          <FormFileField name="logo" label="Company Logo" preview />
          <FormTextArea
            name="description"
            label="Company Description"
            required
          />
          <FormInput name="address" label="Company Address" required />
          <div className="flex justify-end">
            {/* @ts-ignore */}
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Updating..."
              className="btn btn-dark"
            >
              Update
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
