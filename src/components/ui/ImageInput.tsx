import { HTMLProps } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

export default function ImageInput({
  error,
  ...props
}: HTMLProps<HTMLInputElement> & {
  label: string;
  register: UseFormRegister<any>;
  name: string;
  watch: UseFormWatch<any>;
  error: any;
  classLabel?: string;
}) {
  return <div className={`fromGroup  ${error ? "has-error" : ""}`}></div>;
}
