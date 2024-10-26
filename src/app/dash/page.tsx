'use client';

import Image from 'next/image';
import BottomNavigation from '../../components/BottomNavigation';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FiRefreshCcw, FiSend, FiAlertCircle, FiMenu, FiX, FiLogOut, FiBarChart2, FiBook, FiActivity, FiSun, FiMoon, FiBell } from 'react-icons/fi';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import { initializeOneSignal, useOneSignal } from '../../utils/oneSignal';

interface Message {
  id: string;
  text: string;
  createdAt: string;
  type: 'buy' | 'sell' | 'takeProfit' | 'canceled' | 'other';
}

// Mova estas funções para fora do componente Dashboard
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
    <div className="bg-gray-900 p-3 rounded-lg text-white">
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
    <div className="bg-gray-900 p-3 rounded-lg text-white">
      <p className="font-bold text-base md:text-lg text-gray-200">{header.replace('#', '').trim()}</p>
      <p className="mt-2 text-gray-300 text-xs md:text-sm">{message}</p>
    </div>
  );
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

function DashboardContent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { theme, toggleTheme } = useTheme();
  const { isSubscribed, handleSubscription } = useOneSignal();

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://servidor-servidor-telegram.dpbdp1.easypanel.host/messages/');
      if (!response.ok) {
        throw new Error('Falha ao carregar mensagens');
      }
      const data = await response.json();
      setMessages(data.map((msg: any) => ({
        ...msg,
        type: determineMessageType(msg.text)
      })));
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
      setError('Não foi possível carregar as mensagens. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

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
  }, [router, supabase.auth, fetchMessages]);

  useEffect(() => {
    initializeOneSignal();
  }, []);

  useEffect(() => {
    console.log('Estado da inscrição:', isSubscribed);
  }, [isSubscribed]);

  const determineMessageType = (text: string): Message['type'] => {
    if (text.toLowerCase().includes('compra')) return 'buy';
    if (text.toLowerCase().includes('venda')) return 'sell';
    if (text.toLowerCase().includes('take - profit')) return 'takeProfit';
    if (text.toLowerCase().includes('cancelado')) return 'canceled';
    return 'other';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/');
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-black text-gray-300' : 'bg-white text-gray-800'}`}>
      <header className={`${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'} shadow-md relative z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Image
            src="/ft-icone.png"
            alt="Logo da Empresa"
            width={60}
            height={30}
          />
          <div className="flex items-center">
            <button
              onClick={handleSubscription}
              className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-900' : 'hover:bg-gray-200'} transition-colors mr-2`}
              aria-label="Inscrever-se para notificações"
            >
              <FiBell className={isSubscribed ? "text-green-500" : theme === 'dark' ? "text-gray-300" : "text-gray-800"} />
            </button>
            <span className="text-sm">
              {isSubscribed ? 'Inscrito' : 'Não inscrito'}
            </span>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-900' : 'hover:bg-gray-200'} transition-colors mr-2`}
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? <FiSun className="text-gray-300" /> : <FiMoon className="text-gray-800" />}
            </button>
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-900' : 'hover:bg-gray-200'} transition-colors`}
              aria-label="Menu"
            >
              {isMenuOpen ? <FiX className={theme === 'dark' ? "text-gray-300" : "text-gray-800"} /> : <FiMenu className={theme === 'dark' ? "text-gray-300" : "text-gray-800"} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <nav className={`${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'} py-2`}>
            <ul className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col space-y-2">
              <li>
                <a href="/dash" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-900 rounded">
                  <FiActivity className="mr-3" />
                  <span>Sinais</span>
                </a>
              </li>
              <li>
                <a href="/cursos" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-900 rounded">
                  <FiBook className="mr-3" />
                  <span>Cursos</span>
                </a>
              </li>
              <li>
                <a href="/grafico" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-900 rounded">
                  <FiBarChart2 className="mr-3" />
                  <span>Gráfico</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center w-full py-2 px-4 text-gray-300 hover:bg-gray-900 rounded text-left"
                >
                  <FiLogOut className="mr-3" />
                  <span>Sair</span>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'} rounded-lg shadow-xl overflow-hidden`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-100">
                Entradas
              </h2>
              <button
                onClick={fetchMessages}
                className="p-2 rounded-full hover:bg-gray-900 transition-colors"
                aria-label="Atualizar"
              >
                <FiRefreshCcw className="text-gray-300" />
              </button>
            </div>
            
            {error && (
              <div className="mb-4 p-4 bg-red-900 text-red-100 rounded-md flex items-center">
                <FiAlertCircle className="mr-2" />
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300"></div>
              </div>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {messages.map((message) => (
                  <MessageCard key={message.id} message={message} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            className={`w-full sm:w-auto px-6 py-3 font-bold ${theme === 'dark' ? 'text-gray-100 bg-blue-800 hover:bg-blue-700' : 'text-white bg-blue-600 hover:bg-blue-500'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors`}
            onClick={() => window.open('https://www.bybit.com/', '_blank')}
          >
            <div className="flex items-center justify-center">
              <FiSend className="mr-2" />
              <span>Enviar Ordem</span>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
}

function MessageCard({ message }: { message: Message }) {
  return (
    <div className={`p-4 rounded-lg shadow-md ${getMessageCardStyle(message.type)}`}>
      <div className="text-sm md:text-base">{formatMessage(message.text)}</div>
      <p className="text-gray-500 text-xs mt-2">
        {formatDate(message.createdAt)}
      </p>
    </div>
  );
}

function getMessageCardStyle(type: Message['type']): string {
  switch (type) {
    case 'buy':
      return 'bg-gray-900 border-l-4 border-green-600';
    case 'sell':
      return 'bg-gray-900 border-l-4 border-red-600';
    case 'takeProfit':
      return 'bg-gray-900 border-l-4 border-blue-600';
    case 'canceled':
      return 'bg-gray-900 border-l-4 border-gray-600';
    default:
      return 'bg-gray-900 border-l-4 border-gray-700';
  }
}
