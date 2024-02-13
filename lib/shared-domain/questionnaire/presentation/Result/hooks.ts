import React from 'react';
import { qLogs } from 'lib/shared-domain/questionnaire/application/log';
import { useGetSalesforceScore } from 'lib/shared-domain/questionnaire/application/useGetQuestionnaireScore';

export const useLoadScore = () => {
  const [hasError, setHasError] = React.useState(false);
  const { getScore } = useGetSalesforceScore();

  const [score, setScore] = React.useState<{
    points: string;
    percentage: string;
    calendly: string;
    avg: number;
  }>(null);

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
