'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { OptimizedImage } from '../components/OptimizedImage';
import { Navigation } from '../components/Navigation';
import { BottomNavigation } from '../../components/BottomNavigation';

declare global {
  interface Window {
    TradingView: any;
  }
}

export default function Grafico() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (scriptLoaded && typeof window.TradingView !== 'undefined') {
      new window.TradingView.widget({
        container_id: 'tradingview_chart',
        width: '100%',
        height: '100%',
        symbol: 'BTCUSDT',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'pt',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        details: true,
        hotlist: true,
        calendar: true,
        news: ['headlines'],
      });
    }
  }, [scriptLoaded]);

  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#111]/90 backdrop-blur-sm z-50 px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <OptimizedImage src="/ft-icone.png" alt="Futuros Tech Logo" width={40} height={40} />
          </Link>
          <Link 
            href="/noticias" 
            className="p-2 text-gray-400 hover:text-green-400 transition-colors"
            title="Relatórios"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" 
              />
            </svg>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="fixed top-[3.5rem] left-0 right-0 bottom-[4rem]">
        <div className="w-full h-full">
          {scriptLoaded ? (
            <div id="tradingview_chart" className="w-full h-full"></div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              Carregando gráfico...
            </div>
          )}
        </div>
      </main>

      <Navigation />
    </div>
  );
}
