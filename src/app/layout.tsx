// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../contexts/ThemeContext';
import FacebookPixel from '../components/FacebookPixel';
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300'],
});

export const metadata: Metadata = {
  title: 'Futuros Tech',
  description: 'Futuros Tech - Plataforma de Sinais',
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
        <Providers>
          <ThemeProvider>
            <FacebookPixel />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
