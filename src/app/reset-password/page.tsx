'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import supabaseClient from '@/src/lib/superbaseClient';

// Modifique a função validatePassword para retornar um objeto com todos os status
const validatePassword = (password: string) => {
  return {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*]/.test(password)
  };
};

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [validations, setValidations] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });
  const router = useRouter();
  const supabase = supabaseClient;

  // Adicione esta função para atualizar as validações quando a senha mudar
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setValidations(validatePassword(newPassword));
  };

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

    // Verificar se todos os requisitos foram atendidos
    const currentValidations = validatePassword(password);
    if (!Object.values(currentValidations).every(Boolean)) {
      setError('A senha não atende a todos os requisitos');
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
            onChange={handlePasswordChange}
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

        <div className="mb-4 text-sm bg-gray-800 p-3 rounded-lg">
          <p className="text-gray-400">A senha deve conter:</p>
          <ul className="mt-1">
            <li className={`flex items-center ${validations.minLength ? 'text-green-500' : 'text-gray-400'}`}>
              {validations.minLength ? '✓' : '○'} Mínimo de 8 caracteres
            </li>
            <li className={`flex items-center ${validations.hasUpperCase ? 'text-green-500' : 'text-gray-400'}`}>
              {validations.hasUpperCase ? '✓' : '○'} Pelo menos uma letra maiúscula
            </li>
            <li className={`flex items-center ${validations.hasLowerCase ? 'text-green-500' : 'text-gray-400'}`}>
              {validations.hasLowerCase ? '✓' : '○'} Pelo menos uma letra minúscula
            </li>
            <li className={`flex items-center ${validations.hasNumber ? 'text-green-500' : 'text-gray-400'}`}>
              {validations.hasNumber ? '✓' : '○'} Pelo menos um número
            </li>
            <li className={`flex items-center ${validations.hasSpecialChar ? 'text-green-500' : 'text-gray-400'}`}>
              {validations.hasSpecialChar ? '✓' : '○'} Pelo menos um caractere especial (!@#$%^&*)
            </li>
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
