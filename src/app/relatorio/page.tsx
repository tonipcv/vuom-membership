/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { useState } from 'react'
import { Navigation } from '../components/Navigation'
import { YogaIcon } from '@/components/YogaIcon'
import { satoshi, euclidCircular } from '../fonts/fonts'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// Dados simulados
const dadosEvolucao = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Peso (kg)',
      data: [75, 74, 72.5, 71, 70.2, 69.5],
      borderColor: '#9d96fc',
      backgroundColor: 'transparent',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#9d96fc',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#9d96fc',
      pointRadius: 4,
    },
    {
      label: 'Massa Magra (kg)',
      data: [55, 55.5, 56, 56.8, 57.2, 57.5],
      borderColor: '#7b74fa',
      backgroundColor: 'transparent',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#7b74fa',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#7b74fa',
      pointRadius: 4,
    }
  ]
}

const medidasCorporais = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Cintura (cm)',
      data: [85, 84, 82, 81, 80, 79],
      borderColor: '#9d96fc',
      backgroundColor: '#9d96fc20',
      tension: 0.4,
    },
    {
      label: 'Quadril (cm)',
      data: [100, 99, 98, 97, 96, 95],
      borderColor: '#7b74fa',
      backgroundColor: '#7b74fa20',
      tension: 0.4,
    }
  ]
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        font: {
          family: 'var(--font-satoshi)',
          weight: '500'
        },
        usePointStyle: true,
        padding: 20
      }
    },
  },
  scales: {
    y: {
      grid: {
        color: 'rgba(157, 150, 252, 0.1)',
        drawBorder: false,
      },
      ticks: {
        font: {
          family: 'var(--font-satoshi)',
        },
        padding: 10
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          family: 'var(--font-satoshi)',
        },
        padding: 10
      }
    }
  }
}

export default function Relatorio() {
  const [selectedMetric, setSelectedMetric] = useState<'composicao' | 'medidas'>('composicao')

  return (
    <div className={`min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-900 ${satoshi.variable} ${euclidCircular.variable}`}>
      {/* Header com gradiente */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 px-4 py-3 border-b border-[#9d96fc]/10">
        <div className="flex justify-center lg:justify-start items-center gap-4">
          <YogaIcon className="h-10 w-10 text-[#9d96fc]" />
        </div>
      </header>

      <main className="pt-20 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 font-satoshi bg-gradient-to-r from-[#9d96fc] to-[#7b74fa] text-transparent bg-clip-text">
          Evolução
        </h1>

        {/* Seletor de Métricas com glassmorphism */}
        <div className="flex gap-2 mb-6 p-1 bg-white/50 backdrop-blur-sm rounded-full border border-[#9d96fc]/10 w-fit">
          <button
            onClick={() => setSelectedMetric('composicao')}
            className={`px-6 py-2.5 rounded-full font-satoshi text-sm transition-all duration-300
              ${selectedMetric === 'composicao'
                ? 'bg-gradient-to-r from-[#9d96fc] to-[#7b74fa] text-white shadow-lg'
                : 'text-gray-600 hover:bg-white/50'}`}
          >
            Composição Corporal
          </button>
          <button
            onClick={() => setSelectedMetric('medidas')}
            className={`px-6 py-2.5 rounded-full font-satoshi text-sm transition-all duration-300
              ${selectedMetric === 'medidas'
                ? 'bg-gradient-to-r from-[#9d96fc] to-[#7b74fa] text-white shadow-lg'
                : 'text-gray-600 hover:bg-white/50'}`}
          >
            Medidas
          </button>
        </div>

        {/* Gráficos com glassmorphism */}
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl border border-[#9d96fc]/10 shadow-lg">
          {selectedMetric === 'composicao' ? (
            <>
              <h2 className="text-lg font-medium mb-6 font-satoshi bg-gradient-to-r from-[#9d96fc] to-[#7b74fa] text-transparent bg-clip-text">
                Composição Corporal
              </h2>
              <Line data={dadosEvolucao} options={options} />
            </>
          ) : (
            <>
              <h2 className="text-lg font-medium mb-6 font-satoshi bg-gradient-to-r from-[#9d96fc] to-[#7b74fa] text-transparent bg-clip-text">
                Medidas Corporais
              </h2>
              <Line data={medidasCorporais} options={options} />
            </>
          )}
        </div>

        {/* Cards de Resumo com glassmorphism */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {[
            { label: 'Perda de Peso Total', value: '5.5 kg' },
            { label: 'Ganho de Massa Magra', value: '2.5 kg' },
            { label: 'Redução de Cintura', value: '6 cm' },
            { label: 'Redução de Quadril', value: '5 cm' }
          ].map((item, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl border border-[#9d96fc]/10 hover:shadow-lg transition-all duration-300">
              <h3 className="text-sm font-medium mb-2 font-satoshi text-gray-600">
                {item.label}
              </h3>
              <p className="text-2xl font-bold font-satoshi bg-gradient-to-r from-[#9d96fc] to-[#7b74fa] text-transparent bg-clip-text">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Navigation />
    </div>
  )
} 