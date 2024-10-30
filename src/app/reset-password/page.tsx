'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setError('');

    // Validar se as senhas são iguais
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      setIsSubmitting(false);
      return;
    }

    // Validar comprimento mínimo da senha
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) {
        throw updateError;
      }

      setMessage('Senha atualizada com sucesso!');
      
      // Redirecionar para a página de login após 2 segundos
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      setError('Ocorreu um erro ao atualizar a senha. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 p-20 mb-4 mt-40">
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
          <label htmlFor="password" className="block mb-2 text-sm font-bold text-white-700">
            Nova Senha
          </label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Digite sua nova senha" 
            required 
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-bold text-white-700">
            Confirmar Nova Senha
          </label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            placeholder="Confirme sua nova senha" 
            required 
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={6}
          />
        </div>

        {error && (
          <div className="mb-4 text-center text-red-500">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 text-center text-green-500">
            {message}
          </div>
        )}

        <div className="mb-6 text-center">
          <button 
            type="submit" 
            className="w-full px-4 py-2 font-bold text-black bg-green-300 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Atualizando...' : 'Atualizar Senha'}
          </button>
        </div>
      </form>
    </div>
  );
}
