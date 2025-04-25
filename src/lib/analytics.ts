// Triple Whale Analytics Utilities

declare global {
  interface Window {
    TriplePixel?: (event: string, data: any) => void;
  }
}

interface AddToCartParams {
  item: string;
  q: number;
  v: string;
  token?: string;
  planName?: string;
  planPrice?: number;
  currency?: string;
}

interface ContactParams {
  email?: string;
  phone?: string;
}

/**
 * Tracks an Add to Cart event using Triple Whale
 * @param params Object containing item ID, quantity, variant ID, and optional cart token
 */
export const trackAddToCart = (params: AddToCartParams) => {
  if (typeof window !== 'undefined' && window.TriplePixel) {
    // Add additional metadata for better tracking
    const eventData = {
      ...params,
      event_category: 'subscription',
      event_label: params.planName || 'subscription_plan',
      value: params.planPrice || 0,
      currency: params.currency || 'BRL'
    };

    window.TriplePixel('AddToCart', eventData);
  }
};

/**
 * Tracks user contact information using Triple Whale
 * @param params Object containing email and/or phone
 */
export const trackContact = (params: ContactParams) => {
  if (typeof window !== 'undefined' && window.TriplePixel) {
    window.TriplePixel('Contact', params);
  }
};

/**
 * Polls for TriplePixel availability and executes tracking
 * @param params Contact parameters to track
 */
export const ensureAndTrackContact = (params: ContactParams) => {
  function attemptTracking() {
    if (typeof window !== 'undefined' && window.TriplePixel) {
      trackContact(params);
      return true;
    }
    return false;
  }

  // Try immediately
  if (!attemptTracking()) {
    // If not successful, try again every 400ms for up to 5 seconds
    let attempts = 0;
    const maxAttempts = 12; // 5 seconds total (12 * 400ms = 4800ms)
    
    const interval = setInterval(() => {
      attempts++;
      if (attemptTracking() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 400);
  }
};

// Example usage:
// trackAddToCart({
//   item: '4428522618989',
//   q: 1,
//   v: '9898162258244',
//   token: 'optional-cart-token'
// }); 