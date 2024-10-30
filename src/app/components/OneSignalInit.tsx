'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    OneSignal: any;
    OneSignalDeferred: any[];
  }
}

export default function OneSignalInit() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      window.OneSignalDeferred.push(function(OneSignal) {
        OneSignal.init({
          appId: "433ba572-95a8-4bd1-9a66-611dfcb0d4e5",
          safari_web_id: "web.com.futurostech",
          notifyButton: {
            enable: true,
            size: 'large',
            theme: 'default',
            position: 'bottom-right',
            offset: {
              bottom: '80px',
              right: '20px',
            },
            showCredit: false,
            text: {
              'tip.state.unsubscribed': 'Receber Notificações',
              'tip.state.subscribed': 'Você está inscrito nas notificações',
              'tip.state.blocked': 'Você bloqueou as notificações',
              'message.prenotify': 'Clique para se inscrever nas notificações',
              'message.action.subscribed': 'Obrigado por se inscrever!',
              'message.action.resubscribed': 'Você está inscrito nas notificações',
              'message.action.unsubscribed': 'Você não receberá mais notificações',
              'dialog.main.title': 'Gerenciar Notificações',
              'dialog.main.button.subscribe': 'INSCREVER-SE',
              'dialog.main.button.unsubscribe': 'CANCELAR INSCRIÇÃO',
              'dialog.blocked.title': 'Desbloquear Notificações',
              'dialog.blocked.message': 'Siga estas instruções para permitir notificações:'
            }
          },
          allowLocalhostAsSecureOrigin: true,
        });
      });
    }
  }, []);

  return null;
} 