import { Box, Flex, VStack } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { BoxAnswer, Question } from 'lib/shared-domain/questionnaire/domain';
import React, { useEffect, useState } from 'react';
import { BoxSelectorItem } from './BoxSelectorItem';
import { QuestionText } from '../../Question/QuestionText';
import { QuestionButtons } from '../../Question/QuestionButtons';
import { getTranslateByScope } from '../../../../../../translation/i18n';
import { useValuationStore } from '../../../store/index';
import { INDUSTRY_QUESTION_ID } from '..';
import { SECTOR_QUESTION_ID } from '../index';
import { useAnswers } from 'lib/shared-domain/questionnaire/application/useAnswers';
import { QuestionAnimation } from '../../Question/QuestionAnimation';
import { RequiredQuestionInfo } from '../../Question/RequiredQuestionInfo';
import { Sector } from '../../../../page/domain/index';
import { Button } from 'components/Button';
import styles from './BoxSelector.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';
import { SCREEN_SIZE_MD } from 'lib/constants';
import { SCREEN_SIZE_LG, SCREEN_SIZE_SM } from 'lib/constants';
import 'swiper/css/scrollbar';
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
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);
  const buttonText = question?.showMoreButton || t('buttonText');

  const [boxesToRender, setBoxesToRender] =
    useState<BoxAnswer[]>(firstBoxesToRender);
  const [moreBoxesToShow, setMoreBoxesToShow] = useState<boolean>(
    allBoxes?.length > 8,
  );

  const onShowMore = () => {
    setBoxesToRender(allBoxes);
    setMoreBoxesToShow(false);
  };

  useEffect(() => {
    if (isMobile || (!isMobile && !moreBoxesToShow)) {
      setBoxesToRender(allBoxes);
    } else if (!isMobile && moreBoxesToShow) {
      setBoxesToRender(firstBoxesToRender);
    }
  }, [allBoxes, firstBoxesToRender, isMobile, moreBoxesToShow]);

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

  const breakpoint_LG = parseInt(SCREEN_SIZE_LG);
  const breakpoint_SM = parseInt(SCREEN_SIZE_SM);

  const maxSlidesToShow = allBoxes.length;

  const swiperOptions = {
    modules: [Scrollbar],
    observer: true,
    observeParents: true,
    freeMode: true,
    scrollbar: { hide: false, draggable: true },
    slidesPerView: 1,
    centeredSlides: true,
    breakpoints: {
      [breakpoint_SM]: {
        slidesPerView: 3.5,
      },
      [breakpoint_LG]: {
        slidesPerView: maxSlidesToShow ? maxSlidesToShow : 3,
      },
    },
  };

  return (
    <>
      <QuestionText title={question?.questionText}>
        <RequiredQuestionInfo isRequired={question?.isRequired} />
      </QuestionText>

      <QuestionAnimation>
        {!isMobile || (isMobile && boxesToRender.length === 2) ? (
          <Box maxWidth={950} className={styles.boxSelector}>
            <Flex mt={1} justify="flex-start" flexWrap="wrap">
              {boxesToRender?.map((box, index) => (
                <BoxSelectorItem key={box._key} question={question} box={box} />
              ))}
            </Flex>
          </Box>
        ) : (
          <>
            <Box
              mx="auto"
              w="100%"
              maxWidth={950}
              className={styles.boxSelectorswiper}
            >
              <Swiper className={styles.swiper} {...swiperOptions}>
                {boxesToRender?.map((box, index) => (
                  <SwiperSlide key={index} className={styles.swiperSlide}>
                    <BoxSelectorItem
                      key={box._key}
                      question={question}
                      box={box}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </>
        )}

        <Flex justifyContent="flex-start" className={styles.showMoreWrapper}>
          {moreBoxesToShow && !isMobile && (
            <Button
              callBack={onShowMore}
              variant="primary"
              hideIcon
              classes={styles.showMoreBtn}
            >
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
