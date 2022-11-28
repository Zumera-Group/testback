import { useState, useEffect } from 'react';
import { Transaction } from '../../../../transactions/domain/index';

export const useTransactionGrid = (transactions: Transaction[]): any => {
  const MAX_TRANSACTIONS = 5;
  const [maxTransactionsToDisplay, setMaxTransactionsToDisplay] =
    useState<number>(MAX_TRANSACTIONS);
  const [transactionsSelected, setTransactionsSelected] =
    useState<Transaction[]>(transactions);

  const [currentSelection, setCurrentSelection] = useState({
    sector: 'ALL',
    service: 'ALL',
  });
  useEffect(() => {
    if (
      currentSelection.sector === 'ALL' &&
      currentSelection.sector === 'ALL'
    ) {
      setTransactionsSelected(transactions);
    }
  }, [JSON.stringify(transactions)]);
  const moreTransactionsToShow =
    transactionsSelected.length > maxTransactionsToDisplay;

  const onGetTransactionsSelected = (selection: {
    sector: string;
    service: string;
  }): void => {
    const transactionsWithSelectedSector: Transaction[] = transactions
      .sort(
        (a, b) =>
          new Date(b.date || null).getTime() -
          new Date(a.date || null).getTime(),
      )
      .filter((transaction) => {
        return transaction?.sectors?.find(
          (t) => t?.name === selection.sector || selection.sector === 'ALL',
        );
      });

    const transactionsWithSelectedServiceAndSector: Transaction[] =
      transactionsWithSelectedSector?.reduce(
        (allTransactions, currentTransaction) => {
          if (
            selection.service === 'ALL' ||
            currentTransaction.typeOfService?.name === selection.service
          )
            allTransactions.push(currentTransaction);
          return allTransactions;
        },
        [],
      );

    if (transactionsWithSelectedServiceAndSector.length === 0) {
      return setTransactionsSelected(transactionsWithSelectedSector);
    } else {
      setTransactionsSelected(transactionsWithSelectedServiceAndSector);
    }
  };

  const onSelectSector = (sector: string) => {
    setCurrentSelection((prevSelection) => ({
      ...prevSelection,
      sector,
    }));
    onGetTransactionsSelected({ ...currentSelection, sector });
  };
  const onSelectService = (service: string) => {
    setCurrentSelection((prevSelection) => ({
      ...prevSelection,
      service,
    }));
    onGetTransactionsSelected({ ...currentSelection, service });
  };

  const onShowMore = (): void => {
    setMaxTransactionsToDisplay((prevMax) => prevMax + MAX_TRANSACTIONS);
  };

  return {
    onSelectService,
    onSelectSector,
    onShowMore,
    transactionsSelected,
    moreTransactionsToShow,
    maxTransactionsToDisplay,
  };
};
