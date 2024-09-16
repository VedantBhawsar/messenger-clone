"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButtons from "./AuthSocialButtons";
import Link from "next/link";

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
        await new Promise((resolve) => setTimeout(resolve, 2000));
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
          {varient === "register" && (
            <Input id="name" errors={errors} label="Name" register={register} disabled={isLoading} />
          )}
          <Input
            id="email"
            errors={errors}
            type="email"
            label="Email"
            register={register}
            disabled={isLoading}
          />
          <Input
            id="password"
            errors={errors}
            type="password"
            label="Password"
            register={register}
            disabled={isLoading}
          />

          <Button className="" type="submit" fullWidth disabled={isLoading}>
            {varient === "login" ? "Login" : "Register"}
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <AuthSocialButtons />
        </div>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-500">
            {varient === "login" ? (
              <span>
                Don't have an account?{" "}
                <span
                  onClick={() => setVarient("register")}
                  className="cursor-pointer underline hover:text-gray-600"
                >
                  Register
                </span>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <span
                  onClick={() => setVarient("login")}
                  className="cursor-pointer underline hover:text-gray-600"
                >
                  Login
                </span>
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
