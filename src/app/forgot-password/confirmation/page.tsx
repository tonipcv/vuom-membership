'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

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
          
          <div className="flex justify-center mb-6">
            <div className="bg-green-500/10 rounded-full p-4">
              <FiMail className="h-8 w-8 text-green-200" />
            </div>
          </div>

          <h2 className="text-center text-1xl font-bold text-white">
            Caso você seja membro da Futuros Tech, você receberá um e-mail com as instruções para redefinir sua senha!
          </h2>
          
          <p className="mt-4 text-center text-zinc-200">
            Verifique seu e-mail:
          </p>
          <p className="mt-2 text-center text-white font-medium">
            {email}
          </p>

        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/login" 
            className="inline-flex items-center text-sm text-green-200 hover:text-green-400 transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" />
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ConfirmationContent />
    </Suspense>
  )
} 