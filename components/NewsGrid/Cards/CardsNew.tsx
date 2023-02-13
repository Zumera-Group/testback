import { TwoNews } from 'components/NewsGrid/Cards/TwoNews';
import { NewsBig } from 'components/NewsGrid/Cards/NewsBig';
import { TransactionBig } from 'components/NewsGrid/Cards/TransactionBig';
import { Employee } from 'components/NewsGrid/Cards/Employee';
import styles from './Cards.module.scss';
import { Grid, GridColumn } from 'components/Layout';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';

export const CardsNew = ({
  cardsRow,
  highlightedArticleSection,
  isFirstChunk,
}) => {
  const { downloadButtonContent } = useSharedContentContext();
  // console.log(downloadButtonContent);
  const {
    highLightedArticle,
    customTitle,
    customTitleLink,
    customTitleImage,
    date,
  } = highlightedArticleSection || {};
  const hasHighlighted = highLightedArticle;
  const highlightedCard = {
    ...highlightedArticleSection?.highlightedPage,
    title: customTitle || highlightedArticleSection?.highlightedPage?.title,
    customLink: customTitleLink,
    date: date || highlightedArticleSection?.highlightedPage?.date,
    picture:
      customTitleImage || highlightedArticleSection?.highlightedPage?.picture,
    _type: customTitle
      ? 'newsArticle'
      : highlightedArticleSection?.highlightedPage?._type,
  };

  const firstCard = hasHighlighted ? highlightedCard : cardsRow[0];
  const secondCards = [cardsRow[1], cardsRow[2]];
  const othersCards = isFirstChunk ? cardsRow.slice(3) : cardsRow;

  const cards = [];
  othersCards.forEach((item, index) => {
    if (
      item?._type === 'newsArticle' &&
      !item?.secondPicture &&
      !item?.picture
    ) {
      const prev = othersCards[index - 1];
      const isPrevAlreadyAdded = cards.indexOf(prev);
      const next = othersCards[index + 1];
      const isNextAlreadyAdded = cards.indexOf(next);
      if (typeof prev === 'object') {
        if (isPrevAlreadyAdded > -1) {
          cards.splice(prev, 1);
        }
        cards.push([prev, item]);
      } else if (typeof next === 'object') {
        if (isNextAlreadyAdded > -1) {
          cards.splice(next, 1);
        }
        cards.push([item, next]);
      }
      return;
    }
    cards.push(item);
  });

  return (
    <div className={styles.cardsNew}>
      {isFirstChunk ? (
        <Grid className={styles.grid}>
          <GridColumn
            sm={12}
            md={hasHighlighted ? 6 : 5}
            lg={hasHighlighted ? 6 : 5}
            className={[
              styles.col,
              hasHighlighted ? styles.highlighted : '',
            ].join(' ')}
          >
            {getBigCardType(firstCard)}
          </GridColumn>
          <GridColumn
            sm={12}
            md={hasHighlighted ? 6 : 7}
            lg={hasHighlighted ? 6 : 7}
            className={[styles.col, styles.twoNewsTile].join(' ')}
          >
            {secondCards.map((subArticle) => getSmallCardType(subArticle))}
          </GridColumn>
        </Grid>
      ) : null}
      {sliceIntoChunks(cards, 2).map((row, i) => {
        const isOdd = i % 2 !== 0;
        const isOneInLine = row.length === 1;
        const wideColException = isOneInLine ? 12 : 8;
        return (
          <Grid className={styles.grid} key={i}>
            {row.map((article, index) => {
              const isEven = index % 2 === 0;
              const wideColl = isOdd && index === 0 ? wideColException : 4;
              const smallColl = isOdd && index === 1 ? 4 : 8;
              return article?.length ? (
                <GridColumn
                  sm={12}
                  md={isEven ? wideColl : smallColl}
                  lg={isEven ? wideColl : smallColl}
                  className={[
                    styles.col,
                    styles.twoNewsTile,
                    `col_${wideColl}`,
                  ].join(' ')}
                  key={index}
                >
                  {article.map((subArticle) => getSmallCardType(subArticle))}
                </GridColumn>
              ) : (
                <GridColumn
                  key={article?._id}
                  sm={12}
                  md={isEven ? wideColl : smallColl}
                  lg={isEven ? wideColl : smallColl}
                  className={styles.col}
                >
                  {/*className={styles.smallCard}*/}
                  {getSmallCardType(article)}
                </GridColumn>
              );
            })}
          </Grid>
        );
      })}
    </div>
  );
};

function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

const getBigCardType = (card) => {
  if (!card) {
    return null;
  }
  if (card._type === 'newsArticle') {
    return <NewsBig article={card} key={card._id} />;
  }
  if (card._type === 'employee') {
    return <Employee article={card} key={card._id} />;
  }
  if (card._type === 'transaction') {
    return <TransactionBig article={card} key={card._id} />;
  }
};

const getSmallCardType = (card) => {
  if (!card) {
    return null;
  }
  if (card._type === 'newsArticle') {
    return card.secondPicture || card.picture ? (
      <NewsBig article={card} key={card._id} />
    ) : (
      <TwoNews article={card} key={card._id} />
    );
  }
  if (card._type === 'employee') {
    return <Employee article={card} key={card._id} />;
  }
  if (card._type === 'transaction') {
    return <TransactionBig article={card} key={card._id} />;
  }
};
