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
            "AUD": 1.5,
            "GBP": 0.75,
            "EUR": 0.86,
            "CAD": 1.39,
            "NZD": 1.74,
            "JPY": 158.34,
            "CZK": 20.92
        }
    } else {
        throw new Error(`Currency not yet implemented`)
    }
}