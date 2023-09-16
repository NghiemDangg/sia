'use client';

import { AppLayout } from '@/components/AppLayout';
import { HomeView } from '@/views/Home';
import nProgress from 'nprogress';

nProgress.configure({
  easing: 'ease',
  speed: 360,
  trickleSpeed: 2000,
  showSpinner: true,
});

export default function Home() {
  return (
    <AppLayout>
      <HomeView />
    </AppLayout>
  );
}
