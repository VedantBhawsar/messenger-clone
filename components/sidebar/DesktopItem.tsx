'use client';

import clsx from "clsx";
import Link from "next/link";

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
  active
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return ( 
    <li onClick={handleClick} className="relative">
      <Link 
        href={href}
        className={clsx(`
          group
          flex
          gap-x-3
          rounded-xl
          p-3
          text-sm
          leading-6
          font-semibold
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
          hover:shadow-sm
        `,
          active && 'bg-gradient-to-r from-indigo-100 to-indigo-50 dark:from-indigo-900/20 dark:to-indigo-800/10 text-indigo-600 dark:text-indigo-400 shadow-sm'
        )}
      >
        <div className="relative">
          <Icon className={clsx(`
            h-6 
            w-6 
            shrink-0 
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
        <span className="sr-only">{label}</span>
      </Link>
    </li>
   );
}
 
export default DesktopItem;