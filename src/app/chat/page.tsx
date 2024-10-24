'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Chat() {
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

      {/* Div com o texto "Entradas" com fonte maior */}
      <div className="text-center font-helvetica mb-10 mt-30 text-2xl">
        Sinais de Entradas:
      </div>
      
      <div className="h-full max-w-md mx-auto bg-gray-300 rounded-lg shadow-md p-4 overflow-y-auto" style={{ maxHeight: '500px' }}>
        <div className="mb-4">
          <div className="bg-black p-3 rounded-lg">
            <p className="text-green-500">#CRV / USDT 🟢 COMPRA</p>
            <p>✅ ENTRADA NA ZONA: 0.250</p>
            <p>⚡️ ALAVANCAGEM ISOLADA: Máx. 20x</p>
            <p>Alvos: 4% - 20% - 40% - 60% - 80% - 100% - 120% - 140% - 160% - 180% - 200% -</p>
            <p className="text-orange-300">STOOPLOSS: 90%</p>
            <p className="text-xs text-gray-100 mt-2">24/10/2024 10:00</p>
          </div>
          <div className="bg-black p-3 rounded-lg mt-3">
            <p className="text-green-500">#CRV / USDT 🟢 COMPRA</p>
            <p>✅ ENTRADA NA ZONA: 0.250</p>
            <p>⚡️ ALAVANCAGEM ISOLADA: Máx. 20x</p>
            <p>Alvos: 4% - 20% - 40% - 60% - 80% - 100% - 120% - 140% - 160% - 180% - 200% -</p>
            <p className="text-orange-300">STOOPLOSS: 90%</p>
            <p className="text-xs text-gray-100 mt-2">24/10/2024 10:00</p>
          </div>
          <div className="bg-black p-3 rounded-lg mt-3">
            <p className="text-green-500">#CRV / USDT 🟢 COMPRA</p>
            <p>✅ ENTRADA NA ZONA: 0.250</p>
            <p>⚡️ ALAVANCAGEM ISOLADA: Máx. 20x</p>
            <p>Alvos: 4% - 20% - 40% - 60% - 80% - 100% - 120% - 140% - 160% - 180% - 200% -</p>
            <p className="text-orange-300">STOOPLOSS: 90%</p>
            <p className="text-xs text-gray-100 mt-2">24/10/2024 10:00</p>
          </div>
          <div className="bg-black p-3 rounded-lg mt-3">
            <p className="text-green-500">#CRV / USDT 🟢 COMPRA</p>
            <p>✅ ENTRADA NA ZONA: 0.250</p>
            <p>⚡️ ALAVANCAGEM ISOLADA: Máx. 20x</p>
            <p>Alvos: 4% - 20% - 40% - 60% - 80% - 100% - 120% - 140% - 160% - 180% - 200% -</p>
            <p className="text-orange-300">STOOPLOSS: 90%</p>
            <p className="text-xs text-gray-100 mt-2">24/10/2024 10:00</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-7">
        <button
          className="w-full px-4 py-2 font-bold text-black bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none focus:shadow-outline mt-4"
          onClick={() => window.location.href = 'https://apps.apple.com/app/bybit-buy-bitcoin-crypto/id1494961956'}
        >
          Enviar Ordem
        </button>
      </div>

      <div className="text-center mt-4">
        <Link href="/grafico" className="text-white-500 hover:text-blue-700">
          Acesso ao Gráfico
        </Link>
      </div>
      <div className="text-center mt-4">
        <Link href="/login" className="text-white-500 hover:text-blue-700">
          Sair
        </Link>
      </div>
    </div>
  );
}
