import Link from 'next/link';
import { Home, MessageSquare, LineChart } from 'lucide-react';

export function Navigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#111]/90 backdrop-blur-sm border-t border-gray-800">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex justify-around py-2">
          <Link 
            href="/" 
            className="flex flex-col items-center p-2 text-gray-400 hover:text-green-300 transition-colors"
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Início</span>
          </Link>
          
          <Link 
            href="/chat" 
            className="flex flex-col items-center p-2 text-gray-400 hover:text-green-300 transition-colors"
          >
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs mt-1">Chat</span>
          </Link>
          
          <Link 
            href="/relatorio" 
            className="flex flex-col items-center p-2 text-green-300"
          >
            <LineChart className="h-6 w-6" />
            <span className="text-xs mt-1">Relatório</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 