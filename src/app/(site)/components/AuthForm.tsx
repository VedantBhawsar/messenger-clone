"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButtons from "./AuthSocialButtons";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Varient = "login" | "register";
export type actionType = "google" | "github";

function AuthForm() {
  const session = useSession();
  const router = useRouter();
  const [varient, setVarient] = useState<Varient>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (session?.status === "authenticated") {
      console.log("Authenticated");
      router.push("/users");
    } else {
      console.log("Not Authenticated");
      router.push("/");
    }
  }, [session?.status]);

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (varient === "login") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            setErrorMessage(callback.error);
          } else {
            toast.success("Logged in successfully");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .post("/api/register", data)
        .then((response) => console.log(response))
        .catch((error) => {
          setErrorMessage(error.response.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialAction = (action: actionType) => {
    setIsLoading(true);
    signIn(action, { redirect: false }).then((callback) => {
      if (callback?.error) {
        setErrorMessage(callback.error);
      }
      if (callback?.ok) {
        toast.success("Logged in successfully");
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      setTimeout(() => {
        setErrorMessage("");
      }, 3500);
    }
  }, [errorMessage]);

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:p-10">
        <form action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {varient === "register" && (
            <Input
              id="name"
              errors={errors}
              label="Name"
              register={register}
              disabled={isLoading}
            />
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
          <div
            className={`flex h-14 w-full items-center justify-center rounded-md bg-red-100 transition-opacity duration-500 ease-in-out ${
              errorMessage
                ? "flex scale-100 opacity-100"
                : "hidden scale-0 opacity-0"
            }`}
            // style={{ display: errorMessage ? "flex" : "none" }}
          >
            <p className="text-sm font-semibold text-red-500">
              {errorMessage || "Something went wrong"}
            </p>
          </div>
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
          <AuthSocialButtons socialAction={socialAction} />
        </div>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-500">
            {varient === "login" ? (
              <span>
                Don&apos;t have an account?{" "}
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
