import { Input as ShadInput } from "@/components/ui/input";
import React from "react";

const Input = ({
  type = "text",
  placeholder = "",
  register,
  className = "",
  name = "",
  id = undefined,
  step = undefined,
  ref,
  style,
  onChange,
}: {
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  name?: string;
  register?: any;
  className?: string;
  ref?: any;
  id?: string;
  style?: React.CSSProperties | undefined;
  step?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
  return (
    <ShadInput
      type={type}
      className={className ? className : ""}
      placeholder={placeholder}
      step={step}
      id={id}
      style={style}
      name={name}
      onChange={onChange}
      ref={ref}
      {...register}
    />
  );
};

export default Input;
