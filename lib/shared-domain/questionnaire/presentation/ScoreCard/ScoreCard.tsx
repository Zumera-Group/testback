import { ProgressBar } from 'components/Calculator/ProgressBar';
import React, { memo } from 'react';
import { getTranslateByScope } from 'translation/i18n';
import { useGetSalesforceScore } from '../../application/useGetQuestionnaireScore';
import Image from 'next/image';
import styles from './ScoreCard.module.scss';
import * as animationData from './loading-wheel.json';
import Lottie from 'react-lottie';
import { motion } from 'framer-motion';

export const ScoreCard = ({ questionnaire }) => {
  console.log(questionnaire.resultScreenCopy);
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

        setTimeout(() => {
          setScore(score);
          setHasError(false);
        }, 3000);
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
  const title = questionnaire.resultScreenCopy.sideBar.heading;
  const betterThan1 =
    questionnaire.resultScreenCopy.sideBar.betterThanFirstPart;
  const betterThan2 =
    questionnaire.resultScreenCopy.sideBar.betterThanSecondPart;
  const percentage = presenter.getPercentage();

  const betterThan = `${betterThan1} ${percentage}% ${betterThan2}`;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const animationVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
  };

  return (
    <>
      <div className={styles.scoreCardWrapper}>
        <span className={styles.scoreCardTitle}>{title}</span>
        {score ? (
          <ProgressBar isPoint progress={points} color="gradient" />
        ) : (
          <Lottie
            options={defaultOptions}
            width="100%"
            height={'auto'}
            style={{ maxWidth: 194, marginLeft: 'auto' }}
            isStopped={false}
            isPaused={false}
          />
        )}
        <p className={styles.betterThan}>{betterThan}</p>
        <div className={styles.booklet}>
          <Image
            unoptimized
            loading="lazy"
            // objectFit="cover"
            alt={'booklet'}
            src={'/calculator/booklet.png'}
            width={237}
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
