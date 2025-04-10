import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function GET(
  request: Request,
  { params }: { params: { videoId: string } }
) {
  try {
    const { videoId } = params;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    console.log(videoUrl);
    // Get video info using ytdl-core
    const info = await ytdl.getBasicInfo(videoUrl);

    return NextResponse.json({
      title: info.videoDetails.title,
      duration: parseInt(info.videoDetails.lengthSeconds),
      channelName: info.videoDetails.author.name,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to fetch video info", { status: 500 });
  }
}
