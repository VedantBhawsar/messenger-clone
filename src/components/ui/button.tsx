import clsx from "clsx";
import React from "react";

type buttonTypes = "button" | "reset" | "submit";
type buttonVarient = "danger" | "secondary" | "primary" | undefined;

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: buttonTypes;
  fullWidth?: boolean;
  varient?: buttonVarient;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  className,
  children,
  fullWidth,
  varient,
  disabled,
  loading,
  onClick,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "focus-visible::ring-offset-2 flex justify-center rounded-md px-3 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2",
        disabled && "cursor-default opacity-50",
        fullWidth && "w-full",
        varient === "danger" &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        varient === "secondary" ? "text-gray-900" : "text-white",
        varient === undefined &&
          "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600",
      )}
    >
      {children}
    </button>
  );
};

export default Button;
