import { Formik } from "formik";
import { object, string } from "yup";
import Modal from "@/components/ui/Modal";
import { useOrdersModalStore } from "@/data/orders/modal";
import { FormSelect } from "@/components/form-input";
import { useRiders } from "@/data/riders";
import Button from "@/components/ui/Button";
import { useAssignRider } from "@/mutations/orders/assign-rider";

const validationSchema = object({
  rider_id: string().required("Rider is required"),
});

const initialValues = {
  rider_id: "",
};

const AssignRider = () => {
  const { isOpen, close, order } = useOrdersModalStore();

  const { isLoading, data } = useRiders();

  const { mutateAsync: assignRider, error } = useAssignRider();

  return (
    <>
      {/* @ts-ignore */}
      <Modal
        title="Assign Rider"
        labelClass="btn-outline-dark"
        centered
        activeModal={isOpen}
        onClose={() => {
          close();
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async ({ rider_id }, { resetForm }) => {
            await assignRider({
              order_id: order?.id || "",
              rider_id,
            });

            resetForm();
          }}
          validateOnBlur={false}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} className="space-y-3">
              <p>
                Assign rider to order{" "}
                <strong className="font-semibold">{order?.booking_id}</strong>
              </p>
              <div className="space-y-8">
                <FormSelect
                  options={
                    data?.map((rider) => ({
                      label: `${rider.user.first_name} ${rider.user.last_name}`,
                      value: `${rider.user.id}`,
                    })) || []
                  }
                  disabled={isLoading}
                  placeholder="Select rider"
                  name="rider_id"
                  label="Rider"
                  required
                  error={error?.response?.data?.rider_profile?.state}
                />
                <div className="flex justify-end">
                  {/* @ts-ignore */}
                  <Button
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                    loadingText="Assigning rider..."
                    type="submit"
                    text={"Submit"}
                    className="btn-dark dark:!bg-blue-900"
                  />
                </div>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AssignRider;
