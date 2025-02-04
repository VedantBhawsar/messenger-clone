"use client";
"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div className="w-full">
      <label
        className={clsx(
          `
          ml-1
          text-xs
          font-medium
          text-gray-500
          transition-colors
          peer-focus:text-sky-600`,
          errors[id] && "text-rose-500",
        )}
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `
            peer
            w-full
            rounded-xl
            border-2
            bg-gray-50
            p-2
            font-light
            text-gray-700
            outline-none
            transition-all
            placeholder:font-light
            placeholder:text-gray-400
            focus:bg-white
            disabled:cursor-not-allowed
            disabled:opacity-70`,
            errors[id]
              ? "border-rose-300 focus:ring-rose-200"
              : "border-gray-200 focus:border-sky-500 focus:ring-sky-200",
          )}
        />
        {errors[id] && (
          <p className="mt-1 ml-1 text-xs text-rose-500">
            {errors[id]?.message?.toString() || "This field is required"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
