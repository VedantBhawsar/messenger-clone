"use client";

import { useEffect, useRef, useState } from "react";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";

import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

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
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
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
      const notification = new Notification("Hello!", {
        body: message.body || "New notification",
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

  return (
    <div className="flex-1 overflow-y-auto ">
      <button onClick={requestPermission}>button</button>
      {!(messages.length > 0) ? (
        <div className="flex  h-96 w-full  justify-center items-center">
          <p className="text-slate-600 font-semibold text-sm">
            Send message to start conversation
          </p>
        </div>
      ) : (
        messages.map((message, i) => (
          <MessageBox
            isLast={i === messages.length - 1}
            key={message.id}
            data={message}
          />
        ))
      )}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
