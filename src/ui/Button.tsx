import { Button as ShadButton } from "@/components/ui/button";
import React from "react";
import { ClipLoader } from "react-spinners";

const Button = ({
  disabled = false,
  variant = "default",
  label = "",
  type,
  className = "",
  onClick = () => {},
  children,
  size = "default",
}: {
  disabled?: boolean;
  label?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  children?: React.ReactNode;
  onClick?: () => void;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}) => {
  return (
    <ShadButton
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      className={className ? className : ""}
      type={type}
      size={size}
    >
      {children || label}
    </ShadButton>
  );
};

export default Button;
