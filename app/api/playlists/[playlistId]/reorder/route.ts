import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function PATCH(
  request: Request,
  { params }: { params: { playlistId: string } }
) {
  try {
    const { playlistId } = params;
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { songIds } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!songIds || !Array.isArray(songIds)) {
      return new NextResponse("Song IDs array is required", { status: 400 });
    }

    const playlist = await prisma.playlist.findUnique({
      where: {
        id: playlistId,
      },
    });

    if (!playlist) {
      return new NextResponse("Playlist not found", { status: 404 });
    }

    if (playlist.ownerId !== currentUser.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Update the playlist with the new song order
    const updatedPlaylist = await prisma.playlist.update({
      where: {
        id: playlistId,
      },
      data: {
        songs: {
          set: songIds.map((id: string) => ({ id })),
        },
      },
      include: {
        songs: true,
      },
    });

    return NextResponse.json(updatedPlaylist);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
