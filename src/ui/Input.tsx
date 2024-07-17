import React from "react";

const Input = ({
  type = 'text',
  placeholder = "",
  register,
  className = "",
  id = undefined,
  step = undefined,
}: {
  type?: string;
  placeholder?: string;
  register: any;
  className?: string;
  id?: string;
  step?: number;
}) => {
  const defaultClassName = "text-slate-400 rounded-md w-2/3 outline-none p-2";

  return (
    <div>
      <input
        type={type}
        className={className ? className : defaultClassName}
        placeholder={placeholder}
        step={step}
        id={id}
        {...register}
      />
    </div>
  );
};

export default Input;
