/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { useState } from 'react'
import { Navigation } from '../components/Navigation'
import { YogaIcon } from '@/components/YogaIcon'
import { satoshi, euclidCircular } from '../fonts/fonts'
import { PlayIcon, LockClosedIcon } from '@heroicons/react/24/solid'

const SERIES = [
  {
    id: 1,
    titulo: "Fundamentos do Pilates",
    descricao: "Aprenda os princípios básicos e movimentos essenciais",
    duracao: "45 min",
    nivel: "Iniciante",
    thumbnail: "/thumbnails/pilates-1.jpg",
    aulas: [
      { titulo: "Respiração e Controle", duracao: "15 min" },
      { titulo: "Alinhamento Postural", duracao: "15 min" },
      { titulo: "Movimentos Básicos", duracao: "15 min" }
    ]
  },
  {
    id: 2,
    titulo: "Pilates Intermediário",
    descricao: "Evolua seus movimentos com exercícios mais desafiadores",
    duracao: "60 min",
    nivel: "Intermediário",
    thumbnail: "/thumbnails/pilates-2.jpg",
    aulas: [
      { titulo: "Fortalecimento Core", duracao: "20 min" },
      { titulo: "Flexibilidade", duracao: "20 min" },
      { titulo: "Equilíbrio", duracao: "20 min" }
    ]
  },
  // Adicione mais séries conforme necessário
]

export default function SeriesRestrito() {
  const [selectedSerie, setSelectedSerie] = useState<number | null>(null)

  return (
    <div className={`min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-900 ${satoshi.variable} ${euclidCircular.variable}`}>
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 px-4 py-3 border-b border-[#9d96fc]/10">
        <div className="flex justify-center lg:justify-start items-center gap-4">
          <YogaIcon className="h-10 w-10 text-[#9d96fc]" />
        </div>
      </header>

      <main className="pt-20 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 font-satoshi bg-gradient-to-r from-[#9d96fc] to-[#7b74fa] text-transparent bg-clip-text">
          Séries de Exercícios
        </h1>

        {/* Grid de Séries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERIES.map((serie) => (
            <div 
              key={serie.id}
              className="bg-white/70 backdrop-blur-lg rounded-2xl border border-[#9d96fc]/10 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayIcon className="w-12 h-12 text-[#9d96fc] opacity-80" />
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                <h2 className="text-lg font-bold mb-2 font-satoshi text-gray-900">
                  {serie.titulo}
                </h2>
                <p className="text-sm text-gray-600 mb-4 font-euclid">
                  {serie.descricao}
                </p>

                {/* Metadados */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-gray-500">
                    {serie.duracao}
                  </span>
                  <span className="text-sm px-2 py-1 rounded-full bg-[#9d96fc]/10 text-[#9d96fc]">
                    {serie.nivel}
                  </span>
                </div>

                {/* Lista de Aulas */}
                <div className="space-y-2">
                  {serie.aulas.map((aula, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <PlayIcon className="w-4 h-4 text-[#9d96fc]" />
                        <span className="text-sm font-medium">{aula.titulo}</span>
                      </div>
                      <span className="text-sm text-gray-500">{aula.duracao}</span>
                    </div>
                  ))}
                </div>

                {/* Botão */}
                <button
                  onClick={() => setSelectedSerie(serie.id)}
                  className="mt-6 w-full py-3 px-4 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-[#9d96fc] to-[#7b74fa] hover:opacity-90 transition-opacity"
                >
                  Começar Série
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Navigation />
    </div>
  )
} 