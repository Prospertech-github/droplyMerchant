import { useState } from "react";
import Button from "@/components/ui/Button";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Textarea from "@/components/ui/Textarea";
import InputGroup from "@/components/ui/InputGroup";
import ImageInput from "@/components/ui/ImageInput";
import styles from "./page.module.css";
import useSignUp from "@/mutations/auth/signup";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { Formik, useFormikContext } from "formik";
import FormInput, { FormFileField, FormPhoneInput, FormTextArea, FormattedNumberInput } from "@/components/form-input";
/**
 * @typedef {Object} Step
 * @property {string} label
 * @property {string} sub
 * @property {yup.ObjectSchema} schema
 * @property {React.FC<{register():any;errors:Object}>} component
 */

const userSchema = yup
  .object({
    user_data: yup
      .object({
        first_name: yup.string().trim().required("First name is required"),
        last_name: yup.string().trim().required("Last name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup
          .string()
          .min(8, "Password must be at least 8 characters")
          .max(20, "Password shouldn't be more than 20 characters")
          .required("Password is required"),
      })
      .required(),
  })
  .required();

const companySchema = yup
  .object({
    company_data: yup
      .object({
        name: yup.string().trim().required("Company name is required"),
        address: yup.string().trim().required("Company address is required"),
        description: yup.string().trim().optional(),
        price_per_km: yup
          .number("Please provide a valid number")
          .min(1, "Please input a valid number")
          .required("Price per km is required"),
        additional_km: yup.number().required("Additional price is required"),
        cac_doc: yup.string().trim().required("CAC document is required"),
        logo: yup.string().trim().required("Company logo is required"),
      })
      .required(),
  })
  .required();

/**
 * @type {Array<Step>} steps
 */
const steps = [
  {
    label: "Personal",
    sub: "Info",
    schema: userSchema,
    component: UserData,
  },
  {
    label: "Company",
    sub: "Info",
    schema: companySchema,
    component: CompanyData,
  },
  {
    label: "Confirmation",
    sub: "",
    schema: yup.object().required(),
    component: Summary,
  },
];

const initialValues = {
  user_data: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  },
  company_data: {
    name: "",
    address: "",
    description: "",
    price_per_km: "",
    additional_km: "",
    cac_doc: "",
    logo: "",
  },
};

function RegForm() {
  const [checked, setChecked] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const signup = useSignUp();

  const navigate = useNavigate();

  const onSubmit = async (data, { setErrors }) => {
    try {
      if (currentStep === steps.length - 1) {
        data.user_data.account_type = "organization";
        await signup.mutateAsync(data);
        navigate("/");
        return;
      }
      setCurrentStep(currentStep + 1);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.data?.user_data || error.response?.data?.company_data) {
          toast.error("An error occurred, Please check your inputs and try again");

          if (error.response?.data?.user_data) {
            setCurrentStep(0);
          } else setCurrentStep(1);

          setErrors(error.response?.data);
          return;
        } else {
          const possiibleErrorMessage =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.response?.data?.detail ||
            "An error occurred, Please try again";
          toast.error(possiibleErrorMessage);
        }
      } else {
        toast.error("An error occurred, Please try again");
      }
    }
  };

  const Component = steps[currentStep].component || UserData;

  return (
    <>
      <ol className="flex items-center mb-8 text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
        {steps.map((step, index) => (
          <li
            key={index}
            className={clsx(
              "flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700",
              currentStep >= index && "text-blue-600 dark:text-blue-500"
            )}>
            <button
              onClick={() => setCurrentStep(index)}
              disabled={currentStep < index}
              className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              {currentStep >= index ? (
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
              ) : (
                <span className="mr-2">{index + 1}</span>
              )}
              {step.label} <span className="hidden sm:inline-flex sm:ml-2">{step.sub}</span>
            </button>
          </li>
        ))}
      </ol>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="space-y-5">
            <Component />
            {currentStep + 1 === steps.length && (
              <Checkbox label="You accept our Terms and Conditions and Privacy Policy" required />
            )}
            <Button
              isLoading={signup.isLoading}
              disabled={signup.isLoading}
              loadingText="Creating account..."
              type="submit"
              text={currentStep + 1 === steps.length ? "Look good, Create account" : "Next"}
              className="btn btn-dark block w-full text-center"
            />
          </form>
        )}
      </Formik>
    </>
  );
}

export default RegForm;

function UserData() {
  return (
    <>
      <FormInput
        name="user_data.first_name"
        label="First name"
        placeholder=" Enter your first name"
        className="h-[48px]"
        required
      />
      <FormInput
        name="user_data.last_name"
        label="Last name"
        placeholder=" Enter your last name"
        className="h-[48px]"
        required
      />
      <FormPhoneInput
        name="user_data.phone"
        label="Phone number"
        type="tel"
        placeholder=" Enter your phone number"
        className="h-[48px]"
        required
      />
      <FormInput
        name="user_data.email"
        label="Email"
        type="email"
        placeholder=" Enter your email"
        required
        className="h-[48px]"
      />
      <FormInput
        name="user_data.password"
        label="Password"
        type="password"
        placeholder=" Enter your password"
        className="h-[48px]"
        required
      />
    </>
  );
}

function CompanyData() {
  return (
    <>
      <FormInput
        name="company_data.name"
        label="Company name"
        placeholder=" Enter your company name"
        className="h-[48px]"
        required
        autoComplete="organization"
      />
      <FormTextArea
        name="company_data.address"
        label="Company address"
        required
        placeholder=" Enter your company address"
        rows={2}
        className="h-[48px]"
        autoComplete="street-address"
      />
      <FormTextArea
        name="company_data.description"
        label="Company description"
        placeholder=" Enter your company description"
        row={5}
        className="h-[48px]"
      />
      <FormattedNumberInput
        name="company_data.price_per_km"
        label="Price for first km"
        prepend={<span className="text-gray-400">₦</span>}
        placeholder=" Enter your price"
        className="h-[48px]"
        required
      />
      <FormattedNumberInput
        name="company_data.additional_km"
        label="Price per additional km"
        required
        placeholder=" Enter your price"
        className="h-[48px]"
      />
      <FormFileField
        name="company_data.cac_doc"
        label="CAC document"
        type="file"
        placeholder=" Enter your cac document"
        accept="application/pdf"
        className="h-[48px]"
      />
      <FormFileField
        name="company_data.logo"
        label="Company logo"
        type="file"
        placeholder=" Enter your company logo"
        accept="image/png, image/jpeg, image/jpg"
        className="h-[48px]"
        preview
      />
    </>
  );
}

function Summary() {
  const { values } = useFormikContext();

  return (
    <>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>Company Name</th>
            <td>{values.company_data.name}</td>
          </tr>
          <tr>
            <th>Company Logo</th>
            <td>
              <img src={values.company_data.logo} alt="Company Logo" />
            </td>
          </tr>
          <tr>
            <th>Company Address</th>
            <td>{values.company_data.address}</td>
          </tr>
          <tr>
            <th>Company Description</th>
            <td>{values.company_data.description}</td>
          </tr>
          <tr>
            <th>Price per km</th>
            <td>{values.company_data.price_per_km}</td>
          </tr>
          <tr>
            <th>Additonal KM</th>
            <td>
              <p>{values.company_data.additional_km}</p>
            </td>
          </tr>
          {/* <tr>
            <th>Account Holder Name</th>
            <td>{data.account_name}</td>
          </tr>
          <tr>
            <th>CAC Registration Number</th>
            <td>{data.cac_reg_no}</td>
          </tr> */}
          <tr>
            <th>CAC Certificate</th>
            <td>
              <iframe
                src={`${dataURItoBlob(values.company_data.cac_doc || "")}#toolbar=0&view=fit`}
                width="100%"
                title="CAC Certificate"
                height="500px"
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/* <div className="flex justify-between gap-4">
        <Button type="button" text="Back" className="btn btn-dark block w-full text-center" />
        <Button isLoading={isLoading} type="submit" text="Submit" className="btn btn-dark block w-full text-center" />
      </div> */}
    </>
  );
}

function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  const ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  const blob = new Blob([ab], { type: mimeString });

  return URL.createObjectURL(blob);
}
