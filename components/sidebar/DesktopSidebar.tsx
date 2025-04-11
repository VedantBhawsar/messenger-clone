"use client";

import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { motion } from "framer-motion";

import useRoutes from "@/hooks/useRoutes";

import { requestPermission } from "../../libs/requestNotification";
import Avatar from "../Avatar";
import DesktopItem from "./DesktopItem";
import SettingsModal from "./SettingsModal";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      requestPermission();
    }
  }, []);

  // Animation variants
  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
        className="
          hidden
          lg:fixed
          lg:inset-y-0
          lg:left-0
          lg:z-40
          lg:w-20
          xl:px-6
          lg:overflow-y-auto
          lg:bg-gradient-to-b
          lg:from-indigo-50
          lg:to-white
          dark:lg:from-gray-900
          dark:lg:to-gray-950
          lg:border-r-[1px]
          lg:border-indigo-100
          dark:lg:border-indigo-950/50
          lg:pb-4
          lg:flex
          lg:flex-col
          justify-between
          shadow-md
        "
      >
        <nav
          className="
            mt-4
            flex
            flex-col
            justify-between
          "
        >
          <motion.ul
            variants={sidebarVariants}
            role="list"
            className="
              flex
              flex-col
              items-center
              space-y-2
            "
          >
            {routes.map((item, index) => (
              <motion.div 
                key={item.label}
                variants={itemVariants}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DesktopItem
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={item.active}
                  onClick={item.onClick}
                />
              </motion.div>
            ))}
          </motion.ul>
        </nav>
        <motion.nav
          variants={itemVariants}
          className="
            mt-4
            flex
            flex-col
            justify-between
            items-center
          "
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="
              cursor-pointer
              transition
              rounded-full
              p-1
              bg-white/80
              dark:bg-gray-800/80
              shadow-md
              backdrop-blur-sm
              border
              border-indigo-100
              dark:border-indigo-900/20
            "
          >
            <Avatar user={currentUser} />
          </motion.div>
        </motion.nav>
      </motion.div>
    </>
  );
};

export default DesktopSidebar;
