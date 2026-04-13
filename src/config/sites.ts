export type SiteId =
  | 'glodny-niedzwiedz';

export type Currency = 'PLN' | 'EUR';
export type OrderingFlow = 'weekly';
export type PaymentMethod = 'card' | 'blik' | 'p24';

export interface DeliveryConfig {
  type: 'free' | 'per-order' | 'per-day';
  costPerDay?: number;
  costPerOrder?: number;
}

export interface PaymentConfig {
  methods: PaymentMethod[];
  cashOption: boolean;
}

export interface CheckoutConfig {
  /** City list shown in dropdown */
  cities: string[];
  /** Phone input placeholder */
  phonePlaceholder: string;
  /** Street input placeholder */
  streetPlaceholder: string;
  /** Whether to show the NIP field */
  vatField: 'nip-pl' | null;
  /** Whether to show the company name field */
  showCompanyName: boolean;
  /** Run Nominatim street validation (PL-specific) */
  addressValidation: boolean;
  /** ISO country code for Nominatim (e.g. 'pl', 'nl') */
  nominatimCountryCode: string;
}

export interface SiteConfig {
  id: SiteId;
  name: string;
  domain: string;
  currency: Currency;
  /** Fraction (0.05 = 5%). 0 = no discount. */
  onlineDiscount: number;
  payment: PaymentConfig;
  delivery: DeliveryConfig;
  orderingFlow: OrderingFlow;
  menuKey: 'full';
  locales: readonly string[];
  defaultLocale: string;
  /** Path relative to /public */
  logo: string;
  checkout: CheckoutConfig;
  /** Browser tab title */
  siteTitle: string;
  /** Page description for SEO */
  siteDescription: string;
  /** Path relative to /public — used as favicon */
  favicon: string;
}

const SITES: Record<SiteId, SiteConfig> = {
  'glodny-niedzwiedz': {
    id: 'glodny-niedzwiedz',
    name: 'Głodny Niedźwiedź',
    domain: 'glodnyniedzwiedz.pl',
    currency: 'PLN',
    onlineDiscount: 0.05,
    payment: { methods: ['card', 'blik', 'p24'], cashOption: true },
    delivery: { type: 'free' },
    orderingFlow: 'weekly',
    menuKey: 'full',
    locales: ['pl', 'en'],
    defaultLocale: 'pl',
    logo: '/favicons/hb.png',
    siteTitle: 'Głodny Niedźwiedź – Catering',
    siteDescription: 'Zamów pyszne jedzenie z dostawą do biura. Tygodniowe menu, dostawa 8:00–10:00.',
    favicon: '/favicons/hb.png',
    checkout: {
      cities: ['Warszawa', 'Kraków', 'Wrocław', 'Poznań', 'Gdańsk', 'Łódź', 'Katowice', 'Gdynia'],
      phonePlaceholder: '+48 500 123 456',
      streetPlaceholder: 'ul. Marszałkowska 1/10',
      vatField: 'nip-pl',
      showCompanyName: true,
      addressValidation: true,
      nominatimCountryCode: 'pl',
    },
  },


};

export function getSiteConfig(): SiteConfig {
  return SITES['glodny-niedzwiedz'];
}



/** Stripe-supported locale codes. Falls back to 'en' if not in the list. */
const STRIPE_LOCALES = new Set([
  'bg', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'fi',
  'fr', 'hu', 'id', 'it', 'ja', 'lt', 'lv', 'ms', 'mt',
  'nb', 'nl', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sv',
  'th', 'tr', 'vi', 'zh',
]);

export function toStripeLocale(locale: string): import('stripe').Stripe.Checkout.SessionCreateParams['locale'] {
  return (STRIPE_LOCALES.has(locale) ? locale : 'en') as import('stripe').Stripe.Checkout.SessionCreateParams['locale'];
}
