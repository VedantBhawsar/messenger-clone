"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { motion } from "framer-motion";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  id,
  type,
  required,
  register,
  errors
}) => {
  return ( 
    <div className="relative w-full">
      <motion.input
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="
          text-gray-800
          dark:text-gray-200
          font-normal
          py-3
          px-5
          bg-white
          dark:bg-gray-800
          border
          border-gray-200
          dark:border-gray-700
          w-full
          rounded-full
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          dark:focus:ring-indigo-600
          focus:border-transparent
          transition-all
          duration-200
          placeholder:text-gray-400
          dark:placeholder:text-gray-500
        "
      />
      {errors[id] && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-xs mt-1 ml-3"
        >
          {errors[id]?.message?.toString() || "This field is required"}
        </motion.p>
      )}
    </div>
   );
}
 
export default MessageInput;