'use client';

import React, {useCallback, useEffect, useRef} from 'react';
// import Alert from '@mui/material/Alert';
// import Snackbar from '@mui/material/Snackbar';
import {useValuationStore} from '../../lib/shared-domain/questionnaire/store';
import styles from './GlobalAlert.module.scss';
import clsx from 'clsx';
import {TGlobalAlertType} from '../../@types/alert';

export default function GlobalAlert() {
  const { globalAlert, setGlobalAlert } = useValuationStore();
  const timeout = useRef(null);
  const handleClose = useCallback(() => {
    setGlobalAlert(null);
  }, [setGlobalAlert])

  useEffect(() => {
    if (globalAlert) {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => setGlobalAlert(null), 6000);
    }
  }, [globalAlert, setGlobalAlert]);

  return (
    <div className={clsx(styles.snackBar, {
      [styles.snackBarHidden]: !styles.snackBarHidden,
      [styles.snackBarVisible]: styles.snackBarVisible,
    })}>
      {globalAlert &&
      <div className={clsx(styles.alert, {
        [styles.alertSuccess]: globalAlert.type === TGlobalAlertType.success,
        [styles.alertInfo]: globalAlert.type === TGlobalAlertType.info,
        [styles.alertWarning]: globalAlert.type === TGlobalAlertType.warning,
        [styles.alertError]: globalAlert.type === TGlobalAlertType.error
      })}>
        {globalAlert.text}
        <button
          type="button"
          className={clsx('btn-close', styles.closeBtn)}
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </div>}
    </div>
  );
}

//doest work due to types misconfiguration
// <Snackbar
//   open={Boolean(globalAlert)}
//   autoHideDuration={6000}
//   onClose={handleClose}
//   anchorOrigin={{vertical: 'top', horizontal: 'right'}}
// >
//   {globalAlert &&
//   <Alert
//     onClose={handleClose}
//     severity={globalAlert.type}
//     variant="filled"
//     sx={{ width: '100%' }}
//   >
//     {globalAlert.text}
//   </Alert>}
// </Snackbar>