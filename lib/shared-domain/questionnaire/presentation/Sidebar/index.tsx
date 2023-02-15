// import { VStack } from '@chakra-ui/react';
import { ProgressBar } from 'components/Calculator/ProgressBar';
import { useEffect, useState } from 'react';
import { Category } from '../../domain';
import { useValuationStore } from '../../store';
import { INDUSTRY_QUESTION_ID, SECTOR_QUESTION_ID } from '../questions';
import { SidebarStep } from './SidebarStep';
import { SCREEN_SIZE_MD } from 'lib/constants';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';

const Sidebar = (): JSX.Element => {
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);

  const { mainStep, subStep, questionnaire, isOnResultScreen } =
    useValuationStore();
  const [currenQuestionPosition, setCurrentQuestionPosition] = useState(0);
  const categories = questionnaire && questionnaire.questionsByCategory;
  const currentCategory = questionnaire?.questionsByCategory?.[mainStep];
  const categoryQuestions = currentCategory?.questions;
  const currentQuestion =
    questionnaire && categoryQuestions && categoryQuestions[subStep];
  const isIndustryOrSectorQuestion =
    currentQuestion?.questionId === INDUSTRY_QUESTION_ID ||
    currentQuestion?.questionId === SECTOR_QUESTION_ID;
  const numberOfQuestionsInTotal = questionnaire?.questionsByCategory?.reduce(
    (numberOfQuestions, currentCategory) => {
      return numberOfQuestions + currentCategory.questions.length;
    },
    0,
  );
  const progress = (currenQuestionPosition / numberOfQuestionsInTotal) * 100;

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

  if (
    (subStep === 0 && mainStep === 0) ||
    isOnResultScreen ||
    isIndustryOrSectorQuestion
  ) {
    return null;
  }

  const renderSteps = (
    category: Category,
    index: number,
    array: Category[],
  ) => (
    <SidebarStep
      key={index}
      category={category}
      categoryIndex={index}
      prevCategory={array[index - 1]}
      currentQuestion={currentQuestion}
    />
  );

  return (
    <>
      <ProgressBar progress={progress} isPercent color="white" />
      {/*{!isMobile && (*/}
      {/*  <VStack spacing={0}>{categories && categories.map(renderSteps)}</VStack>*/}
      {/*)}*/}
    </>
  );
};

export default Sidebar;
