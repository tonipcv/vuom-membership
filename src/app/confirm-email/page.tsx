'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function ConfirmEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div className="flex flex-col min-h-screen justify-center items-center container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <Image
          src="/ft-icone.png"
          alt="Logo da Empresa"
          width={80}
          height={40}
          className="w-20 h-auto md:w-24 lg:w-28"
        />
      </div>

      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Confirme seu e-mail</h1>
        <p className="mb-4">
          Enviamos um link de confirmação para:
          <br />
          <span className="font-semibold">{email}</span>
        </p>
        <p className="mb-8">
          Por favor, verifique sua caixa de entrada e clique no link de confirmação para ativar sua conta.
        </p>
        <p className="text-sm text-gray-400 mb-4">
          Não recebeu o e-mail? Verifique sua pasta de spam.
        </p>
        <Link 
          href="/login" 
          className="text-green-300 hover:text-green-400"
        >
          Voltar para o login
        </Link>
      </div>
    </div>
  );
} 