import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { PRICE_IDS } from '@/lib/prices';
import Stripe from 'stripe';

const relevantEvents = new Set([
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted'
]);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!signature || !webhookSecret) {
      return new NextResponse('Missing signature or webhook secret', { status: 400 });
    }
    
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (err: any) {
    console.error('Webhook error:', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
          const subscription = event.data.object as Stripe.Subscription;
          
          // Buscar o preço para determinar o tipo de plano
          const priceId = subscription.items.data[0].price.id;
          
          // Buscar o usuário pelo Stripe Customer ID
          const user = await prisma.user.findFirst({
            where: {
              stripeCustomerId: subscription.customer as string,
            },
          });

          if (!user) {
            throw new Error('User not found');
          }

          // Determinar o tipo de plano baseado no priceId
          const isIniciante = Object.values(PRICE_IDS.INICIANTE).some(id => id === priceId);
          const isPro = Object.values(PRICE_IDS.PRO).some(id => id === priceId);

          // Atualizar status premium baseado no plano
          await prisma.user.update({
            where: { id: user.id },
            data: {
              isPremium: true,
              isSuperPremium: isPro,
            },
          });
          break;

        case 'customer.subscription.deleted':
          const deletedSubscription = event.data.object as Stripe.Subscription;
          
          // Buscar o usuário pelo Stripe Customer ID
          const userToUpdate = await prisma.user.findFirst({
            where: {
              stripeCustomerId: deletedSubscription.customer as string,
            },
          });

          if (!userToUpdate) {
            throw new Error('User not found');
          }

          // Remover status premium
          await prisma.user.update({
            where: { id: userToUpdate.id },
            data: {
              isPremium: false,
              isSuperPremium: false,
            },
          });
          break;
      }

      return new NextResponse(JSON.stringify({ received: true }));
    } catch (error) {
      console.error('Webhook error:', error);
      return new NextResponse('Webhook handler failed', { status: 500 });
    }
  }

  return new NextResponse(JSON.stringify({ received: true }));
}
