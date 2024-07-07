import FormInput, { FormFileField, FormTextArea } from "@/components/form-input";
import { useLoggedInUser } from "@/data/auth";
import { Formik } from "formik";

export default function CompanyInfo() {
  const user = useLoggedInUser();
  if (!user.data?.org_data) return <div>Loading...</div>;
  return (
    <Formik initialValues={user.data.org_data} onSubmit={(values) => {}}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput name="name" label="Company Name" required />
          <FormFileField name="logo" label="Company Logo" preview />
          <FormTextArea name="description" label="Company Description" required />
          <FormInput name="address" label="Company Address" required />
          <div className="flex justify-end">
            <button type="submit" className="btn btn-dark">
              Update
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
