'use client';

import Image from 'next/image';
import BottomNavigation from '../../components/BottomNavigation';
import { useState } from 'react';

export default function RestrictedCourses() {
  const [showModal] = useState(true);

  return (
    <div className="container mx-auto px-4 py-10 mb-16 mt-20 relative">
      {/* Conteúdo base (versão borrada) */}
      <div className={`${showModal ? 'blur-sm' : ''}`}>
        <div className="flex justify-center mb-4">
          <Image
            src="/ft-icone.png"
            alt="Logo da Empresa"
            width={100}
            height={50}
          />
        </div>

        <div className="text-center font-helvetica mb-14 text-2xl">
          Treinamento
        </div>

        <div className="max-w-3xl mx-auto">
          <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <div 
              className="absolute top-0 left-0 w-full h-full bg-gray-800"
              style={{ filter: 'blur(4px)' }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">Conteúdo Premium</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <button className="bg-gray-800 text-gray-300 py-2 px-4 rounded mx-1" disabled>
            Aula Anterior
          </button>
          <button className="bg-gray-800 text-gray-300 py-2 px-4 rounded mx-1" disabled>
            Próxima Aula
          </button>
        </div>
      </div>

      {/* Modal de Restrição - Sem botão de fechar */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4">
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
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
} 