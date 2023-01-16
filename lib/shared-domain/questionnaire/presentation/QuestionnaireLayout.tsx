import React, { useEffect } from 'react';
import I18n from 'i18n-js';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import backgroundImage from '../../../../public/bkg.svg';
import { PageTransition } from 'components/PageTransition';
import { SEO } from 'components/SEO';
import { Question, Questionnaire } from '../domain/index';
import { Sector, SiteSettings } from '../../page/domain/index';
import { TimeEstimationBox } from './TimeEstimation';
import { getTranslateByScope } from 'translation/i18n';
import { useValuationStore } from '../store';
import { colors } from 'styles/foundations/colors';
import Header from './Header';
import { QuestionComponent } from './Question/QuestionComponent';
import Sidebar from './Sidebar';
import { TextBoxGroup } from './TextBoxGroup';
import { EnvironmentService } from 'environment.service';
import { uuid } from 'uuidv4';
import { qLogs } from '../application/log';
import { useSalesforceAnswerSync } from '../application/useSalesforceAnswerSync';
import { useRouter } from 'next/router';

const t = getTranslateByScope('timeEstimation');
const tSidebar = getTranslateByScope('sidebar');

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

  const {
    questionnaire,
    setQuestionnaire,
    setUniqueId,
    isOnResultScreen,
    setIsOnResultScreen,
    mainStep,
    isFirstQuestion,
    setStep,
    uniqueId,
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

  const currentCategory =
    questionnaire?.questionsByCategory?.[mainStep]?.categoryName ?? '';
  const withBackgroundImage = !isOnResultScreen;

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
          // backgroundImage={withBackgroundImage && `url(${backgroundImage.src})`}
          backgroundPosition="center"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          h="100%"
          w="100%"
          p={3}
          overflowY="scroll"
          height="100vh"
          gridTemplateColumns={{ base: '0% 100% 0%', lg: '20% 60% 20%' }}
          gridTemplateRows={{ base: '7% 93% 0%', lg: '10% 75% 15%' }}
          templateAreas={`'header header header'
      'sidebar question aside'
      'sidebar   footer  .   '
      `}
        >
          <GridItem gridArea="header">
            <Header siteSettings={siteSettings} />
          </GridItem>

          <GridItem gridArea="sidebar" display={{ base: 'none', lg: 'grid' }}>
            {questionnaire && <Sidebar />}
          </GridItem>
          <GridItem gridArea="question" mt={2}>
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
              >
                {questionnaire?.checkmarkTexts?.map((c, index) => (
                  <Box
                    width="100%"
                    key={index}
                    flex={1}
                    mb={{ base: 1, lg: 0 }}
                  >
                    <TextBoxGroup
                      text={c}
                      color={{
                        circleBgColor: colors.textBoxGroupCircleBgColor,
                      }}
                    />
                  </Box>
                ))}
              </Flex>
            )}
          </GridItem>

          <Box
            position="fixed"
            display={{ base: 'none', lg: 'block' }}
            right={0}
            bottom={13}
          >
            {isFirstQuestion() && <TimeEstimationBox title={t('title')} />}
          </Box>
        </Grid>
      </PageTransition>
    </>
  );
};

export default QuestionnaireLayout;
