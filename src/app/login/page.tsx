'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react"
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import XLogo from '@/components/XLogo';
import AuthLayout from '@/components/AuthLayout';
import { FcGoogle } from 'react-icons/fc';
import { GoogleIcon } from '@/components/GoogleIcon';

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
        throw new Error('Credenciais inválidas');
      }

      router.push('/series-restrito');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/series-restrito' });
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-sm">
        {/* Mensagem de erro */}
        {error && (
          <div className="mb-6 text-red-500 text-center text-sm">{error}</div>
        )}
        
        {/* Formulário */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6" autoComplete="off">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-mail"
              required
              autoComplete="off"
              className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-pink-400 focus:border-pink-400 transition-colors duration-200 placeholder-gray-400 text-gray-900"
            />
          </div>
          
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              required
              autoComplete="new-password"
              className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-pink-400 focus:border-pink-400 transition-colors duration-200 placeholder-gray-400 text-gray-900"
            />
          </div>

          <button 
            type="submit" 
            className="w-full px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-xl hover:bg-pink-600 transition-all duration-200 shadow-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Links */}
        <div className="max-w-md mx-auto mt-6 flex flex-col items-center space-y-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/forgot-password" 
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Esqueceu a senha?
            </Link>
            <span className="text-gray-300">•</span>
            <Link 
              href="/register" 
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1"
            >
              Criar conta
              <ArrowRightIcon className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Separador */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 text-gray-400 bg-white">ou</span>
          </div>
        </div>

        {/* Botão do Google */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <GoogleIcon className="h-5 w-5 text-gray-900" />
          Continuar com Google
        </button>
      </div>
    </AuthLayout>
  );
}
