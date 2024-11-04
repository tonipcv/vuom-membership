// oneSignal.ts
import supabaseClient from "./superbaseClient";

interface OneSignalInterface {
  init: (options: {
    appId: string;
    safari_web_id?: string;
    notifyButton?: { enable: boolean };
    allowLocalhostAsSecureOrigin?: boolean;
    defaultIconUrl?: string;
    persistNotification?: boolean;
  }) => void;
  push: (callback: () => void) => void;
  User?: {
    id: string | null;
    addEventListener: (event: string, callback: (event: { id: string }) => void) => void;
  };
}

export async function initializeOneSignalWithUser(userId: string) {
  const waitForOneSignal = (retries = 20): Promise<OneSignalInterface> =>
    new Promise((resolve, reject) => {
      let attempts = 0;
      const checkOneSignal = () => {
        if (window.OneSignal && typeof window.OneSignal.push === "function") {
          resolve(window.OneSignal as OneSignalInterface);
        } else if (attempts < retries) {
          attempts++;
          setTimeout(checkOneSignal, 1000);
        } else {
          reject(new Error("OneSignal não carregou após múltiplas tentativas"));
        }
      };
      checkOneSignal();
    });

  const OneSignal = await waitForOneSignal();

  OneSignal.push(() => {
    OneSignal.init({
      appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!,
      safari_web_id: process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_WEB_ID,
      notifyButton: { enable: true },
      allowLocalhostAsSecureOrigin: process.env.NODE_ENV === 'development',
      defaultIconUrl: "/android-chrome-192x192.png",
      persistNotification: false,
    });

    if (OneSignal.User?.id) {
      syncOneSignalUserIdWithSupabase(userId, OneSignal.User.id);
    } else if (OneSignal.User) {
      OneSignal.User.addEventListener('idChange', (event) => {
        const oneSignalUserId = event.id;
        syncOneSignalUserIdWithSupabase(userId, oneSignalUserId);
      });
    } else {
      console.warn("A propriedade 'User' não está disponível no OneSignal.");
    }
  });
}

async function syncOneSignalUserIdWithSupabase(userId: string, oneSignalUserId: string) {
  try {
    const { error } = await supabaseClient
      .from('profiles')
      .update({ onesignal_user_id: oneSignalUserId })
      .eq('id', userId);

    if (error) {
      console.error("Erro ao salvar OneSignal User ID no Supabase:", error);
    } else {
      console.log("OneSignal User ID salvo no Supabase com sucesso.");
    }
  } catch (error) {
    console.error("Erro inesperado ao sincronizar OneSignal User ID com o Supabase:", error);
  }
}
