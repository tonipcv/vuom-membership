/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navigation } from '../components/Navigation'
import { YogaIcon } from '@/components/YogaIcon'
import { CheckIcon } from '@heroicons/react/24/solid'
import { satoshi, euclidCircular } from '../fonts/fonts'

interface Todo {
  id: string
  text: string
  completed: boolean
}

const DIAS = Array.from({ length: 31 }, (_, i) => i + 1)

const PLANOS_PILATES = {
  1: {
    titulo: "Fortalecimento Core",
    exercicios: [
      "The Hundred (100 repetições)",
      "Single Leg Circles (10 cada lado)",
      "Roll Up (8 repetições)",
      "Rolling Like a Ball (8 repetições)"
    ],
    alimentacao: {
      cafeDaManha: "Smoothie de banana com aveia e mel",
      lancheManha: "Mix de castanhas (30g)",
      almoco: "Salmão grelhado com legumes no vapor",
      lancheTarde: "Iogurte com granola",
      jantar: "Omelete de claras com espinafre"
    }
  },
  2: {
    titulo: "Mobilidade e Flexibilidade",
    exercicios: [
      "Spine Stretch Forward (8 repetições)",
      "Saw (6 cada lado)",
      "Swan Dive (6 repetições)",
      "Shoulder Bridge (10 repetições)"
    ],
    alimentacao: {
      cafeDaManha: "Overnight oats com frutas vermelhas",
      lancheManha: "Maçã com pasta de amendoim",
      almoco: "Peito de frango com quinoa e brócolis",
      lancheTarde: "Shake proteico com banana",
      jantar: "Sopa de legumes com atum"
    }
  },
  // Adicione mais planos para outros dias...
}

export default function GraficoRestrito() {
  const [selectedDay, setSelectedDay] = useState<number>(1)
  const [completedDays, setCompletedDays] = useState<number[]>([])

  const toggleDayCompletion = (day: number) => {
    setCompletedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
    setSelectedDay(day)
  }

  const isCompleted = (day: number) => completedDays.includes(day)

  return (
    <div className={`min-h-screen bg-white text-gray-900 ${satoshi.variable} ${euclidCircular.variable}`}>
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 px-4 py-3 border-b border-[#9d96fc]/10">
        <div className="flex justify-center lg:justify-start items-center gap-4">
          <Link href="/" className="flex items-center">
            <YogaIcon className="h-10 w-10 text-[#9d96fc]" />
          </Link>
        </div>
      </header>

      <main className="pt-20 pb-20">
        {/* Dias rolável */}
        <div className="mb-6 border-b border-[#9d96fc]/10">
          <div className="flex overflow-x-auto px-4 pb-4 hide-scrollbar">
            <div className="flex gap-3">
              {DIAS.map(dia => (
                <button
                  key={dia}
                  onClick={() => toggleDayCompletion(dia)}
                  className={`
                    w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center text-sm font-medium
                    ${isCompleted(dia)
                      ? 'bg-gradient-to-br from-[#9d96fc] to-[#7b74fa] text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                  `}
                >
                  {dia}
                  {isCompleted(dia) && (
                    <CheckIcon className="absolute h-3 w-3 top-1 right-1 text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Plano do Dia */}
        {selectedDay && (
          <div className="px-4">
            <h2 className="text-xl font-bold mb-2 text-gray-800 font-satoshi">
              Dia {selectedDay}
            </h2>
            
            {/* Seção de Exercícios */}
            <div className="mb-8">
              <h3 className="text-[#9d96fc] font-medium mb-4 font-satoshi">
                {PLANOS_PILATES[selectedDay as keyof typeof PLANOS_PILATES]?.titulo || "Treino do Dia"}
              </h3>
              <div className="space-y-2">
                {PLANOS_PILATES[selectedDay as keyof typeof PLANOS_PILATES]?.exercicios.map((exercicio, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-[#9d96fc]/10"
                  >
                    <div className={`
                      h-5 w-5 rounded-full flex items-center justify-center
                      ${isCompleted(selectedDay) ? 'bg-gradient-to-br from-[#9d96fc] to-[#7b74fa]' : 'border-2 border-[#9d96fc]/30'}
                    `}>
                      {isCompleted(selectedDay) && (
                        <CheckIcon className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="flex-1 text-sm font-euclid">
                      {exercicio}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seção de Alimentação */}
            <div>
              <h3 className="text-[#9d96fc] font-medium mb-4">
                Plano Alimentar
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-[#9d96fc]/10">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Café da Manhã</h4>
                  <p className="text-sm text-gray-700">
                    {PLANOS_PILATES[selectedDay as keyof typeof PLANOS_PILATES]?.alimentacao.cafeDaManha}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl border border-[#9d96fc]/10">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Lanche da Manhã</h4>
                  <p className="text-sm text-gray-700">
                    {PLANOS_PILATES[selectedDay as keyof typeof PLANOS_PILATES]?.alimentacao.lancheManha}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-[#9d96fc]/10">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Almoço</h4>
                  <p className="text-sm text-gray-700">
                    {PLANOS_PILATES[selectedDay as keyof typeof PLANOS_PILATES]?.alimentacao.almoco}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-[#9d96fc]/10">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Lanche da Tarde</h4>
                  <p className="text-sm text-gray-700">
                    {PLANOS_PILATES[selectedDay as keyof typeof PLANOS_PILATES]?.alimentacao.lancheTarde}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-[#9d96fc]/10">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Jantar</h4>
                  <p className="text-sm text-gray-700">
                    {PLANOS_PILATES[selectedDay as keyof typeof PLANOS_PILATES]?.alimentacao.jantar}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Navigation />

      <style jsx global>{`
        .font-satoshi {
          font-family: var(--font-satoshi);
          letter-spacing: -0.03em;
        }
        .font-euclid {
          font-family: var(--font-euclid);
          letter-spacing: -0.04em;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
} 