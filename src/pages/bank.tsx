import FormInput, { FormSelect } from "@/components/form-input";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import { useLoggedInUser } from "@/data/auth";
import { useBankDetails, useBanks } from "@/data/bank";
import { useAddbankDetails, useUpdateBankDetails } from "@/mutations/banks";
import { Formik } from "formik";

export default function BankInfo() {
  const bankDetails = useBankDetails();
  const banks = useBanks();
  const addBankDetails = useAddbankDetails();
  const user = useLoggedInUser();
  const updateBankDetails = useUpdateBankDetails();

  const hasExistingDetails = !!bankDetails.data?.data;

  if (banks.isLoading) return <div>Loading...</div>;
  if (!banks.data?.data)
    return <p>There's an error loading the banks. Please try again later.</p>;


  return (
    <>
      <Formik
        initialValues={{
          account_number: bankDetails.data?.data?.account_number || "", // Prefill if available
          bank_code: bankDetails.data?.data?.bank_code || "",
          user: user.data?.id,
        }}
        onSubmit={(values) => {
          const bankName = banks.data.data.find((bank) => bank.code === values.bank_code)?.name;
          const payload = { ...values, bank_name: bankName };

          if (hasExistingDetails) {
            // Update bank details if they already exist
            updateBankDetails.mutate(payload, {
              onSuccess: () => {
                console.log("Bank details updated successfully!");
              },
              onError: (error) => {
                console.error("Error updating bank details:", error);
              },
            });
          } else {
            // Add new bank details
            addBankDetails.mutate(payload, {
              onSuccess: () => {
                console.log("Bank details added successfully!");
              },
              onError: (error) => {
                console.error("Error adding bank details:", error);
              },
            });
          }
        }}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              name="account_number"
              label="Account Number"
              required
              placeholder="Enter Account Number"
              pattern="[0-9]{10}"
              title="Account number must be 10 digits"
            />
            <FormSelect
              name="bank_code"
              label="Bank"
              required
              placeholder="Select Bank"
              options={banks.data.data
                .sort((a, b) => {
                  return a.name.localeCompare(b.name);
                })
                .map((bank) => ({
                  label: bank.name,
                  value: bank.code,
                }))}
            />
            <div className="flex justify-end">
              <Button
                isLoading={addBankDetails.isLoading}
                loadingText="Saving..."
                // disabled={!!bankDetails.data || addBankDetails.isLoading}
                // disabled={!!bankDetails.data || addBankDetails.isLoading}
                disabled={!bankDetails.data && !addBankDetails.isLoading}
                type="submit"
                className="btn btn-dark"
              >
                Update
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
