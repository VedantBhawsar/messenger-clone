"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, PinIcon } from "lucide-react";
import { HiOutlinePlusSm } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-hot-toast";
import getCurrentUser from "@/app/actions/getCurrentUser";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
  pin?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,

  pin = false,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  const handlePin = async () => {
    try {
      const response = await axios.post(`/api/conversations/${data.id}/pin`);
      toast.success(response.data.message || "update successfully");
      await session.update();
      router.refresh();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.messagr || "Something went wrong in server side");
    }
  };

  return (
    <div
      className={clsx(
        `
        w-full,
        relative
        flex
        items-center
        space-x-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        p-3
      `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between relative">
            <Link
              href={`/conversations/${data.id}`}
              className="
                text-md
                font-medium
                text-gray-900
              hover:underline
              "
            >
              {data.name || otherUser.name}
            </Link>
            <div className="flex flex-row gap-2">
              {lastMessage?.createdAt && (
                <p
                  className="
              text-xs
              text-gray-400
              font-light
              "
                >
                  {format(new Date(lastMessage.createdAt), "p")}
                </p>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <ChevronRight className="rotate-90 text-sm" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem onClick={handlePin}>
                    <PinIcon className="mr-0" size={18} />
                    Pin
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {pin && (
                <Tooltip>
                  <TooltipTrigger>
                    {" "}
                    <PinIcon
                      size={15}
                      className="text-gray-700 absolute right-3 -bottom-5"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Pinned conversation</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          <p
            className={clsx(
              `
              truncate
              text-sm
            `,
              hasSeen ? "text-gray-500" : "text-black font-medium"
            )}
            onClick={handleClick}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
