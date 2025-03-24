import api from "../api/api";

interface APIData {
  code: number;
  message: string;
  data: Companies[];
}
interface Companies {
  companyId: number;
  companyName: string;
  subscriberCnt: number;
  isSubscribed: boolean;
}
const apiKey = process.env.REACT_APP_API_URL;

export const fetchRecomendedCompaniesList = async (): Promise<APIData> => {
  try {
    const response = await api.get<APIData>(
      `${apiKey}notifications/recommended-companies`,
    );
    return response.data;
  } catch (error) {
    console.error("추천기업 목록 불러오기 에러: ", error);
    throw error;
  }
};
export const postNotifications = async (
  companyId: number,
): Promise<{
  code: number;
  message: string;
}> => {
  try {
    const response = await api.post<{ code: number; message: string }>(
      `${apiKey}notifications`,
      companyId,
    );
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
