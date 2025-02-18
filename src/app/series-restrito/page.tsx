/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { DocumentArrowDownIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { OptimizedImage } from '../components/OptimizedImage'
import { Navigation } from '../components/Navigation'
import { PandaPlayer } from '../components/PandaPlayer'

interface Episode {
  id: number
  title: string
  duration: string
  thumbnail: string
  number: number
  videoId: string
}

export default function SeriesPage() {
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
    <div className="min-h-screen bg-[#111] text-gray-200">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#111]/90 backdrop-blur-sm z-50 px-4 py-3">
        <div className="flex justify-center lg:justify-start items-center gap-4">
          <Link href="/" className="flex items-center">
            <OptimizedImage src="/ft-icone.png" alt="Futuros Tech Logo" width={40} height={40} />
          </Link>
          <Link 
            href="/informacao"
            className="text-xs px-3 py-1 bg-green-500 text-black font-medium rounded-full hover:bg-green-400 transition-colors"
          >
            Seja premium!
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-14 pb-20">
        {/* Hero Section */}
        {!activeEpisode && (
          <div className="relative bg-[#111] h-48 md:h-32 lg:h-32 flex items-center">
            <div className="w-full md:w-1/2 lg:w-1/2 md:mx-auto lg:mx-auto">
              <div className="px-6 py-8 md:py-4 lg:py-4">
                <h1 className="text-2xl font-bold mb-3 md:mb-1 lg:mb-1">Curso Futuros Tech</h1>
                <p className="text-sm text-gray-300">Passo a passo para ter um aproveitamento máximo com as entradas da tecnologia</p>
              </div>
            </div>
          </div>
        )}

        {/* Video Player Section */}
        {activeEpisode && currentEpisode && (
          <div>
            <div className="w-full md:w-1/2 lg:w-1/2 md:mx-auto lg:mx-auto bg-black">
              <PandaPlayer videoId={currentEpisode.videoId} />
            </div>
            <div className="px-6 py-4 bg-[#111] md:w-1/2 lg:w-1/2 md:mx-auto lg:mx-auto">
              <h2 className="text-xl font-bold">{currentEpisode.title}</h2>
            </div>
          </div>
        )}

        {/* Episodes List and Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:w-1/2 lg:w-1/2 md:mx-auto lg:mx-auto gap-0">
          {/* Episodes List */}
          <div className="md:h-[calc(100vh-11rem)] lg:h-[calc(100vh-11rem)] md:overflow-y-auto lg:overflow-y-auto px-4 pb-2 md:p-4 lg:p-4">
            <h2 className="text-lg font-bold mb-2 lg:mb-3">Episódios</h2>
            <div className="space-y-1 lg:space-y-2">
              {episodes.map((episode) => (
                <button
                  key={episode.id}
                  onClick={() => setActiveEpisode(episode.id)}
                  className={`w-full flex gap-2 lg:gap-3 p-2 rounded-lg transition-colors ${
                    activeEpisode === episode.id ? 'bg-gray-400/30 border-l-4 border-green-300' : 'hover:bg-gray-800'
                  }`}
                >
                  <div className="relative w-24 aspect-video">
                    <OptimizedImage
                      src={episode.thumbnail}
                      alt={episode.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-green-300 text-sm">Aula {episode.number}</h3>
                    <p className="text-xs text-gray-200">{episode.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{episode.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content and Materials */}
          <div className="space-y-3 md:space-y-4 lg:space-y-4 px-4 md:p-4 lg:p-4">
            <section className="bg-gray-900/50 backdrop-blur-sm p-3 lg:p-4 rounded-lg">
              <h2 className="text-lg font-bold mb-3">Assista o curso:</h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                A tecnologia é a melhor ferramenta hoje para operar, mas sem saber como usar você não terá o aproveitamento máximo.
              </p>
              <div className="mt-3 p-3 bg-green-900/20 border border-green-700/50 rounded-lg">
                <p className="text-xs text-green-200">
                  Este conteúdo tem caráter informativo e educacional.
                </p>
              </div>
            </section>

            <section className="bg-gray-900/50 p-4 rounded-lg">
              <h2 className="text-lg font-bold mb-3">Acesso Premium</h2>
              <p className="text-sm text-gray-300 mb-4">
                Desbloqueie acesso completo aos entradas, treinamento completo e materiais exclusivos.
              </p>
              <a 
                href="https://checkout.k17.com.br/subscribe/anual-ft-promocional"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center px-4 py-2.5 border border-green-500 text-green-400 text-sm font-medium rounded-lg hover:bg-green-500 hover:text-black transition-all duration-200"
              >
                Fazer Upgrade
              </a>
            </section>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  )
} 