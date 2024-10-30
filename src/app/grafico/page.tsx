'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import Image from 'next/image';
import BottomNavigation from '../../components/BottomNavigation';

// Declare TradingView as a global variable
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
        height: 500,
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
    <div className="container mx-auto px-4 p-20 mb-4">
      <div className="flex justify-center mb-8">
        <Image
          src="/ft-icone.png"
          alt="Logo da Empresa"
          width={100}
          height={50}
        />
      </div>
      
      {scriptLoaded ? (
        <div id="tradingview_chart" className="mb-6"></div>
      ) : (
        <div className="mb-6 text-center">Carregando gráfico...</div>
      )}

      <BottomNavigation />
    </div>
  );
}
