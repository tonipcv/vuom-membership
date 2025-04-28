import { SupportedCurrency } from './constants';

// List of regions we support
export const SUPPORTED_REGIONS = ['US', 'BR', 'ES', 'PT'] as const;
export type SupportedRegion = typeof SUPPORTED_REGIONS[number];

/**
 * Detects user's region based on browser's language and timezone
 * Falls back to 'US' if unable to determine
 */
export function detectUserRegion(headers?: Headers): SupportedRegion {
  try {
    // If running on server, try to get from Accept-Language header
    if (headers) {
      const acceptLanguage = headers.get('accept-language');
      if (acceptLanguage) {
        const lang = acceptLanguage.split(',')[0].toUpperCase();
        if (lang.startsWith('PT')) {
          return lang.includes('BR') ? 'BR' : 'PT';
        }
        if (lang.startsWith('ES')) {
          return 'ES';
        }
        if (lang.startsWith('EN')) {
          return 'US';
        }
      }
      return 'US';
    }

    // If running on client
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language.toUpperCase();
      
      if (browserLang.startsWith('PT')) {
        return browserLang.includes('BR') ? 'BR' : 'PT';
      }
      if (browserLang.startsWith('ES')) {
        return 'ES';
      }
      if (browserLang.startsWith('EN')) {
        return 'US';
      }

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timezone.includes('America/Sao_Paulo')) {
        return 'BR';
      }
      if (timezone.includes('Europe/Madrid')) {
        return 'ES';
      }
      if (timezone.includes('Europe/Lisbon')) {
        return 'PT';
      }
    }

    return 'US';
  } catch (error) {
    // If anything fails, return US as default
    return 'US';
  }
} 