'use client';

import { Suspense, useEffect } from 'react';
import nProgress from 'nprogress';
import { usePathname, useSearchParams } from 'next/navigation';

nProgress.configure({
  easing: 'ease',
  speed: 360,
  trickleSpeed: 2000,
  showSpinner: true,
});

export function onStart() {
  nProgress.start();
}

export function onComplete() {
  nProgress.done();
}

function useOnComplete() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    onComplete();
  }, [pathname, searchParams]);
}

// function __RouterEvents() {
//   useOnComplete();
//   return null;
// }

export function RouterEvents() {
  return <Suspense>{/* <__RouterEvents /> */}</Suspense>;
}
