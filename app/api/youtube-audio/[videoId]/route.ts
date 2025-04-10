import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { videoId: string } }
) {
  return new NextResponse("This endpoint is no longer used", { status: 410 });
}
