import React from 'react';
import {
  Employee,
  TwoNews,
  NewsBig,
  TransactionBig,
  Download,
} from './index';

import { CardType, CardsConfig } from './interfaces';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';

import styles from './Cards.module.scss';

export const Cards = ({
  news,
  transactions,
  employee,
  isDownloadVisible,
  isAfterSecondBlock,
}): any => {
  const { downloadButtonContent } = useSharedContentContext();

  const items = CardsConfig({ isDownloadVisible }).map((item) => {
    if (!item) return null;

    if (item.type === CardType.Employee) {
      if (!employee) return null;
      return <Employee article={employee} />;
    }

    if (item.type === CardType.TwoNews) {
      const firstItem = news?.[item.index1];
      const secondItem = news?.[item.index2];
      if (!firstItem && !secondItem) return null;
      return (
        <div className={styles.twoNewsRow}>
          <div className={styles.twoNewsCol}>
            <TwoNews article={firstItem} />
          </div>
          <div className={styles.twoNewsCol}>
            <TwoNews article={secondItem} />
          </div>
        </div>
      );
    }

    if (item.type === CardType.NewsBig) {
      const firstItem = news?.[item.index1];
      if (!firstItem) return null;
      return <NewsBig article={firstItem} />;
    }

    if (item.type === CardType.TransactionBig) {
      const firstItem = transactions?.[item.index1];
      if (!firstItem) return null;
      return <TransactionBig article={firstItem} />
    }

    if (item.type === CardType.Download) {
      return <Download article={downloadButtonContent} />;
    }

    return null;
  }).filter((v) => v);

  if (!items?.length) return null;

  return (
    <div className={styles.cards}>
      {items?.map((item, i) => (
        <React.Fragment key={`newsGridCards-item-${i}`}>
          {item}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Cards;