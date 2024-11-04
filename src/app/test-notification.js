// pages/test-notification.js
import { sendTestNotification } from '../src/lib/oneSignal';

export default function TestNotification() {
  const handleSendNotification = async () => {
    await sendTestNotification();
  };

  return (
    <div>
      <h1>Teste de Notificação</h1>
      <button onClick={handleSendNotification}>Enviar Notificação de Teste</button>
    </div>
  );
}
