import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";

interface IParams {
  conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    const { conversationId } = params;

    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
      },
    });
    if (!conversation) {
      return new NextResponse("conversation is not found", { status: 500 });
    }

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    let isPinned = false;
    if (currentUser.pinnedConversationIds.includes(conversation.id)) {
      currentUser.pinnedConversationIds =
        currentUser.pinnedConversationIds.filter(
          (item) => item !== conversation.id
        );
    } else {
      currentUser.pinnedConversationIds.push(conversation.id);
      isPinned = true;
    }
    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        pinnedConversationIds: currentUser.pinnedConversationIds,
      },
    });

    if (isPinned) {
      return NextResponse.json({
        message: "Conversation pinned successfully",
      });
    } else {
      return NextResponse.json({
        message: "conversation unpinned successfully",
      });
    }
  } catch (error: any) {
    console.log(error, "ERROR_MESSAGES_SEEN");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
