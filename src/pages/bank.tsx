import FormInput, { FormSelect } from "@/components/form-input";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import { useLoggedInUser } from "@/data/auth";
import { useBankDetails, useBanks } from "@/data/bank";
import { useAddbankDetails } from "@/mutations/banks";
import { Formik } from "formik";

export default function BankInfo() {
  const bankDetails = useBankDetails();
  const banks = useBanks();
  const addBankDetails = useAddbankDetails();
  const user = useLoggedInUser();

  if (banks.isLoading) return <div>Loading...</div>;
  if (!banks.data?.data) return <p>There's an error loading the banks. Please try again later.</p>;
  return (
    <>
      {bankDetails.data && <Alert label="You can not update your bank details after you input." />}
      <Formik
        initialValues={{
          account_number: bankDetails.data?.data?.account_number,
          bank_code: bankDetails.data?.data?.bank_code,
          user: user.data?.id,
        }}
        onSubmit={(values) => {
          addBankDetails.mutate({
            ...values,
            bank_name: banks.data.data.find((bank) => bank.code === values.bank_code)?.name,
          });
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
                disabled={!!bankDetails.data || addBankDetails.isLoading}
                type="submit"
                className="btn btn-dark">
                Update
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
