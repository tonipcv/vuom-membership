/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { DocumentArrowDownIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { OptimizedImage } from '../components/OptimizedImage'
import { Navigation } from '../components/Navigation'
import { PandaPlayer } from '../components/PandaPlayer'
import { YogaIcon } from '@/components/YogaIcon'

interface Episode {
  id: number
  title: string
  duration: string
  thumbnail: string
  number: number
  videoId: string
}

export default function ChatRestrito() {
  const [activeEpisode, setActiveEpisode] = useState<number | null>(1)

  const episodes: Episode[] = [
    {
      id: 1,
      title: "Criando Conta",
      duration: "5:00",
      thumbnail: "/teaser-thumb.jpg",
      number: 1,
      videoId: "5395e307-c953-4f5f-b488-05c7663e936e"
    },
    {
      id: 2,
      title: "Como abrir operações",
      duration: "8:00",
      thumbnail: "/teaser-thumb.jpg",
      number: 2,
      videoId: "77a18ba6-0b61-4404-84e1-439ac21939b6"
    },
    {
      id: 3,
      title: "Ordens Automáticas",
      duration: "7:00",
      thumbnail: "/teaser-thumb.jpg",
      number: 3,
      videoId: "2346652c-0339-4e70-9b79-d38cce3a3e66"
    },
    {
      id: 4,
      title: "Indicador RSI",
      duration: "6:30",
      thumbnail: "/teaser-thumb.jpg",
      number: 4,
      videoId: "d529afa3-5e48-4f0e-8d7b-4bd1340d8c11"
    },
    {
      id: 5,
      title: "Análise gráfica",
      duration: "7:30",
      thumbnail: "/teaser-thumb.jpg",
      number: 5,
      videoId: "32763169-e418-4aee-a0df-b07db05f1843"
    },
    {
      id: 6,
      title: "Bônus: Informação Exclusiva!",
      duration: "6:00",
      thumbnail: "/teaser-thumb.jpg",
      number: 6,
      videoId: "c689c709-5643-4fb6-be32-6f080a5f5066"
    }
  ]

  const currentEpisode = episodes.find(ep => ep.id === activeEpisode)

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 px-4 py-3 border-b border-gray-200">
        <div className="flex justify-center lg:justify-start items-center gap-4">
          <Link href="/" className="flex items-center">
            <YogaIcon className="h-10 w-10 text-pink-500" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Meal Planner</h1>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-bold mb-4">Acesso Restrito</h2>
            <p className="text-gray-600 mb-6">
              Esta funcionalidade está disponível apenas para usuários premium.
            </p>
            <a 
              href="https://checkout.k17.com.br/subscribe/anual-ft-promocional"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition-colors"
            >
              Fazer Upgrade
            </a>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  )
} 