import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET(
  request: Request,
  { params }: { params: { playlistId: string } }
) {
  try {
    const { playlistId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const playlist = await prisma.playlist.findUnique({
      where: {
        id: playlistId,
      },
      include: {
        songs: true,
      },
    });

    if (!playlist) {
      return new NextResponse("Playlist not found", { status: 404 });
    }

    return NextResponse.json(playlist);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { playlistId: string } }
) {
  try {
    const { playlistId } = params;
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { name, songIds } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
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

    const updatedPlaylist = await prisma.playlist.update({
      where: {
        id: playlistId,
      },
      data: {
        name: name || undefined,
        songs: songIds
          ? {
              set: songIds.map((id: string) => ({ id })),
            }
          : undefined,
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

export async function DELETE(
  request: Request,
  { params }: { params: { playlistId: string } }
) {
  try {
    const { playlistId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
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

    await prisma.playlist.delete({
      where: {
        id: playlistId,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
