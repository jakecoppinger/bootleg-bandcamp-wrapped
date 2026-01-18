import { generateCurrencyConversions } from "./currency";
import { Album, CurrencyConversion } from "./interfaces";

/** Calculate total cost of the albums by looking
 * up the currency of each album and converting to the target currency.
 */
export function calculateTotalCost({ albums, currencyConversions }:
  { albums: Album[], currencyConversions: CurrencyConversion }): number {
  const missingCurrencies: string[] = [];
  let totalCostInTargetCurrency = 0;
  for (const album of albums) {
    if (album.currency.trim() === "") {
      console.error(`Album ${album.title} has empty currency value`);
      continue;
    }
    const currencyRatio = currencyConversions[album.currency];
    if (!currencyRatio) {
      missingCurrencies.push(album.currency);
      continue;
    }
    const albumCostInTargetCurrency = parseFloat(album.cost) * currencyRatio;
    totalCostInTargetCurrency += albumCostInTargetCurrency;
  }
  console.warn(`Missing currencies: ${[...new Set(missingCurrencies)].join(", ")}`);
  return totalCostInTargetCurrency;
}


/** Generate text stating how much the user spent on Bandcamp
 * across the given albums.
 */
export function generateSpendingText({ albums, targetCurrency, targetYear }:
  { albums: Album[], targetCurrency: string, targetYear: number }): string {
  const currencyConversions = generateCurrencyConversions({ targetCurrency });
  const totalCostInTargetCurrency = calculateTotalCost({ albums, currencyConversions });
  return `You spent ~${Math.round(totalCostInTargetCurrency)} ${targetCurrency} on Bandcamp in ${targetYear}.`;
}