import React from "react";
import { ClipLoader } from "react-spinners";

const Button = ({
  disabled = false,
  label = "",
  className = "",
  onClick = () => {},
}: {
  disabled?: boolean;
  label?: string;
  className?: string;
  onClick?: () => void;
}) => {
  const defaultClassName =
    "w-2/3 bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-700";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className ? className : defaultClassName}
    >
      {disabled ? <ClipLoader size={16} /> : label}
    </button>
  );
};

export default Button;
