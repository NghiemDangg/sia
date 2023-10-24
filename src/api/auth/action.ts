// 'use client';

import type { ErrorResponse, BaseResponse } from '@/types/api';
import type { AuthLoginRequest, AuthLoginResponse, OtpRequest, OtpResponse, SignUpSuccess } from '@/types/api/auth';

import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

import axiosInstance from '@/config/api';

export const authLogin = createAsyncThunk<AuthLoginResponse, AuthLoginRequest, { rejectValue: ErrorResponse }>(
  'auth/auth_login',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('login', payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  },
);

export const registerUser = createAsyncThunk<SignUpSuccess, AuthLoginRequest, { rejectValue: ErrorResponse }>(
  'auth/auth_register',
  async (req, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('register', req);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  },
);

export const sendOTP = createAsyncThunk<OtpResponse, OtpRequest, { rejectValue: ErrorResponse }>(
  'auth/auth_send_otp',
  async (req, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('verify', req);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  },
);

export const resetSignUpSuccess = createAction<undefined>('auth/reset_signup_success');

export const authLogout = createAction<undefined>('auth/auth_logout');
