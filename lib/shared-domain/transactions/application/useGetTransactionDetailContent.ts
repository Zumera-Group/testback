import { Locale } from 'lib/locale';
import { TransactionFacade } from '../infrastructure/transaction.facade';

export const fetchTransactionDetailContent = async (locale: Locale) => {
  const facade = new TransactionFacade();

  return await facade.getTransactionDetailContent(locale);
};
