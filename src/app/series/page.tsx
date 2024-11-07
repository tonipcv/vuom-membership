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
  const [activeEpisode, setActiveEpisode] = useState<number | null>(null)

  const episodes: Episode[] = [
    {
      id: 1,
      title: "Como pegar as entradas dos sinais da forma correta",
      duration: "2:30",
      thumbnail: "/teaser-thumb.jpg",
      number: 1,
      videoId: "35186692-adde-4280-819f-e35af9ece710"
    },
    {
      id: 2,
      title: "Como ativar as notificações do Grupo de Sinais",
      duration: "2:30",
      thumbnail: "/teaser-thumb2.jpg",
      number: 2,
      videoId: "357a2661-4c22-4244-b57e-a9be0244af50"
    }
    // Add more episodes here
  ]

  const currentEpisode = episodes.find(ep => ep.id === activeEpisode)

  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#111]/90 backdrop-blur-sm z-50 px-4 py-3">
        <div className="flex justify-center lg:justify-start">
          <Link href="/" className="flex items-center">
            <OptimizedImage src="/ft-icone.png" alt="Futuros Tech Logo" width={40} height={40} />
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
              <h2 className="text-lg font-bold mb-3">Materiais Complementares</h2>
              <div className="space-y-1">
                <a 
                  href="https://drive.google.com/file/d/16oKFw6kYwHmletBjo2eZlBQ4y6bPQkg8/view?usp=drivesdk" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-sm flex items-center gap-2"
                >
                  <BookOpenIcon className="w-4 h-4" />
                  Black Book
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  )
} 