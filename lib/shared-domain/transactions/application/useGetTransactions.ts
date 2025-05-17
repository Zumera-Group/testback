import { Locale } from 'lib/locale';
import { TransactionFacade } from '../infrastructure/transaction.facade';

export const fetchTransactions = async (locale: Locale) => {
  const facade = new TransactionFacade();

  return await facade.getTransactions(locale);
};

export const fetchTransactionsBySectorId = async (locale: Locale, sectorIId: string) => {
  const facade = new TransactionFacade();
  return await facade.getTransactionsBySectorId(locale, sectorIId);
};

export const fetchLastTransactions = async (locale: Locale) => {
  const facade = new TransactionFacade();
  return await facade.getLastTransactions(locale);
};