import React from 'react';

import { getTranslateByScope } from 'translation/i18n';

const t = getTranslateByScope('question');

import styles from './RequiredQuestionInfo.module.scss';

export const RequiredQuestionInfo: React.FC<{ isRequired: boolean }> = ({
  isRequired,
}) => {
  if (!isRequired) return null;

  return <p className={styles.requiredQuestionInfo}>{t('required')}</p>;
};
