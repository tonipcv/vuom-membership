'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function VerifyEmail() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verificando seu email...');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Token não fornecido');
      return;
    }

    async function verifyEmail() {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage('Email verificado com sucesso!');
          // Redirecionar para login após 3 segundos
          setTimeout(() => {
            router.push('/login?verified=true');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Erro ao verificar email');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Erro ao verificar email');
      }
    }

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-black p-8 rounded-lg border border-zinc-800">
        <div>
          <div className="flex justify-center">
            <Image
              src="/ft-icone.png"
              alt="Logo"
              width={80}
              height={80}
              className="mb-4"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Verificação de Email
          </h2>
          
          <div className="mt-4 text-center">
            {status === 'loading' && (
              <div className="animate-pulse text-zinc-400">{message}</div>
            )}
            
            {status === 'success' && (
              <div className="text-green-500">
                {message}
                <p className="mt-2 text-sm text-zinc-400">
                  Redirecionando para a página de login...
                </p>
              </div>
            )}
            
            {status === 'error' && (
              <div>
                <p className="text-red-500">{message}</p>
                <Link 
                  href="/login" 
                  className="mt-4 inline-block text-sm text-zinc-200 hover:text-green-400 transition-colors duration-200"
                >
                  Voltar para o login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 