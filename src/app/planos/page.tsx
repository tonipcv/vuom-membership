'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getStripe } from '@/lib/stripe-client';
import { PRICE_IDS, PRICE_VALUES, REGION_CURRENCIES, CURRENCY_SYMBOLS } from '@/lib/prices';
import { translations } from '@/lib/i18n';
import { detectUserRegion } from '@/lib/region';

interface TrialOption {
  value: number;
  currency: string;
  symbol: string;
  priceId: string;
}

function getTrialOptionsForRegion(region: string): TrialOption[] {
  // Ensure region is one of the supported regions
  const validRegion = region as keyof typeof REGION_CURRENCIES;
  const currency = REGION_CURRENCIES[validRegion] || REGION_CURRENCIES.OTHER;
  const symbol = CURRENCY_SYMBOLS[currency];
  const basePrice = PRICE_VALUES.PRO[currency];
  const priceId = PRICE_IDS.PRO[currency];
  
  // Trial options are percentages of the full price
  return [
    { value: Math.round(basePrice * 0.05), currency, symbol, priceId },
    { value: Math.round(basePrice * 0.07), currency, symbol, priceId },
    { value: Math.round(basePrice * 0.10), currency, symbol, priceId },
  ];
}

export default function TrialPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [region, setRegion] = useState<keyof typeof REGION_CURRENCIES>('BR');
  const [locale, setLocale] = useState('pt-BR');
  const [selectedOption, setSelectedOption] = useState<TrialOption | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchUserRegion() {
      try {
        // Fetch user's region from the API
        const response = await fetch('/api/user/region');
        const data = await response.json();
        
        if (response.ok && data.region) {
          console.log('User region from DB:', data.region);
          setRegion(data.region);
        } else {
          // Fallback to browser detection
          const detectedRegion = detectUserRegion();
          console.log('Detected region from browser:', detectedRegion);
          setRegion(detectedRegion);
        }

        // Set locale based on region and browser language
        const browserLang = navigator.language;
        if (data.region === 'BR' || browserLang.startsWith('pt')) {
          setLocale('pt-BR');
        } else if (data.region === 'ES' || browserLang.startsWith('es')) {
          setLocale('es');
        } else {
          setLocale('en');
        }
      } catch (err) {
        console.error('Error fetching user region:', err);
        // Fallback to browser detection
        const detectedRegion = detectUserRegion();
        setRegion(detectedRegion);
      }
    }

    if (session?.user) {
      fetchUserRegion();
    }
  }, [session]);

  const t = translations[locale];
  const trialOptions = getTrialOptionsForRegion(region);

  const handlePayment = async (option: TrialOption) => {
    try {
      setIsLoading(true);
      setError(null);
      setSelectedOption(option);

      const stripe = await getStripe();
      if (!stripe) {
        throw new Error(t.errors.stripe);
      }

      const response = await fetch('/api/create-trial-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: option.value,
          currency: option.currency,
          priceId: option.priceId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.errors.payment);
      }

      const { sessionId } = data;

      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : t.errors.generic);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#D6D2D3] to-[#F8FFFF] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#35426A]"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D6D2D3] to-[#F8FFFF] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#35426A] text-center mb-4">
              {t.trial.congratulations}
            </h2>
            <p className="text-lg sm:text-xl text-[#7286B2] text-center mb-6">
              {t.trial.description}
            </p>
            <p className="text-base sm:text-lg text-[#7286B2] text-center mb-8">
              {t.trial.chooseValue}
            </p>

            <div className="mt-8 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6">
              {trialOptions.map((option) => (
                <div
                  key={option.value}
                  className={`relative rounded-lg border ${
                    selectedOption?.value === option.value
                      ? 'border-[#35426A]'
                      : 'border-gray-100'
                  } bg-white px-6 py-4 shadow-lg cursor-pointer transition-all duration-200`}
                  onClick={() => !isLoading && setSelectedOption(option)}
                >
                  <div className="flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-semibold text-[#35426A]">
                      {option.symbol}
                      {option.value}
                    </span>
                    <span className="ml-2 text-sm text-[#7286B2]">
                      {t.trial.oneTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {selectedOption && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => !isLoading && handlePayment(selectedOption)}
                  disabled={isLoading}
                  className="w-full sm:w-2/3 px-8 py-4 text-lg font-medium text-white bg-[#35426A] hover:bg-[#2A3454] rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? t.trial.processing : t.trial.activateButton}
                </button>
              </div>
            )}

            {error && (
              <div className="mt-8 text-center text-red-500">{error}</div>
            )}

            <div className="mt-12 space-y-4 text-sm text-[#7286B2]">
              <p>{t.trial.info1}</p>
              <p>{t.trial.info2}</p>
              <p>{t.trial.info3}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 