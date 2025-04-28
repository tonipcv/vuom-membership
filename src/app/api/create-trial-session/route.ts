import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { amount, currency, priceId } = await request.json();

    if (!amount || !currency || !priceId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Get the host from headers
    const headersList = headers();
    const host = headersList.get('host');
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;

    // Criar a sessão de checkout
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: session.user.email,
      line_items: [
        {
          // Usar o preço do plano fornecido
          price: priceId,
          quantity: 1,
        },
        {
          // Taxa única do trial
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: 'Trial Activation Fee',
              description: '14-day trial activation fee',
            },
            unit_amount: amount * 100, // Converter para centavos
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 14,
      },
      success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/trial`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
} 