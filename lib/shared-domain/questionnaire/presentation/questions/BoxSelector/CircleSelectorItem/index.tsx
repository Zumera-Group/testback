import React from 'react';
import { Circle, Flex } from '@chakra-ui/react';
import { useSelectAnswers } from '../useSelectAnswer';

import { BoxAnswer, Question } from 'lib/shared-domain/questionnaire/domain';
import { P } from 'components/Typography/P';
import { colors } from 'styles/foundations/colors';
import { useSelectBoxSelector } from 'lib/shared-domain/questionnaire/presentation/questions/BoxSelector/useSelectBoxSelector';
import { setStylesOnClick } from '../helpers';

export const CircleSelectorItem: React.FC<{
  box: BoxAnswer;
  question: Question;
}> = ({ box, question }) => {
  const { isSelected, onSelectAnswer } = useSelectAnswers(
    question,
    box.boxContent || box.label,
  );
  const { onSelect } = useSelectBoxSelector({
    questionId: question?.questionId,
    box,
    onSelectAnswer,
  });
  const { borderCircleSelector, circleBorder, fontWeight } =
    setStylesOnClick(isSelected);

  return (
    <Flex
      background={colors.white}
      border={borderCircleSelector}
      cursor="pointer"
      justify="space-between"
      onClick={onSelect}
      p={1}
      w="95%"
    >
      <Flex wrap="wrap">
        <P fontWeight={fontWeight} variant="circleSelectorItemP">
          {box.label || box.boxContent}
        </P>
      </Flex>

      <Circle size="24px" ml={2} border={circleBorder}></Circle>
    </Flex>
  );
};
