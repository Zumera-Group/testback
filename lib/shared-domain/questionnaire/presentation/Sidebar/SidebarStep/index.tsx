import { Box, Flex } from '@chakra-ui/react';
import { Tick } from 'components/Icons/Tick';
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
  }, [isActive, isOpen, mainStep]);

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

  const activeItem = isActive ? styles.active : styles.inactive;

  return (
    <FlexCol justify="center" w="100%" className={styles.sideBarWrapper}>
      <Box>
        <Flex className={[styles.stepItem].join(' ')}>
          <P className={styles.stepItemIndex}>
            {isClickable && !isActive && !isNextCategory ? (
              <span className={styles.tick}>
                <Tick color="#F0005C" size={18} />
              </span>
            ) : (
              <span className={activeItem}>{`${categoryIndex + 1}.`}</span>
            )}
          </P>

          <P className={[styles.stepItemName, activeItem].join(' ')}>
            {category.categoryName}
          </P>
        </Flex>
      </Box>
    </FlexCol>
  );
};
