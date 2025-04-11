"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useConversation from "@/hooks/useConversation";
import { FullMessageType } from "@/types";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/libs/pusher";
import { find } from "lodash";
import { MessageSquare } from "lucide-react";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      // Use requestAnimationFrame to ensure DOM is ready before scrolling
      requestAnimationFrame(() => {
        setTimeout(() => {
          bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );

      sendNotification(newMessage);
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  function sendNotification(message: FullMessageType) {
    if (Notification.permission === "granted" && document.hidden) {
      const notification = new Notification("New Message", {
        body: message.body || "You received a new message",
        icon: message.sender.image || "/images/logo.png",
      });

      notification.onclick = () => {
        window.focus();
      };
    }
  }

  const requestPermission = async () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("User granted the notification permission");
        } else {
          console.log("User denied or dismissed the notification permission");
        }
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {messages.length === 0 ? (
          <motion.div 
            key="empty-state"
            className="flex flex-col h-96 w-full justify-center items-center p-4"
            variants={emptyStateVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-full p-6 shadow-md mb-4"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <MessageSquare className="w-12 h-12 text-indigo-500/50 dark:text-indigo-400/50" />
            </motion.div>
            <motion.p 
              className="text-gray-600 dark:text-gray-300 font-medium text-center max-w-xs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Your conversation is empty. Send a message to start chatting.
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="message-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="pb-4"
          >
            {messages.map((message, i) => (
              <MessageBox
                isLast={i === messages.length - 1}
                key={message.id}
                data={message}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={bottomRef} className="pt-20" />
    </div>
  );
};

export default Body;
