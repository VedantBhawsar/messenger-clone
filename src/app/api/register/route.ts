import bcrypt from "bcrypt";

import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return new NextResponse("Email and password are required", {
        status: 400,
      });
    }
    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExist) {
      return new NextResponse("User already exists", {
        status: 409,
      });
    }

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword: await bcrypt.hash(password, 10),
        name,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
