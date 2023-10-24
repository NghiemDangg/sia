'use client';

import { useEffect, useRef } from 'react';
import { RouterEvents } from './router-events';

export default function RootLayoutClient({ children }: React.PropsWithChildren) {
  return (
    <>
      {children}
      <RouterEvents />
    </>
  );
}
