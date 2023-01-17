import { Box, Circle, Flex } from '@chakra-ui/react';
import { FlexCol } from 'components/Layout/Flex/Flex';
import { P } from 'components/Typography/P';
import { AnimatePresence, motion } from 'framer-motion';
import { Category, Question } from 'lib/shared-domain/questionnaire/domain';
import { useValuationStore } from 'lib/shared-domain/questionnaire/store';
import React, { useEffect, useState } from 'react';
import { colors } from 'styles/foundations/colors';
import { fontSizes, fontWeights } from 'styles/foundations/fontStyles';
import { SidebarChildStep } from '../SidebarChildStep';

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

  const color = isActive ? colors.primary.darkGreen : colors.text.light;
  const fontSize = isActive ? fontSizes.small : fontSizes.tiny;
  const fontWeight = isActive ? fontWeights.semiBold : fontWeights.highlight;
  const circleBgCol = isActive
    ? colors.circleBg.active
    : colors.circleBg.inactive;
  const circleCol = isActive
    ? colors.circleCol.active
    : colors.circleCol.inactive;

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

  return (
    <FlexCol justify="flex-start" w="100%">
      <Box alignContent="center">
        <Flex
          onClick={() => {
            if (!isClickable) return;
            setIsOpen((isOpen) => !isOpen);
          }}
          as={isClickable ? 'button' : null}
          align="center"
        >
          <Circle bg={circleBgCol} size={10}>
            <P
              color={circleCol}
              fontWeight={fontWeight}
              fontSize={fontSizes.small}
            >
              {categoryIndex + 1}
            </P>
          </Circle>

          <Box ml={2}>
            <P
              textAlign="left"
              color={color}
              fontSize={fontSize}
              fontWeight={fontWeight}
            >
              {category.categoryName}
            </P>
          </Box>
        </Flex>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            animate={isOpen ? 'open' : 'closed'}
            style={{ originY: 0 }}
            transition={{ duration: 0.4 }}
            variants={{
              open: { opacity: 1, scaleY: 1, display: 'block' },
              closed: { opacity: 0, scaleY: 0, height: 0 },
            }}
          >
            <FlexCol>{category.questions.map(renderSubSteps)} </FlexCol>
          </motion.div>
        </AnimatePresence>
      </Box>
    </FlexCol>
  );
};
