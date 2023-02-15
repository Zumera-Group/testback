import Image from 'next/image';
import { BoxAnswer, Question } from 'lib/shared-domain/questionnaire/domain';
import { useSelectAnswers } from '../useSelectAnswer';
import { useSelectBoxSelector } from 'lib/shared-domain/questionnaire/presentation/questions/BoxSelector/useSelectBoxSelector';
import RadioButton from 'components/Calculator/RadioButtonItem/RadioButtonItem';
import Checkbox from 'components/Calculator/CheckboxItem/CheckboxItem';

interface Props {
  box: BoxAnswer;
  question: Question;
  refEl: any;
}

export const BoxSelectorItem = ({
  box,
  question,
  refEl,
}: Props): JSX.Element => {
  const { isSelected, onSelectAnswer } = useSelectAnswers(
    question,
    box.boxContent || box.label,
  );
  const { onSelect } = useSelectBoxSelector({
    questionId: question?.questionId,
    box,
    onSelectAnswer,
  });
  const executeScroll = () =>
    refEl.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

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
        width={42}
        height={42}
      />
    );
  };

  return (
    <>
      {!question.hasMultipleAnswers ? (
        <RadioButton
          icon={renderIcon()}
          label={box.label || box.boxContent}
          onClick={() => {
            onSelect();
            executeScroll();
          }}
          selected={isSelected}
        />
      ) : (
        <Checkbox
          icon={renderIcon()}
          label={box.label || box.boxContent}
          onClick={() => {
            onSelect();
            executeScroll();
          }}
          selected={isSelected}
        />
      )}
    </>
  );
};
