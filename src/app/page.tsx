'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';

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

export default function Home() {
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
          }
        }
      });

      if (error) {
        console.error('Supabase error:', error);
        if (error.message.includes('not authorized')) {
          setError('Este endereço de e-mail não está autorizado para cadastro. Por favor, use um e-mail válido ou entre em contato com o suporte.');
        } else if (error.message.includes('User already registered')) {
          setError('Este e-mail já está registrado. Por favor, tente fazer login ou use outro e-mail.');
        } else if (error.message.includes('Email confirmation required')) {
          setError('É necessário confirmar o e-mail antes de concluir o cadastro. Por favor, verifique sua caixa de entrada.');
        } else {
          setError(`Erro no cadastro: ${error.message}`);
        }
      } else if (data) {
        // Cadastro bem-sucedido
        router.push('/success'); // Redireciona para a página de sucesso
      }
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
    <div className="flex-auto justify-center container mx-auto px-4 p-20 mb-4 mt-16">
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
          <label htmlFor="name" className="block mb-2 text-sm font-bold text-white-700 font-helvetica">Nome</label>
          <input type="text" id="name" name="name" placeholder="Digite seu nome" required className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-bold text-white-700">E-mail</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="exemplo@email.com" 
            required 
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 text-sm font-bold text-white-700">Telefone</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            placeholder="(00) 00000-0000" 
            required 
            onChange={handlePhoneChange}
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-bold text-white-700">Senha</label>
          <input type="password" id="password" name="password" placeholder="Digite sua senha" required className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-bold text-white-700">Confirmar Senha</label>
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirme sua senha" required className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>
        
        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}
        
        <div className="mb-6 text-center">
          <button 
            type="submit" 
            className="w-full px-4 py-2 font-bold text-black bg-green-300 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Registrar'}
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        <Link href="/login" className="text-white-500 hover:text-white-700">
          Já tem uma conta? Faça login
        </Link>
      </div>
    </div>
  );
}
