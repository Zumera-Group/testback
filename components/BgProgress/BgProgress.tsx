'use client';

import React, {useEffect, useState} from 'react';
import {useValuationStore} from '../../lib/shared-domain/questionnaire/store';
// import LinearProgress from '@mui/material/LinearProgress';
import styles from './BgProgress.module.scss';
import clsx from 'clsx';

export default function BgProgress() {
  const { bgPromises, cleanBgPromises } = useValuationStore();
  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    if (Array.isArray(bgPromises) && bgPromises.length > 0) {
      setShowLoading(true);
      Promise.allSettled(bgPromises)
        .then(() => {
          cleanBgPromises();
          setShowLoading(false);
        });
    } else {
      setShowLoading(false);
    }
  }, [bgPromises, setShowLoading, cleanBgPromises]);

  return (
    <div className={clsx(styles.wrapper, {
      [styles.hideWrapper]: !showLoading
    })}>
      {/*<LinearProgress color="secondary" />*/}
    </div>
  );
}