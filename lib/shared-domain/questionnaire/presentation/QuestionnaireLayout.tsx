import React, { useEffect, useRef, useState } from 'react';
import I18n from 'i18n-js';
import styles from './QuestionnaireLayout.module.scss';
import { PageTransition } from 'components/PageTransition';
import { SEO } from 'components/SEO';
import { Question, Questionnaire } from '../domain/index';
import { Sector, SiteSettings } from '../../page/domain/index';
import { getTranslateByScope } from 'translation/i18n';
import { useValuationStore } from '../store';
import { QuestionComponent } from './Question/QuestionComponent';
import Sidebar from './Sidebar';
import { EnvironmentService } from 'environment.service';
import { uuid } from 'uuidv4';
import { qLogs } from '../application/log';
import { useSalesforceAnswerSync } from '../application/useSalesforceAnswerSync';
import { useRouter } from 'next/router';
import PageHeader from 'lib/shared-domain/page/presentation/PageHeader';
import { SCREEN_SIZE_MD } from 'lib/constants';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';
import { ScoreCard } from './ScoreCard';
import ProgressBarLine from 'components/Calculator/ProgressBarLine/ProgressBarLine';

import { Section, Container, Grid, GridColumn } from 'components/Layout';
import { INDUSTRY_QUESTION_ID, SECTOR_QUESTION_ID } from './questions';

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
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);

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

  //total number of questions
  const numberOfQuestionsInTotal = questionnaire?.questionsByCategory?.reduce(
    (numberOfQuestions, currentCategory) => {
      return numberOfQuestions + currentCategory.questions.length;
    },
    0,
  );

  const currentCategoryIndex = mainStep + 1;
  const progress = (currenQuestionPosition / numberOfQuestionsInTotal) * 100;

  //LOGIC FOR SIDEBAR SHOWING OR NOT
  const currentCatSidebar = questionnaire?.questionsByCategory?.[mainStep];
  const categoryQuestions = currentCatSidebar?.questions;
  const currentQuestion =
    questionnaire && categoryQuestions && categoryQuestions[subStep];
  const isIndustryOrSectorQuestion =
    currentQuestion?.questionId === INDUSTRY_QUESTION_ID ||
    currentQuestion?.questionId === SECTOR_QUESTION_ID;

  const pageRef = useRef(null);
  const [isLanding, setIsLanding] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem('isLanding');
    if (session === 'true') {
      setIsLanding(true);
    } else {
      setIsLanding(false);
    }
  }, []);

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
        <div
          className={[
            styles.page,
            !isIndustryOrSectorQuestion && styles.page__hasSidebar,
          ].join(' ')}
          ref={pageRef}
        >
          <PageHeader
            contentModules={[]}
            siteSettings={siteSettings}
            darkBg
            hideHeader={isOnResultScreen && !isLanding ? false : true}
            hideBurger={isOnResultScreen && !isLanding ? false : true}
            staticExtended
            indicator={
              !isOnResultScreen && {
                current: currenQuestionPosition,
                total: numberOfQuestionsInTotal,
              }
            }
          />

          <main id="main">
            <Section
              bg={'primary'}
              color={'white'}
              size={isMobile ? 'sm' : 'md'}
              classes={styles.section}
            >
              {questionnaire && !isOnResultScreen && isMobile && (
                <div className={styles.progressBarLineMobile}>
                  <ProgressBarLine
                    indicator={
                      !isOnResultScreen && {
                        current: currenQuestionPosition,
                        total: numberOfQuestionsInTotal,
                      }
                    }
                    currentCategory={currentCategory}
                    categoryIndex={currentCategoryIndex}
                    progress={progress}
                  />
                </div>
              )}
              <Container>
                <Grid
                  fullWidth={true}
                  justifyContent={'center'}
                  alignItems={'start'}
                  className={styles.grid}
                >
                  {!isIndustryOrSectorQuestion && (
                    <GridColumn
                      sm={12}
                      md={4}
                      lg={3}
                      className={[
                        styles.sidebarCol,
                        isOnResultScreen && styles.nonStick,
                      ].join(' ')}
                    >
                      <aside className={styles.sidebarWrapper}>
                        {questionnaire && !isOnResultScreen && !isMobile && (
                          <Sidebar />
                        )}
                        {isOnResultScreen && <ScoreCard />}
                      </aside>
                    </GridColumn>
                  )}
                  <GridColumn
                    sm={12}
                    md={8}
                    lg={9}
                    className={styles.questionCol}
                  >
                    <div className={styles.questionWrapper}>
                      <QuestionComponent
                        sectorSpecificQuestions={sectorSpecificQuestions}
                        sectors={sectors}
                        currentPos={currenQuestionPosition}
                        refEl={pageRef}
                      />
                    </div>
                  </GridColumn>
                </Grid>
              </Container>
            </Section>
          </main>
        </div>
      </PageTransition>
    </>
  );
};

export default QuestionnaireLayout;
