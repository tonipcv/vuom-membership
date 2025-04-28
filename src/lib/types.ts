import { SupportedCurrency, SupportedLanguage } from './constants';

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: SupportedCurrency;
  image?: string;
  features: string[];
  stripeProductId: string;
  stripePriceId: string;
}

export interface Subscription {
  id: string;
  userId: string;
  productId: string;
  status: 'active' | 'canceled' | 'expired';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentSession {
  id: string;
  userId: string;
  productId: string;
  status: 'pending' | 'completed' | 'failed';
  amount: number;
  currency: SupportedCurrency;
  stripeSessionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  userId: string;
  language: SupportedLanguage;
  currency: SupportedCurrency;
  emailNotifications: boolean;
  createdAt: Date;
  updatedAt: Date;
} 