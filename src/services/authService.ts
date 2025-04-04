import api from "../api/api";

export interface termsOfUse {
  termsId: number;
  termsTitle: string;
  termsContent: string;
}

const apiKey = process.env.REACT_APP_API_URL_DEV;

// 약관 불러오기
export const fetchTermsOfUse = async (): Promise<{
  code: number;
  message: string;
  data: termsOfUse[];
}> => {
  try {
    const response = await api.get<{
      code: number;
      message: string;
      data: termsOfUse[];
    }>(`${apiKey}auth/terms`);
    return response.data;
  } catch (error) {
    console.error("이용 약관 불러오기 에러: ", error);
    throw error;
  }
};
export const createUser = async (
  accessToken: string,
  agreedTermIds: number[],
): Promise<{
  code: number;
  message: string;
  data: string;
}> => {
  try {
    const response = await api.post<{
      code: number;
      message: string;
      data: string;
    }>(
      `${apiKey}auth/register`,
      { agreedTermIds },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return response.data;
  } catch (error) {
    console.error("회원가입 에러: ", error);
    throw error;
  }
};
export const login = async (
  accessToken: string,
): Promise<{
  code: number;
  message: string;
  data: { accessToken: string; isUser: boolean };
}> => {
  try {
    const response = await api.post<{
      code: number;
      message: string;
      data: { accessToken: string; isUser: boolean };
    }>(
      `${apiKey}auth/login`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return response.data;
  } catch (error) {
    console.error("로그인 에러: ", error);
    throw error;
  }
};
export const userWithdraw = async (
  accessToken: string | null,
): Promise<{
  code: number;
  message: string;
}> => {
  try {
    const response = await api.delete<{ code: number; message: string }>(
      `${apiKey}auth/withdraw`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return response.data;
  } catch (error) {
    console.error("회원 탈퇴 에러 : ", error);
    throw error;
  }
};
