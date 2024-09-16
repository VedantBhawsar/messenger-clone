"use client";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const AuthSocialButtons = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button className="flex flex-1 justify-center rounded-md border p-2 text-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 ">
        <FaGithub />
      </button>
      <button className="flex flex-1 justify-center rounded-md border p-2 text-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 ">
        <FaGoogle />
      </button>
    </div>
  );
};

export default AuthSocialButtons;
