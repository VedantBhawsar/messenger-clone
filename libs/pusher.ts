import PusherServer from "pusher";
import PusherClient from "pusher-js";

console.log(process.env.NEXT_PUBLIC_PUSHER_APP_KEY);
console.log(process.env.PUSHER_APP_ID);
console.log(process.env.PUSHER_SECRET);

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: "ap2",
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    channelAuthorization: {
      endpoint: "/api/pusher/auth",
      transport: "ajax",
    },
    cluster: "ap2",
  }
);
