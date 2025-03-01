import React, {useMemo} from 'react';
import {ILeadEntryScore} from '../../../../../../@types/api';
import {getTranslateByScope, globalTranslate} from '../../../../../../translation/i18n';
import styles from './CompanyEVTable.module.scss';
import clsx from 'clsx';

const t = getTranslateByScope('companyEVTable');

export default function CompanyEVTable({score, className, blurred = false}: {
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

  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={clsx(styles.scenarioCol, styles.headerCol)}>{t('scenario')}</div>
          <div className={clsx(styles.valueCol, styles.headerCol)}>{t('value')}</div>
          <div className={clsx(styles.evaluationCol, styles.headerCol)}>{t('evaluation')}</div>
        </div>
        <Row title={t('best')} value={max} percentage={maxPercentage} blurred={blurred} />
        <Row title={t('average')} value={avg} percentage={avgPercentage} blurred={blurred} />
        <Row title={t('worst')} value={min} percentage={minPercentage} blurred={blurred} />
      </div>
    </div>
  );
}

const Row = ({title, percentage, blurred = false, value = null}: {
  title: string,
  percentage: number,
  value?: number|null,
  blurred?: boolean
}) => {
  return (
    <div className={styles.bodyRow}>
      <div className={styles.scenarioCol}>{title}</div>
      <div className={clsx(styles.valueCol, {[styles.bodyBlurredCol]: blurred})}>
        <div className={styles.percentageBlock} style={{width: `${percentage}%`}}>
          {percentage}%
        </div>
      </div>
      <div className={clsx(styles.evaluationCol, styles.bodyEvaluationCol, {[styles.bodyBlurredCol]: blurred})}>
        {value !== null && formatMoney(value)}
        {blurred && '€ 0000000'}
      </div>
    </div>
  );
};

const formatMoney = (value: number) => {
  let locale = 'en';
  if (globalTranslate.locale == 'de') {
    locale = 'de';
  } else if (globalTranslate.locale == 'fr') {
    locale = 'fr';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
    .format(Math.round(value));
};