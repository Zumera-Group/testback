import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Flex, Input, useBreakpointValue } from '@chakra-ui/react';
import { colors } from 'styles/foundations/colors';
import { P } from 'components/Typography/P';
import { Question } from 'lib/shared-domain/questionnaire/domain';
import { useAnswers } from 'lib/shared-domain/questionnaire/application/useAnswers';
import { QuestionButtons } from '../../Question/QuestionButtons';
import { QuestionText } from '../../Question/QuestionText';
import { QuestionAnimation } from '../../Question/QuestionAnimation';
import { RequiredQuestionInfo } from '../../Question/RequiredQuestionInfo';
import getAnswerFromDegree from './utils/getAnswerFromDegree';
import getDegreeFromAnswer from './utils/getDegreeFromAnswer';
import getCoordsPositionDiv from './utils/getCoordsPositionDiv';
import getDegreeFromCoords from './utils/getDegreeFromCoords';
import ArrowSelector from './ArrowSelector';
import BackButton from 'components/Calculator/BackButton/BackButton';

import styles from './Orbit.module.scss';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';
import { SCREEN_SIZE_MD } from 'lib/constants';

export interface AnswerOption {
  value: string;
  position: number;
}

export const OrbitSelector: React.FC<{
  question: Question;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  currentPos: number;
}> = ({ question, onNextQuestion, onPrevQuestion, currentPos }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [orbitWidthInPx, setOrbitWidthInPx] = useState(0);
  const isMobileBtn = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setOrbitHeightInPx = () => {
    const totalMargin = 100;
    const screenWidth = document?.body?.clientWidth;
    const screenHeight = document?.body?.clientHeight;

    const orbitWidthInPx =
      screenWidth - totalMargin > 600 ? 600 : screenWidth - totalMargin;

    if (isMobile) {
      if (screenHeight > screenWidth) setOrbitWidthInPx(orbitWidthInPx);
      else setOrbitWidthInPx(screenHeight);
    } else {
      setOrbitWidthInPx(600);
    }
  };
  useLayoutEffect(() => {
    setOrbitHeightInPx();
  }, [setOrbitHeightInPx]);

  const { getAnswer, setAnswer } = useAnswers(question);
  const sliderDom = useRef(undefined);
  const doomElementToGetCoords = useRef(undefined);
  const [sliderValue, setSliderValue] = useState(undefined);
  const [canSliderMove, setCanSliderMove] = useState(undefined);
  const [answer, setStringAnswer] = useState(getAnswer());

  const initSlide = () => {
    setCanSliderMove(true);
  };
  const stopSlide = () => {
    setCanSliderMove(false);
  };
  const updateSlide = (evt) => {
    if (!canSliderMove) return;
    const coords = getCoordsPositionDiv(evt, doomElementToGetCoords);

    const mainCoord = {
      x: orbitHeightInPx,
      y: orbitHeightInPx,
    };

    const deg = getDegreeFromCoords(coords, mainCoord);
    if (deg >= 0 && deg <= 180) {
      setSliderValue(deg);
      const answer = getAnswerFromDegree(
        deg,
        question?.answerSelector?.orbitSelector?.answerOptions,
      );
      setStringAnswer(answer);
      setAnswer(answer);
    }
  };

  useEffect(() => {
    if (answer) {
      setSliderValue(
        getDegreeFromAnswer(
          answer,
          question?.answerSelector?.orbitSelector?.answerOptions,
        ),
      );
    }
    setOrbitHeightInPx();
  }, []);

  const orbitHeightInPx = orbitWidthInPx / 2;
  const bgSize = orbitHeightInPx + 50;

  return (
    <QuestionAnimation>
      {isMobileBtn && (
        <BackButton onPrevQuestion={onPrevQuestion} currentPos={currentPos} />
      )}
      <QuestionText title={question.questionText}>
        <RequiredQuestionInfo isRequired={question?.isRequired} />
      </QuestionText>

      <Box mt={90}>
        <Box
          bg={colors.orbitSelector}
          bgSize="cover"
          ref={doomElementToGetCoords}
          margin="auto"
          width={orbitWidthInPx + 'px'}
          height={orbitHeightInPx + 'px'}
          borderTopLeftRadius="100em"
          borderTopRightRadius="100em"
          borderBottom={0}
          onTouchStart={() => initSlide()}
          onMouseDown={(evt) => {
            initSlide();
            updateSlide(evt);
          }}
          onTouchMove={(evt) => updateSlide(evt)}
          onMouseMove={(evt) => updateSlide(evt)}
          onMouseUp={() => stopSlide()}
          onMouseLeave={() => stopSlide()}
          onTouchEnd={(evt) => {
            initSlide();
            updateSlide(evt);
            stopSlide();
          }}
          onClick={(evt) => {
            initSlide();
            updateSlide(evt);
            stopSlide();
          }}
          cursor={'pointer'}
        >
          <ArrowSelector
            orbitHeightInPx={orbitHeightInPx}
            sliderValue={sliderValue}
          />

          <Box
            borderTopLeftRadius="100em"
            borderTopRightRadius="100em"
            bg="#300032"
            width={bgSize + 'px'}
            height={bgSize / 2 + 'px'}
            margin="auto"
            marginTop={orbitHeightInPx - bgSize / 2 + 'px'}
          ></Box>
        </Box>

        <Box>
          <Input
            display="none"
            ref={sliderDom}
            type="range"
            // width="100%"
            min={0}
            max={180}
            value={sliderValue}
            onChange={({ target: { value } }) => {
              setSliderValue(value);
            }}
          ></Input>
        </Box>
      </Box>

      <Flex mt={1} minH={4} justify="center">
        <P variant="orbitSelector" color={'white'}>
          {
            question?.answerSelector?.orbitSelector?.answerOptions?.find(
              (a) => a?.value === answer,
            )?.label
          }
        </P>
      </Flex>

      <div className={styles.buttonOuter}>
        {!isMobileBtn && (
          <BackButton onPrevQuestion={onPrevQuestion} currentPos={currentPos} />
        )}

        <QuestionButtons
          onNextQuestion={onNextQuestion}
          isRequired={question?.isRequired}
          isAnswered={getAnswer()}
        />
      </div>
    </QuestionAnimation>
  );
};
