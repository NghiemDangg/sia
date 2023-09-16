/* eslint-disable react-hooks/rules-of-hooks */
import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

import type { ErrorResponse } from '@/types/api';

import axios from 'axios';
import Cookies from 'js-cookie';
import { message, notification } from 'antd';

import { KEY_TOKEN, KEY_AUTH_INFO } from '@/config/constants';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 600000,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  if (config.headers && Cookies.get(KEY_TOKEN)) {
    config.headers.Authorization = `Bearer ${Cookies.get(KEY_TOKEN)}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => res,
  (err: any) => {
    if (err.response) {
      if (+err.response.statusCode === 401) {
        if (Cookies.get(KEY_TOKEN)) {
          Cookies.remove(KEY_TOKEN);
        }

        if (typeof window !== 'undefined' && window.localStorage.getItem(KEY_AUTH_INFO)) {
          window.localStorage.removeItem(KEY_AUTH_INFO);

          return window.location.replace('/');
        }
      }
    }

    return Promise.reject(err);
  },
);

export const handleError = (err?: ErrorResponse) => {
  if (err) {
    if (err.status === 401) {
      window.location.assign('/login');
    } else if (err.data.message) {
      notification.error({ message: 'Error', description: err.data.message, duration: 9, placement: 'topRight' });
    } else if (err.statusCode) {
      switch (+err.statusCode) {
        case 500:
          message.error('Vui lòng kiểm tra server!', 9);
          break;

        case 401:
          message.error('Vui lòng đăng nhập trước khi sử dụng!', 9);
          break;

        case 400:
          message.error('Vui lòng kiểm tra lại thao tác của bạn!', 9);
          break;

        default:
          message.error('Vui lòng kiểm tra hệ thống của bạn!', 9);
          break;
      }
    } else {
      message.error('Vui lòng kiểm tra kết nối Internet!', 9);
    }
  } else {
    message.error('Vui lòng kiểm tra kết nối Internet!', 9);
  }
};

export default axiosInstance;
