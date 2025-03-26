import api from "../api/api";

const apiKey = process.env.REACT_APP_API_URL;

export const fetchUserNotificationInfo = async (
  accessToken: string | null,
): Promise<{
  code: number;
  message: string;
  data: { userId: number; notificationFlag: boolean };
}> => {
  try {
    const response = await api.get<{
      code: number;
      message: string;
      data: { userId: number; notificationFlag: boolean };
    }>(`${apiKey}users/notification-status`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("알림 허용 여부 조회: ", error);
    throw error;
  }
};
export const patchUserNotificationInfo = async (
  notificationFlag: boolean,
  pushToken: string | undefined,
  accessToken: string | null,
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
    }>(
      `${apiKey}users/notification-status`,
      { notificationFlag, pushToken },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return response.data;
  } catch (error) {
    console.error("알림 상태 변경 에러 : ", error);
    throw error;
  }
};

export const fetchSusbscriptions = async (
  accessToken: string | null,
): Promise<{
  code: number;
  message: string;
  data: {
    userId: number;
    subscribedCompanies: {
      companyId: number;
      companyName: string;
      companyCode: string;
      stockCode: number;
    }[];
  };
}> => {
  try {
    const response = await api.get<{
      code: number;
      message: string;
      data: {
        userId: number;
        subscribedCompanies: {
          companyId: number;
          companyName: string;
          companyCode: string;
          stockCode: number;
        }[];
      };
    }>(`${apiKey}users/subscriptions`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("구독 목록 불러오기 에러 : ", error);
    throw error;
  }
};
