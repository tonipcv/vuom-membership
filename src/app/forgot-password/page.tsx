'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import supabaseClient from '@/src/lib/superbaseClient';


export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const supabase = supabaseClient;
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    router.push('/forgot-password/confirmation?email=' + encodeURIComponent(email));
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-black p-8 rounded-lg border border-zinc-800">
        <div>
          <div className="flex justify-center">
            <Image
              src="/ft-icone.png"
              alt="Logo da Empresa"
              width={80}
              height={80}
              className="mb-4"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Recuperar senha
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-400">
            Digite seu e-mail para receber as instruções
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-zinc-800 bg-black text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent sm:text-sm"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-green-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                'Enviar instruções'
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link 
            href="/login" 
            className="text-sm text-zinc-200 hover:text-green-400 transition-colors duration-200"
          >
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
}
