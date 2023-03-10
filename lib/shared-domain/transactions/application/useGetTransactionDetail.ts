import { Locale } from 'lib/locale';
import { TransactionFacade } from '../infrastructure/transaction.facade';

export const fetchTransactionDetail = async (
  locale: Locale,
  slug: string,
  preview?: boolean,
) => {
  const facade = new TransactionFacade();

  return await facade.getTransactionDetail(locale, slug, preview);
};
