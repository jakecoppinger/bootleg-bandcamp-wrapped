export interface Album {
  url: string
  title: string
  artist: string
  art: string
  cost: string
  currency: string
}

/** 
 * Format: currency: ratio
 * eg. { AUD: 1, GBP: 1.5, EUR: 1.7, USD: 1.3, CAD: 1.2 }
 * Todo: Implement this as a map of currency pairs, so
 * they can be looked up without being duplicated.
*/
export type CurrencyConversion = Record<string, number>