import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import FormInput from "@/components/form-input";
import Button from "@/components/ui/Button";
import { useCreateWithdrawal } from "@/mutations/withdrawals";

type Props = {
  onClose: () => void;
  balance?: number;
};

export default function WithdrawModal({ onClose, balance }: Props) {
  const validationSchema = Yup.object({
    amount: Yup.number()
      .min(2000, "You can only withdraw a minimum of 2,000 Naira")
      .max(balance || 0, "You can not withdraw more than your wallet balance")
      .required("Amount is required"),
  }).required();

  const {
    mutateAsync: createWithdrawal,
    error,
    isSuccess,
  } = useCreateWithdrawal();

  return (
    <Modal activeModal={true} onClose={onClose} title="Withdraw" centered>
      {isSuccess ? (
        <div className="w-full">
          <p>
            You have successfully requested a withdrawal. Please wait for
            approval from the admin.
          </p>
        </div>
      ) : (
        <Formik
          initialValues={{
            amount: 0,
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await createWithdrawal(
              {
                ...values,
              },
              {
                onSuccess: () => {
                  toast.success("Withdrawal request sent successfully");
                },
              }
            );
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <FormInput
                required
                type="number"
                name="amount"
                label="Amount"
                min={0.01}
                step={0.01}
                max={balance}
              />
              <FormInput
                name="password"
                label="password"
                type="password"
                required
                error={error?.response?.data?.password}
              />
              <div className="flex justify-end">
                <Button
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  loadingText="Sending..."
                  type="submit"
                  className="btn btn-dark btn-lg"
                >
                  Withdraw
                </Button>
              </div>
            </form>
          )}
        </Formik>
      )}
    </Modal>
  );
}
