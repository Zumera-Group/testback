import Image from 'next/image';
import { BoxAnswer, Question } from 'lib/shared-domain/questionnaire/domain';
import { useSelectAnswers } from '../useSelectAnswer';
import { useSelectBoxSelector } from 'lib/shared-domain/questionnaire/presentation/questions/BoxSelector/useSelectBoxSelector';
import RadioButton from 'components/Calculator/RadioButtonItem/RadioButtonItem';
import Checkbox from 'components/Calculator/CheckboxItem/CheckboxItem';

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
        height="42px"
        width="42px"
      />
    );
  };

  return (
    <>
      {!question.hasMultipleAnswers ? (
        <RadioButton
          icon={renderIcon()}
          label={box.label || box.boxContent}
          onClick={onSelect}
          selected={isSelected}
        />
      ) : (
        <Checkbox
          icon={renderIcon()}
          label={box.label || box.boxContent}
          onClick={onSelect}
          selected={isSelected}
        />
      )}
    </>
  );
};
