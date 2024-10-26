import OneSignal from 'react-onesignal';
import React from 'react';

const ONE_SIGNAL_APP_ID = '63ed00c7-1ed3-42f9-89be-e1216a602748';
const ONE_SIGNAL_REST_API_KEY = 'NWNlNmY2OTEtNmZmNi00YWZkLWIxNGItZTNmM2M0YWRjNWU3';

export const initializeOneSignal = async () => {
  try {
    await OneSignal.init({
      appId: ONE_SIGNAL_APP_ID,
      allowLocalhostAsSecureOrigin: true,
    });
    console.log('OneSignal inicializado com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar OneSignal:', error);
  }
};

export const useOneSignal = () => {
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  React.useEffect(() => {
    const checkSubscription = async () => {
      try {
        const isPushSupported = await OneSignal.Notifications.isPushSupported();
        console.log('Push notifications suportadas:', isPushSupported);
        if (isPushSupported) {
          const permission = await OneSignal.Notifications.permission;
          console.log('Permissão atual:', permission);
          setIsSubscribed(permission);
        }
      } catch (error) {
        console.error('Erro ao verificar inscrição:', error);
      }
    };

    checkSubscription();
  }, []);

  const handleSubscription = async () => {
    try {
      if (isSubscribed) {
        await OneSignal.User.PushSubscription.optOut();
        setIsSubscribed(false);
        console.log('Usuário cancelou a inscrição');
      } else {
        const result = await OneSignal.Notifications.requestPermission();
        console.log('Resultado da solicitação de permissão:', result);
        if (result === true) {
          // Criar ou atualizar o usuário
          await OneSignal.login("USER_EXTERNAL_ID"); // Substitua com o ID real do usuário
          await OneSignal.User.addTag("favorite_team", "Lakers");
          setIsSubscribed(true);
          console.log('Usuário inscrito com sucesso');
        } else {
          console.log('Usuário não concedeu permissão');
        }
      }
    } catch (error) {
      console.error('Erro ao gerenciar inscrição:', error);
    }
  };

  return { isSubscribed, handleSubscription };
};
