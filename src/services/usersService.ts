import api from "../api/api";

const apiKey = process.env.REACT_APP_API_URL;

export const fetchUserNotificationInfo = async (): Promise<{
  code: number;
  message: string;
  data: { userId: number; notificationFlag: boolean };
}> => {
  try {
    const response = await api.get<{
      code: number;
      message: string;
      data: { userId: number; notificationFlag: boolean };
    }>(`${apiKey}users/notification-status`);
    return response.data;
  } catch (error) {
    console.error("유저 알림 설정 기업 불러오기 에러: ", error);
    throw error;
  }
};
export const patchUserNotificationInfo = async (
  notificationFlag: boolean,
  pushToken: string,
): Promise<{
  code: number;
  message: string;
  data: { userId: number; notificationFlag: boolean };
}> => {
  try {
    const response = await api.patch<{
      code: number;
      message: string;
      data: { userId: number; notificationFlag: boolean };
    }>(`${apiKey}users/notification-status`, { notificationFlag, pushToken });
    return response.data;
  } catch (error) {
    console.error("알림 추가 에러 : ", error);
    throw error;
  }
};
export const deleteNotifications = async (
  companyId: number,
): Promise<{
  code: number;
  message: string;
}> => {
  try {
    const response = await api.post<{ code: number; message: string }>(
      `${apiKey}notifications/${companyId}`,
    );
    return response.data;
  } catch (error) {
    console.error("알림 삭제 에러 : ", error);
    throw error;
  }
};
