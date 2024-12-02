'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import supabaseClient from '@/src/lib/superbaseClient';

// Adicione esta função antes do handleSubmit
const validatePassword = (password: string) => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  if (!minLength) return 'A senha deve ter pelo menos 8 caracteres';
  if (!hasUpperCase) return 'A senha deve conter pelo menos uma letra maiúscula';
  if (!hasLowerCase) return 'A senha deve conter pelo menos uma letra minúscula';
  if (!hasNumber) return 'A senha deve conter pelo menos um número';
  if (!hasSpecialChar) return 'A senha deve conter pelo menos um caractere especial (!@#$%^&*)';
  return null;
};

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = supabaseClient;

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

    // Validar requisitos da senha
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
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
            minLength={8}
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
            minLength={8}
          />
        </div>

        <div className="mb-4 text-sm text-gray-400 bg-gray-800 p-3 rounded-lg">
          <p>A senha deve conter:</p>
          <ul className="list-disc list-inside mt-1">
            <li>Mínimo de 8 caracteres</li>
            <li>Pelo menos uma letra maiúscula</li>
            <li>Pelo menos uma letra minúscula</li>
            <li>Pelo menos um número</li>
            <li>Pelo menos um caractere especial (!@#$%^&*)</li>
          </ul>
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
