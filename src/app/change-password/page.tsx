'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ChangePassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Aqui você pode adicionar lógica para alterar a senha
    // Por enquanto, vamos apenas redirecionar para k17.com.br
    window.location.href = 'https://k17.com.br';
  };

  return (
    <div className="container mx-auto px-4 p-20 mb-4">
      <div className="flex justify-center mb-8">
        <Image
          src="/ft-icone.png"
          alt="Logo da Empresa"
          width={100}
          height={50}
        />
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block mb-2 text-sm font-bold text-white-700">Senha Atual</label>
          <input type="password" id="currentPassword" name="currentPassword" required className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block mb-2 text-sm font-bold text-white-700">Nova Senha</label>
          <input type="password" id="newPassword" name="newPassword" required className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmNewPassword" className="block mb-2 text-sm font-bold text-white-700">Confirmar Nova Senha</label>
          <input type="password" id="confirmNewPassword" name="confirmNewPassword" required className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6 text-center">
          <button 
            type="submit" 
            className="w-full px-4 py-2 font-bold text-white bg-gray-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Alterando...' : 'Alterar Senha'}
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        <Link href="/" className="text-white hover:text-white-700">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
