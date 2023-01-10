import { AllTransactionsCarouselSectionModule } from 'lib/shared-domain/page/domain/contentModule';
import { Transaction } from 'lib/shared-domain/transactions/domain';

export const filterTransactions = (
  specificContentModule: AllTransactionsCarouselSectionModule | any,
  transactions: Transaction[],
) => {
  try {
    if (specificContentModule.showAll) return transactions;

    const sectorKeys = specificContentModule.sectors?.map((s) => s._ref);

    const transactionFiltered = transactions?.filter((transaction) => {
      const sectors = transaction?.sectors || [];
      return sectors.some((s) => sectorKeys?.includes?.(s._id));
    });

    return transactionFiltered;
  } catch (e) {
    return [];
  }
}