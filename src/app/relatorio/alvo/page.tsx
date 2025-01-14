'use client';

import React, { useState } from 'react';
import { BarChart3, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '../../components/Navigation';

interface TargetAnalysis {
  alvo: string;
  operacoes: number;
  vitoria: number;
  lucro: number;
}

export default function TargetAnalysis() {
  const [capital, setCapital] = useState<string>('');
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const alvosData = {
    8: [ // Agosto
      { alvo: "Alvo 2 (20%)", operacoes: 45, vitoria: 81, lucro: -10 },
      { alvo: "Alvo 3 (40%)", operacoes: 36, vitoria: 65, lucro: 8 },
      { alvo: "Alvo 4 (60%)", operacoes: 22, vitoria: 40, lucro: -12 },
      { alvo: "Alvo 5 (80%)", operacoes: 16, vitoria: 29, lucro: -20 },
      { alvo: "Alvo 6 (100%)", operacoes: 10, vitoria: 18, lucro: -40 },
      { alvo: "Alvo 7 (120%)", operacoes: 4, vitoria: 7, lucro: -72 },
      { alvo: "Alvo 8 (140%)", operacoes: 4, vitoria: 7, lucro: -68 },
      { alvo: "Alvo 9 (160%)", operacoes: 1, vitoria: 1, lucro: -91 },
      { alvo: "Alvo 10 (180%)", operacoes: 1, vitoria: 1, lucro: -90 },
      { alvo: "Alvo 11 (200%)", operacoes: 1, vitoria: 1, lucro: -89 }
    ],
    // ... rest of the months data ...
  };

  const calculateResult = () => {
    if (!capital || !selectedTarget) return;
    
    const targetData = alvosData[8].find(t => t.alvo === selectedTarget);
    if (!targetData) return;

    const initialCapital = parseFloat(capital);
    const profit = targetData.lucro / 100;
    const finalValue = initialCapital * (1 + profit);
    setResult(finalValue);
  };

  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      <header className="fixed top-0 w-full bg-[#111]/90 backdrop-blur-sm z-50 px-4 py-3">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="flex items-center">
            <Image src="/ft-icone.png" alt="Futuros Tech Logo" width={40} height={40} />
          </Link>
          <Link 
            href="/relatorio" 
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Relatório
          </Link>
        </div>
      </header>

      <main className="pt-20 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-white/5 p-2 ring-1 ring-white/10">
                  <BarChart3 className="h-5 w-5 text-green-300" />
                </div>
                <div>
                  <h1 className="text-base font-semibold leading-6 text-white">
                    Análise por Alvo - Agosto
                  </h1>
                  <p className="mt-2 text-sm text-gray-400">
                    Detalhamento do desempenho por alvo de operação
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
            <h2 className="text-lg font-semibold text-white mb-4">Calculadora de Resultado</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="capital" className="block text-sm font-medium text-gray-300 mb-2">
                  Capital Inicial (R$)
                </label>
                <input
                  type="number"
                  id="capital"
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-300"
                  placeholder="Digite seu capital"
                />
              </div>
              <div>
                <label htmlFor="target" className="block text-sm font-medium text-gray-300 mb-2">
                  Selecione o Alvo
                </label>
                <select
                  id="target"
                  value={selectedTarget}
                  onChange={(e) => setSelectedTarget(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  <option value="">Selecione um alvo</option>
                  {alvosData[8].map((target) => (
                    <option key={target.alvo} value={target.alvo}>
                      {target.alvo} ({target.lucro}%)
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={calculateResult}
                  className="w-full px-4 py-2 bg-green-300 text-black font-semibold rounded-md hover:bg-green-400 transition-colors"
                >
                  Calcular
                </button>
              </div>
            </div>
            {result !== null && (
              <div className="mt-4 p-4 bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-300">Resultado:</p>
                <p className="text-lg font-semibold text-white">
                  R$ {result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-0">
                        Alvo
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                        Qt. Operações
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                        % de Vitória
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                        % de Lucro
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {alvosData[8].map((target, index) => (
                      <tr key={index} className="hover:bg-gray-800/50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-0">
                          {target.alvo}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          {target.operacoes}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          {target.vitoria}%
                        </td>
                        <td className={`whitespace-nowrap px-3 py-4 text-sm ${target.lucro >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {target.lucro >= 0 ? `+${target.lucro}` : target.lucro}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
} 