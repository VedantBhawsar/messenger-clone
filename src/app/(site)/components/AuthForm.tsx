"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type Varient = "login" | "register";

function AuthForm() {
  const [varient, setVarient] = useState<Varient>("login");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVarient = useCallback(() => {
    setVarient((prev) => (prev === "login" ? "register" : "login"));
  }, [varient]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      if (varient === "login") {
        // login logic
      } else {
        // register logic
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:p-10">
        <form action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="email"
            errors={errors}
            type="email"
            label="Email"
            register={register}
          />
          <Input
            id="password"
            errors={errors}
            type="password"
            label="Password"
            register={register}
          />
          {varient === "register" && (
            <Input id="name" errors={errors} label="Name" register={register} />
          )}
          <Button className="" type="submit" fullWidth disabled={isLoading}>
            {varient === "login" ? "Login" : "Register"}
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
              <p className="w-fit text-gray-500">or continue with</p>
              <div className="w-full border-t border-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
