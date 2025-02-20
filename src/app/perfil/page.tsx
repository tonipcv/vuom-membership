'use client'

import { useState } from 'react'
import { signOut } from "next-auth/react"
import { Navigation } from '../components/Navigation'
import { YogaIcon } from '@/components/YogaIcon'
import { satoshi, euclidCircular } from '../fonts/fonts'
import {
  UserCircleIcon,
  BellIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

interface MenuItem {
  icon: any
  label: string
  value?: string
  action?: () => void
  highlight?: boolean
}

export default function Perfil() {
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const menuItems: MenuItem[] = [
    {
      icon: UserCircleIcon,
      label: 'Nome',
      value: 'João Silva'
    },
    {
      icon: BellIcon,
      label: 'Notificações',
      action: () => console.log('Notificações')
    },
    {
      icon: CreditCardIcon,
      label: 'Assinatura',
      value: 'Premium',
      highlight: true
    },
    {
      icon: ShieldCheckIcon,
      label: 'Privacidade',
      action: () => console.log('Privacidade')
    },
    {
      icon: ArrowRightOnRectangleIcon,
      label: 'Sair da Conta',
      action: () => setShowLogoutModal(true),
      highlight: true
    }
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-900 ${satoshi.variable} ${euclidCircular.variable}`}>
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 px-4 py-3 border-b border-[#9d96fc]/10">
        <div className="flex justify-center lg:justify-start items-center gap-4">
          <YogaIcon className="h-10 w-10 text-[#9d96fc]" />
        </div>
      </header>

      <main className="pt-20 pb-20 px-4 max-w-xl mx-auto">
        {/* Perfil Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#9d96fc] to-[#7b74fa] mx-auto mb-4 flex items-center justify-center">
            <UserCircleIcon className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-satoshi bg-gradient-to-r from-[#9d96fc] to-[#7b74fa] text-transparent bg-clip-text">
            Meu Perfil
          </h1>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={item.action}
              className={`
                bg-white/70 backdrop-blur-lg rounded-xl border border-[#9d96fc]/10
                p-4 flex items-center justify-between
                ${item.action ? 'cursor-pointer hover:bg-white/90' : ''}
                transition-all duration-300
              `}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${item.highlight ? 'text-[#9d96fc]' : 'text-gray-400'}`} />
                <span className="font-medium font-satoshi">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.value && (
                  <span className={`text-sm ${item.highlight ? 'text-[#9d96fc]' : 'text-gray-500'}`}>
                    {item.value}
                  </span>
                )}
                {item.action && <ChevronRightIcon className="w-4 h-4 text-gray-400" />}
              </div>
            </div>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-[#9d96fc]/10">
            <span className="text-sm text-gray-500 font-satoshi">Dias Ativos</span>
            <p className="text-2xl font-bold font-satoshi bg-gradient-to-r from-[#9d96fc] to-[#7b74fa] text-transparent bg-clip-text">
              15
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-[#9d96fc]/10">
            <span className="text-sm text-gray-500 font-satoshi">Séries Completas</span>
            <p className="text-2xl font-bold font-satoshi bg-gradient-to-r from-[#9d96fc] to-[#7b74fa] text-transparent bg-clip-text">
              8
            </p>
          </div>
        </div>
      </main>

      {/* Modal de Logout */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl border border-[#9d96fc]/10 shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold mb-4 font-satoshi text-gray-900">
              Confirmar Saída
            </h3>
            <p className="text-gray-600 mb-6 font-euclid">
              Você tem certeza que deseja sair do aplicativo?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-[#9d96fc] to-[#7b74fa] hover:opacity-90 transition-opacity"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      <Navigation />
    </div>
  )
} 