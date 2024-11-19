import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import Icon from "@/components/ui/Icon";
import { string, object } from "yup";
import { Formik } from "formik";
import Button from "@/components/ui/Button";
import FormInput, {
  FormPhoneInput,
  FormTextArea,
  FormSelect,
} from "@/components/form-input";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import nigerianStates from "@/data/countries/states";
import countries from "@/data/countries";
import { useTBERidersModalStore } from "@/data/riders/modal";
import { useEditRider } from "@/mutations/riders/edit-rider";
import { diff } from "deep-object-diff";
import lgaData from "@/utils/data/lga.json";

const validationSchema = object({
  user: object({
    first_name: string().trim().required("First Name is required"),
    last_name: string().trim().required("Last Name is required"),
    email: string().trim().email("Invalid Email").required("Email is required"),
    phone: string().trim().required("Phone is required"),
  }),
}).required();

const EditProject = () => {
  const { isOpen, close, rider } = useTBERidersModalStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { mutateAsync: editRider, error, isLoading } = useEditRider();

  return (
    <Modal
      title="Edit Rider"
      labelClass="btn-outline-dark"
      centered
      activeModal={isOpen}
      onClose={() => {
        setSelectedIndex(0);
        close();
      }}
    >
      <Formik
        initialValues={rider}
        validationSchema={validationSchema}
        onSubmit={(data, { resetForm }) => {
          if (selectedIndex === 2) {
            const diffData = diff(rider, data);
            diffData.id = rider.id;
            if (!diffData.user) {
              diffData.user = {};
            }
            diffData.user.id = rider.user.id;

            return editRider(diffData)
              .then(() => {
                resetForm();
                setSelectedIndex(0);
                close();
              })
              .catch(() => {
                setSelectedIndex(0);
              });
          }
          setSelectedIndex((prev) => prev + 1);
        }}
      >
        {({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className="space-y-2">
            <Tab.Group
              selectedIndex={selectedIndex}
              onChange={setSelectedIndex}
            >
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  Account
                </Tab>
                <Tab
                  disabled={isLoading}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  Profile
                </Tab>
                <Tab
                  disabled={isLoading}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  Guarantor
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel className="space-y-4">
                  <FormInput
                    autoFocus
                    name="user.first_name"
                    label="First Name"
                    required
                    error={error?.response?.data?.user?.first_name}
                  />
                  <FormInput
                    name="user.last_name"
                    label="Last Name"
                    required
                    error={error?.response?.data?.user?.last_name}
                  />
                  {/* <FormInput
                    name="nationality"
                    label="Nationality"
                    required
                    description="Where is the rider from?"
                    error={error?.response?.data?.nationality}
                  /> */}
                  <FormPhoneInput
                    name="user.phone"
                    label="Phone"
                    required
                    readOnly
                    error={error?.response?.data?.user?.phone}
                  />
                  <FormInput
                    name="user.email"
                    label="Email"
                    required
                    readOnly
                    autoComplete="off"
                    error={error?.response?.data?.user?.email}
                  />
                </Tab.Panel>
                <Tab.Panel className="space-y-4">
                  <FormTextArea
                    name="address"
                    label="Address"
                    rows={2}
                    required
                    error={error?.response?.data?.address}
                  />
                  <FormSelect
                    options={
                      lgaData?.map((lga) => ({
                        label: lga,
                        value: lga,
                      })) || []
                    }
                    placeholder="Select Local Government Area"
                    name="rider_profile.lga"
                    label="Local Government Area"
                    required
                    error={error?.response?.data?.rider_profile?.state}
                  />
                  <FormSelect
                    options={nigerianStates.map((state) => ({
                      label: state,
                      value: state,
                    }))}
                    placeholder="Select state"
                    name="state"
                    label="State"
                    required
                    error={error?.response?.data?.state}
                  />
                  <FormSelect
                    options={countries.map((country) => ({
                      label: country,
                      value: country,
                    }))}
                    placeholder="Select country"
                    name="country"
                    label="Country"
                    required
                    error={error?.response?.data?.country}
                  />
                  <FormInput
                    name="nin"
                    label="NIN"
                    required
                    pattern="[0-9]{11}"
                    title="NIN must be 11 digits"
                    error={error?.response?.data?.nin}
                  />
                  <FormSelect
                    required
                    name="commission_type"
                    label="Rider contract"
                    placeholder="Select contract type"
                    error={error?.response?.data?.commission_type}
                    description={
                      <>
                        <span>
                          Select the type of contract you want to offer this
                          rider.{" "}
                        </span>
                        <br />
                        <ul>
                          <li>
                            <strong>Salary</strong> - The rider will be paid a
                            fixed amount monthly
                          </li>
                          <li>
                            <strong>Use global commission</strong> - The rider
                            will be paid the general percentage of the delivery
                            fee
                          </li>
                          <li>
                            <strong>Use individual commission</strong> - The
                            rider will be paid a custom percentage of the
                            delivery fee
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
                    values.commission_type === "individual" && (
                      <FormInput
                        name="commission"
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
                    name="guarantor_name"
                    label="Name"
                    error={error?.response?.data?.guarantor_name}
                  />
                  <FormPhoneInput
                    name="guarantor_phone"
                    label="Phone"
                    error={error?.response?.data?.guarantor_phone}
                  />
                  <FormInput
                    name="guarantor_email"
                    label="Email Address"
                    error={error?.response?.data?.guarantor_email}
                  />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            <div className="flex justify-end">
              {/* @ts-ignore */}
              <Button
                disabled={isLoading}
                isLoading={isLoading}
                loadingText="Editing Rider..."
                type="submit"
                text={selectedIndex === 2 ? "Edit Rider" : "Next"}
                className="btn-dark dark:!bg-blue-900"
              />
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditProject;
