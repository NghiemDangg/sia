// 'use client';

import type { AuthInitialState } from '@/types/api/auth';

import { createReducer } from '@reduxjs/toolkit';

import { authLogin, authLogout, registerUser, resetSignUpSuccess, sendOTP } from './action';
import { handleError } from '@/config/api';
import { KEY_AUTH_INFO, KEY_TOKEN } from '@/config/constants';
import Cookies from 'js-cookie';

export const authReducer = createReducer({} as AuthInitialState, ({ addCase }) => {
  addCase(registerUser.pending, (state) => {
    state.pending = true;
    state.responseSignUp = undefined;
  })
    .addCase(registerUser.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.responseSignUp = payload;
    })
    .addCase(registerUser.rejected, (state, { payload }) => {
      state.error = true;
      state.pending = false;
      state.responseSignUp = undefined;
      handleError(payload);
    })

    .addCase(authLogin.pending, (state) => {
      state.pending = true;
      state.responseAuthLogin = undefined;
    })
    .addCase(authLogin.fulfilled, (state, { payload }) => {
      state.pending = false;
      if (payload) {
        state.responseAuthLogin = payload;
        window.localStorage.setItem(KEY_AUTH_INFO, JSON.stringify(payload));
      }
    })
    .addCase(authLogin.rejected, (state, { payload }) => {
      state.error = true;
      state.pending = false;
      state.responseAuthLogin = undefined;
      handleError(payload);
    })

    .addCase(sendOTP.pending, (state) => {
      state.pending = true;
      state.responseAuthLogin = undefined;
    })
    .addCase(sendOTP.fulfilled, (state, { payload }) => {
      state.pending = false;
      if (payload) {
        state.responseSendOTP = payload;
        // Cookies.set(
        //   KEY_TOKEN,
        //   payload.data.token,
        //   process.env.NEXT_PUBLIC_BASE_TIME_EXPIRES_TOKEN
        //     ? { expires: Number(process.env.NEXT_PUBLIC_BASE_TIME_EXPIRES_TOKEN) / (60 * 60 * 24) }
        //     : undefined,
        // );
      }
    })
    .addCase(sendOTP.rejected, (state, { payload }) => {
      state.error = true;
      state.pending = false;
      state.responseSendOTP = undefined;
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

    .addCase(resetSignUpSuccess, (state, { payload }) => {
      state.responseSignUp = payload;
    });
});
