import React from "react";
import DesktopSidebar from "./DesktopSidebar/DesktopSidebar";
interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <div className="h-full lg:pl-20">{children}</div>
    </div>
  );
}
