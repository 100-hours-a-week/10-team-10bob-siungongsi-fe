import api from "../api/api";
import { toast } from "react-toastify";
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
  signal?: AbortSignal,
): Promise<{
  code: number;
  message: string;
}> => {
  try {
    const response = await api.post<{ code: number; message: string }>(
      `${apiKey}notifications`,

      { companyId },
      { headers: { Authorization: `Bearer ${accessToken}` }, signal },
    );
    return response.data;
  } catch (error: any) {
    const serverCode = error?.response?.data?.code;
    if (serverCode === 5405) {
      toast.error("최대 10개까지만 구독할 수 있어요");
    } else {
      console.error("알림설정 기업 추가 에러 : ", error);
    }
    throw error;
  }
};
//알림설정 기업 삭제
export const deleteNotifications = async (
  companyId: number,
  accessToken: string | null,
  signal?: AbortSignal,
): Promise<{
  code: number;
  message: string;
}> => {
  try {
    const response = await api.delete<{ code: number; message: string }>(
      `${apiKey}notifications/${companyId}`,
      { headers: { Authorization: `Bearer ${accessToken}` }, signal },
    );
    return response.data;
  } catch (error: any) {
    if (error.name === "CanceledError") {
    } else {
      console.error("알림 삭제 에러 : ", error);
    }

    throw error;
  }
};
