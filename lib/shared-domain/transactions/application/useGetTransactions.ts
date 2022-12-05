import { Locale } from 'lib/locale';
import { TransactionFacade } from '../infrastructure/transaction.facade';

export const fetchTransactions = async (locale: Locale) => {
  const facade = new TransactionFacade();

  return await facade.getTransactions(locale);
};

export const useFetchTransactions = async (locale: Locale) => {
  const site = await fetchTransactions(locale);

  return { site };
};
