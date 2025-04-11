"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import { motion } from "framer-motion";

import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4,
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="
        fixed
        justify-between
        w-full
        bottom-0
        z-40
        flex
        items-center
        bg-gradient-to-r
        from-white
        via-indigo-50/50
        to-white
        dark:from-gray-950
        dark:via-indigo-950/20
        dark:to-gray-950
        border-t-[1px]
        border-indigo-100
        dark:border-indigo-950/50
        shadow-[0_-2px_10px_rgba(0,0,0,0.03)]
        dark:shadow-[0_-2px_10px_rgba(0,0,0,0.2)]
        lg:hidden
      "
    >
      {routes.map((route, index) => (
        <motion.div
          key={route.href}
          variants={itemVariants}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <MobileItem
            href={route.href}
            active={route.active}
            icon={route.icon}
            onClick={route.onClick}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MobileFooter;
