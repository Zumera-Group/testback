import React from 'react';
import { FlexCol } from 'components/Layout/Flex/Flex';
import { useValuationStore } from 'lib/shared-domain/questionnaire/store';
import { useSalesforceAnswerSync } from '../../application/useSalesforceAnswerSync';
import {
  INDUSTRY_QUESTION_ID,
  questions,
  SECTOR_QUESTION_ID,
} from '../questions';
import { Result } from '../Result';
import { Question } from '../../domain';
import { SectorSpecificEntry } from './SectorSpecificEntry';
import { qLogs } from '../../application/log';
import { useQuestionnaireRouter, t } from './index';
import { AnimateSharedLayout } from 'framer-motion';
import { Sector } from '../../../page/domain/index';
import { Box } from '@chakra-ui/react';

export const QuestionComponent: React.FC<{
  sectorSpecificQuestions: Question[];
  sectors: Sector[];
}> = ({ sectorSpecificQuestions, sectors }) => {
  const {
    questionnaire,
    mainStep,
    subStep,
    uniqueId,
    setIsOnResultScreen,
    isOnResultScreen,
    sectorId,
    industryId,
    setQuestionnaire,
  } = useValuationStore();
  const { syncCurrentAnswersToSalesforce } = useSalesforceAnswerSync();

  const { pushQuestion } = useQuestionnaireRouter();

  const currentCategory = questionnaire?.questionsByCategory?.[mainStep];

  const categoryQuestions = currentCategory?.questions;

  const currentQuestion =
    questionnaire && categoryQuestions && categoryQuestions[subStep];

  const answerSelector = questionnaire && currentQuestion?.answerSelector;

  const buildSectorSpecificQuestions = () => {
    if (!questionnaire.sectorSpecific.hasSectorSpecificQuestions) return;
    const filteredSectorSpecificQuestions = sectorSpecificQuestions.filter(
      (s) =>
        s?.industries &&
        s?.industries?.map((i) => i.id)?.indexOf(industryId) !== -1,
    );

    const newQuestionnaire = { ...questionnaire };
    const newCategory = {
      categoryName: t('sectorSpecificCategory'),
      questions: filteredSectorSpecificQuestions,
      isSectorSpecificCategory: true,
    };
    const specificCategoryIndex =
      newQuestionnaire?.questionsByCategory?.findIndex(
        (cat) => cat.categoryName === newCategory.categoryName,
      );

    if (filteredSectorSpecificQuestions.length > 0) {
      if (questionnaire.sectorSpecific.sectorSpecificBeginOrEnd === 'before') {
        if (specificCategoryIndex === -1) {
          newQuestionnaire.questionsByCategory.splice(1, 0, newCategory);
        } else {
          newQuestionnaire.questionsByCategory.splice(
            specificCategoryIndex,
            1,
            newCategory,
          );
        }
      } else if (
        questionnaire.sectorSpecific.sectorSpecificBeginOrEnd === 'after' &&
        currentCategory?.categoryName === t('results')
      ) {
        if (specificCategoryIndex === -1) {
          newQuestionnaire.questionsByCategory.push(newCategory);
        } else {
          newQuestionnaire.questionsByCategory.splice(
            specificCategoryIndex,
            1,
            newCategory,
          );
        }
      }
      setQuestionnaire(newQuestionnaire);
    } else if (
      filteredSectorSpecificQuestions.length === 0 &&
      specificCategoryIndex
    ) {
      newQuestionnaire.questionsByCategory.splice(specificCategoryIndex, 1);
      setQuestionnaire(newQuestionnaire);
    }
  };

  const onNextQuestion = () => {
    qLogs('onNextQuestion');
    syncCurrentAnswersToSalesforce(uniqueId, currentQuestion?.salesforceId);
    if (industryId && currentQuestion?.questionId === INDUSTRY_QUESTION_ID) {
      buildSectorSpecificQuestions();
    } else if (industryId && currentCategory?.categoryName === t('results')) {
      buildSectorSpecificQuestions();
    }

    const hasNextQuestion = categoryQuestions[subStep + 1];
    const hasNextCategory = questionnaire.questionsByCategory[mainStep + 1];

    if (hasNextQuestion) {
      pushQuestion(mainStep, subStep + 1);
    } else if (hasNextCategory) {
      pushQuestion(mainStep + 1, 0);
    } else {
      qLogs('onNextQuestion: Setting the results screen to true');
      setIsOnResultScreen(true);
    }
  };

  const renderQuestion = () => {
    const answerType = questionnaire && answerSelector?.answerType;

    const filteredIndustriesBySectorId =
      sectors.find((s) => s.id === sectorId)?.industries ?? [];

    if (currentQuestion?.questionId === SECTOR_QUESTION_ID) {
      return (
        <questions.BoxSelector
          onNextQuestion={onNextQuestion}
          question={currentQuestion}
          sectors={sectors?.filter((s) => s?.industries?.length > 0)}
        />
      );
    }
    if (
      (currentQuestion?.questionId === INDUSTRY_QUESTION_ID && sectorId) ||
      (sectorId && !industryId)
    ) {
      return (
        <questions.BoxSelector
          onNextQuestion={onNextQuestion}
          question={currentQuestion}
          industries={filteredIndustriesBySectorId}
        />
      );
    }

    if (currentCategory?.categoryName === t('results')) {
      const industry = sectors
        ?.find((s) => s.id === sectorId)
        ?.industries?.find((i) => i.id === industryId);
      if (
        questionnaire?.sectorSpecific?.hasSectorSpecificQuestions &&
        questionnaire?.sectorSpecific?.sectorSpecificBeginOrEnd === 'after' &&
        industry
      ) {
        return (
          <SectorSpecificEntry
            onNextQuestion={onNextQuestion}
            industry={industry?.name}
          />
        );
      } else {
        qLogs('Going to result screen');
        setIsOnResultScreen(true);
      }
    }

    if (answerType === 'boxSelector') {
      return (
        <questions.BoxSelector
          onNextQuestion={onNextQuestion}
          question={currentQuestion}
          sectorSpecificQuestions={sectorSpecificQuestions}
        />
      );
    } else if (answerType === 'slider') {
      return (
        <questions.Slider
          onNextQuestion={onNextQuestion}
          question={currentQuestion}
        />
      );
    } else if (answerType === 'textInput') {
      return (
        <questions.TextInput
          onNextQuestion={onNextQuestion}
          question={currentQuestion}
        />
      );
    } else if (answerType === 'orbitSelector') {
      return (
        <questions.OrbitSelector
          onNextQuestion={onNextQuestion}
          question={currentQuestion}
        />
      );
    } else if (answerType === 'multiTextInput') {
      return (
        <questions.MultiTextInput
          onNextQuestion={onNextQuestion}
          question={currentQuestion}
        />
      );
    }
    return null;
  };

  return (
    <>
      {isOnResultScreen ? (
        <Result />
      ) : (
        <Box key={currentQuestion?._id}>
          <AnimateSharedLayout>{renderQuestion()}</AnimateSharedLayout>
        </Box>
      )}
    </>
  );
};
