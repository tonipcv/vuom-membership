'use client';

import { useState, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase'; // Importe o cliente Supabase

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Se bem-sucedido, redireciona para /chat
      router.push('/chat');
    } catch (error) {
      // Mostrar alerta de dados incorretos
      setError('Dados incorretos. Por favor, verifique seu e-mail e senha.');
      setShowNotification(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (error) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000); // A notificação desaparecerá após 5 segundos

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="container mx-auto px-4 p-60 relative">
      {showNotification && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-4 text-center rounded-md shadow-lg animate-bounce">
          <p className="font-bold">Dados incorretos</p>
          <p>Por favor, verifique seu e-mail e senha.</p>
        </div>
      )}

      <div className="flex justify-center mb-8">
        <Image
          src="/logo.png"
          alt="Logo da Empresa"
          width={200}
          height={100}
        />
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-bold text-white-700">E-mail</label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-bold text-white-700">Senha</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
          />
        </div>
        <div className="mb-6 text-center">
          <button 
            type="submit" 
            className="w-full px-4 py-2 font-bold text-gray-700 bg-green-300 rounded-full hover:bg-green-400 focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
}
