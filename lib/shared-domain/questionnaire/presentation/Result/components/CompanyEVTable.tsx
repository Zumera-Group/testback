import React from 'react';
import {ILeadEntryScore} from '../../../../../../@types/api';
import {getTranslateByScope, globalTranslate} from '../../../../../../translation/i18n';
import styles from './CompanyEVTable.module.scss';
import clsx from 'clsx';

const t = getTranslateByScope('companyEVTable');

export default function CompanyEVTable({score, className}: {score: ILeadEntryScore, className?: string}) {
  if (
    !score.company_ev
    || score.company_ev.min === null
    || score.company_ev.max === null
    || score.company_ev.avg === null
  ) {
    return null;
  }

  const maxPercentage = 100;
  const minPercentage = Math.round(score.company_ev.min / score.company_ev.max * 100);
  const avgPercentage = Math.round(score.company_ev.avg / score.company_ev.max * 100);

  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.resultsLabel}>{t('results')}</div>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={clsx(styles.scenarioCol, styles.headerCol)}>{t('scenario')}</div>
          <div className={clsx(styles.valueCol, styles.headerCol)}>{t('value')}</div>
          <div className={clsx(styles.evaluationCol, styles.headerCol)}>{t('evaluation')}</div>
        </div>
        <Row title={t('best')} value={score.company_ev.max} percentage={maxPercentage} />
        <Row title={t('average')} value={score.company_ev.avg} percentage={avgPercentage} />
        <Row title={t('worst')} value={score.company_ev.min} percentage={minPercentage} />
      </div>
    </div>
  );
}

const Row = ({title, value, percentage}: {title: string, value: number, percentage: number}) => {
  return (
    <div className={styles.bodyRow}>
      <div className={styles.scenarioCol}>{title}</div>
      <div className={styles.valueCol}>
        <div className={styles.percentageBlock} style={{width: `${percentage}%`}}>
          {percentage}%
        </div>
      </div>
      <div className={clsx(styles.evaluationCol, styles.bodyEvaluationCol)}>
        {formatMoney(value)}
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