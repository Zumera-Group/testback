import React, { useEffect, useRef, useState } from 'react';

import { BoxAnswer, Question } from 'lib/shared-domain/questionnaire/domain';
import { useAnswers } from 'lib/shared-domain/questionnaire/application/useAnswers';
import { Sector } from '../../../../page/domain/index';
import { BoxSelectorItem } from './BoxSelectorItem';
import { QuestionText } from '../../Question/QuestionText';
import { QuestionButtonsWrapper } from '../../Question/QuestionButtonsWrapper';
import { QuestionButtons } from '../../Question/QuestionButtons';
import { getTranslateByScope } from '../../../../../../translation/i18n';
import { useValuationStore } from '../../../store/index';
import { INDUSTRY_QUESTION_ID } from '..';
import { SECTOR_QUESTION_ID } from '../index';
import { QuestionAnimation } from '../../Question/QuestionAnimation';
import { RequiredQuestionInfo } from '../../Question/RequiredQuestionInfo';
import { Button } from 'components/Button';
import BackButton from 'components/Calculator/BackButton/BackButton';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';
import { CONTAINER_PADDING_X, SCREEN_SIZE_MD } from 'lib/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import 'swiper/css/scrollbar';
import styles from './BoxSelector.module.scss';

const t = getTranslateByScope('answerTypes.boxSelector');

interface Props {
  question: Question;
  onNextQuestion?: () => void;
  onPrevQuestion?: () => void;
  currentPos?: number;
  sectors?: Sector[];
  industries?: {
    id: string;
    name: string;
    industrySheetName: string;
  }[];
  sectorSpecificQuestions?: Question[];
  isNoah?: any;
}

export const BoxSelector = ({
  question,
  onNextQuestion,
  onPrevQuestion,
  sectors,
  industries,
  currentPos,
  isNoah,
}: Props): JSX.Element => {
  const { sectorId, industryId } = useValuationStore();
  const { getAnswer } = useAnswers(question);

  const boxAnswers = question?.answerSelector?.boxSelector;
  const INITIAL_BOXES = 8;

  const [selectionsLoaded, setSelectionsLoaded] = useState<boolean>(false);

  const [allBoxes, setAllBoxes] = useState<BoxAnswer[]>([]);
  const [boxesToShow, setBoxesToShow] = useState<number>(INITIAL_BOXES);
  const [moreBoxesToShow, setMoreBoxesToShow] = useState<boolean>(false);

  const buttonText = question?.showMoreButton || t('buttonText');
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);

  // Map the selections
  useEffect(() => {
    // Prevent the useEffect from firing multiple times
    if (!boxAnswers || selectionsLoaded) return;
    setSelectionsLoaded(true);

    if (!sectors && !industries) setAllBoxes(boxAnswers);
    if (!isNoah) {
      if (sectors) {
        setAllBoxes(
          sectors?.map((s) => ({
            _key: s.id,
            boxContent: s.id,
            label: s.name,
            sheetName: s.sectorSheetName,
            boxIcon: {
              name: s.name,
              iconImage: s.graph.iconImage,
            },
          })),
        );
      }
      if (industries) {
        setAllBoxes(
          industries?.map((i, index) => ({
            _key: i.id,
            boxContent: `${i.id}_${index}`,
            label: i.name,
            sheetName: i.industrySheetName,
          })),
        );
      }
    }

    if (isNoah) {
      if (sectors) {
        setAllBoxes(
          sectors
            ?.filter((s) => s?.isNoah)
            .map((s) => ({
              _key: s.id,
              boxContent: s.id,
              label: s.name,
              sheetName: s.sectorSheetName,
              boxIcon: {
                name: s.name,
                iconImage: s.graph.iconImage,
              },
              category: s.noahCategory,
            })),
        );
      }
    }
  }, [boxAnswers, selectionsLoaded, sectors, industries]);

  // Set the amount of boxes to display to the initial number set
  useEffect(() => {
    if (!allBoxes?.length) return;
    setBoxesToShow(INITIAL_BOXES);
    return () => setBoxesToShow(INITIAL_BOXES);
  }, [allBoxes]);

  // Show/hide the 'Show more' button if the items length exceeds initial length
  useEffect(() => {
    if (moreBoxesToShow) return;
    if (!isNoah) {
      setMoreBoxesToShow(allBoxes?.length > boxesToShow);
    }
  }, [allBoxes, boxesToShow, moreBoxesToShow]);

  // Show all boxes in the carousel mobile view
  useEffect(() => {
    if (isMobile || (!isMobile && !moreBoxesToShow)) {
      setBoxesToShow(allBoxes?.length);
    } else if (!isMobile && moreBoxesToShow) {
      setBoxesToShow(INITIAL_BOXES);
    }
  }, [allBoxes?.length, isMobile, moreBoxesToShow]);

  console.log(allBoxes);

  // Reset to original state when question changes
  useEffect(() => {
    setSelectionsLoaded(false);
    setMoreBoxesToShow(false);
    setBoxesToShow(INITIAL_BOXES);
  }, [question, currentPos]);

  const onShowMore = () => {
    setBoxesToShow(allBoxes?.length);
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

  // Swiper configs
  const buttonRef = useRef(null);
  const swiperOptions = {
    modules: [Scrollbar],
    observer: true,
    observeParents: true,
    freeMode: true,
    scrollbar: { hide: false, draggable: true },
    slidesPerView: 'auto' as 'auto',
    spaceBetween: parseInt(CONTAINER_PADDING_X),
    touchStartForcePreventDefault: true,
    touchMoveStopPropagation: true,
    slideToClickedSlide: false,
    watchSlidesProgress: true,
  };

  return (
    <>
      {isMobile && (
        <BackButton onPrevQuestion={onPrevQuestion} currentPos={currentPos} />
      )}

      <QuestionAnimation>
        {isNoah ? (
          <QuestionText title={''}>
            <RequiredQuestionInfo isRequired={question?.isRequired} />
          </QuestionText>
        ) : (
          <QuestionText title={question?.questionText}>
            <RequiredQuestionInfo isRequired={question?.isRequired} />
          </QuestionText>
        )}
        {isNoah ? (
          <>
            {!isMobile || (isMobile && allBoxes.length === 2) ? (
              <>
                <h3>{question?.growthNoahCategory}</h3>
                <div className={[styles.boxRow, styles.extraMargin].join(' ')}>
                  {allBoxes
                    ?.filter((s) => s?.category === 'noah-growth')
                    .slice(0, boxesToShow)
                    .map((box, index) => (
                      <BoxSelectorItem
                        key={`${box._key}_${index}`}
                        question={question}
                        box={box}
                        refEl={buttonRef}
                      />
                    ))}
                </div>
                <h3>{question?.sustainabilityNoahCategory}</h3>
                <div className={styles.boxRow}>
                  {allBoxes
                    ?.filter((s) => s?.category === 'noah-sustainability')
                    .slice(0, boxesToShow)
                    .map((box, index) => (
                      <BoxSelectorItem
                        key={`${box._key}_${index}`}
                        question={question}
                        box={box}
                        refEl={buttonRef}
                      />
                    ))}
                </div>
              </>
            ) : (
              <>
                <h3>{question?.growthNoahCategory}</h3>
                <Swiper {...swiperOptions} className={styles.extraMargin}>
                  {allBoxes
                    ?.filter((s) => s?.category === 'noah-growth')
                    .slice(0, boxesToShow)
                    .map((box, index) => (
                      <SwiperSlide key={index} className={styles.swiperSlide}>
                        <BoxSelectorItem
                          key={`${box._key}_${index}`}
                          question={question}
                          box={box}
                          refEl={buttonRef}
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>

                <h3>{question?.sustainabilityNoahCategory}</h3>
                <Swiper {...swiperOptions}>
                  {allBoxes
                    ?.filter((s) => s?.category === 'noah-sustainability')
                    .slice(0, boxesToShow)
                    .map((box, index) => (
                      <SwiperSlide key={index} className={styles.swiperSlide}>
                        <BoxSelectorItem
                          key={`${box._key}_${index}`}
                          question={question}
                          box={box}
                          refEl={buttonRef}
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </>
            )}
            <div className={styles.showMoreWrapper}>
              {moreBoxesToShow && !isMobile && (
                <Button
                  callBack={onShowMore}
                  variant="secondary"
                  onDark={true}
                  hideIcon
                  classes={styles.showMoreBtn}
                >
                  {buttonText.trim()}
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            {!isMobile || (isMobile && allBoxes.length === 2) ? (
              <div className={styles.boxRow}>
                {allBoxes?.slice(0, boxesToShow).map((box, index) => (
                  <BoxSelectorItem
                    key={`${box._key}_${index}`}
                    question={question}
                    box={box}
                    refEl={buttonRef}
                  />
                ))}
              </div>
            ) : (
              <Swiper {...swiperOptions}>
                {allBoxes?.slice(0, boxesToShow).map((box, index) => (
                  <SwiperSlide key={index} className={styles.swiperSlide}>
                    <BoxSelectorItem
                      key={`${box._key}_${index}`}
                      question={question}
                      box={box}
                      refEl={buttonRef}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <div className={styles.showMoreWrapper}>
              {moreBoxesToShow && !isMobile && (
                <Button
                  callBack={onShowMore}
                  variant="secondary"
                  onDark={true}
                  hideIcon
                  classes={styles.showMoreBtn}
                >
                  {buttonText.trim()}
                </Button>
              )}
            </div>
          </>
        )}
      </QuestionAnimation>
      <QuestionButtonsWrapper>
        <div className={styles.buttonOuter} ref={buttonRef}>
          {!isMobile && (
            <BackButton
              onPrevQuestion={onPrevQuestion}
              currentPos={currentPos}
            />
          )}
          {getShowButton() && (
            <QuestionButtons
              onNextQuestion={onNextQuestion}
              isRequired={question?.isRequired}
              isAnswered={getAnswer()}
            />
          )}
        </div>
      </QuestionButtonsWrapper>
    </>
  );
};
