import prisma from "@/libs/prisma";
import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) return [];

  try {
    const user = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    return user;
  } catch (error: any) {
    console.log(error?.message);
    return [];
  }
};

export default getUsers;
