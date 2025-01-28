// src/app/layout.tsx
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../contexts/ThemeContext';
import OneSignalInitializer from '../components/OneSignalInitializer'; // ajuste o caminho conforme necessário

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Futuros Tech',
    template: '%s | Futuros Tech'
  },
  description: 'Tecnologia para traders',
  keywords: ['Futuros Tech', 'DayTrade', 'DanielKatsu'],
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://app.futurostech.com',
    siteName: 'Futuros Tech',
  },
  themeColor: '#111111',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#111111" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <OneSignalInitializer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
