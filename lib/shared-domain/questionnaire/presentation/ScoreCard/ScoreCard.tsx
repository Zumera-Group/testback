// import { ProgressBar } from 'components/Calculator/ProgressBar';
import React from 'react';
import { getTranslateByScope } from 'translation/i18n';
import { useGetSalesforceScore } from '../../application/useGetQuestionnaireScore';
import Image from 'next/image';
import styles from './ScoreCard.module.scss';
import * as animationData from './loading-wheel.json';
// import dynamic from 'next/dynamic';
// import { AnimationOptions } from 'react-lottie';
import {ILeadEntryScore} from '../../../../../@types/api';
import LatestTransactions from './LatestTransactions';

// const Lottie: React.ComponentType<{
//   options: AnimationOptions,
//   width: string,
//   height: string,
//   style: React.CSSProperties,
//   isStopped: boolean,
//   isPaused: boolean
// }> = dynamic(() => import('react-lottie'), { ssr: false });


interface ScoreCardProps {
  questionnaire: any;
  isResultsCompactOnMobile: boolean;
}

export const ScoreCard = ({
  questionnaire,
  isResultsCompactOnMobile,
}: ScoreCardProps) => {

  const tr = getTranslateByScope('result');

  const [score, setScore] = React.useState<ILeadEntryScore|null>(null);
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
  const title = questionnaire.resultScreenCopy.sideBar.heading;
  const betterThan1 =
    questionnaire.resultScreenCopy.sideBar.betterThanFirstPart;
  const betterThan2 =
    questionnaire.resultScreenCopy.sideBar.betterThanSecondPart;
  const percentage = presenter.getPercentage();
  const betterThan = `${betterThan1} ${percentage}% ${betterThan2}`;
  const bookletImage =
    questionnaire.resultScreenCopy.sideBar.bookletImage.asset.url;

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
        {/*<span className={styles.scoreCardTitle}>{title}</span>*/}
        {/*{score ? (*/}
        {/*  <ProgressBar isPoint progress={Number(points)} color="gradient" />*/}
        {/*) : (*/}
        {/*  <Lottie*/}
        {/*    options={defaultOptions}*/}
        {/*    width="100%"*/}
        {/*    height={'auto'}*/}
        {/*    style={{*/}
        {/*      width: isResultsCompactOnMobile ? 119 : 192,*/}
        {/*      marginLeft: 'auto',*/}
        {/*      marginTop: 16,*/}
        {/*    }}*/}
        {/*    isStopped={false}*/}
        {/*    isPaused={false}*/}
        {/*  />*/}
        {/*)}*/}
        {/*<h4 className={styles.betterThan}>{betterThan}</h4>*/}
        <span className={styles.scoreCardTitle}>{tr('leftCol.getValuationNow')}</span>
        <div className={styles.booklet}>
          <Image
            unoptimized
            loading="lazy"
            alt={'booklet'}
            src={bookletImage}
            width={isResultsCompactOnMobile ? 300 : 237}
            height={200}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <LatestTransactions />
      </div>
    </>
  );
};
