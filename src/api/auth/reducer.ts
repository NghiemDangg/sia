// 'use client';

import type { AuthInitialState } from '@/types/api/auth';

import { createReducer } from '@reduxjs/toolkit';

import {
  // agentSignUp,
  authLogin,
  // authLoginGoogle,
  // authLoginWithFacebook,
  authLogout,
  changeAuthInformation,
  registerUser,
  resetSignUpSuccess,
  // changeAuthInfomation,
  // checkOTP,
  // passwordRecovery,
  // resetCheckOtpResponse,
  // resetRecoveryResponse,
  // resetResponseAuthRegister,
  // resetSendOtpResponse,
  // sendOTP,
  // updateProfile,
} from './action';
import { handleError } from '@/config/api';
import { KEY_AUTH_INFO, KEY_TOKEN } from '@/config/constants';
import Cookies from 'js-cookie';

export const authReducer = createReducer({} as AuthInitialState, ({ addCase }) => {
  // addCase(agentSignUp.pending, (state) => {
  //   state.pending = true;
  //   state.responseAgentSignUp = undefined;
  // })
  //   .addCase(agentSignUp.fulfilled, (state, { payload }) => {
  //     state.pending = false;
  //     if (payload.data) {
  //       state.responseAgentSignUp = payload.data;
  //       message.success('Đăng ký thành công.Vui lòng bạn chờ trong ít phút');
  //     }
  //   })
  //   .addCase(agentSignUp.rejected, (state, { payload }) => {
  //     state.error = true;
  //     state.pending = false;
  //     state.responseAgentSignUp = undefined;
  //     handleError(payload);
  //   })

  addCase(registerUser.pending, (state) => {
    state.pending = true;
    state.responseSignUp = undefined;
  })
    .addCase(registerUser.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.responseSignUp = payload.data;
    })
    .addCase(registerUser.rejected, (state, { payload }) => {
      state.error = true;
      state.pending = false;
      state.responseSignUp = undefined;
      handleError(payload);
    });

  addCase(authLogin.pending, (state) => {
    state.pending = true;
    state.responseAuthLogin = undefined;
  })
    .addCase(authLogin.fulfilled, (state, { payload }) => {
      state.pending = false;
      if (payload.data?.token) {
        state.responseAuthLogin = payload.data;
        window.localStorage.setItem(KEY_AUTH_INFO, JSON.stringify(payload.data));
        Cookies.set(
          KEY_TOKEN,
          payload.data.token,
          process.env.NEXT_PUBLIC_BASE_TIME_EXPIRES_TOKEN
            ? { expires: Number(process.env.NEXT_PUBLIC_BASE_TIME_EXPIRES_TOKEN) / (60 * 60 * 24) }
            : undefined,
        );
      }
    })
    .addCase(authLogin.rejected, (state, { payload }) => {
      state.error = true;
      state.pending = false;
      state.responseAuthLogin = undefined;
      handleError(payload);
    })

    .addCase(authLogout, (state) => {
      state.responseAuthLogin = undefined;
      if (Cookies.get(KEY_TOKEN)) {
        Cookies.remove(KEY_TOKEN);
      }

      if (window.localStorage.getItem(KEY_AUTH_INFO)) {
        window.localStorage.removeItem(KEY_AUTH_INFO);
      }
    })

    .addCase(changeAuthInformation, (state) => {
      if (window.localStorage.getItem(KEY_AUTH_INFO)) {
        state.responseAuthLogin = JSON.parse(`${window.localStorage.getItem(KEY_AUTH_INFO)}`);
      }
    })

    .addCase(resetSignUpSuccess, (state, { payload }) => {
      state.responseSignUp = payload;
    });
});
