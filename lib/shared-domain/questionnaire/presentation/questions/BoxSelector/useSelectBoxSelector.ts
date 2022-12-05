import { BoxAnswer } from '../../../domain';
import { INDUSTRY_QUESTION_ID, SECTOR_QUESTION_ID } from '..';
import { useValuationStore } from '../../../store';

interface Props {
  questionId: string;
  box: BoxAnswer;
  onSelectAnswer(): void;
}

export const useSelectBoxSelector = ({
  questionId,
  box,
  onSelectAnswer,
}: Props): { onSelect(): void } => {
  const {
    setSectorId,
    setIndustryId,
    setSectorSheetName,
    setIndustrySheetName,
  } = useValuationStore();
  const isIndustryQuestion = questionId === INDUSTRY_QUESTION_ID;
  const isSectorQuestion = questionId === SECTOR_QUESTION_ID;

  const onSelect = () => {
    if (isSectorQuestion) {
      setSectorId(box._key);
      setSectorSheetName(box.sheetName);
    } else if (isIndustryQuestion) {
      setIndustryId(box._key);
      setIndustrySheetName(box.sheetName);
    }
    onSelectAnswer();
  };

  return {
    onSelect,
  };
};
