// 'use client';

import type { ErrorResponse, BaseResponse } from '@/types/api';
import type {
  AuthLoginRequest,
  AuthLoginResponse,
  CheckAccountRequest,
  CheckAccountResponse,
  GoogleRequest,
  OtpRequest,
  ProfileRequest,
  SignUpSuccess,
  UpdateProfileResponse,
} from '@/types/api/auth';

import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

import axiosInstance from '@/config/api';

// export const agentSignUp = createAsyncThunk<
//   BaseResponse<AgentSignUpResponse>,
//   AgentSignUp,
//   { rejectValue: ErrorResponse }
// >('auth/auth_sign_up', async (req, { rejectWithValue }) => {
//   try {
//     const { data } = await axiosInstance.post('api/v1/public/agent/register', req);
//     return data;
//   } catch (error: any) {
//     return rejectWithValue(error.response);
//   }
// });

export const authLogin = createAsyncThunk<
  BaseResponse<AuthLoginResponse>,
  AuthLoginRequest,
  { rejectValue: ErrorResponse }
>('auth/auth_login', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post('api/v1/auth/login', payload);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response);
  }
});

export const registerUser = createAsyncThunk<
  BaseResponse<SignUpSuccess>,
  AuthLoginRequest,
  { rejectValue: ErrorResponse }
>('auth/auth_register', async (req, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post('api/v1/auth/register', req);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response);
  }
});

export const checkAccount = createAsyncThunk<
  BaseResponse<CheckAccountResponse>,
  { payload: CheckAccountRequest },
  { rejectValue: ErrorResponse }
>('chat/create_new_conversation', async ({ payload }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post(`api/v1/auth/check-account`, payload);

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response);
  }
});

// export const checkOTP = createAsyncThunk<AgentSignUpResponse, OtpRequest, { rejectValue: ErrorResponse }>(
//   'auth/auth_check_otp',
//   async (req, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosInstance.post('api/v1/auth/check-otp', req);
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.response);
//     }
//   },
// );

// export const sendOTP = createAsyncThunk<AgentSignUpResponse, OtpRequest, { rejectValue: ErrorResponse }>(
//   'auth/auth_send_otp',
//   async (req, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosInstance.post('api/v1/auth/send-otp', req);
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.response);
//     }
//   },
// );

// export const passwordRecovery = createAsyncThunk<AgentSignUpResponse, OtpRequest, { rejectValue: ErrorResponse }>(
//   'auth/auth_recovery_otp',
//   async (req, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosInstance.post('api/v1/auth/forgot-password', req);
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.response);
//     }
//   },
// );

// export const updateProfile = createAsyncThunk<UpdateProfileResponse, ProfileRequest, { rejectValue: ErrorResponse }>(
//   'auth/update_profile',
//   async (req, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosInstance.patch('api/v1/auth/update-profile', req);
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

// export const authLoginGoogle = createAsyncThunk<
//   BaseResponse<AuthLoginResponse>,
//   GoogleRequest,
//   { rejectValue: ErrorResponse }
// >('auth/auth_google', async (req, { rejectWithValue }) => {
//   try {
//     const { data } = await axiosInstance.post('/api/v1/auth/sign-in-with-google', req);
//     return data;
//   } catch (error: any) {
//     return rejectWithValue(error.response);
//   }
// });

// export const authLoginWithFacebook = createAsyncThunk<
//   BaseResponse<AuthLoginResponse>,
//   GoogleRequest,
//   { rejectValue: ErrorResponse }
// >('auth/auth_login_with_facebook', async (req, { rejectWithValue }) => {
//   try {
//     const { data } = await axiosInstance.post('/api/v1/auth/sign-in-with-facebook', req);
//     return data;
//   } catch (error: any) {
//     return rejectWithValue(error.response);
//   }
// });

// export const resetResponseAuthRegister = createAction<undefined>('auth/reset_response_auth_register');
// export const resetSendOtpResponse = createAction<undefined>('auth/reset_send_otp');
// export const resetRecoveryResponse = createAction<undefined>('auth/reset_recovery_otp');
export const resetSignUpSuccess = createAction<undefined>('auth/reset_signup_success');

export const changeAuthInformation = createAction<undefined>('auth/change_auth_infomation');

export const authLogout = createAction<undefined>('auth/auth_logout');
