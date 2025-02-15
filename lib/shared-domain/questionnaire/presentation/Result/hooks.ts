import React, {useState} from 'react';
import { qLogs } from 'lib/shared-domain/questionnaire/application/log';
import { useGetSalesforceScore } from 'lib/shared-domain/questionnaire/application/useGetQuestionnaireScore';
import {ILeadEntryScore} from '../../../../../@types/api';

export const useLoadScore = () => {
  const [hasError, setHasError] = useState(false);
  const { getScore } = useGetSalesforceScore();
  const [score, setScore] = useState<ILeadEntryScore|null>(null);

  React.useEffect(() => {
    const loadScore = async () => {
      try {
        qLogs('Score: loading score');
        const score = await getScore();
        setScore(score);
        qLogs({ score });

        const status = score + 'status';
        status.includes('Error') ? setHasError(true) : setHasError(false);
      } catch (e) {
        qLogs('Score: something went wrong');
        setHasError(true);
      }
    };
    loadScore();
  }, []);

  return { score, error: hasError };
};
