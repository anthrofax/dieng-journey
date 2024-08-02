import { Input as ShadInput } from "@/components/ui/input";
import React from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<CustomInputProps> = (props) => {
  return <ShadInput {...props} />;
};

export default Input;
