'use client';

import Image from 'next/image';
import BottomNavigation from '../../components/BottomNavigation';
import { useRouter } from 'next/navigation';
import supabaseClient from '@/src/lib/superbaseClient';

export default function RestrictedChat() {
  const router = useRouter();
  const supabase = supabaseClient;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const mockSignals = [
    {
      title: "WINFUT",
      time: "10:30",
      status: "WIN",
      points: "+150",
      description: "Compra a mercado com alvo em 120.000",
      result: "Gain +150 pontos"
    },
    {
      title: "INDG24",
      time: "11:15",
      status: "WIN",
      points: "+85",
      description: "Venda a mercado com stop em 125.000",
      result: "Gain +85 pontos"
    },
    {
      title: "WINFUT",
      time: "14:45",
      status: "WIN",
      points: "+120",
      description: "Compra a mercado com alvo em 119.500",
      result: "Gain +120 pontos"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-10 mb-16 mt-20 relative">
      {/* Conteúdo base com blur sutil nos textos */}
      <div className="relative">
        <div className="flex justify-center mb-4">
          <Image
            src="/ft-icone.png"
            alt="Logo da Empresa"
            width={100}
            height={50}
          />
        </div>

        {/* Área dos Sinais - Versão com dados simulados */}
        <div className="max-w-3xl mx-auto space-y-4">
          {mockSignals.map((signal, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-white font-bold blur-[4px]">{signal.title}</span>
                  <span className="text-gray-400 blur-[4px]">{signal.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500 font-semibold blur-[4px]">{signal.status}</span>
                  <span className="text-green-400 blur-[4px]">{signal.points}</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-gray-300 blur-[4px]">{signal.description}</p>
                <p className="text-green-400 font-medium blur-[4px]">{signal.result}</p>
              </div>
            </div>
          ))}

          {/* Área de Estatísticas - Sem blur */}
          <div className="bg-gray-800 rounded-lg p-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <h3 className="text-gray-400">Taxa de Acerto</h3>
                <p className="text-green-500 text-2xl font-bold">92%</p>
              </div>
              <div className="text-center">
                <h3 className="text-gray-400">Valorização</h3>
                <p className="text-green-500 text-2xl font-bold">12.323%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Restrição com botão de logout adicionado */}
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4 backdrop-blur-[2px]">
        <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full border border-gray-800 shadow-2xl">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 mb-4">
              <svg 
                className="h-6 w-6 text-green-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth="2"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">Acesso Restrito</h2>
            <p className="mb-8 text-gray-300">
              Assine o Plano Premium para liberar o seu aplicativo
            </p>
            <a 
              href="https://checkout.k17.com.br/pay/fip-promocional"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors block w-full text-center shadow-lg hover:shadow-green-500/20"
            >
              Assinar Plano Premium
            </a>
            
            {/* Botão de Logout */}
            <button
              onClick={handleSignOut}
              className="mt-4 text-gray-400 hover:text-gray-200 transition-colors text-sm flex items-center justify-center w-full space-x-2"
            >
              <svg 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
              <span>Sair da conta</span>
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
} 