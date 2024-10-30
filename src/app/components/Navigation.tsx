'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AcademicCapIcon, BanknotesIcon, ChartBarIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

export function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogout = () => {
    // Adicionar lógica de logout aqui
    console.log('Logout clicked')
  }

  return (
    <nav className="fixed bottom-0 w-full bg-[#111]/90 backdrop-blur-sm border-t border-gray-800">
      <div className="flex justify-around items-center h-16">
        <Link href="/series" className={`flex flex-col items-center ${isActive('/series') ? 'text-green-300' : 'text-gray-400'} transition-colors hover:text-green-300`}>
          <AcademicCapIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Tutorial</span>
        </Link>

        <Link href="/chat" className={`flex flex-col items-center ${isActive('/chat') ? 'text-green-300' : 'text-gray-400'} transition-colors hover:text-green-300`}>
          <BanknotesIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Entradas</span>
        </Link>

        <Link href="/grafico" className={`flex flex-col items-center ${isActive('/grafico') ? 'text-green-300' : 'text-gray-400'} transition-colors hover:text-green-300`}>
          <ChartBarIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Gráfico</span>
        </Link>

        <button 
          onClick={handleLogout}
          className="flex flex-col items-center text-gray-400 transition-colors hover:text-green-300"
        >
          <ArrowRightOnRectangleIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Sair</span>
        </button>
      </div>
    </nav>
  )
} 