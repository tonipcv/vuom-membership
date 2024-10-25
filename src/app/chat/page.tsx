'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */

import Image from 'next/image';
// import Link from 'next/link';
import BottomNavigation from '../../components/BottomNavigation';
import { useState, useEffect } from 'react';

// Definindo a interface para o tipo de mensagem
interface Message {
  text: string;
  createdAt: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('https://servidor-servidor-telegram.dpbdp1.easypanel.host/messages/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

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
      <div className="bg-gray-900 p-3 rounded-lg text-white">
        <p className="font-bold text-lg text-green-500">{header.replace('#', '').trim()}</p>
        <p className="text-sm mt-1">{type}</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <div>
            <p className="font-semibold text-gray-400">Alvo</p>
            <p>{alvo.split(':')[1].trim()}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-400">Lucro</p>
            <p className="text-green-500">{lucro.split(':')[1].trim()}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-400">Período</p>
            <p>{periodo.split(':')[1].trim()}</p>
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
      <div className="bg-gray-900 p-3 rounded-lg text-white">
        <p className="font-bold text-lg text-green-500">{header.replace('#', '').trim()}</p>
        {entradaZona && <p className="mt-2">{entradaZona}</p>}
        {alavancagem && <p className="mt-1">{alavancagem}</p>}
        {alvos.length > 0 && (
          <div className="mt-2">
            <p className="font-semibold text-gray-200">Alvos:</p>
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
        {stoploss && <p className="mt-2 text-gray-200">{stoploss}</p>}
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
      <div className="bg-gray-900 p-3 rounded-lg text-white">
        <p className="font-bold text-lg text-gray-200">{header.replace('#', '').trim()}</p>
        <p className="mt-2 text-gray-300">{message}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-4">
            <Image
              src="/ft-icone.png"
              alt="Logo da Empresa"
              width={80}
              height={40}
            />
          </div>

          <h1 className="text-center font-helvetica mb-4 text-xl">
            Sinais de Entradas:
          </h1>

          <div className="bg-black rounded-lg shadow-md p-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
            {messages.map((message, index) => (
              <div key={index} className="bg-gray-900 p-3 rounded-lg border border-gray-700 mb-2">
                <div>{formatMessage(message.text)}</div>
                <p className="text-gray-400 text-xs mt-1">
                  {formatDate(message.createdAt)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-gray-500 rounded-full hover:bg-gray-600 focus:outline-none focus:shadow-outline"
              onClick={() => window.location.href = 'https://apps.apple.com/app/bybit-buy-bitcoin-crypto/id1494961956'}
            >
              Enviar Ordem
            </button>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
