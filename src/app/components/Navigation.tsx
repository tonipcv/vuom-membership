'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import {
  ChartBarIcon,
  PlayIcon,
  ArrowRightOnRectangleIcon,
  BanknotesIcon,
  DocumentChartBarIcon,
} from '@heroicons/react/24/outline';

export function Navigation() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    checkPremiumStatus();
  }, [session]);

  const checkPremiumStatus = async () => {
    try {
      if (session?.user) {
        // Fazer chamada à API para verificar status premium
        const response = await fetch('/api/user/premium-status');
        const data = await response.json();
        setIsPremium(data.isPremium || false);
      }
    } catch (error) {
      console.error('Erro ao verificar status premium:', error);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
    setShowLogoutModal(false);
  };

  const navigationItems = [
    {
      href: isPremium ? '/grafico' : '/grafico-restrito',
      icon: ChartBarIcon,
      label: 'Gráfico'
    },
    {
      href: isPremium ? '/chat' : '/chat-restrito',
      icon: BanknotesIcon,
      label: 'Entradas'
    },
    {
      href: '/relatorio',
      icon: DocumentChartBarIcon,
      label: 'Relatório'
    },
    {
      href: isPremium ? '/series' : '/series-restrito',
      icon: PlayIcon,
      label: 'Tutorial'
    }
  ];

  return (
    <>
      <nav className="fixed bottom-0 w-full bg-[#111]/90 backdrop-blur-sm border-t border-gray-800">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center ${
                  pathname === item.href ? 'text-green-300' : 'text-gray-400'
                } transition-colors hover:text-green-300`}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            ))}

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