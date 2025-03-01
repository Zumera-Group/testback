import React, {useEffect, useState} from 'react';
import {useValuationStore} from '../../store';
import { useRouter } from 'next/router';
import { Locale } from 'lib/locale';
import {fetchTransactionsBySectorId} from '../../../transactions/application/useGetTransactions';
import {Transaction} from '../../../transactions/domain';
import {getTranslateByScope} from '../../../../../translation/i18n';
import styles from './LatestTransactions.module.scss';
import TransactionCard from '../../../../../components/TransactionGridSection/TransactionCard/TransactionCard';
import clsx from 'clsx';

export default function LatestTransactions() {
  const store = useValuationStore();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]|null>(null);
  const tr = getTranslateByScope('result');

  useEffect(() => {
    const sectorId = store.getAnswer('sector_id');
    if (sectorId) {
      fetchTransactionsBySectorId(router.locale as unknown as Locale, sectorId)
        .then((val) => {
          setTransactions(val);
        })
        .catch(console.error)
      ;
    }
  }, [store]);

  if (!transactions || !transactions.length) {
    return null;
  }

  return (
    <div>
      <h4 className={styles.title}>{tr('leftCol.ourRecentExpertise')}</h4>
      <div>
        {transactions.map((transaction, i) =>
          <div key={transaction._id} className={clsx(
            styles.transactionWrapper,
            {[styles.transactionWrapperFirst]: i == 0},
            {[styles.transactionWrapperRest]: i > 0},
          )}>
            <TransactionCard transaction={transaction} />
          </div>
        )}
      </div>
    </div>
  );
}