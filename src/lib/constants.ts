export const SUPPORTED_CURRENCIES = ['USD', 'BRL', 'EUR'] as const;
export type SupportedCurrency = typeof SUPPORTED_CURRENCIES[number];

export const SUPPORTED_LANGUAGES = ['en', 'pt', 'es'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  'USD': '$',
  'BRL': 'R$',
  'EUR': '€'
};

// Single source of truth for region to currency mapping
export const REGION_CURRENCIES: Record<string, SupportedCurrency> = {
  'US': 'USD',
  'BR': 'BRL',
  'ES': 'EUR',
  'PT': 'EUR',
  'OTHER': 'USD'
};

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en'; 