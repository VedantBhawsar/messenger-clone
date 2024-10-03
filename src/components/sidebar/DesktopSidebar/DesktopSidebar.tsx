"use client";
import clsx from "clsx";
import useRoutes from "@/hooks/useRoutes";
import Link from "next/link";
import React, { useState } from "react";
import { IconType } from "react-icons";
import Button from "../../ui/button";
import Avatar from "@/components/Avatar";

interface DesktopSidebarProps {}

export default function DesktopSidebar({}: DesktopSidebarProps) {
  const router = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="hidden justify-between lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-20 lg:flex-col lg:overflow-y-auto lg:border-r-[1px] lg:bg-white lg:pb-4 xl:px-6">
      <nav className="mt-4 flex h-full flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {router.map((route, index) => {
            return (
              <DesktopItem
                key={index}
                href={route?.href}
                icon={route.icon}
                label={route.label}
                active={route.active}
                onClick={route.onClick}
              />
            );
          })}
        </ul>
        <Avatar />
      </nav>
    </div>
  );
}

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 text-gray-500 hover:bg-gray-100 hover:text-black`,
          active && "bg-gray-100 text-black",
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};
