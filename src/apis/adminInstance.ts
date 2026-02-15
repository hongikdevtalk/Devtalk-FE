import axios, { type AxiosInstance } from 'axios';
import { STORAGE_KEY } from '../constants/key';

export const adminInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

export const refreshInstance = (refresh: string): AxiosInstance =>
  axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    headers: {
      refreshToken: refresh,
    },
  });

adminInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEY.ADMIN_ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

adminInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    if (!status) return Promise.reject(status);

    //토큰 만료 오류
    if (
      (status === 419 && !originalRequest._retry) ||
      (status === 403 && !originalRequest._retry)
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(STORAGE_KEY.ADMIN_REFRESH_TOKEN);

      //refreshToken이 없는 경우 어드민 로그인 페이지로 이동
      if (!refreshToken) {
        localStorage.removeItem(STORAGE_KEY.ADMIN_ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEY.ADMIN_REFRESH_TOKEN);
        window.location.href = '/admin/login';
        return Promise.reject(error);
      }

      //refreshToken으로 새 accessToken 발급
      try {
        const { data } = await refreshInstance(refreshToken).post('/admin/refresh');
        const newAccessToken = data?.result.accessToken;
        const newRefreshToken = data?.result.refreshToken;
        localStorage.setItem(STORAGE_KEY.ADMIN_ACCESS_TOKEN, newAccessToken);
        localStorage.setItem(STORAGE_KEY.ADMIN_REFRESH_TOKEN, newRefreshToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return adminInstance(originalRequest);
      } catch (error) {
        //에러 발생시 로그인 페이지으로 이동
        localStorage.removeItem(STORAGE_KEY.ADMIN_ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEY.ADMIN_REFRESH_TOKEN);
        window.location.replace('/admin/login');
      }
    }

    //토큰 오류
    if (status === 401) {
      //기존에 남아있던 토큰 삭제 후 어드민 로그인 페이지로 이동
      localStorage.removeItem(STORAGE_KEY.ADMIN_ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEY.ADMIN_REFRESH_TOKEN);
      window.location.replace('/admin/login');
      return Promise.reject(error);
    }

    //접근 권한이 없는 경우
    if (status === 403) {
      //홈으로 이동
      localStorage.removeItem(STORAGE_KEY.ADMIN_ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEY.ADMIN_REFRESH_TOKEN);
      window.location.replace('/');
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
