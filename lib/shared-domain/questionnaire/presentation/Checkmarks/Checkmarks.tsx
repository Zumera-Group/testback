import React from 'react';
import styles from 'lib/shared-domain/questionnaire/presentation/Checkmarks/Checkmarks.module.scss';
import { GridColumn } from '../../../../../components/Layout';
import { Questionnaire } from '../../domain';

export const Checkmarks = ({ isQuestionnaireCompactOnMobile = false, result }: {
  isQuestionnaireCompactOnMobile?: boolean,
  result: Questionnaire['result']
}) => {
  return (
    <GridColumn
      sm={12}
      md={12}
      lg={2}
      className={isQuestionnaireCompactOnMobile ? styles.checkmarksCompact : styles.checkmarksDefault}
    >
      {result?.greenCheckmarkTexts?.map((mark) => (
        <div
          className={styles.checkmarkItem}
          key={mark}>
          <img src="/calculator/checkmark-v2.svg" alt={mark} />
          <h5 className={styles.checkmarkText}>{mark}</h5>
        </div>
      ))}
    </GridColumn>);
};

