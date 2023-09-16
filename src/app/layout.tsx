import { Inter } from 'next/font/google';
import nProgress from 'nprogress';

import { Providers } from '@/store/provider';

import RootLayoutClient from './layout.client';

import '@/styles/tailwind.css';
import './globals.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';
// import 'antd/dist/antd.css'

// const inter = Inter({ subsets: ['latin'] })

nProgress.configure({
  easing: 'ease',
  speed: 360,
  trickleSpeed: 2000,
  showSpinner: true,
});

export const metadata = {
  title: 'Sia',
  description: 'Khai phá sức mạnh ChatGPT',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <main>
            <RootLayoutClient>{children}</RootLayoutClient>
          </main>
        </Providers>
      </body>
    </html>
  );
}
