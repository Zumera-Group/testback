import { ProgressBar } from 'components/Calculator/ProgressBar';
import React from 'react';
import { getTranslateByScope } from 'translation/i18n';
import { useGetSalesforceScore } from '../../application/useGetQuestionnaireScore';
import Image from 'next/image';
import styles from './ScoreCard.module.scss';
import * as animationData from './loading-wheel.json';
import Lottie from 'react-lottie';
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { SCREEN_SIZE_MD } from "../../../../constants";

export const ScoreCard = () => {
  const tr = getTranslateByScope('result');
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);

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
      } catch (e) {
        setHasError(true);
      }
    };
    loadScore();
  }, []);

  const presenter = {
    getFormattedPoints: () => {
      return score?.points ? score?.points : 0;
    },
    getPercentage: () => {
      try {
        return Math.floor(Number(score.percentage) * 100);
      } catch (e) {
        return '';
      }
    },
  };

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
        <span className={styles.scoreCardTitle}>{title}</span>
        {score ? (
          <ProgressBar isPoint progress={points} color="gradient"/>
        ) : (
          <Lottie
            options={defaultOptions}
            width="100%"
            height={'auto'}
            style={{ width: isMobile ? 119 : 192, marginLeft: 'auto', marginTop: 16 }}
            isStopped={false}
            isPaused={false}
          />
        )}
        <h4 className={styles.betterThan}>{betterThan}</h4>
        <div className={styles.booklet}>
          <Image
            unoptimized
            loading="lazy"
            alt={'booklet'}
            src={'/calculator/booklet.png'}
            width={isMobile ? 300 : 237}
            height={200}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ScoreCard;
