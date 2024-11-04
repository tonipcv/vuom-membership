// OneSignalInitializer.tsx
'use client';
import { useEffect, useState } from 'react';
import { initializeOneSignalWithUser } from '@/src/lib/oneSignal';
import supabaseClient from '../lib/superbaseClient';
import { registerServiceWorker } from '../lib/registerServiceWorker';

export default function OneSignalInitializer() {
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    // Adiciona o script do OneSignal ao carregar o componente
    const loadOneSignalScript = () => {
      const script = document.createElement("script");
      script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
      script.defer = true;
      script.onload = () => console.log("OneSignal script loaded.");
      document.head.appendChild(script);
    };

    // Função para inicializar OneSignal com o usuário autenticado
    const initialize = async () => {
      const { data: { session }, error } = await supabaseClient.auth.getSession();
      if (error) {
        console.error("Erro ao obter a sessão do Supabase:", error);
        setSessionChecked(false);
        return;
      }

      if (session) {
        setSessionChecked(true);
        await initializeOneSignalWithUser(session.user.id);
      } else {
        console.warn("Sessão não encontrada ou expirada. Usuário não autenticado.");
        setSessionChecked(false);
      }
    };

    // Carrega o script e inicializa após a verificação da sessão
    if (typeof window !== 'undefined') {
      loadOneSignalScript();
      initialize();
      registerServiceWorker();
    }
  }, []);

  if (!sessionChecked) {
    return null;
  }

  return null;
}
