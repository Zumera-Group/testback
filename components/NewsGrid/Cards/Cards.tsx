import React from 'react';
import cx from 'classnames';
import { Employee, TwoNews, NewsBig, TransactionBig, Download } from './index';

import { CardType, CardsConfig } from './interfaces';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';

import styles from './Cards.module.scss';
import { Grid, GridColumn } from 'components/Layout';

export const Cards = ({
  news,
  transactions,
  employee,
  isDownloadVisible,
  isAfterSecondBlock,
  highlightedArticleSection,
}): any => {
  const { downloadButtonContent } = useSharedContentContext();

  const isHighlightedEnabled = highlightedArticleSection?.highLightedArticle;

  const items = CardsConfig({ isDownloadVisible, isHighlightedEnabled })
    .map((item, i) => {
      if (!item) return null;

      if (item.type === CardType.Employee) {
        if (!employee) return null;
        return (
          <Employee
            article={employee}
            key={`newsGridCards-item-article-${i}`}
            cardLabel={''}
          />
        );
      }

      if (item.type === CardType.TwoNews) {
        const firstItem = news?.[item.index1];
        const secondItem = news?.[item.index2];
        if (!firstItem && !secondItem) return null;
        return (
          <div
            className={styles.twoNewsRow}
            key={`newsGridCards-item-article-${i}`}
          >
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
        return (
          <NewsBig
            article={firstItem}
            key={`newsGridCards-item-article-${i}`}
          />
        );
      }

      if (item.type === CardType.TransactionBig) {
        const firstItem = transactions?.[item.index1];
        if (!firstItem) return null;
        return (
          <TransactionBig
            article={firstItem}
            key={`newsGridCards-item-article-${i}`}
          />
        );
      }

      if (item.type === CardType.Download) {
        return (
          <Download
            article={downloadButtonContent}
            key={`newsGridCards-item-article-${i}`}
          />
        );
      }

      return null;
    })
    .filter((v) => v);

  if (!items?.length) return null;

  const remappedElements = items.reduce(
    (accumulator, currentValue, currentIndex, array) => {
      if (currentIndex % 2 === 0) {
        accumulator.push(array.slice(currentIndex, currentIndex + 2));
      }
      return accumulator;
    },
    [],
  );

  return (
    <div className={styles.cards}>
      {remappedElements.map((elements, i) => {
        const isOdd = i % 2 !== 0;
        return (
          <Grid
            className={cx(styles.grid, { [styles.reverse]: isOdd })}
            key={`grid-news-grid-${i}`}
            alignItems={i === 0 ? 'start' : 'stretch'}
          >
            {elements.map((item, index) => {
              const smallCallCards =
                ['newsArticle', 'transaction'].indexOf(
                  item.props?.article?._type,
                ) > -1;
              const isEven = index % 2 === 0;
              const wideCallException =
                item.props?.article?._type === 'employee' ? 6 : 4;
              const wideColl = i === 0 && index === 0 ? wideCallException : 8;
              const smallCallException = index === 1 && smallCallCards ? 8 : 5;
              const smallColl = i === 0 ? smallCallException : 4;
              return (
                <GridColumn
                  sm={12}
                  md={isEven ? wideColl : smallColl}
                  lg={isEven ? wideColl : smallColl}
                  key={i}
                  className={styles.col}
                >
                  {item}
                </GridColumn>
              );
            })}
          </Grid>
        );
      })}
    </div>
  );
};

export default Cards;
