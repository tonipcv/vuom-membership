'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ensureAndTrackContact } from '@/lib/analytics';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getSessionDetails() {
      try {
        const sessionId = searchParams?.get('session_id');
        if (!sessionId) {
          throw new Error('No session ID found');
        }

        const response = await fetch(`/api/get-session?session_id=${sessionId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to get session details');
        }

        // Track the customer's contact information
        if (data.customer_email) {
          ensureAndTrackContact({
            email: data.customer_email
          });
        }

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 5000);

      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    getSessionDetails();
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#D6D2D3] to-[#F8FFFF]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Processando seu pagamento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#D6D2D3] to-[#F8FFFF]">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">Oops!</div>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => router.push('/planos')}
              className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Voltar para planos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#D6D2D3] to-[#F8FFFF]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-center">
          <div className="text-teal-500 text-3xl mb-4">Sucesso!</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Pagamento confirmado
          </h1>
          <p className="text-gray-600 mb-8">
            Obrigado por assinar! Você será redirecionado para o dashboard em alguns segundos...
          </p>
          <div className="animate-pulse">
            <div className="h-2 bg-teal-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#D6D2D3] to-[#F8FFFF]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando...</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
} 