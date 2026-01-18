// Hardcoded conversions - this is rough anyway

// TODO: Support more than just aud and usd, without need for duplication.

import { CurrencyConversion } from "./interfaces";

export function generateCurrencyConversions({ targetCurrency }:
    { targetCurrency: string }): CurrencyConversion {
    if (targetCurrency === "AUD") {
        return {
            "AUD": 1.0,
            "USD": 1.49,
            "GBP": 2.0,
            "EUR": 1.7,
            "CAD": 1.07,
            "NZD": 1.01,
            "JPY": 0.0094,
            "CZK": 0.071
        }
    } else if (targetCurrency === "USD") {
        return {
            "USD": 1.0,
            "AUD": 0.67,
            "GBP": 1.34,
            "EUR": 1.16,
            "CAD": 0.72,
            "NZD": 0.58,
            "JPY": 0.0063,
            "CZK": 0.048
        }
    } else {
        throw new Error(`Currency not yet implemented`)
    }
}