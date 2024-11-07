'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  PieChart,
  Search,
  Calendar,
  TrendingUp,
  Filter,
  LineChart
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';

// Interface para o tipo Trade
interface Trade {
  data: string; // Modificado para string para facilitar o parse
  ativo: string;
  direcao: string;
  percentual: number;
  alvo: string;
}

// Função para formatar a data de maneira consistente
const formatDate = (dateString: string) => {
  const d = new Date(dateString);
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const year = d.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

export default function Home() {
  const [initialTrades, setInitialTrades] = useState<Trade[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDirection, setSelectedDirection] = useState<'ALL' | 'LONG' | 'SHORT'>('ALL');
  const [selectedMonth, setSelectedMonth] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getTrades() {
      try {
        console.log('Tentando conectar à API...');
        const response = await fetch('https://service-relatorio-server-api.dpbdp1.easypanel.host/api/trades');
        
        if (!response.ok) {
          throw new Error('Falha ao buscar dados da API');
        }
        
        const trades = await response.json();
        console.log(`Encontrados ${trades.length} trades`);
        
        const validTrades = trades.filter((trade: Trade) => {
          return trade.data !== null &&
                 trade.ativo !== null &&
                 trade.direcao !== null &&
                 trade.percentual !== null &&
                 trade.alvo !== null;
        });

        setInitialTrades(validTrades);
        setLoading(false);
      } catch (error) {
        console.error('Erro detalhado:', error);
        setLoading(false);
      }
    }

    getTrades();
  }, []);

  const months = [
    { number: 8, name: 'Agosto' },
    { number: 9, name: 'Setembro' },
    { number: 10, name: 'Outubro' },
  ];

  const filteredData = initialTrades.filter(trade => {
    const matchesSearch = trade.ativo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDirection = selectedDirection === 'ALL' || trade.direcao === selectedDirection;
    const tradeDate = new Date(trade.data);
    const matchesMonth = tradeDate.getUTCMonth() + 1 === selectedMonth;
    return matchesSearch && matchesDirection && matchesMonth;
  });

  const totalOperacoes = filteredData.length;
  const operacoesLucrativas = filteredData.filter(t => t.percentual > 0).length;
  const taxaAcerto = totalOperacoes > 0 ? ((operacoesLucrativas / totalOperacoes) * 100) : 0;
  const valorizacaoTotal = Number(filteredData.reduce((acc, curr) => acc + Number(curr.percentual), 0));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center">
        <p className="text-white">Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      <header className="fixed top-0 w-full bg-[#111]/90 backdrop-blur-sm z-50 px-4 py-3">
        <div className="flex justify-center lg:justify-start">
          <Link href="/" className="flex items-center">
            <Image src="/ft-icone.png" alt="Futuros Tech Logo" width={40} height={40} />
          </Link>
        </div>
      </header>

      <main className="pt-14 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pb-24">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white/5 p-2 ring-1 ring-white/10">
                    <LineChart className="h-5 w-5 text-green-300" />
                  </div>
                  <div>
                    <h1 className="text-base font-semibold leading-6 text-white">
                      Relatório de Trades
                    </h1>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Análise detalhada de {initialTrades.length} operações
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:flex-none">
              <div className="flex space-x-4">
                <select
                  className="rounded-md bg-gray-800 text-gray-200 px-4 py-2 text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={selectedDirection}
                  onChange={(e) => setSelectedDirection(e.target.value as 'ALL' | 'LONG' | 'SHORT')}
                >
                  <option value="ALL">Todas Direções</option>
                  <option value="LONG">LONG</option>
                  <option value="SHORT">SHORT</option>
                </select>
                <input
                  type="text"
                  placeholder="Buscar ativo..."
                  className="rounded-md bg-gray-800 text-gray-200 px-4 py-2 text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Abas dos meses */}
          <div className="mt-8 border-b border-gray-700">
            <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Months">
              {months.map((month) => (
                <button
                  key={month.number}
                  onClick={() => setSelectedMonth(month.number)}
                  className={`
                    whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
                    ${selectedMonth === month.number
                      ? 'border-green-300 text-green-300'
                      : 'border-transparent text-gray-400 hover:border-gray-700 hover:text-gray-300'
                    }
                  `}
                >
                  {month.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Cards de estatísticas */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/30">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <PieChart className="h-4 w-4 text-green-300" strokeWidth={1.5} />
                  <span className="text-sm text-gray-400">Win Rate</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">
                    {taxaAcerto.toFixed(1)}%
                  </span>
                  <span className="text-xs text-gray-500">
                    {operacoesLucrativas}/{totalOperacoes}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/30">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-emerald-400" strokeWidth={1.5} />
                  <span className="text-sm text-gray-400">Resultado Total</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">
                    {valorizacaoTotal > 0 ? '+' : ''}{valorizacaoTotal.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/30">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="h-4 w-4 text-green-400" strokeWidth={1.5} />
                  <span className="text-sm text-gray-400">Total de Sinais</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">
                    {totalOperacoes}
                  </span>
                  <span className="text-xs text-gray-500">operações</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabela de operações */}
          <div className="mt-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-base font-semibold leading-6 text-white">Operações</h2>
                <p className="mt-2 text-sm text-gray-400">
                  Lista detalhada de todas as operações realizadas
                </p>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-0">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" strokeWidth={1.5} />
                            Data
                          </div>
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                          <div className="flex items-center gap-2">
                            <Search className="h-4 w-4" strokeWidth={1.5} />
                            Ativo
                          </div>
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                          <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4" strokeWidth={1.5} />
                            Direção
                          </div>
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" strokeWidth={1.5} />
                            Resultado
                          </div>
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">Alvo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredData.map((trade, index) => (
                        <tr key={index} className="hover:bg-gray-800/50">
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-300 sm:pl-0">
                            {formatDate(trade.data)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-300">
                            {trade.ativo}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                              trade.direcao === 'LONG'
                                ? 'bg-green-400/10 text-green-400 ring-green-400/20'
                                : 'bg-red-400/10 text-red-400 ring-red-400/20'
                            }`}>
                              {trade.direcao}
                            </span>
                          </td>
                          <td className={`whitespace-nowrap px-3 py-4 text-sm ${
                            trade.percentual >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {trade.percentual >= 0 ? '+' : ''}{trade.percentual}%
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {trade.alvo}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
