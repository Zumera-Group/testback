import { Box, Circle, Flex } from '@chakra-ui/react';
import { FlexCol } from 'components/Layout/Flex/Flex';
import { P } from 'components/Typography/P';
import { Category, Question } from 'lib/shared-domain/questionnaire/domain';
import { useValuationStore } from 'lib/shared-domain/questionnaire/store';
import React, { useEffect, useState } from 'react';
import { SidebarChildStep } from '../SidebarChildStep';
import styles from './SidebarStep.module.scss';

interface Props {
  category: Category;
  categoryIndex: number;
  prevCategory: Category;
  currentQuestion: Question;
}

export const SidebarStep = ({
  category,
  categoryIndex,
  prevCategory,
  currentQuestion,
}: Props): JSX.Element => {
  const { mainStep, subStep } = useValuationStore();

  const isActive = mainStep === categoryIndex;
  const [isOpen, setIsOpen] = useState(isActive);

  useEffect(() => {
    if (isActive && !isOpen) setIsOpen(true);

    if (!isActive && isOpen) setIsOpen(false);
  }, [mainStep]);

  // const color = isActive ? colors.primary.darkGreen : colors.text.light;
  // const fontSize = isActive ? fontSizes.small : fontSizes.tiny;
  // const fontWeight = isActive ? fontWeights.semiBold : fontWeights.highlight;
  // const circleBgCol = isActive
  //   ? colors.circleBg.active
  //   : colors.circleBg.inactive;
  // const circleCol = isActive
  //   ? colors.circleCol.active
  //   : colors.circleCol.inactive;

  const renderSubSteps = (question: Question, index: number) => {
    const prevQuestion = category.questions[index - 1];

    const prevQuestionHasSameName =
      prevQuestion?.navigationTitle === question?.navigationTitle;

    if (prevQuestionHasSameName) return;

    return (
      <>
        <SidebarChildStep
          categoryIndex={categoryIndex}
          category={category}
          key={index}
          question={question}
          index={index}
          currentQuestion={currentQuestion}
        />
      </>
    );
  };

  const isCurrentOrPrevCategory = categoryIndex <= mainStep;
  const isLastQuestionFromPrevCategory = !prevCategory?.questions[subStep + 1];
  const isNextCategory = categoryIndex === mainStep + 1;

  const isClickable =
    isCurrentOrPrevCategory ||
    (isLastQuestionFromPrevCategory && isNextCategory);

  const activeItem = isActive ? styles.active : '';

  console.log(isClickable);

  return (
    <FlexCol justify="center" w="100%" className={styles.sideBarWrapper}>
      <Box>
        <Flex className={[styles.stepItem, activeItem].join(' ')}>
          <P className={styles.stepItemIndex}>
            {categoryIndex + 1}. {isClickable && !isActive ? 'test' : 'no'}
          </P>
          <Box ml={2}>
            <P className={styles.stepItemName}>{category.categoryName}</P>
          </Box>
        </Flex>
      </Box>
    </FlexCol>
  );
};
