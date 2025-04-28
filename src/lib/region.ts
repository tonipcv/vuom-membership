import { SupportedCurrency } from './constants';
import { Region } from './prices';

// List of regions we support
export const SUPPORTED_REGIONS = ['US', 'UK', 'EU', 'BR', 'OTHER'] as const;
export type SupportedRegion = Region;

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
          return 'BR';
        }
        if (lang.startsWith('ES')) {
          return 'EU';
        }
        if (lang.startsWith('EN')) {
          return lang.includes('GB') ? 'UK' : 'US';
        }
      }
      return 'US';
    }

    // If running on client
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language.toUpperCase();
      
      if (browserLang.startsWith('PT')) {
        return 'BR';
      }
      if (browserLang.startsWith('ES')) {
        return 'EU';
      }
      if (browserLang.startsWith('EN')) {
        return browserLang.includes('GB') ? 'UK' : 'US';
      }

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timezone.includes('America/Sao_Paulo')) {
        return 'BR';
      }
      if (timezone.includes('Europe/')) {
        return 'EU';
      }
      if (timezone.includes('America/')) {
        return 'US';
      }
      if (timezone.includes('Europe/London')) {
        return 'UK';
      }
    }

    return 'OTHER';
  } catch (error) {
    console.error('Error detecting region:', error);
    return 'OTHER';
  }
} 