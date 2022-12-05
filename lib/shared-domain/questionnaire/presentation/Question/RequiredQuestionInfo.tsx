import React from 'react';

import { P } from 'components/Typography/P';

import { getTranslateByScope } from 'translation/i18n';
import { fontSizes } from 'styles/foundations/fontStyles';

const t = getTranslateByScope('question');

export const RequiredQuestionInfo: React.FC<{ isRequired: boolean }> = ({
  isRequired,
}) => {
  if (!isRequired) return null;

  return (
    <P fontSize={fontSizes.small} textAlign="center" mb={2} color="text.light">
      {t('required')}
    </P>
  );
};
