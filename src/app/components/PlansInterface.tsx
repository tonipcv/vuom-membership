'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { PricingCard } from './PricingCard';
import { getStripe } from '@/lib/stripe';

interface Plan {
  name: string;
  price: string;
  pricePerDay: string;
  period: string;
  popular: boolean;
  features: string[];
}

interface PlansInterfaceProps {
  plans: Plan[];
}

const PRICE_IDS = {
  "Plano Iniciante": "price_1RHTEKCodiLHkuBGpp8UD9vd",
  "Plano Pro": "price_1RHTG7CodiLHkuBG6tUiqlUU",
};

export default function PlansInterface({ plans }: PlansInterfaceProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  const handlePlanSelection = async (planName: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const priceId = PRICE_IDS[planName as keyof typeof PRICE_IDS];
      
      if (!priceId) {
        throw new Error('Plano não encontrado');
      }

      const response = await fetch('/api/create-checkout-session-brl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
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