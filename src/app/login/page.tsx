'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react"
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import XLogo from '@/components/XLogo';
import AuthLayout from '@/components/AuthLayout';

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push('/chat');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao fazer login');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/chat' });
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-sm">
        {/* Mensagem de erro */}
        {error && (
          <div className="mb-6 text-red-500 text-center text-sm">{error}</div>
        )}
        
        {/* Formulário */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-mail"
              required
              className="w-full px-3 py-2 text-sm bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 placeholder-gray-500"
            />
          </div>
          
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              required
              className="w-full px-3 py-2 text-sm bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 placeholder-gray-500"
            />
          </div>

          <button 
            type="submit" 
            className="w-full px-4 py-2 text-sm font-medium text-black bg-green-400 rounded-lg hover:bg-green-500 transition-colors duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="max-w-md mx-auto mt-6 flex flex-col items-center space-y-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/forgot-password" 
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Esqueceu a senha?
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              href="/register" 
              className="text-sm text-green-400 hover:text-green-300 transition-colors duration-200 flex items-center gap-1"
            >
              Criar conta
              <ArrowRightIcon className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Separador */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 text-gray-500 bg-black">ou</span>
          </div>
        </div>

        {/* Botão do Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-300 bg-transparent border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors duration-200"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continuar com Google
        </button>
      </div>
    </AuthLayout>
  );
}
