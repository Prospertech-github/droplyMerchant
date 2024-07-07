import FormInput, { FormattedNumberInput } from "@/components/form-input";
import Button from "@/components/ui/Button";
import { useLoggedInUser } from "@/data/auth";
import { useUpdateOrg } from "@/mutations/auth/profile";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { object, number } from "yup";

const validationSchema = object({
  price_per_km: number().required("include the price for first km"),
  additional_km: number().required("Include the price for additional km"),
  commission: number().min(0).max(100).required("Commission is required"),
}).required();

export default function Finances() {
  const updateOrg = useUpdateOrg();
  const {
    data: { org_data },
  } = useLoggedInUser();

  return (
    <Formik
      initialValues={{
        price_per_km: org_data.price_per_km,
        additional_km: org_data.additional_km,
        commission: org_data.commission,
        id: org_data.id,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          await updateOrg.mutateAsync(values);
          toast.success("Organization updated successfully");
        } catch (error: any) {
          if (error.response?.data?.message || error.response?.data?.error || error.response?.data?.detail) {
            toast.error(error.response?.data?.message || error.response?.data?.error || error.response?.data?.detail);
          } else {
            toast.error("Something went wrong, try again");
          }
        }
      }}>
      {({ handleSubmit, dirty }) => (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormattedNumberInput
            prefix="₦"
            name="price_per_km"
            label="Price for first km"
            error={updateOrg.error?.response?.data?.price_per_km}
            description="This is the price for the first km of a trip"
          />
          <FormattedNumberInput
            prefix="₦"
            name="additional_km"
            label="Price for additional km"
            error={updateOrg.error?.response?.data?.additional_km}
          />
          <FormInput
            type="number"
            name="commission"
            label="Commission (%)"
            error={updateOrg.error?.response?.data?.commission}
          />
          <div className="flex justify-end">
            {/* @ts-ignore */}
            <Button
              isLoading={updateOrg.isLoading}
              loadingText="Updating..."
              disabled={!dirty || updateOrg.isLoading}
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
