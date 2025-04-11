"use client";

import Avatar from "@/components/Avatar";
import { FullMessageType } from "@/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ImageModal from "./ImageModal";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCheck } from "lucide-react";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-2", isOwn && "items-end");

  const message = clsx(
    "text-sm w-fit overflow-hidden shadow-sm",
    isOwn 
      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white" 
      : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700",
    data.image ? "rounded-2xl p-0" : "rounded-2xl py-3 px-4"
  );

  // Handle errors when component unmounts during animation
  useEffect(() => {
    return () => {
      // Cleanup to prevent "removeChild" errors when component unmounts
      if (messageRef.current) {
        // Clear any potential animations
        messageRef.current.style.animation = "none";
      }
    };
  }, []);

  return (
    <motion.div 
      ref={messageRef}
      className={container}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        ease: "easeOut"
      }}
      layout
    >
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{data.sender.name}</div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <motion.div 
          className={message}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          layout
        >
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="overflow-hidden rounded-2xl"
              layout
            >
              <Image
                onClick={() => setImageModalOpen(true)}
                alt="Image"
                height="288"
                width="288"
                src={data.image}
                className="
                  object-cover
                  cursor-pointer
                  transition
                  duration-300
                "
                loading="lazy"
              />
            </motion.div>
          ) : (
            <div className={isOwn ? "text-white" : "text-gray-800 dark:text-gray-200"}>
              {data.body}
            </div>
          )}
        </motion.div>
        {isLast && isOwn && (
          <AnimatePresence mode="wait">
            <motion.div
              key={seenList.length > 0 ? "seen" : "delivered"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="flex items-center gap-1.5 mt-1"
            >
              {seenList.length > 0 ? (
                <div className="flex items-center gap-1.5">
                  <CheckCheck className="h-3.5 w-3.5 text-indigo-500" />
                  <span className="text-xs font-light text-gray-500 dark:text-gray-400">
                    {`Seen by ${seenList}`}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-xs font-light text-gray-400">
                    Delivered
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBox;
