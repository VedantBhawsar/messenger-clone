"use client";
import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/hooks/useOtherUser";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import Avatar from "@/components/Avatar";
import AvatarGroup from "@/components/AvatarGroup";
import ProfileDrawer from "./ProfileDrawer";
import useActiveList from "@/hooks/useActiveList";
import SpotifyDrawer from "./SpotifyDrawer";
import { motion } from "framer-motion";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [spotifyDrawerOpen, setSpotifyDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="
          bg-white
          dark:bg-gray-900
          w-full
          flex
          border-b
          border-gray-200
          dark:border-gray-800
          sm:px-4
          py-4
          px-4
          lg:px-6
          justify-between
          items-center
          shadow-sm
          z-10
          backdrop-blur-sm
          bg-opacity-90
          dark:bg-opacity-90
        "
      >
        <div className="flex gap-4 items-center">
          <motion.div
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              className="
                lg:hidden
                block
                text-indigo-500
                dark:text-indigo-400
                hover:text-indigo-600
                dark:hover:text-indigo-300
                transition
                cursor-pointer
              "
              href="/conversations"
            >
              <ChevronLeft size={26} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
            {conversation.isGroup ? (
              <AvatarGroup users={conversation.users} />
            ) : (
              <Avatar user={otherUser} />
            )}
          </motion.div>
          <div className="flex flex-col">
            <div className="font-medium text-gray-800 dark:text-gray-200">
              {conversation.name || otherUser.name}
            </div>
            <div className="
              text-sm
              font-light
              flex items-center gap-1
            ">
              <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              <span className="text-gray-500 dark:text-gray-400">
                {statusText}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <SpotifyDrawer />
          <motion.div
            whileHover={{ scale: 1.1, rotate: [0, 15, -15, 0] }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <button
              onClick={() => setDrawerOpen(true)}
              className="
                rounded-full
                p-2
                bg-gray-100
                dark:bg-gray-800
                text-indigo-500
                dark:text-indigo-400
                hover:bg-gray-200
                dark:hover:bg-gray-700
                cursor-pointer
                transition
              "
            >
              <MoreHorizontal size={20} />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Header;
