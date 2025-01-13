'use client';

import React from 'react';
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
  const targetData: TargetAnalysis[] = [
    { alvo: "Alvo 2 (20%)", operacoes: 45, vitoria: 81, lucro: 900 },
    { alvo: "Alvo 3 (40%)", operacoes: 36, vitoria: 65, lucro: 1080 },
    { alvo: "Alvo 4 (60%)", operacoes: 22, vitoria: 40, lucro: 880 },
    { alvo: "Alvo 5 (80%)", operacoes: 16, vitoria: 29, lucro: 800 },
    { alvo: "Alvo 6 (100%)", operacoes: 10, vitoria: 18, lucro: 600 },
    { alvo: "Alvo 7 (120%)", operacoes: 4, vitoria: 7, lucro: 280 },
    { alvo: "Alvo 8 (140%)", operacoes: 4, vitoria: 7, lucro: 320 },
    { alvo: "Alvo 9 (160%)", operacoes: 1, vitoria: 1, lucro: 90 },
    { alvo: "Alvo 10 (180%)", operacoes: 1, vitoria: 1, lucro: 100 },
    { alvo: "Alvo 11 (200%)", operacoes: 1, vitoria: 1, lucro: 110 },
  ];

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
                    {targetData.map((target, index) => (
                      <tr key={index} className="hover:bg-gray-800/50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-0">
                          {target.alvo}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          {target.operacoes}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-green-400">
                          {target.vitoria}%
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-emerald-400">
                          +{target.lucro}%
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