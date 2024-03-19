import React, { useEffect, useState } from 'react';

import { getTranslateByScope } from 'translation/i18n';
import { QuestionText } from '../Question/QuestionText';
import { useLoadScore } from 'lib/shared-domain/questionnaire/presentation/Result/hooks';
import { HighLeadFlow } from 'lib/shared-domain/questionnaire/presentation/Result/components/HighLeadFlow';
import { LowLeadFlow } from 'lib/shared-domain/questionnaire/presentation/Result/components/LowLeadFlow';
import { ensureHttps } from 'lib/shared-domain/questionnaire/presentation/Result/helpers';

const t = getTranslateByScope('result');

const calendlyFallback = process.env.NEXT_PUBLIC_CALCULATOR_CALENDLY_FALLBACK;

export const Result: React.FC<{ questionnaire: any }> = (questionnaire) => {
  const resultScreenCopy = questionnaire.questionnaire.resultScreenCopy;
  const [showAppointmentBooking, setShowAppointmentBooking] = useState(false);
  const { score, error } = useLoadScore();

  useEffect(() => {
    if (!score || !score.avg || score?.avg < 10000000) {
      setShowAppointmentBooking(false);
    } else {
      setShowAppointmentBooking(true);
    }


  }, [score]);

  if (error) {
    return <QuestionText title={t('loading.error')} />;
  }


  if (!score || !score?.calendly) {
    return null;
  }

  return (
    <>
      {showAppointmentBooking ? (
        <HighLeadFlow
          userCalendlyLink={score.calendly ? ensureHttps(score.calendly) : calendlyFallback}
        />
      ) : (
        <LowLeadFlow
          score={score}
          resultScreenCopy={resultScreenCopy}
        />
      )}
    </>
  );
};
