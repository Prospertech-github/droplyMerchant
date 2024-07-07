import FormInput, { FormSelect, FormTextArea, FormattedNumberInput } from "@/components/form-input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import { useLoggedInUser } from "@/data/auth";
import useLoans from "@/data/loans";
import { useAddLoanDetails } from "@/mutations/loans";
import { Formik } from "formik";
import { useState } from "react";
import { string, object, number } from "yup";

const validationSchema = object({
  request_type: string().required("Request type is required"),
  type_of_bike: string().when("request_type", {
    is: (val: string) => ["Purchase a bike", "Get a bike loan"].includes(val),
    then(schema) {
      return schema.oneOf(["Electric bikes", "ICE bikes"], "Select a bike type").required("Type of bike is required");
    },
  }),
  num_of_bike: number().when("request_type", {
    is: (val: string) => ["Purchase a bike", "Get a bike loan"].includes(val),
    then(schema) {
      return schema.required("Number of bikes is required").min(1, "Number of bikes must be greater than 0");
    },
  }),
  amount: number().when("request_type", {
    is: (val: string) => val === "Business expansion loan",
    then(schema) {
      return schema.required("Amount is required").min(1, "Type a valid amount");
    },
  }),
  note: string().required("Tell us why you need this loan"),
  additional_info: string(),
}).required();

export default function LoansPage() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const { data, isLoading } = useLoans();
  const requestLoan = useAddLoanDetails();
  const { data: me } = useLoggedInUser();

  return (
    <div>
      <ul className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4 [&>*]:p-4 [&>*]:bg-white [&>*]:rounded-lg [&>*]:shadow [&_h2]:text-lg [&_h2]:mb-4">
        <li>
          <h2>Total loan requests</h2>
          <p>0</p>
        </li>
        <li>
          <h2>Total pending requests</h2>
          <p>0</p>
        </li>
        <li>
          <h2>Total approved loans</h2>
          <p>0</p>
        </li>
        <li>
          <h2>Total rejected requests</h2>
          <p>0</p>
        </li>
      </ul>
      <Card>
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Loan Requests</h2>
          <div className="flex space-x-4 rtl:space-x-reverse">
            <Button
              onClick={() => {
                setIsRequestModalOpen(true);
              }}
              text="New loan request"
              className="btn btn-dark block w-full text-center "
            />
          </div>
        </header>
        <div className="overflow-hidden">
          <div className="w-full">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
              <thead className=" bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th scope="col" className=" table-th ">
                    Request Type
                  </th>
                  <th scope="col" className=" table-th ">
                    Amount
                  </th>
                  <th scope="col" className=" table-th ">
                    Request Date
                  </th>
                  <th scope="col" className=" table-th ">
                    Loan Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {isLoading ? (
                  <tr>
                    <td colSpan={9} className="py-9 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : data?.length ? (
                  data.map((loan) => (
                    <tr key={loan.id}>
                      <td className="table-td">{loan.request_type}</td>
                      <td className="table-td">
                        {loan.num_of_bike ? (
                          <></>
                        ) : (
                          loan.amount?.toLocaleString(undefined, {
                            style: "currency",
                            currency: "NGN",
                            currencyDisplay: "narrowSymbol",
                          })
                        )}
                      </td>
                      <td className="table-td">
                        {new Date(loan.created_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="table-td">{loan.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-9 text-center">
                      No loans found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      <Modal
        centered
        activeModal={isRequestModalOpen}
        onClose={() => {
          setIsRequestModalOpen(false);
        }}
        title="New Loan Request">
        <Formik
          validationSchema={validationSchema}
          onSubmit={(values) => {
            values.user = me?.id;
            requestLoan.mutateAsync(values);
          }}
          initialValues={{
            request_type: "",
            type_of_bike: "",
            num_of_bike: "",
            amount: "",
            note: "",
            additional_info: "",
          }}>
          {({ handleSubmit, values }) => (
            <form className="grid gap-2" onSubmit={handleSubmit}>
              <FormSelect
                label="Request Type"
                name="request_type"
                placeholder="Select a request type"
                options={[
                  {
                    label: "Purchase a bike",
                    value: "Purchase a bike",
                  },
                  {
                    label: "Get a bike loan",
                    value: "Get a bike loan",
                  },
                  {
                    label: "Business expansion loan",
                    value: "Business expansion loan",
                  },
                  {
                    label: "Get a delivery license – coming soon!",
                    value: "Get a delivery license",
                    disabled: true,
                  },
                ]}
              />
              {["Purchase a bike", "Get a bike loan"].includes(values.request_type) && (
                <>
                  {/* Electric bikes
b) ICE bikes */}
                  <FormSelect
                    name="type_of_bike"
                    label="Type of bike"
                    placeholder="Select bike type"
                    options={[
                      {
                        label: "Electric bikes",
                        value: "Electric bikes",
                      },
                      {
                        label: "ICE bikes",
                        value: "ICE bikes",
                      },
                    ]}
                  />
                  <FormattedNumberInput
                    name="num_of_bike"
                    label="Number of bikes"
                    placeholder="Enter number of bikes"
                  />
                  <FormTextArea name="note" label="Note" placeholder="Enter note" rows={6} />
                </>
              )}
              {values.request_type === "Business expansion loan" && (
                <>
                  <FormattedNumberInput name="amount" label="Amount" placeholder="Enter amount" prefix="₦" />
                  <FormInput name="note" label="Reason" placeholder="Enter reason" rows={6} />
                </>
              )}
              <FormTextArea
                name="additional_info"
                label="Additional info"
                placeholder="Enter additional info"
                rows={6}
              />
              <Button
                isLoading={requestLoan.isLoading}
                type="submit"
                text="Submit"
                className="btn btn-dark block w-full text-center "
                loadingText="Submitting..."
              />
            </form>
          )}
        </Formik>
      </Modal>
      <Modal
        activeModal={requestLoan.isSuccess}
        onClose={() => {
          requestLoan.reset();
        }}
        centered
        title="Loan Request Submitted!">
        <div className="text-center">
          <p className="mb-4">Your loan request has been submitted successfully.</p>
          <Button
            onClick={() => {
              requestLoan.reset();
            }}
            text="Close"
            className="btn btn-dark block w-full text-center "
          />
        </div>
      </Modal>
    </div>
  );
}
