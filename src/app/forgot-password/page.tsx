'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { satoshi, euclidCircular } from '../fonts/fonts';

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Algo deu errado');
      }

      setSuccess('Se o email existir, você receberá as instruções de recuperação.');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Algo deu errado');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-900 ${satoshi.variable} ${euclidCircular.variable}`}>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-[380px] bg-white/70 backdrop-blur-lg rounded-xl border border-[#9d96fc]/10 p-6">
          {/* Título */}
          <div className="text-center mb-6">
            <h1 className="text-[22px] leading-tight tracking-[-0.03em] font-bold mb-1.5 font-satoshi bg-gradient-to-r from-[#9d96fc] to-[#7b74fa] text-transparent bg-clip-text">
              Recuperar senha
            </h1>
            <p className="text-[13px] text-gray-500 font-satoshi tracking-[-0.03em]">
              Digite seu e-mail para receber as instruções
            </p>
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-center text-[13px] font-satoshi tracking-[-0.03em]">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 text-emerald-500 text-center text-[13px] font-satoshi tracking-[-0.03em]">
              {success}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
            <div>
              <label htmlFor="email" className="block text-[13px] font-medium text-gray-700 mb-1 font-satoshi tracking-[-0.03em]">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="off"
                className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#9d96fc]/20 focus:border-[#9d96fc] transition-all duration-200 placeholder-gray-400 text-gray-900 font-satoshi tracking-[-0.03em]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 text-[13px] font-medium text-white bg-gradient-to-r from-[#9d96fc] to-[#7b74fa] rounded-lg hover:opacity-90 transition-all duration-200 font-satoshi tracking-[-0.03em] mt-1"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar instruções'}
            </button>
          </form>

          {/* Link para login */}
          <div className="mt-6 text-center">
            <Link 
              href="/login" 
              className="text-[13px] text-gray-500 hover:text-[#9d96fc] transition-colors duration-200 inline-flex items-center gap-1 font-satoshi tracking-[-0.03em]"
            >
              <ArrowLeftIcon className="w-3 h-3" />
              Voltar para login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
