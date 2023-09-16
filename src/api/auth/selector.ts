// 'use client';

import type { RootState } from '@/types/store';

import { createSelector } from '@reduxjs/toolkit';

export const authSelector = createSelector(
  ({ auth }: RootState) => auth,
  (state) => state,
);
