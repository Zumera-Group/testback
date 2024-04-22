'use client';

import React from 'react';
import {useValuationStore} from "../../lib/shared-domain/questionnaire/store";
import LinearProgress from '@mui/material/LinearProgress';
import styles from './BgProgress.module.scss';

export default function BgProgress() {
  const { bgPromises } = useValuationStore();

  return (
    <div className={styles.wrapper}>
      <LinearProgress color="secondary" />
    </div>
  );
}