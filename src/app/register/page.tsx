'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import { ArrowRight } from 'lucide-react';
import { REGION_NAMES, type Region } from '@/lib/prices';
import { detectUserRegion } from '@/lib/geo';
import { translations } from '@/lib/i18n';
import { ensureAndTrackContact } from '@/lib/analytics';

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>('OTHER');
  const [locale, setLocale] = useState('pt-BR');
  const router = useRouter();

  useEffect(() => {
    // Detecta região e idioma do usuário quando o componente montar
    const detectedRegion = detectUserRegion();
    setRegion(detectedRegion);

    const browserLang = navigator.language;
    const supportedLocale = translations[browserLang] ? browserLang : 
                          browserLang.startsWith('pt') ? 'pt-BR' :
                          browserLang.startsWith('es') ? 'es' : 'en';
    setLocale(supportedLocale);
  }, []);

  const t = translations[locale];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // Validações
    if (!name || !email || !password || !confirmPassword) {
      setError(t.register.errors.requiredFields);
      setIsSubmitting(false);
      return;
    }

    if (!email.includes('@')) {
      setError(t.register.errors.invalidEmail);
      setIsSubmitting(false);
      return;
    }

    if (password.length < 6) {
      setError(t.register.errors.weakPassword);
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.register.errors.passwordsDoNotMatch);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          region,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setError(t.register.errors.emailInUse);
          return;
        }
        throw new Error(data.error || 'Error during registration');
      }

      // Track the user's contact information
      ensureAndTrackContact({ email });

      // Fazer login automaticamente após o registro
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error('Error during automatic login');
      }

      // Após o login bem-sucedido, redireciona para a página de planos
      router.push('/planos');
      router.refresh();
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Error during registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D6D2D3] to-[#F8FFFF] font-normal tracking-[-0.03em]">
      {/* Header */}
      <header className="fixed w-full top-0 bg-[#D6D2D3]/80 backdrop-blur-lg z-50 border-b border-gray-100/20">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="p-2">
              <span className="text-[#1B2541] text-xl font-light tracking-[-0.03em] uppercase">
                VUOM
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-24">
        <div className="w-full max-w-[420px] bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-lg">
          {/* Título */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold mb-2 text-[#35426A]">
              {t.register.createAccount}
            </h1>
            <p className="text-sm sm:text-base text-[#7286B2]">
              {t.register.startJourney}
            </p>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="mb-6 text-red-500 text-center text-sm">
              {error}
            </div>
          )}
          
          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" autoComplete="off">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#35426A] mb-1.5">
                {t.register.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                autoComplete="off"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#35426A]/20 focus:border-[#35426A] transition-all duration-200 text-[#35426A]"
                placeholder={t.register.namePlaceholder}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#35426A] mb-1.5">
                {t.register.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="off"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#35426A]/20 focus:border-[#35426A] transition-all duration-200 text-[#35426A]"
                placeholder={t.register.emailPlaceholder}
              />
            </div>

            <div>
              <label htmlFor="region" className="block text-sm font-medium text-[#35426A] mb-1.5">
                Region
              </label>
              <select
                id="region"
                name="region"
                value={region}
                onChange={(e) => setRegion(e.target.value as Region)}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#35426A]/20 focus:border-[#35426A] transition-all duration-200 text-[#35426A]"
              >
                {Object.entries(REGION_NAMES).map(([key, name]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#35426A] mb-1.5">
                {t.register.password}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                autoComplete="new-password"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#35426A]/20 focus:border-[#35426A] transition-all duration-200 text-[#35426A]"
                placeholder={t.register.passwordPlaceholder}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#35426A] mb-1.5">
                {t.register.confirmPassword}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                autoComplete="new-password"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#35426A]/20 focus:border-[#35426A] transition-all duration-200 text-[#35426A]"
                placeholder={t.register.confirmPasswordPlaceholder}
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#35426A] hover:bg-[#7286B2] rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? t.register.signingUp : t.register.signUp}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Link para login */}
          <p className="mt-6 text-center text-sm text-[#7286B2]">
            {t.register.alreadyHaveAccount}{' '}
            <Link 
              href="/login" 
              className="text-[#35426A] hover:text-[#7286B2] transition-colors duration-200 font-medium"
            >
              {t.register.signIn}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
