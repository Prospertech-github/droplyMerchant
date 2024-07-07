import { ErrorMessage, Field, FieldProps, useField } from "formik";
import Cleave from "cleave.js/react";
import { HTMLProps, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Tooltip from "./ui/Tooltip";
import { Icon } from "@iconify/react/dist/iconify.js";

type FormInputProps = HTMLProps<HTMLInputElement> & {
  name: string;
  label: string;
  error?: string;
  description?: string;
  labelClass?: string;
};

type TextAreaProps = HTMLProps<HTMLTextAreaElement> & {
  name: string;
  label: string;
  error?: string;
  description?: string;
  labelClass?: string;
};

type SelectProps = HTMLProps<HTMLSelectElement> & {
  name: string;
  label: string;
  error?: string;
  labelClass?: string;
  description?: React.ReactNode;
  options: {
    label: string;
    value: string;
    disabled?: boolean;
  }[];
  placeholder: string;
};

export default function FormInput(props: FormInputProps) {
  const { name, label, id, placeholder, className, error, type, labelClass, description, ...rest } = props;

  const [_type, setType] = useState(type);
  const togglePassword = () => {
    setType((_type) => (_type === "password" ? "text" : "password"));
  };

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        return (
          <div className="fromGroup formGroup">
            <label htmlFor={id} className={`flex items-center gap-2 capitalize form-label ${labelClass}`}>
              {label}{" "}
              {description ? (
                <Tooltip title="Description" content={description} className="text-primary-500">
                  <button type="button">
                    <Icon icon="heroicons-outline:information-circle" />
                  </button>
                </Tooltip>
              ) : null}
            </label>
            <div className="relative">
              {
                <input
                  type={type === "password" ? _type : type}
                  {...rest}
                  className={`${
                    error || (meta.touched && meta.error) ? " has-error" : " "
                  } form-control py-2 ${className}`}
                  id={id}
                  {...field}
                />
              }

              {/* icon */}
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                {type === "password" && (
                  <button type="button" className="cursor-pointer text-secondary-500" onClick={togglePassword}>
                    {/* @ts-ignore */}
                    <Icon icon={_type === "password" ? "heroicons-outline:eye" : "heroicons-outline:eye-off"} />
                  </button>
                )}

                {(error || (meta.touched && meta.error)) && type !== "password" && (
                  <span className="text-danger-500">
                    {/* @ts-ignore */}
                    <Icon icon="heroicons-outline:information-circle" />
                  </span>
                )}
              </div>
            </div>
            <ErrorMessage name={name}>
              {(msg) => <div className="mt-2 text-danger-500 block text-sm">{msg}</div>}
            </ErrorMessage>
            {!!error && <div className="mt-2 text-danger-500 block text-sm">{error}</div>}
          </div>
        );
      }}
    </Field>
  );
}

export function FormattedNumberInput(props: FormInputProps & { prefix?: string }) {
  const { name, label, id, placeholder, className, error, type, labelClass, description, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        return (
          <div className="fromGroup formGroup">
            <label htmlFor={id} className={`flex items-center gap-2 capitalize form-label ${labelClass}`}>
              {label}
              {description ? (
                <Tooltip title="Description" content={description} className="text-primary-500">
                  <button type="button">
                    <Icon icon="heroicons-outline:information-circle" />
                  </button>
                </Tooltip>
              ) : null}
            </label>
            <div className="relative">
              {
                <Cleave
                  options={{
                    numeral: true,
                    numeralThousandsGroupStyle: "thousand",
                    prefix: props.prefix,
                    rawValueTrimPrefix: true,
                    numeralPositiveOnly: true,
                  }}
                  type={type}
                  {...(rest as any)}
                  className={`${
                    error || (meta.touched && meta.error) ? " has-error" : " "
                  } form-control py-2 ${className}`}
                  id={id}
                  {...field}
                  onChange={(e) => {
                    field.onChange(props.name)(e.target.rawValue);
                  }}
                />
              }

              {/* icon */}
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                {(error || (meta.touched && meta.error)) && (
                  <span className="text-danger-500">
                    {/* @ts-ignore */}
                    <Icon icon="heroicons-outline:information-circle" />
                  </span>
                )}
              </div>
            </div>
            <ErrorMessage name={name}>
              {(msg) => <div className="mt-2 text-danger-500 block text-sm">{msg}</div>}
            </ErrorMessage>
            {!!error && <div className="mt-2 text-danger-500 block text-sm">{error}</div>}
          </div>
        );
      }}
    </Field>
  );
}

export function FormPhoneInput(props: FormInputProps) {
  const { name, label, id, placeholder, className, error, labelClass, description, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        return (
          <div className="fromGroup formGroup">
            <label htmlFor={id} className={`flex items-center gap-2 capitalize form-label ${labelClass}`}>
              {label}{" "}
              {description ? (
                <Tooltip title="Description" content={description} className="text-primary-500">
                  <button type="button">
                    <Icon icon="heroicons-outline:information-circle" />
                  </button>
                </Tooltip>
              ) : null}
            </label>
            <div className="relative">
              {
                <PhoneInput
                  defaultCountry="NG"
                  international
                  type="tel"
                  {...(rest as any)}
                  className={`${
                    error || (meta.touched && meta.error) ? " has-error" : " "
                  } form-control !flex py-2 ${className}`}
                  id={id}
                  numberInputProps={{
                    className: `${
                      error || (meta.touched && meta.error) ? " has-error" : " "
                    } form-control py-2 ${className}`,
                  }}
                  {...field}
                  onChange={(value) => form.setFieldValue(field.name, value)}
                  countryCallingCodeEditable={false}
                />
              }

              {/* icon */}
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                {(error || (meta.touched && meta.error)) && (
                  <span className="text-danger-500">
                    {/* @ts-ignore */}
                    <Icon icon="heroicons-outline:information-circle" />
                  </span>
                )}
              </div>
            </div>
            <ErrorMessage name={name}>
              {(msg) => <div className="mt-2 text-danger-500 block text-sm">{msg}</div>}
            </ErrorMessage>
            {!!error && <div className="mt-2 text-danger-500 block text-sm">{error}</div>}
          </div>
        );
      }}
    </Field>
  );
}

export function FormFileField(
  props: FormInputProps & {
    preview?: boolean;
  }
) {
  const {
    placeholder = "Select a file",
    preview,
    label,
    id,
    accept = "image/png, image/jpeg, image/jpg",
    className,
    error,
    description,
  } = props;
  const [nameField] = useField(`${props.name}_name`);
  return (
    <Field name={props.name}>
      {({ field, form }: FieldProps) => (
        <div>
          <div className="filegroup">
            <label>
              <input
                type="file"
                {...field}
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    form.setFieldValue(field.name, reader.result);
                    form.setFieldTouched(field.name, true);
                    form.setFieldError(field.name, undefined);
                    form.setFieldValue(`${field.name}_name`, file.name);
                  };
                }}
                value={undefined}
                id={id}
                accept={accept}
                {...props}
                multiple={false}
                required={props.required && !field.value}
                className="sr-only"
              />
              <div className={`w-full h-[40px] file-control flex items-center ${className}`}>
                <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {field.value ? (
                    <span className="text-slate-900 dark:text-white">{nameField.value || "File Selected"}</span>
                  ) : (
                    <span className="text-slate-400">{placeholder}</span>
                  )}
                </span>

                <span className="file-name flex-none cursor-pointer border-l px-4 border-slate-200 dark:border-slate-700 h-full inline-flex items-center bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-base rounded-tr rounded-br font-normal">
                  {label}
                </span>
              </div>
              {description ? <p className="text-xs text-slate-600 dark:text-slate-200">{description}</p> : null}
              {preview && field.value && (
                <div className="w-[150px] h-[150px] mx-auto mt-6  ">
                  <img
                    src={field.value}
                    className="w-full  h-full block rounded object-contain border p-2  border-slate-200"
                    alt={nameField.value || "File Selected"}
                  />
                </div>
              )}
            </label>
          </div>
          <ErrorMessage name={field.name}>
            {(msg) => <div className="mt-2 text-danger-500 block text-sm">{msg}</div>}
          </ErrorMessage>
          {!!error && <div className="mt-2 text-danger-500 block text-sm">{error}</div>}
        </div>
      )}
    </Field>
  );
}

export function FormTextArea(props: TextAreaProps) {
  const { name, label, id, placeholder, className, error, labelClass, rows = 4, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        return (
          <div className="fromGroup formGroup">
            <label htmlFor={id} className={`block capitalize form-label ${labelClass}`}>
              {label}
            </label>
            <div className="relative">
              {
                <textarea
                  rows={rows}
                  {...rest}
                  className={`${
                    error || (meta.touched && meta.error) ? " has-error" : " "
                  } form-control py-2 ${className}`}
                  id={id}
                  {...field}
                />
              }
            </div>
            <ErrorMessage name={name}>
              {(msg) => <div className="mt-2 text-danger-500 block text-sm">{msg}</div>}
            </ErrorMessage>
            {!!error && <div className="mt-2 text-danger-500 block text-sm">{error}</div>}
          </div>
        );
      }}
    </Field>
  );
}

export function FormSelect(props: SelectProps) {
  const { name, label, id, placeholder, className, error, labelClass, options, description, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        return (
          <div className="fromGroup formGroup">
            <label htmlFor={id} className={`flex items-center gap-2 capitalize form-label ${labelClass}`}>
              {label}{" "}
              {description ? (
                <Tooltip title="Description" allowHTML content={description} className="text-primary-500">
                  <button type="button">
                    <Icon icon="heroicons-outline:information-circle" />
                  </button>
                </Tooltip>
              ) : null}
            </label>
            <div className="relative">
              {
                <select
                  {...rest}
                  className={`${
                    error || (meta.touched && meta.error) ? " has-error" : " "
                  } form-control py-2 ${className}`}
                  id={id}
                  {...field}>
                  <option value="">{placeholder}</option>
                  {options.map((option) => (
                    <option key={option.value} disabled={option.disabled} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              }
            </div>
            <ErrorMessage name={name}>
              {(msg) => <div className="mt-2 text-danger-500 block text-sm">{msg}</div>}
            </ErrorMessage>
            {!!error && <div className="mt-2 text-danger-500 block text-sm">{error}</div>}
          </div>
        );
      }}
    </Field>
  );
}
