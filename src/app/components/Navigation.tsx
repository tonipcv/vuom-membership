'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {
  ChartBarIcon,
  PlayIcon,
  ArrowRightOnRectangleIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import supabaseClient from '@/src/lib/superbaseClient';

export function Navigation() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = supabaseClient;

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav className="fixed bottom-0 w-full bg-[#111]/90 backdrop-blur-sm border-t border-gray-800">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            <Link
              href="/grafico"
              className={`flex flex-col items-center ${
                pathname === '/grafico' ? 'text-green-300' : 'text-gray-400'
              } transition-colors hover:text-green-300`}
            >
              <ChartBarIcon className="w-6 h-6" />
              <span className="text-xs mt-1">Gráfico</span>
            </Link>

            <Link
              href="/chat"
              className={`flex flex-col items-center ${
                pathname === '/chat' ? 'text-green-300' : 'text-gray-400'
              } transition-colors hover:text-green-300`}
            >
              <BanknotesIcon className="w-6 h-6" />
              <span className="text-xs mt-1">Entradas</span>
            </Link>

            <Link
              href="/series"
              className={`flex flex-col items-center ${
                pathname === '/series' ? 'text-green-300' : 'text-gray-400'
              } transition-colors hover:text-green-300`}
            >
              <PlayIcon className="w-6 h-6" />
              <span className="text-xs mt-1">Tutorial</span>
            </Link>

            <button
              onClick={handleLogoutClick}
              className="flex flex-col items-center text-gray-400 transition-colors hover:text-green-300"
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
              <span className="text-xs mt-1">Sair</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Modal de Confirmação de Logout */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-xl font-semibold text-white mb-4">
              Confirmar Saída
            </h3>
            <p className="text-gray-300 mb-6">
              Você tem certeza que deseja sair do aplicativo?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium bg-green-200 text-gray-900 rounded hover:bg-green-600 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 