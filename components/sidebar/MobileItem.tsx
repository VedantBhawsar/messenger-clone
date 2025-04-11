"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  }

  return ( 
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Link 
        onClick={onClick}
        href={href}
        className={clsx(`
          group
          flex
          gap-x-3
          text-sm
          leading-6
          font-semibold
          w-full
          justify-center
          p-4
          transition-all
          duration-200
          text-gray-500
          dark:text-gray-400
          hover:text-indigo-600
          dark:hover:text-indigo-400
          hover:bg-gradient-to-r
          hover:from-indigo-50
          hover:to-indigo-100/50
          dark:hover:from-indigo-950/30
          dark:hover:to-indigo-900/10
        `,
          active && 'bg-gradient-to-b from-indigo-100 to-indigo-50/50 dark:from-indigo-900/20 dark:to-indigo-800/10 text-indigo-600 dark:text-indigo-400'
        )}
      >
        <div className="relative">
          <Icon className={clsx(`
            h-6 
            w-6 
            transition-all
            duration-200
            group-hover:text-indigo-600
            dark:group-hover:text-indigo-400
          `,
            active && 'text-indigo-600 dark:text-indigo-400'
          )} />
          {active && (
            <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
            </span>
          )}
        </div>
      </Link>
    </motion.div>
   );
}
 
export default MobileItem;