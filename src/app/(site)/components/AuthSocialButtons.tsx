"use client";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { actionType } from "./AuthForm";

const AuthSocialButtons = ({
  socialAction,
}: {
  socialAction: (action: actionType) => void;
}) => {
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [isGithubLoading, setIsGithubLoading] = React.useState(false);
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        disabled={isGithubLoading}
        onClick={() => socialAction("github")}
        className="flex flex-1 justify-center rounded-md border p-2 text-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      >
        {isGithubLoading ? (
          <Loader2 size="24" className="h-4 w-4 animate-spin" />
        ) : (
          <FaGithub />
        )}
      </button>
      <button
        className="flex flex-1 justify-center rounded-md border p-2 text-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        onClick={() => socialAction("google")}
      >
        {isGoogleLoading ? (
          <Loader2 size="24" className="h-4 w-4 animate-spin" />
        ) : (
          <FaGoogle />
        )}
      </button>
    </div>
  );
};

export default AuthSocialButtons;
