'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { OptimizedImage } from '../components/OptimizedImage';
import { Navigation } from '../components/Navigation';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { BottomNavigation } from '../../components/BottomNavigation';

declare global {
  interface Window {
    TradingView: any;
  }
}

export default function GraficoRestrito() {
  const { data: session } = useSession();
  const router = useRouter();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

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
        <div className="flex justify-center lg:justify-start items-center gap-4">
          <Link href="/" className="flex items-center">
            <OptimizedImage src="/ft-icone.png" alt="Futuros Tech Logo" width={40} height={40} />
          </Link>
          <Link 
            href="/informacao"
            className="text-xs px-3 py-1 bg-green-500 text-black font-medium rounded-full hover:bg-green-400 transition-colors"
          >
            Seja premium!
          </Link>
        </div>
      </header>

      {/* Disclaimer Minimalista */}
      <div className="fixed top-[4.5rem] left-1/2 -translate-x-1/2 z-10 px-4 w-full max-w-sm">
        <div className="bg-black/60 backdrop-blur-sm rounded-full py-1.5 px-4 flex items-center justify-between gap-3">
          <p className="text-xs text-gray-300 truncate">
            Versão gratuita. Acesso limitado
          </p>
          <a 
            href="https://checkout.k17.com.br/subscribe/anual-ft-promocional"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 text-xs font-medium hover:text-green-300 transition-colors whitespace-nowrap"
          >
            Fazer Upgrade
          </a>
        </div>
      </div>

      {/* Main Content - Voltando à posição original */}
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
