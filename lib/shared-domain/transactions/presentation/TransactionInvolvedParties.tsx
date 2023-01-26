import React from 'react';

import { TransactionInvolvedParties as TInvolvedParties } from 'components/Transaction';
import { optionalUI } from '../domain/index';

export const TransactionInvolvedParties: React.FC<{
  optionalUI: optionalUI;
}> = ({ optionalUI }) => {
  return <TInvolvedParties optionalUI={optionalUI} />;
};
