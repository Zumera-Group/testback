import { Box, Flex, VStack } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { P } from 'components/Typography/P';
import { BoxAnswer, Question } from 'lib/shared-domain/questionnaire/domain';
import React, { useRef, useState } from 'react';
import { BoxSelectorItem } from './BoxSelectorItem';
import { QuestionText } from '../../Question/QuestionText';
import { QuestionButtons } from '../../Question/QuestionButtons';
import { Btn } from '../../../../../../components/Buttons/Button/index';
import { CircleSelectorItem } from './CircleSelectorItem';
import { getTranslateByScope } from '../../../../../../translation/i18n';
import { useValuationStore } from '../../../store/index';
import { INDUSTRY_QUESTION_ID } from '..';
import { SECTOR_QUESTION_ID } from '../index';
import { useAnswers } from 'lib/shared-domain/questionnaire/application/useAnswers';
import { QuestionAnimation } from '../../Question/QuestionAnimation';
import { RequiredQuestionInfo } from '../../Question/RequiredQuestionInfo';
import { Sector } from '../../../../page/domain/index';
import { Button } from 'components/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperTransactions } from 'components/Layout/SwiperTransactions';
import styles from './BoxSelector.module.scss';
import { SwiperTransactionsGrid } from 'components/Layout/SwiperTransactionsGrid';
import GridColumn from 'components/Layout/Grid/GridColumn/GridColumn';

const t = getTranslateByScope('answerTypes.boxSelector');

interface Props {
  question: Question;
  onNextQuestion?: () => void;
  sectors?: Sector[];
  industries?: {
    id: string;
    name: string;
    industrySheetName: string;
  }[];
  sectorSpecificQuestions?: Question[];
}

export const BoxSelector = ({
  question,
  onNextQuestion,
  sectors,
  industries,
}: Props): JSX.Element => {
  const { sectorId, industryId } = useValuationStore();
  let allBoxes = question?.answerSelector?.boxSelector;

  const { getAnswer } = useAnswers(question);

  if (sectors) {
    allBoxes = sectors?.map((s) => ({
      _key: s.id,
      boxContent: s.id,
      label: s.name,
      sheetName: s.sectorSheetName,
      boxIcon: {
        name: s.name,
        iconImage: s.graph.iconImage,
      },
    }));
  }

  if (industries) {
    allBoxes = industries?.map((i) => ({
      _key: i.id,
      boxContent: i.id,
      label: i.name,
      sheetName: i.industrySheetName,
    }));
  }

  const firstBoxesToRender = allBoxes?.slice(0, 8);
  const buttonText = question?.showMoreButton || t('buttonText');
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [boxesToRender, setBoxesToRender] =
    useState<BoxAnswer[]>(firstBoxesToRender);
  const [moreBoxesToShow, setMoreBoxesToShow] = useState<boolean>(
    allBoxes?.length > 8,
  );

  const onShowMore = () => {
    setBoxesToRender(allBoxes);
    setMoreBoxesToShow(false);
  };

  const getShowButton = () => {
    const inSelectIndustryAndHasIndustryId =
      question?.questionId === INDUSTRY_QUESTION_ID && industryId;
    const notInSelectIndustryButHasSectorId =
      question?.questionId !== INDUSTRY_QUESTION_ID && sectorId;

    if (
      question?.questionId !== INDUSTRY_QUESTION_ID &&
      question?.questionId !== SECTOR_QUESTION_ID
    )
      return true;

    if (notInSelectIndustryButHasSectorId) return true;
    if (inSelectIndustryAndHasIndustryId) return true;
    return false;
  };
  const swiperPrevRef = useRef();
  const swiperNextRef = useRef();

  return (
    <>
      <QuestionText title={question?.questionText}>
        <RequiredQuestionInfo isRequired={question?.isRequired} />
      </QuestionText>

      <QuestionAnimation>
        <Box mx="auto" w="100%" maxWidth={950}>
          <Flex mt={1} justify="center" flexWrap="wrap">
            {boxesToRender?.map((box, index) => (
              <BoxSelectorItem key={box._key} question={question} box={box} />
            ))}
          </Flex>
        </Box>
        <Flex justifyContent="center">
          {moreBoxesToShow && (
            <Button callBack={onShowMore} variant="primary" hideIcon>
              {buttonText.trim()}
            </Button>
          )}
        </Flex>
      </QuestionAnimation>
      {getShowButton() && (
        <QuestionButtons
          onNextQuestion={onNextQuestion}
          isRequired={question?.isRequired}
          isAnswered={getAnswer()}
        />
      )}
    </>
  );
};
