import React, {useMemo} from 'react';
import {ILeadEntryScore} from '../../../../../../@types/api';
import styles from './CompanyEVTable.module.scss';
import clsx from 'clsx';
import {IResultScreenCopy} from '../../../domain';

export default function CompanyEVTable({resultScreenCopy, score, className, blurred = false}: {
  resultScreenCopy: IResultScreenCopy;
  score?: ILeadEntryScore,
  blurred?: boolean,
  className?: string
}) {
  const {max, avg, min, isEmpty, maxPercentage, minPercentage, avgPercentage} = useMemo(() => {
    let max = null, avg = null, min = null, isEmpty = false, maxPercentage = null, minPercentage = null, avgPercentage = null;

    if (blurred) {
      maxPercentage = 100;
      minPercentage = 40;
      avgPercentage = 70;
    } else {
      if (
        !score.company_ev
        || score.company_ev.min === null
        || score.company_ev.max === null
        || score.company_ev.avg === null
      ) {
        isEmpty = true;
      } else {
        min = score.company_ev.min;
        max = score.company_ev.max;
        avg = score.company_ev.avg;

        maxPercentage = 100;
        minPercentage = Math.round(min / max * 100);
        avgPercentage = Math.round(avg / max * 100);
      }
    }
    return {max, avg, min, isEmpty, maxPercentage, minPercentage, avgPercentage};
  }, [score, blurred]);

  if (isEmpty) {
    return null;
  }

  const labels = resultScreenCopy.scenarioEvaluationLabels || null;

  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={clsx(styles.scenarioCol, styles.headerCol)}>{labels?.scenario || 'Scenario'}</div>
          <div className={clsx(styles.valueCol, styles.headerCol, styles.headerColHideOnXs)} style={{justifyContent: 'center'}}>
            {labels?.evaluation || 'Evaluation'}
          </div>
          {/*<div className={clsx(styles.evaluationCol, styles.headerCol, styles.headerColHideOnXs)}>{t('evaluation')}</div>*/}
        </div>
        <Row title={labels?.good || 'Good'} value={max} percentage={maxPercentage} blurred={blurred} mode={TRowMode.max}/>
        <Row title={labels?.average || 'Average'} value={avg} percentage={avgPercentage} blurred={blurred} mode={TRowMode.avg}/>
        <Row title={labels?.worst || 'Worst'} value={min} percentage={minPercentage} blurred={blurred} mode={TRowMode.min}/>
      </div>
    </div>
  );
}


enum TRowMode {
  max = 'max',
  min = 'min',
  avg = 'avg'
}

const Row = ({title, percentage, mode, blurred = false, value = null}: {
  title: string,
  percentage: number,
  mode: TRowMode,
  value?: number|null,
  blurred?: boolean
}) => {
  return (
    <div className={styles.bodyRow}>
      <div className={styles.scenarioCol}>{title}</div>
      <div className={clsx(styles.valueCol, {[styles.bodyBlurredCol]: blurred})}>
        {/*style={{width: `${percentage}%`}}*/}
        <div className={clsx(styles.percentageBlock, {
          [styles.percentageBlockMax]: mode == TRowMode.max,
          [styles.percentageBlockAvg]: mode == TRowMode.avg,
          [styles.percentageBlockMin]: mode == TRowMode.min
        })}>
          {/*{percentage}%*/}
          {value !== null &&
          <>
            {mode == TRowMode.max && <>&gt; </>}
            {mode == TRowMode.min && <>&lt; </>}
            {formatMoney(value)}
          </>}
        </div>
      </div>
      {/*<div className={clsx(styles.evaluationCol, styles.bodyEvaluationCol, {[styles.bodyBlurredCol]: blurred})}>*/}
      {/*  {value !== null && formatMoney(value)}*/}
      {/*  {blurred && '€ 0000000'}*/}
      {/*</div>*/}
    </div>
  );
};

const formatMoney = (value: number) => {
  const locale = 'de';
  // if (globalTranslate.locale == 'de') {
  //   locale = 'de';
  // } else if (globalTranslate.locale == 'fr') {
  //   locale = 'fr';
  // }

  value = Math.round(value);

  let suffix = '';
  if (value > 1000000000) {
    suffix = 'B';
  } else if (value > 1000000) {
    suffix = 'M';
    value = value / 1000000;
  } else if (value > 1000) {
    suffix = 'K';
    value = value / 1000;
  }

  const formattedValue = new Intl.NumberFormat(locale, {
    // style: 'currency',
    // currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 3
  })
    .format(value);

  return `${formattedValue}${suffix} €`;
  // return new Intl.NumberFormat(locale, {
  //   style: 'currency',
  //   currency: 'EUR',
  //   minimumFractionDigits: 0,
  //   maximumFractionDigits: 0
  // })
  //   .format(Math.round(value));
};