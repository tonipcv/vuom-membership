import XLogo from './XLogo';
import Link from 'next/link';
import { Home, MessageSquare, LineChart } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex-shrink-0">
            <XLogo />
          </Link>
          
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-auto">
              <Link 
                href="/" 
                className="flex flex-col items-center p-2 text-gray-400 hover:text-green-300 transition-colors"
              >
                <Home className="h-6 w-6" />
                <span className="text-xs mt-1">Início</span>
              </Link>
              
              <Link 
                href="/planos" 
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
      </div>
    </nav>
  );
} 