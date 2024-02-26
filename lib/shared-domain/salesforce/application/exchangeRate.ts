import { logError } from 'lib/logError';
import { Currencies } from 'lib/shared-domain/questionnaire/store';

/*
 * This function takes an amount and a currency and returns the amount in euro
 */
const convertToEuro = async (amount: number, currency: Currencies = 'EUR'): Promise<number> => {
  if (currency === 'EUR') {
    return amount;
  }

  try {
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=EUR`);
    const { rates: { EUR } } = await res.json();

    return EUR;
  } catch (error) {
    logError('Failed to convert currencies:', error);
  }
};


/*
 * This function fetches the exchange rates from the frankfurter API
 * and returns the rates for CHF and GBP in relation to EUR.
 */
async function fetchExchangeRates(): Promise<Record<Currencies, number> | null> {
  try {
    const response = await fetch(`https://api.frankfurter.app/latest?from=EUR&to=CHF,GBP`);
    const data = await response.json();
    return data.rates;
  } catch (error) {
    logError('Failed to fetch exchange rates:', error);
    return null;
  }
}

export const CurrencySymbols = {
  'EUR': '€',
  'CHF': 'F',
  'GBP': '£',
};

export const ExchangeRateService = {
  convertToEuro,
  fetchExchangeRates,
};