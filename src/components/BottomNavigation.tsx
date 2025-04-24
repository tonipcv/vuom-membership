'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageCircle, BarChart2, User } from 'lucide-react';

export function BottomNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#111]/90 backdrop-blur-sm border-t border-gray-800 z-50">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex justify-around items-center">
          <Link
            href="/"
            className={`flex flex-col items-center p-2 ${
              isActive('/') ? 'text-rose-500' : 'text-gray-400'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link
            href="/planos"
            className={`flex flex-col items-center p-2 ${
              isActive('/planos') ? 'text-rose-500' : 'text-gray-400'
            }`}
          >
            <MessageCircle size={24} />
            <span className="text-xs mt-1">Chat</span>
          </Link>

          <Link
            href="/grafico"
            className={`flex flex-col items-center p-2 ${
              isActive('/grafico') ? 'text-rose-500' : 'text-gray-400'
            }`}
          >
            <BarChart2 size={24} />
            <span className="text-xs mt-1">Gráfico</span>
          </Link>

          <Link
            href="/perfil"
            className={`flex flex-col items-center p-2 ${
              isActive('/perfil') ? 'text-rose-500' : 'text-gray-400'
            }`}
          >
            <User size={24} />
            <span className="text-xs mt-1">Perfil</span>
          </Link>
        </div>
      </div>
    </nav>
  );
} 