import Modal from "@/components/ui/Modal";
import { string, object } from "yup";
import { Formik } from "formik";
import Button from "@/components/ui/Button";
import FormInput, { FormPhoneInput, FormFileField, FormTextArea, FormSelect } from "@/components/form-input";
import { useState } from "react";
import { useAddRider } from "@/mutations/riders/add-rider";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import nigerianStates from "@/data/countries/states";
import countries from "@/data/countries";

const validationSchema = object({
  first_name: string().trim().required("First Name is required"),
  last_name: string().trim().required("Last Name is required"),
  email: string().trim().email("Invalid Email").required("Email is required"),
  phone: string().trim().required("Phone is required"),
  password: string().trim().required("Password is required"),
}).required();

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  password: "",
};
export default function AddProject() {
  const { state } = useLocation();
  const [isOpen, setIsOpen] = useState(!!state?.create);
  const addRider = useAddRider();
  const [reached, setReached] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      {/* @ts-ignore */}
      <Button
        icon="heroicons-outline:plus"
        text="Add Rider"
        className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
        iconClass=" text-lg"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      {/* @ts-ignore */}
      <Modal
        title="Add Rider"
        labelClass="btn-outline-dark"
        centered
        activeModal={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(data, { resetForm }) => {
            if (selectedIndex === 2) {
              return addRider
                .mutateAsync(data)
                .then(() => {
                  resetForm();
                  setSelectedIndex(0);
                  setIsOpen(false);
                })
                .catch(() => {
                  setSelectedIndex(0);
                });
            }
            setReached((prev) => (prev > selectedIndex ? prev : selectedIndex + 1));
            setSelectedIndex((prev) => prev + 1);
          }}>
          {({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit} className="space-y-2">
              <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                        selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }>
                    Account
                  </Tab>
                  <Tab
                    disabled={addRider.isLoading || reached < 1}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                        selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }>
                    Profile
                  </Tab>
                  <Tab
                    disabled={addRider.isLoading || reached < 2}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                        selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }>
                    Guarantor
                  </Tab>
                </Tab.List>
                <Tab.Panels className="mt-2">
                  <Tab.Panel className="space-y-4">
                    <FormInput
                      autoFocus
                      name="first_name"
                      label="First Name"
                      required
                      error={addRider.error?.response?.data?.first_name}
                    />
                    <FormInput
                      name="last_name"
                      label="Last Name"
                      required
                      error={addRider.error?.response?.data?.last_name}
                    />
                    <FormFileField
                      name="image"
                      label="Rider's Photo"
                      accept="image/png, image/jpg, image/jpeg"
                      required
                      error={addRider.error?.response?.data?.image}
                      description="Upload a clear image of the rider in JPG or PNG format"
                    />
                    <FormInput
                      name="rider_profile.nationality"
                      label="Nationality"
                      required
                      description="Where is the rider from?"
                      error={addRider.error?.response?.data?.rider_profile?.nationality}
                    />
                    <FormPhoneInput name="phone" label="Phone" required error={addRider.error?.response?.data?.phone} />
                    <FormInput
                      name="email"
                      label="Email"
                      required
                      autoComplete="off"
                      error={addRider.error?.response?.data?.email}
                    />
                    <FormInput
                      name="password"
                      label="Password"
                      required
                      autoComplete="new-password"
                      type="password"
                      error={addRider.error?.response?.data?.password}
                    />
                  </Tab.Panel>
                  <Tab.Panel className="space-y-4">
                    <FormTextArea
                      name="rider_profile.address"
                      label="Address"
                      rows={2}
                      required
                      error={addRider.error?.response?.data?.rider_profile?.address}
                    />
                    <FormInput
                      name="rider_profile.city"
                      label="City"
                      required
                      error={addRider.error?.response?.data?.rider_profile?.city}
                    />
                    <FormSelect
                      options={nigerianStates.map((state) => ({ label: state, value: state }))}
                      placeholder="Select state"
                      name="rider_profile.state"
                      label="State"
                      required
                      error={addRider.error?.response?.data?.rider_profile?.state}
                    />
                    <FormSelect
                      options={countries.map((country) => ({ label: country, value: country }))}
                      placeholder="Select country"
                      name="rider_profile.country"
                      label="Country"
                      required
                      error={addRider.error?.response?.data?.rider_profile?.country}
                    />
                    <FormInput
                      name="rider_profile.nin"
                      label="NIN"
                      required
                      pattern="[0-9]{11}"
                      title="NIN must be 11 digits"
                      error={addRider.error?.response?.data?.rider_profile?.nin}
                    />
                    <FormFileField
                      name="rider_profile.identification"
                      label="Means of Identification"
                      accept="image/png, image/jpg, image/jpeg"
                      required
                      preview
                      description="Upload a clear image of the rider's driver's license, voter's card, NIN, passport etc. in JPG or PNG format"
                      error={addRider.error?.response?.data?.rider_profile?.identification}
                    />
                    <FormSelect
                      required
                      name="rider_profile.commission_type"
                      label="Rider contract"
                      placeholder="Select contract type"
                      error={addRider.error?.response?.data?.rider_profile?.commission_type}
                      description={
                        <>
                          <span>Select the type of contract you want to offer this rider. </span>
                          <br />
                          <ul>
                            <li>
                              <strong>Salary</strong> - The rider will be paid a fixed amount monthly
                            </li>
                            <li>
                              <strong>Use global commission</strong> - The rider will be paid the general percentage of
                              the delivery fee
                            </li>
                            <li>
                              <strong>Use individual commission</strong> - The rider will be paid a custom percentage of
                              the delivery fee
                            </li>
                          </ul>
                        </>
                      }
                      options={[
                        {
                          label: "Salary",
                          value: "salary",
                        },
                        {
                          label: "Use global commission",
                          value: "global",
                        },
                        {
                          label: "Use individual commission",
                          value: "individual",
                        },
                      ]}
                    />
                    {
                      // @ts-ignore
                      values.rider_profile?.commission_type === "individual" && (
                        <FormInput
                          name="rider_profile.commission"
                          label="Commission in %"
                          type="number"
                          step={0.01}
                          required
                        />
                      )
                    }
                  </Tab.Panel>
                  <Tab.Panel className="space-y-4">
                    <FormInput
                      name="rider_profile.guarantor_name"
                      label="Name"
                      error={addRider.error?.response?.data?.rider_profile?.guarantor_name}
                    />
                    <FormPhoneInput
                      name="rider_profile.guarantor_phone"
                      label="Phone"
                      error={addRider.error?.response?.data?.rider_profile?.guarantor_phone}
                    />
                    <FormInput
                      name="rider_profile.guarantor_email"
                      label="Email Address"
                      error={addRider.error?.response?.data?.rider_profile?.guarantor_email}
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
              <div className="flex justify-end">
                {/* @ts-ignore */}
                <Button
                  disabled={addRider.isLoading}
                  isLoading={addRider.isLoading}
                  loadingText="Adding Rider..."
                  type="submit"
                  text={selectedIndex === 2 ? "Add Rider" : "Next"}
                  className="btn-dark dark:!bg-blue-900"
                />
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
