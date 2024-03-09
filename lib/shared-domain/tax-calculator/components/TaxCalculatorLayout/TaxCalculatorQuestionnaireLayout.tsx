import React from 'react';
import cx from 'classnames';
import styles
  from 'lib/shared-domain/tax-calculator/components/TaxCalculatorLayout/TaxCalculatorQuestionnaireLayout.module.scss';
import { PageTransition } from 'components/PageTransition';
import { SEO } from 'components/SEO';
import { SiteSettings } from 'lib/shared-domain/page/domain';
import PageHeader from 'lib/shared-domain/page/presentation/PageHeader';
import { SCREEN_SIZE_MD } from 'lib/constants';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';

import { Container, Grid, GridColumn, Section } from 'components/Layout';
import { TaxCalculatorQuestionnaire } from 'lib/shared-domain/tax-calculator/types';
import { ProgressBarLine } from 'components/Calculator/ProgressBarLine';
import TaxCalculatorSideBar from 'lib/shared-domain/tax-calculator/components/TaxCalculatorSideBar';
import { useTaxQuestionnaire } from 'lib/shared-domain/tax-calculator/hooks/useTaxQuestionnaire';
import { ResultScreen } from 'lib/shared-domain/tax-calculator/components/ReultsScreen';
import {
  TaxCalculatorQuestionComponent,
} from 'lib/shared-domain/tax-calculator/components/TaxCalculatorQuestionComponent';
import {
  useSetQuestionnaireLocaleToUseFori18n,
} from 'lib/shared-domain/tax-calculator/hooks/useSetQuestionnaireLocaleToUseFori18n';
import { useCookieSetup } from 'lib/shared-domain/tax-calculator/hooks/useCookieSetup';


const TaxCalculatorQuestionnaireLayout: React.FC<{
  taxQuestionnaire: TaxCalculatorQuestionnaire;
  siteSettings: SiteSettings;
  locale: string;
}> = ({
  taxQuestionnaire,
  siteSettings,
  locale,
}) => {
  useSetQuestionnaireLocaleToUseFori18n(locale);
  useCookieSetup();

  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);
  const {
    resultScreenCopy,
    questionsByCategory,
    questionnaireName,
    seoDescription,
    seoImage,
    preventIndexing,
  } = taxQuestionnaire;

  const {
    isOnResultsScreen,
    progress,
    categoryIndex,
    onNextQuestion,
    onPreviousQuestion,
    currentPositionInTotalNumberOfQuestion,
    currentQuestion,
    totalNumberOfQuestions,
  } = useTaxQuestionnaire({ questionsByCategory });

  const currentCategory = questionsByCategory?.[categoryIndex]?.categoryName ?? '';

  return (
    <>
      <SEO
        seoTitle={questionnaireName + ' - ' + currentCategory}
        seoDescription={seoDescription}
        seoImage={seoImage}
        siteSettings={siteSettings}
        preventIndexing={preventIndexing}
      />

      <PageTransition>
        <div className={[styles.page, styles.page__hasSidebar].join(' ')}>
          <PageHeader
            contentModules={[]}
            siteSettings={siteSettings}
            darkBg
            hideHeader={!isOnResultsScreen}
            hideBurger={!isOnResultsScreen}
            staticExtended
            indicator={
              !isOnResultsScreen && {
                current: currentPositionInTotalNumberOfQuestion,
                total: totalNumberOfQuestions,
              }
            }
          />

          <main id="main">
            <Section
              bg={'primary'}
              color={'white'}
              size={isMobile || !!resultScreenCopy ? 'sm' : 'md'}
              classes={cx(styles.section, {
                [styles.hasResultScreen]: isOnResultsScreen,
              })}
            >
              {!isOnResultsScreen && isMobile && (
                <div className={styles.progressBarLineMobile}>
                  <ProgressBarLine
                    indicator={
                      !isOnResultsScreen && {
                        current: currentPositionInTotalNumberOfQuestion,
                        total: totalNumberOfQuestions,
                      }
                    }
                    currentCategory={currentCategory}
                    categoryIndex={categoryIndex}
                    progress={progress}
                  />
                </div>
              )}
              <Container>
                <Grid
                  justifyContent={'center'}
                  alignItems={'start'}
                  className={styles.grid}
                >
                  {!isOnResultsScreen && !isMobile && (
                    <GridColumn
                      sm={12}
                      md={4}
                      lg={3}
                      className={[
                        styles.sidebarCol, isOnResultsScreen
                        && styles.nonStick,
                        styles.sidebarWrapper,
                      ].join(' ')}
                    >
                      <TaxCalculatorSideBar
                        progress={progress}
                        questionsByCategory={questionsByCategory}
                        isOnResultsScreen={isOnResultsScreen} />
                    </GridColumn>
                  )}
                  <GridColumn
                    sm={12}
                    md={8}
                    lg={isOnResultsScreen ? 7 : 9}
                    className={!isOnResultsScreen && [styles.questionCol, styles.questionWrapper].join(' ')}
                  >
                    {
                      isOnResultsScreen ?
                        <ResultScreen resultScreenCopy={resultScreenCopy} />
                        :
                        <TaxCalculatorQuestionComponent
                          currentPositionInTotalNumberOfQuestion={currentPositionInTotalNumberOfQuestion}
                          currentQuestion={currentQuestion}
                          onPreviousQuestion={onPreviousQuestion}
                          onNextQuestion={onNextQuestion}
                      />
                    }
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

export default TaxCalculatorQuestionnaireLayout;
