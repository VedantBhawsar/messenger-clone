import DesktopSidebar from "@/components/sidebar/DesktopSidebar/DesktopSidebar";
import Sidebar from "@/components/sidebar/SideBar";
import React from "react";

interface UserLayoutProps {
  children: React.ReactNode;
}

export default async function UserLayout({ children }: UserLayoutProps) {
  return (
    <Sidebar>
      <div className="h-full">
        {/* <UserList items={users} /> */}
        {children}
      </div>
    </Sidebar>
  );
}
