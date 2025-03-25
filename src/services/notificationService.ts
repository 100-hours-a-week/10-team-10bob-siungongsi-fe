import api from "../api/api";

interface APIData {
  code: number;
  message: string;
  data: companies1;
}
interface companies1 {
  companies: companies2[];
}
interface companies2 {
  companyId: number;
  companyName: string;
  subscriberCnt: number;
  isSubscribed: boolean;
}
const apiKey = process.env.REACT_APP_API_URL;
//추천기업 불러오기
export const fetchRecomendedCompaniesList = async (
  accessToken: string | null,
): Promise<APIData> => {
  try {
    const response = await api.get<APIData>(
      `${apiKey}notifications/recommended-companies`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return response.data;
  } catch (error) {
    console.error("추천기업 목록 불러오기 에러: ", error);
    throw error;
  }
};
//알림설정 기업 추가
export const postNotifications = async (
  companyId: number,
  accessToken: string | null,
): Promise<{
  code: number;
  message: string;
}> => {
  try {
    const response = await api.post<{ code: number; message: string }>(
      `${apiKey}notifications`,

      { companyId },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return response.data;
  } catch (error) {
    console.error("알림 추가 에러 : ", error);
    throw error;
  }
};
//알림설정 기업 삭제
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
