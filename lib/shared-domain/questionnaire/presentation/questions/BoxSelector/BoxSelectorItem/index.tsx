import Image from 'next/image';
import { Box, Square } from '@chakra-ui/react';
import { P } from 'components/Typography/P';
import { BoxAnswer, Question } from 'lib/shared-domain/questionnaire/domain';
import { colors } from 'styles/foundations/colors';
import { fontSizes } from 'styles/foundations/fontStyles';
import { useSelectAnswers } from '../useSelectAnswer';
import { useSelectBoxSelector } from 'lib/shared-domain/questionnaire/presentation/questions/BoxSelector/useSelectBoxSelector';
import { setStylesOnClick } from '../helpers';

interface Props {
  box: BoxAnswer;
  question: Question;
}

const SIZE = 120;

export const BoxSelectorItem = ({ box, question }: Props): JSX.Element => {
  const { isSelected, onSelectAnswer } = useSelectAnswers(
    question,
    box.boxContent || box.label,
  );
  const { onSelect } = useSelectBoxSelector({
    questionId: question?.questionId,
    box,
    onSelectAnswer,
  });
  const { borderBoxSelector, color, fontWeight } = setStylesOnClick(isSelected);

  const renderIcon = () => {
    if (!box.boxIcon) return null;
    const iconUrl = box.boxIcon?.iconImage?.asset?.url;
    const iconLabel = box.boxIcon?.name;

    return (
      <Image
        unoptimized
        loading="lazy"
        src={iconUrl}
        alt={iconLabel}
        height="32px"
        width="32px"
      />
    );
  };

  return (
    <Square
      background={colors.white}
      border={borderBoxSelector}
      size={SIZE}
      flexDirection="column"
      justifyContent="space-evenly"
      cursor="pointer"
      onClick={onSelect}
      mx={1.5}
      mb={3}
      p={0.5}
    >
      {renderIcon()}
      <Box textAlign="center">
        <P
          style={{
            hyphens: 'auto',
          }}
          variant="p"
          fontWeight={fontWeight}
          fontSize={fontSizes.tiny}
          color={color}
        >
          {box.label || box.boxContent}
        </P>
      </Box>
    </Square>
  );
};
