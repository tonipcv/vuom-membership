'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/AuthLayout';

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
    <AuthLayout>
      <div className="w-full max-w-sm space-y-8">
        <div>
          <h2 className="text-center text-2xl font-extrabold text-white">
            Recuperar senha
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-400">
            Digite seu e-mail para receber as instruções
          </p>
        </div>

        {error && (
          <div className="text-center text-sm text-red-500 bg-red-500/10 py-2 px-3 rounded-lg">
            {error}
          </div>
        )}
        
        {success && (
          <div className="text-center text-sm text-green-500 bg-green-500/10 py-2 px-3 rounded-lg">
            {success}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="off"
              className="w-full px-3 py-2 text-sm bg-black border border-zinc-700 rounded-xl focus:ring-1 focus:ring-white focus:border-white transition-colors duration-200 placeholder-zinc-500"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 text-sm font-medium text-black bg-white rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-sm"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar instruções'}
          </button>
        </form>

        <div className="text-center">
          <Link 
            href="/login" 
            className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
          >
            Voltar para o login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
