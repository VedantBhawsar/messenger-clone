"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  user?: User;
}

export default function Avatar({ user }: AvatarProps) {
  return (
    <div className="relative cursor-pointer">
      <div className="relative inline-block h-8 w-8 overflow-hidden rounded-full md:h-10 md:w-10">
        <Image
          src={user?.image ?? "/images/placeholder.jpg"}
          alt="avatar"
          fill
          className="object-cover"
        />
      </div>
      <span className="black absolute -right-3 top-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white md:h-3 md:w-3"></span>
    </div>
  );
}
