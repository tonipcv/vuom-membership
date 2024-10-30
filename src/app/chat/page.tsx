'use client';

import Image from 'next/image';
import { Navigation } from '../components/Navigation';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Head from 'next/head';
import Link from 'next/link';
import OptimizedImage from 'next/image';

// Definindo a interface para o tipo de mensagem
interface Message {
  text: string;
  createdAt: string;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/');
      } else {
        fetchMessages();
      }
    };

    checkUser();
  }, [router, supabase.auth]);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://servidor-servidor-telegram.dpbdp1.easypanel.host/messages/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // Configuração para o fuso horário de Brasília
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };

    const brazilTime = date.toLocaleString('pt-BR', options);
    const nowBrazil = now.toLocaleString('pt-BR', options);
    
    const [datePart] = date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', dateStyle: 'short' }).split(',');
    const [nowDatePart] = now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', dateStyle: 'short' }).split(',');

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const [yesterdayDatePart] = yesterday.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', dateStyle: 'short' }).split(',');

    if (datePart === nowDatePart) {
      return `Hoje, ${brazilTime}`;
    } else if (datePart === yesterdayDatePart) {
      return `Ontem, ${brazilTime}`;
    } else {
      return date.toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    }
  };

  const removeEmojis = (text: string) => {
    // Substituímos o emoji 🟢 por um hífen
    let modifiedText = text.replace(/🟢/g, '-');
    
    // Removemos o emoji invisível antes de "ALAVANCAGEM ISOLADA"
    modifiedText = modifiedText.replace(/️(\s*)ALAVANCAGEM ISOLADA/, '$1ALAVANCAGEM ISOLADA');
    
    // Removemos todos os outros emojis
    return modifiedText.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
  };

  const formatMessage = (text: string) => {
    const lines = removeEmojis(text).split('\n');
    
    if (lines[0].includes('Take - Profit')) {
      return formatTakeProfit(lines);
    } else if (lines[0].includes('COMPRA')) {
      return formatCompra(lines);
    } else if (lines[0].includes('cancelado')) {
      return formatCancelado(lines);
    }
    
    // Fallback para o formato anterior
    return (
      <>
        {lines.map((line, index) => {
          if (index === 0 && line.toLowerCase().includes('compra')) {
            return <p key={index} className="text-green-500 font-bold">{line.trim()}</p>;
          } else if (line.toLowerCase().startsWith('entrada na zona')) {
            return <p key={index} className="text-white">{line.trim()}</p>;
          } else if (line.toLowerCase().includes('alavancagem isolada')) {
            return <p key={index} className="text-white">{line.trim()}</p>;
          } else if (line.toLowerCase().includes('alvos:')) {
            return formatTargets(line);
          } else if (line.toLowerCase().startsWith('stooploss')) {
            return <p key={index} className="text-gray-500">{line.trim()}</p>;
          } else {
            return <p key={index} className="text-white">{line.trim()}</p>;
          }
        })}
      </>
    );
  };

  const formatTakeProfit = (lines: string[]) => {
    const [header, type, alvo, lucro, periodo] = lines;
    
    return (
      <div className="bg-gray-700 p-3 rounded-lg text-white">
        <p className="font-bold text-base md:text-lg text-green-500">{header.replace('#', '').trim()}</p>
        <p className="text-xs md:text-sm mt-1">{type}</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <div>
            <p className="font-semibold text-gray-400 text-xs md:text-sm">Alvo</p>
            <p className="text-xs md:text-sm">{alvo.split(':')[1].trim()}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-400 text-xs md:text-sm">Lucro</p>
            <p className="text-green-500 text-xs md:text-sm">{lucro.split(':')[1].trim()}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-400 text-xs md:text-sm">Período</p>
            <p className="text-xs md:text-sm">{periodo.split(':')[1].trim()}</p>
          </div>
        </div>
      </div>
    );
  };

  const formatTargets = (line: string) => {
    const [label, targetsString] = line.split(':');
    const targets = targetsString
      .split('-')
      .map(t => t.trim())
      .filter(t => t !== ''); // Remove itens vazios
    
    return (
      <div className="mt-1">
        <p className="text-white font-bold">{label.trim()}:</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {targets.map((target, index) => (
            <span 
              key={index} 
              className="bg-green-300 text-white px-2 py-0.5 rounded-full text-xs"
            >
              {target}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const formatCompra = (lines: string[]) => {
    const [header, ...rest] = lines;
    let entradaZona = '';
    let alavancagem = '';
    let alvos: string[] = [];
    let stoploss = '';

    rest.forEach(line => {
      if (line.toLowerCase().includes('entrada na zona')) {
        entradaZona = line;
      } else if (line.toLowerCase().includes('alavancagem isolada')) {
        alavancagem = line;
      } else if (line.toLowerCase().includes('alvos:')) {
        alvos = line.split(':')[1].split('-').map(a => a.trim()).filter(a => a);
      } else if (line.toLowerCase().includes('stooploss')) {
        stoploss = line;
      }
    });

    return (
      <div className="bg-gray-700 p-3 rounded-lg text-white">
        <p className="font-bold text-base md:text-lg text-green-500">{header.replace('#', '').trim()}</p>
        {entradaZona && <p className="mt-2 text-xs md:text-sm">{entradaZona}</p>}
        {alavancagem && <p className="mt-1 text-xs md:text-sm">{alavancagem}</p>}
        {alvos.length > 0 && (
          <div className="mt-2">
            <p className="font-semibold text-gray-200 text-xs md:text-sm">Alvos:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {alvos.map((alvo, index) => (
                <span 
                  key={index} 
                  className="bg-green-300 text-gray-900 px-2 py-1 rounded-full text-xs"
                >
                  {alvo}
                </span>
              ))}
            </div>
          </div>
        )}
        {stoploss && <p className="mt-2 text-gray-200 text-xs md:text-sm">{stoploss}</p>}
      </div>
    );
  };

  const formatCancelado = (lines: string[]) => {
    const [header, ...rest] = lines;
    let message = rest.join(' ').replace('@FuturosTech', '').trim();
    
    // Remove o '<' do final, se existir, e adiciona um ponto
    if (message.endsWith('<')) {
      message = message.slice(0, -1) + '.';
    } else if (!message.endsWith('.')) {
      message += '.';
    }

    return (
      <div className="bg-gray-700 p-3 rounded-lg text-white">
        <p className="font-bold text-base md:text-lg text-gray-200">{header.replace('#', '').trim()}</p>
        <p className="mt-2 text-gray-300 text-xs md:text-sm">{message}</p>
      </div>
    );
  };

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
        <div className="w-full md:w-1/2 lg:w-1/2 md:mx-auto lg:mx-auto">
          <div className="flex justify-between items-center mb-4 px-4 md:px-0">
            <h1 className="font-helvetica text-xl">
              Sinais de Entradas:
            </h1>
            <button
              onClick={fetchMessages}
              disabled={isLoading}
              className="p-2 text-gray-400 hover:text-green-300 focus:outline-none transition-colors duration-200"
              title="Atualizar sinais"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
            </button>
          </div>

          <div className=" rounded-lg shadow-md p-4 overflow-y-auto mx-4 md:mx-0" style={{ maxHeight: '60vh' }}>
            {messages.map((message, index) => (
              <div key={index} className="bg-gray-700 p-3 rounded-lg border border-gray-700 mb-2">
                <div className="text-sm md:text-base">{formatMessage(message.text)}</div>
                <p className="text-gray-400 text-xs mt-1">
                  {formatDate(message.createdAt)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 px-4 md:px-0">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-gray-500 rounded-full hover:bg-gray-600 focus:outline-none focus:shadow-outline"
              onClick={() => window.location.href = 'https://www.bybit.com/'}
            >
              Enviar Ordem
            </button>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
export default Chat;

