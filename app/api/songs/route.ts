import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET(request: Request) {
  try {
    const songs = await prisma.song.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(songs);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { title, artist, albumCover, duration, youtubeUrl, playlistId } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!title || !artist || !youtubeUrl) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Check if playlist exists and user has access to it
    if (playlistId) {
      const playlist = await prisma.playlist.findUnique({
        where: {
          id: playlistId,
        },
      });

      if (!playlist) {
        return new NextResponse("Playlist not found", { status: 404 });
      }

      if (playlist.ownerId !== currentUser.id) {
        return new NextResponse("Unauthorized to add to this playlist", { status: 403 });
      }
    }

    const song = await prisma.song.create({
      data: {
        title,
        artist,
        albumCover,
        duration,
        youtubeUrl,
        playlists: playlistId ? {
          connect: [{ id: playlistId }]
        } : undefined
      },
      include: {
        playlists: true
      }
    });

    // If we have a playlistId, also update the playlist to include this song
    if (playlistId) {
      await prisma.playlist.update({
        where: { id: playlistId },
        data: {
          songs: {
            connect: { id: song.id }
          }
        }
      });
    }

    return NextResponse.json(song);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
