import { useNavigate } from "react-router-dom";
import { object, string, number } from "yup";
import { Formik } from "formik";
import FormInput, { FormattedNumberInput, FormTextArea, FormFileField } from "@/components/form-input";
import { toast } from "react-toastify";
import { useAddOrg } from "@/mutations/auth/profile";

const initialValues = {
  name: "",
  description: "",
  price_per_km: "" as any as number,
  additional_km: "" as any as number,
  commission: "" as any as number,
  address: "",
  logo: "",
  cac_doc: "",
};

const validationSchema = object({
  name: string().required("Organization name is required"),
  description: string().required("Description is required"),
  price_per_km: number().required("include the price for first km"),
  additional_km: number().required("Include the price for additional km"),
  commission: number().required("Commission is required"),
  address: string().required("Address is required"),
  logo: string().required("Logo is required"),
  cac_doc: string().required("CAC document is required"),
}).required();

export default function CompleteSignupForm() {
  const addOrg = useAddOrg();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          await addOrg.mutateAsync(values);
          toast.success("Organization created successfully");
          navigate(`/dashboard`, { replace: true });
        } catch (error: any) {
          if (error.response?.data?.message || error.response?.data?.error || error.response?.data?.detail) {
            toast.error(error.response?.data?.message || error.response?.data?.error || error.response?.data?.detail);
          } else {
            toast.error("Something went wrong, try again");
          }
        }
      }}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput name="name" label="Organization Name" error={addOrg.error?.response?.data?.name} />
          <FormInput name="address" label="Address" error={addOrg.error?.response?.data?.address} />
          <FormFileField name="logo" label="Logo" error={addOrg.error?.response?.data?.logo} preview />
          <FormTextArea name="description" label="Description" error={addOrg.error?.response?.data?.description} />
          <FormFileField
            name="cac_doc"
            label="CAC Document"
            accept="application/pdf"
            error={addOrg.error?.response?.data?.cac_doc}
          />
          <FormattedNumberInput
            prefix="₦"
            name="price_per_km"
            label="Price for first km"
            error={addOrg.error?.response?.data?.price_per_km}
          />
          <FormattedNumberInput
            prefix="₦"
            name="additional_km"
            label="Price per additional km"
            error={addOrg.error?.response?.data?.additional_km}
          />
          <FormInput
            name="commission"
            label="Commission in %"
            type="number"
            min={0}
            max={100}
            step={0.01}
            error={addOrg.error?.response?.data?.commission}
          />
          <div className="flex justify-end">
            <button type="submit" className="btn btn-dark" disabled={addOrg.isLoading}>
              {addOrg.isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
