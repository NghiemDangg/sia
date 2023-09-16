'use client';

import { useEffect, useRef } from 'react';
import { RouterEvents } from './router-events';

import { v4 as uuidv4 } from 'uuid';

export default function RootLayoutClient({ children }: React.PropsWithChildren) {
  useEffect(() => {
    if (localStorage.getItem('SET_DEVICE_KEY') === null) {
      localStorage.setItem('SET_DEVICE_KEY', uuidv4());
    }
  }, []);

  return (
    <>
      {children}
      <RouterEvents />
    </>
  );
}
