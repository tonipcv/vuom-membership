'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { BellIcon, BellSlashIcon } from '@heroicons/react/24/outline';

declare global {
  interface Window {
    OneSignal: any;
  }
}

export default function OneSignalInit() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
  }, []);

  const handleScriptLoad = () => {
    window.OneSignal.push(() => {
      window.OneSignal.init({
        appId: "433ba572-95a8-4bd1-9a66-611dfcb0d4e5",
        safari_web_id: "web.com.futurostech",
        notifyButton: {
          enable: false, // Desabilitamos o botão padrão
        },
        allowLocalhostAsSecureOrigin: true,
      });

      // Definir isInitialized como true assim que o OneSignal for inicializado
      setIsInitialized(true);

      // Verificar status inicial da inscrição
      window.OneSignal.isPushNotificationsEnabled((isEnabled: boolean) => {
        setIsSubscribed(isEnabled);
      });

      // Ouvir mudanças no status da inscrição
      window.OneSignal.on('subscriptionChange', function(isSubscribed: boolean) {
        setIsSubscribed(isSubscribed);
      });
    });
  };

  const toggleNotifications = async () => {
    if (!isInitialized) return;

    try {
      if (isSubscribed) {
        await window.OneSignal.setSubscription(false);
      } else {
        await window.OneSignal.setSubscription(true);
      }
    } catch (error) {
      console.error('Erro ao alternar notificações:', error);
    }
  };

  return (
    <>
      <Script
        id="onesignal-sdk"
        src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <button
        onClick={toggleNotifications}
        className="fixed bottom-20 right-4 z-50 p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
        aria-label={isSubscribed ? 'Desativar notificações' : 'Ativar notificações'}
      >
        {isSubscribed ? (
          <BellIcon className="h-6 w-6 text-green-500" />
        ) : (
          <BellSlashIcon className="h-6 w-6 text-gray-400" />
        )}
      </button>
    </>
  );
}
