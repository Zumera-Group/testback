'use client';

import React, {useCallback} from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {useValuationStore} from '../../lib/shared-domain/questionnaire/store';

export default function GlobalAlert() {
  const { globalAlert, setGlobalAlert } = useValuationStore();
  const handleClose = useCallback(() => {
    setGlobalAlert(null);
  }, [setGlobalAlert])

  return (
    <Snackbar
      open={Boolean(globalAlert)}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
    >
      {globalAlert &&
      <Alert
        onClose={handleClose}
        severity={globalAlert.type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {globalAlert.text}
      </Alert>}
    </Snackbar>
  );
}