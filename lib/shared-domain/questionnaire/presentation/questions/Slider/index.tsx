import React, { useEffect, useState } from 'react';
import {
  Box,
  SliderFilledTrack,
  SliderTrack,
  Slider as ChakraSlider,
  SliderThumb,
} from '@chakra-ui/react';
import { FlexCol, FlexRow } from 'components/Layout/Flex/Flex';
import { P } from 'components/Typography/P';
import { Question } from '../../../domain/index';
import { InputNumber } from 'components/Inputs';
import { getTranslateByScope } from 'translation/i18n';
import { useAnswers } from 'lib/shared-domain/questionnaire/application/useAnswers';
import { QuestionText } from '../../Question/QuestionText';
import { QuestionButtons } from '../../Question/QuestionButtons';
import { useNumberFormat } from '../../../application/useNumberFormat';
import { QuestionAnimation } from '../../Question/QuestionAnimation';
import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
} from 'date-fns';
import { RequiredQuestionInfo } from '../../Question/RequiredQuestionInfo';
import { DEFAULT_SLIDER_VALUES, VALUE_TYPE } from './constants';
import onKeyDownEvent from './onKeyDownEvent';
import styles from './Slider.module.css';

const t = getTranslateByScope('answerTypes.slider');

export const Slider: React.FC<{
  question: Question;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  currentPos: number;
}> = ({ question, onNextQuestion, onPrevQuestion, currentPos }) => {
  const { from, gap, to, valueType, subGaps, salesforceFormat } =
    question?.answerSelector?.slider || DEFAULT_SLIDER_VALUES;

  const { getNumberFormat, sign } = useNumberFormat(valueType);
  const { getAnswer, setAnswer } = useAnswers(question);

  const getUnformattedAnswer = () => {
    if (!getAnswer()) return from ?? DEFAULT_SLIDER_VALUES.from;
    if (!salesforceFormat || salesforceFormat === 'number') return getAnswer();
    const today = new Date();
    const valueDate = new Date(getAnswer());
    const year = differenceInCalendarYears(valueDate, today);
    const month = differenceInCalendarMonths(valueDate, today);
    const day = differenceInCalendarDays(valueDate, today);

    if (salesforceFormat === 'date_year') return year;
    if (salesforceFormat === 'date_month') return month;
    if (salesforceFormat === 'date_day') return day;
    return DEFAULT_SLIDER_VALUES.from;
  };

  const getGapValue = () => {
    const formattedValue = Number(getUnformattedAnswer());
    const threshold: { gap: number; to: number } = subGaps?.find(
      (g) => formattedValue < g.to,
    );
    return threshold?.gap || gap;
  };

  const formatToSalesforce = (v: number) => {
    const today = new Date();
    if (!salesforceFormat || salesforceFormat === 'number') setAnswer(v);
    if (salesforceFormat === 'date_year') {
      today.setFullYear(today.getFullYear() + v);
      setAnswer(today);
    }
    if (salesforceFormat === 'date_month') {
      today.setMonth(today.getMonth() + v);
      setAnswer(today);
    }
    if (salesforceFormat === 'date_day') {
      today.setDate(today.getDate() + v);
      setAnswer(today);
    }
  };

  const [marginBoxValue, setMarginBoxValue] = useState('0');
  const setAutoMarginBoxValue = (v: number) => {
    const end = to - from,
      initVal = v - from,
      fraction = initVal / end,
      minSliderValuePercentageToApplyMargin = 0.15, // 15% on ends of slider
      maxSliderValuePercentageToApplyMargin =
        1 - minSliderValuePercentageToApplyMargin,
      marginToApply = 0.7 * v.toString().length + 'em';

    const ml =
      fraction <= minSliderValuePercentageToApplyMargin && marginToApply;

    const mr =
      fraction >= maxSliderValuePercentageToApplyMargin && '-' + marginToApply;
    if (ml) setMarginBoxValue(ml);
    if (mr) setMarginBoxValue(mr);
    if (!ml && !mr) setMarginBoxValue('0');
  };

  useEffect(() => {
    setAutoMarginBoxValue(Number(getUnformattedAnswer()));
  }, []);

  return (
    <>
      <Box className={styles.questionTextContainer}>
        <QuestionText title={question.questionText}>
          <RequiredQuestionInfo isRequired={question?.isRequired} />
        </QuestionText>
      </Box>
      <QuestionAnimation>
        <Box maxWidth={600} mt={8} mb={6} className={styles.sliderContainer}>
          <ChakraSlider
            focusThumbOnChange={false}
            value={getUnformattedAnswer()}
            onChange={(v) => {
              formatToSalesforce(v);
              setAutoMarginBoxValue(v);
            }}
            defaultValue={getUnformattedAnswer()}
            min={from}
            max={to}
            step={getGapValue()}
          >
            <SliderTrack bg="sliderBgColor" height={2} borderRadius={4}>
              <SliderFilledTrack bg="sliderActiveBgColor" />
            </SliderTrack>
            <SliderThumb height={4} width={4} bg="sliderThumbColor">
              <Box
                position="relative"
                p={1}
                ml={marginBoxValue}
                top="-250%"
                bg="sliderActiveBgColor"
                width="fit-content"
                transition="margin 0.5s"
              >
                <P color="white">
                  {getNumberFormat(Number(getUnformattedAnswer()) || 0)}
                </P>
              </Box>
            </SliderThumb>
          </ChakraSlider>
          <FlexRow justify="space-between">
            <P>{getNumberFormat(from)}</P>
            <P>{getNumberFormat(to)}</P>
          </FlexRow>
          <FlexCol width={180} mt={5} mb={3} ml="auto" mr="auto">
            <P pb={0.5} textAlign="left">
              {t('inputLabel')}
            </P>
            <Box position="relative">
              <InputNumber
                clampValueOnBlur={false}
                isInvalid={false}
                min={from}
                max={to}
                value={
                  sign === VALUE_TYPE.EUR || sign === VALUE_TYPE.USD
                    ? getNumberFormat(Number(getUnformattedAnswer()) || 0)
                        ?.replace(sign, '')
                        ?.trim()
                    : getUnformattedAnswer() || 0
                }
                onChange={(valueAsString) => {
                  const newValue = Number(valueAsString?.replaceAll('.', ''));
                  if (newValue <= to) {
                    formatToSalesforce(newValue);
                    setAutoMarginBoxValue(newValue);
                  }
                }}
                onKeyDown={(evt) => onKeyDownEvent(evt)}
              />
              {sign && (
                <Box position="absolute" right={-2} top={1}>
                  {sign}
                </Box>
              )}
            </Box>
          </FlexCol>
        </Box>
      </QuestionAnimation>
      <QuestionButtons
        onNextQuestion={() => {
          onNextQuestion();
        }}
        isRequired={question?.isRequired}
        isAnswered={getUnformattedAnswer() != null}
      />
    </>
  );
};
