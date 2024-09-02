"use client";
import React from "react";
import { FieldError, FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import clsx from "clsx";
import { PiPlaceholder } from "react-icons/pi";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  name?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  errors,
  register,
  id,
  label,
  name,
  required = false,
  type = "text",
  disabled = false,
}) => {
  console.log(errors);
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div>
        <input
          id={id}
          type={type}
          {...register(id, { required: true })}
          className={clsx(
            "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",
            errors[id] && "border-red-500" 
        
          )}
        />
        {errors[id] && (
          <span className="text-red-500 text-sm">{errors[id].message as string}</span>
        )}
      </div>
    </div>
  );
};

export default Input;
