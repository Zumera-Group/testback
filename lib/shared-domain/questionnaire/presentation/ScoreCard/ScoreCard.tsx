import { ProgressBar } from 'components/Calculator/ProgressBar';
import React from 'react';
import { getTranslateByScope } from 'translation/i18n';
import { useGetSalesforceScore } from '../../application/useGetQuestionnaireScore';
import Image from 'next/image';
import styles from './ScoreCard.module.scss';
import * as animationData from './loading-wheel.json';
import Lottie from 'react-lottie';

export const ScoreCard = () => {
  const tr = getTranslateByScope('result');

  const [score, setScore] = React.useState<{
    points: string;
    percentage: string;
    calendly: string;
    avg: number;
  }>(null);
  const [hasError, setHasError] = React.useState(false);
  const { getScore } = useGetSalesforceScore();

  React.useEffect(() => {
    const loadScore = async () => {
      try {
        const score = await getScore();
        setScore(score);
        setHasError(false);
      } catch (e) {
        setHasError(true);
      }
    };
    loadScore();
  }, []);

  const presenter = {
    hasPoints: () => {
      if (score?.points === '#N/A' || !score?.points) return false;
      return true;
    },
    getFormattedPoints: () => {
      return score?.points;
    },
    getPercentage: () => {
      try {
        return Math.floor(Number(score.percentage) * 100);
      } catch (e) {
        return '';
      }
    },
  };
  const hasScoreAndPercentage =
    presenter.hasPoints() && presenter.getPercentage();
  const points = tr('evaluation.resultBox.points', {
    points: presenter.getFormattedPoints(),
  });
  const title = tr('evaluation.resultBox.title');
  const betterThan = tr('evaluation.resultBox.betterThen', {
    percentage: presenter.getPercentage(),
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <div className={styles.scoreCardWrapper}>
        {hasScoreAndPercentage && (
          <>
            <span className={styles.scoreCardTitle}>{title}</span>
            <ProgressBar
              isPoint
              progress={points.substring(0, points.length - 2)}
              color="gradient"
            />
            <p className={styles.betterThan}>{betterThan}</p>
            <div className={styles.booklet}>
              <Image
                unoptimized
                loading="lazy"
                objectFit="cover"
                alt={'report'}
                src={'/calculator/zumera_example_report.png'}
                height={289}
                width={217}
              />
            </div>
          </>
        )}
        {!score && (
          <Lottie
            options={defaultOptions}
            width="100%"
            height={'auto'}
            style={{ maxWidth: 194, marginLeft: 'auto' }}
            isStopped={false}
            isPaused={false}
          />
        )}
      </div>
    </>
  );
};

export default ScoreCard;
