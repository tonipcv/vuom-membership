'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { getStripe } from '@/lib/stripe';
import { PricingCard } from './PricingCard';
import { PRICE_IDS, PRICE_VALUES, REGION_CURRENCIES, CURRENCY_SYMBOLS } from '@/lib/prices';

interface PlansInterfaceProps {
  plans?: Array<{
    name: string;
    price: string;
    pricePerDay: string;
    period: string;
    popular: boolean;
    features: string[];
  }>;
  userRegion?: 'US' | 'UK' | 'EU' | 'BR' | 'OTHER';
  userId: string;
}

function getPlansForRegion(region: 'US' | 'UK' | 'EU' | 'BR' | 'OTHER') {
  const currency = REGION_CURRENCIES[region];
  const symbol = CURRENCY_SYMBOLS[currency];

  return [
    {
      name: "Plano Iniciante",
      price: `${symbol}${PRICE_VALUES.INICIANTE[currency]}`,
      pricePerDay: `${symbol}${(PRICE_VALUES.INICIANTE[currency] / 30).toFixed(2)} por dia`,
      period: "mês",
      popular: false,
      features: [
        "Acesso a todos os exercícios",
        "Acesso ao grupo exclusivo",
        "Suporte via chat",
        "Garantia de 7 dias",
      ],
    },
    {
      name: "Plano Pro",
      price: `${symbol}${PRICE_VALUES.PRO[currency]}`,
      pricePerDay: `${symbol}${(PRICE_VALUES.PRO[currency] / 30).toFixed(2)} por dia`,
      period: "mês",
      popular: true,
      features: [
        "Tudo do plano Iniciante",
        "Acesso a conteúdos exclusivos",
        "Suporte prioritário",
        "Mentoria individual",
        "Garantia estendida de 15 dias",
      ],
    },
  ];
}

export default function PlansInterface({ userRegion = 'OTHER', userId }: PlansInterfaceProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plans = getPlansForRegion(userRegion);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  const handlePlanSelection = async (planName: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const currency = REGION_CURRENCIES[userRegion];
      const priceId = planName === "Plano Iniciante" 
        ? PRICE_IDS.INICIANTE[currency]
        : PRICE_IDS.PRO[currency];
      
      if (!priceId) {
        throw new Error('Plano não encontrado');
      }

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/planos`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar sessão de pagamento');
      }

      const stripe = await getStripe();
      
      if (!stripe) {
        throw new Error('Erro ao carregar o Stripe');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Erro ao processar pagamento');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D6D2D3] to-[#F8FFFF] font-normal tracking-[-0.03em]">
      {/* Header */}
      <header className="fixed w-full top-0 bg-[#D6D2D3]/80 backdrop-blur-lg z-50 border-b border-gray-100/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="p-2">
              <span className="text-[#1B2541] text-2xl font-light tracking-[-0.03em] uppercase">
                VUOM
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-[#7286B2] hover:text-[#35426A] transition-colors duration-200"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          {/* Título */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-3 text-[#35426A]">
              Escolha seu plano
            </h1>
            <p className="text-[#7286B2] text-lg max-w-2xl mx-auto">
              Comece sua jornada de transformação hoje mesmo
            </p>
            {error && (
              <div className="mt-4 text-red-500 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Cards dos planos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
            {plans.map((plan) => (
              <PricingCard
                key={plan.name}
                {...plan}
                onClick={() => handlePlanSelection(plan.name)}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 