import { VStack } from '@chakra-ui/react';
import { Category } from '../../domain';
import { useValuationStore } from '../../store';
import { INDUSTRY_QUESTION_ID, SECTOR_QUESTION_ID } from '../questions';
import { SidebarStep } from './SidebarStep';

const Sidebar = (): JSX.Element => {
  const { mainStep, subStep, isOnResultScreen, questionnaire } =
    useValuationStore();
  const categories = questionnaire && questionnaire.questionsByCategory;

  const currentCategory = questionnaire?.questionsByCategory?.[mainStep];

  const categoryQuestions = currentCategory?.questions;

  const currentQuestion =
    questionnaire && categoryQuestions && categoryQuestions[subStep];

  const isIndustryOrSectorQuestion =
    currentQuestion?.questionId === INDUSTRY_QUESTION_ID ||
    currentQuestion?.questionId === SECTOR_QUESTION_ID;

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

  const WEBKIT_SCROLL = `::-webkit-scrollbar {
    display: none
  }`;

  return (
    <>
      <p>test</p>
      <VStack
        maxH="calc(100vh - 130px)"
        w="100%"
        overflow="scroll"
        style={{ scrollbarWidth: 'none' }}
        css={WEBKIT_SCROLL}
        pr="17px"
        spacing={3}
      >
        {categories && categories.map(renderSteps)}
      </VStack>
    </>
  );
};

export default Sidebar;
