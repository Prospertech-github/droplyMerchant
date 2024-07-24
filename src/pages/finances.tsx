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
    data: { org_ },
  } = useLoggedInUser();

  return (
    <Formik
      initialValues={{
        price_per_km: org_.price_per_km,
        additional_km: org_.additional_km,
        commission: org_.commission,
        id: org_.id,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          await updateOrg.mutateAsync(values);
          toast.success("Organization updated successfully");
        } catch (error: any) {
          if (
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.response?.data?.detail
          ) {
            toast.error(
              error.response?.data?.message ||
                error.response?.data?.error ||
                error.response?.data?.detail
            );
          } else {
            toast.error("Something went wrong, try again");
          }
        }
      }}
    >
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
            description="This is the price for the subsequent km of a trip"
          />
          <FormInput
            type="number"
            name="commission"
            label="Commission in %"
            error={updateOrg.error?.response?.data?.commission}
            description="This is the percentage that will be taken per order from every rider you register"
          />
          <div className="flex justify-end">
            {/* @ts-ignore */}
            <Button
              isLoading={updateOrg.isLoading}
              loadingText="Updating..."
              disabled={!dirty || updateOrg.isLoading}
              type="submit"
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
