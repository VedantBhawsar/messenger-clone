import prisma from "@/libs/prisma";

const getUsers = async () => {
  const session = "";
  // getSession

  // @ts-ignore
  if (!session?.user?.email) return [];

  try {
    const user = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: "",
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
