import { toast } from "react-hot-toast";

export const requestPermission = async () => {
  // if (document.hidden) {

  console.log(Notification.permission);
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("User granted the notification permission");
      } else {
        console.log("User denied or dismissed the notification permission");
      }
    });
  }
};
