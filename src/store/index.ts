'use client';

import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '@/api/auth';

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    auth: authReducer,
  },
});
