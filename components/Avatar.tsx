'use client';

import Image from "next/image";
import { User } from "@prisma/client";
import useActiveList from "../hooks/useActiveList";
import { motion } from "framer-motion";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({
  user
}) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return ( 
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="
          relative
          inline-block
          rounded-full
          overflow-hidden
          h-9
          w-9
          md:h-11
          md:w-11
          shadow-md
          border-2
          border-white
          dark:border-gray-800
        "
      >
        <Image
          alt="Avatar"
          src={user?.image || '/images/placeholder.jpg'}
          fill
          className="object-cover"
        />
      </motion.div>
      {isActive && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 15,
            delay: 0.2
          }}
          className="
            absolute
            block
            rounded-full
            bg-gradient-to-r
            from-green-400
            to-green-500
            ring-2
            ring-white
            dark:ring-gray-800
            top-0
            right-0
            h-2
            w-2
            md:h-3
            md:w-3
            shadow-sm
          "
        >
          <motion.span 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 2 
            }}
            className="absolute inset-0 rounded-full bg-green-400/40"
          />
        </motion.span>
      )}
    </div>
   );
}
 
export default Avatar;