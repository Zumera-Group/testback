import React, { useEffect, useState } from 'react';
import I18n from 'i18n-js';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import styles from './QuestionnaireLayout.module.scss';
import { PageTransition } from 'components/PageTransition';
import { SEO } from 'components/SEO';
import { Question, Questionnaire } from '../domain/index';
import { Sector, SiteSettings } from '../../page/domain/index';
import { getTranslateByScope } from 'translation/i18n';
import { useValuationStore } from '../store';
// import Header from './Header';
import { QuestionComponent } from './Question/QuestionComponent';
import Sidebar from './Sidebar';
import { EnvironmentService } from 'environment.service';
import { uuid } from 'uuidv4';
import { qLogs } from '../application/log';
import { useSalesforceAnswerSync } from '../application/useSalesforceAnswerSync';
import { useRouter } from 'next/router';
import BottomBar from 'components/Calculator/BottomBar/BottomBar';
import { useGetSalesforceScore } from '../application/useGetQuestionnaireScore';
import { ProgressBar } from 'components/Calculator/ProgressBar';
import Image from 'next/image';
import { LoadingCircle } from 'components/Icons/LoadingCircle';
import PageHeader from 'lib/shared-domain/page/presentation/PageHeader';
import Header from 'components/Calculator/Header';

const t = getTranslateByScope('timeEstimation');
const tSidebar = getTranslateByScope('sidebar');
const tr = getTranslateByScope('result');

function useSetQuestionnaireLocaleToUseFori18n(locale: string) {
  useEffect(() => {
    if (!EnvironmentService.isProduction()) return;
    if (locale === 'de') {
      I18n.locale = 'de';
    } else {
      I18n.locale = 'en';
    }
  }, [locale]);
}

const QuestionnaireLayout: React.FC<{
  selectedQuestionnaire: Questionnaire;
  siteSettings: SiteSettings;
  locale: string;
  sectorSpecificQuestions: Question[];
  sectors: Sector[];
}> = ({
  selectedQuestionnaire,
  siteSettings,
  locale,
  sectorSpecificQuestions,
  sectors,
}) => {
  const { syncCurrentAnswersFromSalesforce } = useSalesforceAnswerSync();
  const router = useRouter();

  useSetQuestionnaireLocaleToUseFori18n(locale);
  const [currenQuestionPosition, setCurrentQuestionPosition] = useState(0);

  const {
    questionnaire,
    setQuestionnaire,
    setUniqueId,
    isOnResultScreen,
    setIsOnResultScreen,
    mainStep,
    subStep,
    isFirstQuestion,
    setStep,
    uniqueId,
    industryId,
  } = useValuationStore();

  useEffect(() => {
    qLogs('Check if unique id exist for questionnaire');
    if (uniqueId) {
      qLogs(
        'ID exists. Saving it and syncing from salesforce. UniqueId' + uniqueId,
      );
      setUniqueId(uniqueId as string);
      syncCurrentAnswersFromSalesforce(uniqueId as string);
    } else {
      const newUuid = uuid();
      qLogs('Id not found in headers. Generating uuid: ' + newUuid);
      setUniqueId(newUuid);
    }
  }, [uniqueId]);

  useEffect(() => {
    qLogs('Check if unique id exist for questionnaire');
    if (uniqueId) {
      qLogs(
        'ID exists. Saving it and syncing from salesforce. UniqueId' + uniqueId,
      );
      setUniqueId(uniqueId as string);
      syncCurrentAnswersFromSalesforce(uniqueId as string);
    } else {
      const newUuid = uuid();
      qLogs('Id not found in headers. Generating uuid: ' + newUuid);
      setUniqueId(newUuid);
    }
  }, [uniqueId]);

  useEffect(() => {
    const newQuestionnaire = { ...selectedQuestionnaire };

    if (
      newQuestionnaire?.questionsByCategory?.findIndex(
        (cat) => cat.categoryName === tSidebar('results'),
      ) === -1
    ) {
      const resultsCategory = {
        categoryName: tSidebar('results'),
        questions: [],
      };
      newQuestionnaire?.questionsByCategory?.push(resultsCategory);
    }

    qLogs(
      'Save state for current questionnaire: ' +
        JSON.stringify(newQuestionnaire),
    );

    setQuestionnaire(newQuestionnaire);
  }, [selectedQuestionnaire?._id]);

  useEffect(() => {
    const [_, hash] = router.asPath.split('#');
    if (hash) {
      const [mainStep, subStep] = hash?.split('-');

      qLogs(
        `hash for page detected. Main Step ${mainStep} - Sub Step ${subStep}`,
      );
      setStep(Number(mainStep), Number(subStep));
      setIsOnResultScreen(false);
    } else {
      qLogs('No hash for page found. Going to first page');
      setStep(0, 0);
    }
  }, [router.asPath]);

  useEffect(() => {
    const stepInCurrentCategory = subStep + 1;
    let numberOfStepsInOtherCategories = 0;

    for (let i = 0; i < mainStep; i++) {
      numberOfStepsInOtherCategories =
        numberOfStepsInOtherCategories +
        questionnaire?.questionsByCategory?.[i]?.questions?.length;
    }
    setCurrentQuestionPosition(
      stepInCurrentCategory + numberOfStepsInOtherCategories,
    );
  }, [mainStep, questionnaire?.questionsByCategory, subStep]);

  const currentCategory =
    questionnaire?.questionsByCategory?.[mainStep]?.categoryName ?? '';
  const withBackgroundImage = !isOnResultScreen;

  //total number of questions
  const numberOfQuestionsInTotal = questionnaire?.questionsByCategory?.reduce(
    (numberOfQuestions, currentCategory) => {
      return numberOfQuestions + currentCategory.questions.length;
    },
    0,
  );

  //RESULTS LOGIC
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

  const scoreCard = () => {
    if (score) {
      const presenter = {
        hasPoints: () => {
          if (score.points === '#N/A' || !score.points) return false;
          return true;
        },
        getFormattedPoints: () => {
          return score.points;
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
      return (
        <>
          {hasScoreAndPercentage && (
            <div className={styles.scoreCardWrapper}>
              <span className={styles.scoreCardTitle}>{title}</span>
              <ProgressBar
                isPoint
                progress={points.substring(0, points.length - 2)}
                color="gradient"
              />
              <p className={styles.betterThan}>{betterThan}</p>
              <Image
                unoptimized
                loading="lazy"
                objectFit="cover"
                alt={'booklet'}
                src={'/booklet.png'}
                height={217}
                width={217}
              />
            </div>
          )}
        </>
      );
    }
    return <LoadingCircle />;
  };

  return (
    <>
      <SEO
        seoTitle={
          questionnaire &&
          questionnaire?.questionnaireName + ' - ' + currentCategory
        }
        seoDescription={questionnaire?.seoDescription}
        seoImage={questionnaire?.seoImage}
        siteSettings={siteSettings}
      />
      <PageTransition slug={questionnaire?.questionnaireSlug?.current}>
        <Grid
          className={styles.questionnaireWrapper}
          h="100%"
          w="100%"
          p={3}
          overflowY="scroll"
          height="100vh"
          gridTemplateColumns={{ base: '0% 100% 0%', lg: '20% 60% 20%' }}
          gridTemplateRows={{ base: '7% 93% 0%', lg: '10% 75% 15%' }}
        >
          <GridItem gridArea="header" className={styles.questionnaireHeader}>
            <PageHeader
              contentModules={[]}
              siteSettings={siteSettings}
              darkBg
              hideHeader={isOnResultScreen ? false : true}
              hideBurger={isOnResultScreen ? false : true}
              staticExtended
              indicator={
                !isOnResultScreen && {
                  current: currenQuestionPosition,
                  total: numberOfQuestionsInTotal,
                }
              }
            />
          </GridItem>

          {questionnaire && !isOnResultScreen && (
            <GridItem
              gridArea="sidebar"
              display={{ base: 'none', lg: 'grid' }}
              className={styles.sideBarWrapper}
            >
              <Sidebar />
            </GridItem>
          )}

          {isOnResultScreen && (
            <GridItem
              gridArea="sidebar"
              display={{ base: 'none', lg: 'grid' }}
              className={styles.sideBarWrapper}
            >
              {scoreCard()}
            </GridItem>
          )}

          <GridItem gridArea="question" margin={'auto'}>
            <QuestionComponent
              sectorSpecificQuestions={sectorSpecificQuestions}
              sectors={sectors}
            />

            {!isOnResultScreen && isFirstQuestion() && (
              <Flex
                direction={{ base: 'column', lg: 'row' }}
                justify="space-between"
                align="center"
                pt={6}
                pb={2}
                w="100%"
              ></Flex>
            )}
          </GridItem>

          <Box
            position="fixed"
            display={{ base: 'none', lg: 'block' }}
            right={0}
            bottom={13}
          ></Box>
        </Grid>
      </PageTransition>
    </>
  );
};

export default QuestionnaireLayout;
