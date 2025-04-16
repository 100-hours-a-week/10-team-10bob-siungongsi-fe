// useManageNotifications.ts
import { mutate } from "swr";
import {
  postNotifications,
  deleteNotifications,
} from "../services/notificationService";

export const useManageNotifications = () => {
  const token = localStorage.getItem("jwtToken");

  const subscribe = async (companyId: number) => {
    try {
      await postNotifications(companyId, token);
      mutate("/notifications");
    } catch (error: any) {}
  };

  const unsubscribe = async (companyId: number) => {
    await deleteNotifications(companyId, token);
    mutate("/notifications");
  };

  return { subscribe, unsubscribe };
};
