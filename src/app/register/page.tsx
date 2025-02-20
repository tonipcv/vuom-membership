'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/AuthLayout';

// Hook personalizado para máscara de telefone
const usePhoneMask = () => {
  const applyMask = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2')
      .slice(0, 15);
  };

  return (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    e.target.value = applyMask(value);
  };
};

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handlePhoneChange = usePhoneMask();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um e-mail válido');
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      setIsSubmitting(false);
      return;
    }

    try {
      // Substituir chamada do Supabase por sua API de registro
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
          phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Redirecionar para confirmação de email
      router.push('/confirm-email?email=' + encodeURIComponent(email));
    } catch (err) {
      console.error('Unexpected error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-sm">
        {/* Mensagem de erro */}
        {error && (
          <div className="mb-6 text-red-500 text-center text-sm">{error}</div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Nome completo"
              required 
              autoComplete="off"
              className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-pink-400 focus:border-pink-400 transition-colors duration-200 placeholder-gray-400 text-gray-900"
            />
          </div>

          <div>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="E-mail"
              required 
              className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-pink-400 focus:border-pink-400 transition-colors duration-200 placeholder-gray-400 text-gray-900"
            />
          </div>

          <div>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              placeholder="Telefone"
              required 
              onChange={handlePhoneChange}
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
              className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-pink-400 focus:border-pink-400 transition-colors duration-200 placeholder-gray-400 text-gray-900"
            />
          </div>

          <div>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Confirmar senha"
              required 
              className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-pink-400 focus:border-pink-400 transition-colors duration-200 placeholder-gray-400 text-gray-900"
            />
          </div>

          <button 
            type="submit" 
            className="w-full px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-xl hover:bg-pink-600 transition-all duration-200 shadow-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Criar conta'}
          </button>
        </form>

        {/* Link para login */}
        <div className="mt-6 text-center">
          <Link 
            href="/login" 
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 inline-flex items-center gap-1"
          >
            <ArrowLeftIcon className="w-3 h-3" />
            Voltar para login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
