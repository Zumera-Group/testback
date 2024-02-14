import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { logError } from 'lib/logError';

const Empty = () => <></>;

export const ErrorTrackingBoundary = ({ children, FallbackComponent = Empty }) => {
  return <ErrorBoundary
    FallbackComponent={FallbackComponent}
    onError={(error) => {
      logError(error);
    }}
  >
    {children}
  </ErrorBoundary>;
};

